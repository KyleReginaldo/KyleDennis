// Synthesized entirely with Web Audio API — no audio files to source, host, or license.
let ctx: AudioContext | null = null
let ambientNodes: { stop: () => void } | null = null

function getContext() {
  if (!ctx) ctx = new AudioContext()
  return ctx
}

export function startAmbient() {
  const context = getContext()
  if (context.state === "suspended") context.resume()
  if (ambientNodes) return

  const master = context.createGain()
  master.gain.setValueAtTime(0, context.currentTime)
  master.gain.linearRampToValueAtTime(0.05, context.currentTime + 2)
  master.connect(context.destination)

  // Soft hall-style delay for a relaxing, spacious tail.
  const delay = context.createDelay(3)
  delay.delayTime.value = 1.1
  const feedback = context.createGain()
  feedback.gain.value = 0.3
  const delayFilter = context.createBiquadFilter()
  delayFilter.type = "lowpass"
  delayFilter.frequency.value = 1200
  delay.connect(delayFilter).connect(feedback).connect(delay)
  delay.connect(master)

  // A gentle major-7th pad (C3, E3, G3, B3), warmed with a low-pass filter.
  const padFilter = context.createBiquadFilter()
  padFilter.type = "lowpass"
  padFilter.frequency.value = 900
  padFilter.connect(master)
  padFilter.connect(delay)

  const voices = [130.81, 164.81, 196.0, 246.94].map((freq) => {
    const osc = context.createOscillator()
    osc.type = "sine"
    osc.frequency.value = freq
    const gain = context.createGain()
    gain.gain.value = 0.16
    osc.connect(gain).connect(padFilter)
    osc.start()
    return osc
  })

  // Slow filter breathing so the pad stays alive rather than static.
  const lfo = context.createOscillator()
  lfo.type = "sine"
  lfo.frequency.value = 0.06
  const lfoGain = context.createGain()
  lfoGain.gain.value = 200
  lfo.connect(lfoGain).connect(padFilter.frequency)
  lfo.start()

  ambientNodes = {
    stop: () => {
      const now = context.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0, now + 1)
      voices.forEach((osc) => osc.stop(now + 1.1))
      lfo.stop(now + 1.1)
      setTimeout(() => {
        master.disconnect()
        delay.disconnect()
        feedback.disconnect()
        padFilter.disconnect()
      }, 1200)
    },
  }
}

export function stopAmbient() {
  ambientNodes?.stop()
  ambientNodes = null
}

export function playClick() {
  const context = getContext()
  if (context.state === "suspended") context.resume()

  const osc = context.createOscillator()
  osc.type = "sine"
  osc.frequency.setValueAtTime(880, context.currentTime)
  osc.frequency.exponentialRampToValueAtTime(220, context.currentTime + 0.08)

  const gain = context.createGain()
  gain.gain.setValueAtTime(0.15, context.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.1)

  osc.connect(gain).connect(context.destination)
  osc.start()
  osc.stop(context.currentTime + 0.1)
}
