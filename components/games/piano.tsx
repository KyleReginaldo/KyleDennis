"use client"

import { SONGS, type Song } from "@/lib/data/songs"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type NoteInfo = { note: string; key: string; midi: number }
type BlackNoteInfo = NoteInfo & { afterIndex: number }
type Mode = "free" | "listen" | "practice"

const WHITE_NOTES: NoteInfo[] = [
  { note: "C4", key: "a", midi: 60 },
  { note: "D4", key: "s", midi: 62 },
  { note: "E4", key: "d", midi: 64 },
  { note: "F4", key: "f", midi: 65 },
  { note: "G4", key: "g", midi: 67 },
  { note: "A4", key: "h", midi: 69 },
  { note: "B4", key: "j", midi: 71 },
  { note: "C5", key: "k", midi: 72 },
]

const BLACK_NOTES: BlackNoteInfo[] = [
  { note: "C#4", key: "w", midi: 61, afterIndex: 0 },
  { note: "D#4", key: "e", midi: 63, afterIndex: 1 },
  { note: "F#4", key: "t", midi: 66, afterIndex: 3 },
  { note: "G#4", key: "y", midi: 68, afterIndex: 4 },
  { note: "A#4", key: "u", midi: 70, afterIndex: 5 },
]

const NOTE_INFO: Record<string, NoteInfo> = Object.fromEntries([...WHITE_NOTES, ...BLACK_NOTES].map((n) => [n.note, n]))
const KEY_TO_NOTE: Record<string, NoteInfo> = Object.fromEntries([...WHITE_NOTES, ...BLACK_NOTES].map((n) => [n.key, n]))

const BEAT_MS = 380 // ponytail: one fixed tempo for every song, add per-song tempo if a slow one is needed

function midiToFreq(midi: number) {
  return 440 * Math.pow(2, (midi - 69) / 12)
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export function Piano() {
  const audioRef = useRef<{ ctx: AudioContext; master: GainNode } | null>(null)
  const [activeKeys, setActiveKeys] = useState<Set<string>>(() => new Set())
  const [volume, setVolume] = useState(0.8)

  const [mode, setMode] = useState<Mode>("free")
  const [activeSongId, setActiveSongId] = useState<string | null>(null)
  const [playIndex, setPlayIndex] = useState(0)
  const [practiceIndex, setPracticeIndex] = useState(0)
  const playRunRef = useRef(0)

  const activeSong = useMemo(() => SONGS.find((s) => s.id === activeSongId) ?? null, [activeSongId])
  const expectedStep = mode === "practice" ? activeSong?.notes[practiceIndex] : null

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const ctx = new AudioContext()
      const master = ctx.createGain()
      master.gain.value = volume
      master.connect(ctx.destination)
      audioRef.current = { ctx, master }
    }
    if (audioRef.current.ctx.state === "suspended") void audioRef.current.ctx.resume()
    return audioRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.master.gain.value = volume
  }, [volume])

  const playNote = useCallback(
    (midi: number) => {
      const { ctx, master } = ensureAudio()
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      osc.type = "triangle"
      osc.frequency.value = midiToFreq(midi)
      const filter = ctx.createBiquadFilter()
      filter.type = "lowpass"
      filter.frequency.value = 3000
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.9, now + 0.008)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4)
      osc.connect(filter)
      filter.connect(gain)
      gain.connect(master)
      osc.start(now)
      osc.stop(now + 1.5)
    },
    [ensureAudio]
  )

  const pressNote = useCallback(
    (note: string, midi: number) => {
      setActiveKeys((prev) => new Set(prev).add(note))
      playNote(midi)
    },
    [playNote]
  )

  const releaseNote = useCallback((note: string) => {
    setActiveKeys((prev) => {
      if (!prev.has(note)) return prev
      const next = new Set(prev)
      next.delete(note)
      return next
    })
  }, [])

  const stopSong = useCallback(() => {
    playRunRef.current++
    setMode("free")
    setActiveKeys(new Set())
  }, [])

  const playSong = useCallback(
    async (song: Song) => {
      const gen = ++playRunRef.current
      setMode("listen")
      setActiveSongId(song.id)
      for (let i = 0; i < song.notes.length; i++) {
        if (playRunRef.current !== gen) return
        setPlayIndex(i)
        const step = song.notes[i]
        const info = NOTE_INFO[step.note]
        pressNote(info.note, info.midi)
        await wait(step.beats * BEAT_MS * 0.85)
        if (playRunRef.current !== gen) return
        releaseNote(info.note)
        await wait(step.beats * BEAT_MS * 0.15)
      }
      if (playRunRef.current === gen) setMode("free")
    },
    [pressNote, releaseNote]
  )

  const startPractice = useCallback((song: Song) => {
    playRunRef.current++
    setMode("practice")
    setActiveSongId(song.id)
    setPracticeIndex(0)
  }, [])

  const exitPractice = useCallback(() => {
    setMode("free")
  }, [])

  const handleActivate = useCallback(
    (note: string, midi: number) => {
      pressNote(note, midi)
      if (mode === "practice" && activeSong) {
        const expected = activeSong.notes[practiceIndex]
        if (expected && expected.note === note) {
          const next = practiceIndex + 1
          setPracticeIndex(next)
          if (next >= activeSong.notes.length) {
            setTimeout(() => setMode("free"), 500)
          }
        }
      }
    },
    [pressNote, mode, activeSong, practiceIndex]
  )

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.repeat) return
      const mapped = KEY_TO_NOTE[e.key.toLowerCase()]
      if (!mapped) return
      handleActivate(mapped.note, mapped.midi)
    }
    function onKeyUp(e: KeyboardEvent) {
      const mapped = KEY_TO_NOTE[e.key.toLowerCase()]
      if (!mapped) return
      releaseNote(mapped.note)
    }
    function releaseAll() {
      setActiveKeys(new Set())
    }
    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("keyup", onKeyUp)
    window.addEventListener("pointerup", releaseAll)
    window.addEventListener("blur", releaseAll)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("keyup", onKeyUp)
      window.removeEventListener("pointerup", releaseAll)
      window.removeEventListener("blur", releaseAll)
    }
  }, [handleActivate, releaseNote])

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 select-none">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Virtual Piano</h1>
        <p className="mt-2 text-muted-foreground">Play something beautiful.</p>
      </div>

      <label className="flex items-center gap-3 text-sm text-muted-foreground">
        Volume
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-32 accent-primary"
          aria-label="Volume"
        />
      </label>

      {mode !== "free" && activeSong && (
        <div className="flex w-full max-w-2xl flex-col items-center gap-1 rounded-lg border border-border bg-muted/40 px-4 py-3 text-center">
          <p className="text-sm font-medium">
            {mode === "listen" ? "Listening: " : "Practicing: "}
            {activeSong.title}
          </p>
          {mode === "listen" && (
            <p className="text-xs text-muted-foreground">
              Note {playIndex + 1} / {activeSong.notes.length}
            </p>
          )}
          {mode === "practice" && (
            <p className="text-xs text-muted-foreground">
              {expectedStep
                ? `Press ${expectedStep.note} — key ${NOTE_INFO[expectedStep.note].key.toUpperCase()} (${practiceIndex + 1} / ${activeSong.notes.length})`
                : "Nice! Song complete."}
            </p>
          )}
          <button
            onClick={mode === "listen" ? stopSong : exitPractice}
            className="mt-1 text-xs font-medium text-primary hover:underline"
          >
            {mode === "listen" ? "Stop" : "Exit practice"}
          </button>
        </div>
      )}

      <div className="w-full max-w-2xl">
        <div className="relative flex h-36 sm:h-48 md:h-56">
          {WHITE_NOTES.map((n) => (
            <button
              key={n.note}
              onPointerDown={() => handleActivate(n.note, n.midi)}
              onPointerUp={() => releaseNote(n.note)}
              onPointerLeave={() => releaseNote(n.note)}
              aria-label={`${n.note}, key ${n.key.toUpperCase()}`}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-end rounded-b-lg border border-border bg-[#fafafa] pb-3 text-[11px] font-medium text-neutral-500 shadow-[0_3px_0_rgba(0,0,0,0.08)] transition-transform duration-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none",
                activeKeys.has(n.note) && "translate-y-1 bg-primary/10 shadow-none",
                expectedStep?.note === n.note && "ring-2 ring-inset ring-primary animate-pulse motion-reduce:animate-none"
              )}
            >
              <span>{n.note[0]}</span>
              <span className="mt-0.5 font-mono text-[9px] uppercase text-neutral-400">{n.key}</span>
            </button>
          ))}

          {BLACK_NOTES.map((n) => (
            <button
              key={n.note}
              onPointerDown={() => handleActivate(n.note, n.midi)}
              onPointerUp={() => releaseNote(n.note)}
              onPointerLeave={() => releaseNote(n.note)}
              aria-label={`${n.note}, key ${n.key.toUpperCase()}`}
              style={{ left: `${((n.afterIndex + 1) / WHITE_NOTES.length) * 100}%` }}
              className={cn(
                "absolute top-0 z-10 flex h-[60%] w-[7%] -translate-x-1/2 flex-col items-center justify-end rounded-b-md bg-[#1a1a1a] pb-2 text-[9px] font-medium text-white/70 shadow-[0_3px_0_rgba(0,0,0,0.4)] transition-transform duration-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary motion-reduce:transition-none",
                activeKeys.has(n.note) && "translate-y-1 bg-primary shadow-none",
                expectedStep?.note === n.note && "ring-2 ring-inset ring-primary animate-pulse motion-reduce:animate-none"
              )}
            >
              <span className="font-mono uppercase">{n.key}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">Use your keyboard (A–K, W E T Y U) or click the keys to play.</p>

      <div className="w-full max-w-2xl">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Songs — hit Listen to hear it, or Practice to learn it key by key
        </h2>
        <ul className="divide-y divide-border rounded-lg border border-border">
          {SONGS.map((song) => (
            <li key={song.id} className="flex items-center justify-between gap-4 px-4 py-2.5">
              <span className="flex items-center gap-2 text-sm">
                <span
                  className={cn(
                    activeSongId === song.id && mode !== "free" ? "font-medium text-primary" : "text-foreground"
                  )}
                >
                  {song.title}
                </span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
                    song.difficulty === "easy" && "bg-muted text-muted-foreground",
                    song.difficulty === "medium" && "bg-amber-500/15 text-amber-600 dark:text-amber-400",
                    song.difficulty === "hard" && "bg-red-500/15 text-red-600 dark:text-red-400"
                  )}
                >
                  {song.difficulty}
                </span>
              </span>
              <div className="flex shrink-0 gap-2 text-xs font-medium">
                <button onClick={() => playSong(song)} className="rounded-md border border-border px-2.5 py-1 hover:bg-muted">
                  Listen
                </button>
                <button onClick={() => startPractice(song)} className="rounded-md border border-border px-2.5 py-1 hover:bg-muted">
                  Practice
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
