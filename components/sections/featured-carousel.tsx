"use client"

import { projects } from "@/lib/data/projects"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const FEATURED = [
  { id: "mobile-medical-lab", image: "/assets/carousel/mml_car.jpg" },
  { id: "celebreak", image: "/assets/carousel/celebreak_car.jpg" },
  { id: "servebeez", image: "/assets/carousel/servebeez_car.jpg" },
  { id: "pawsconnect", image: "/assets/carousel/paws_car.jpg" },
] as const
const AUTOPLAY_MS = 6000
const SETTLE_MS = 120

type FeaturedItem = { project: (typeof projects)[number]; image: string }

const items = FEATURED.map(({ id, image }): FeaturedItem | null => {
  const project = projects.find((p) => p.id === id)
  return project ? { project, image } : null
}).filter((item): item is FeaturedItem => Boolean(item))

const REAL_COUNT = items.length
// Loop illusion: clone the last slide before the first and the first slide after the
// last, so scrolling (or autoplay) past either end lands on a lookalike clone. Once the
// scroll settles there, we teleport (plain scrollLeft, no smooth-scroll) to the real
// slide it's standing in for — same pixels, so the jump is invisible.
const renderItems = [items[REAL_COUNT - 1], ...items, items[0]]

export function FeaturedCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const rawIndexRef = useRef(1)
  const [active, setActive] = useState(0)
  const pausedRef = useRef(false)

  const centerOffset = (el: HTMLElement, track: HTMLElement) =>
    el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2

  const goToRaw = (rawIdx: number, smooth: boolean) => {
    const track = trackRef.current
    const el = slideRefs.current[rawIdx]
    if (!track || !el) return
    const left = centerOffset(el, track)
    if (smooth) track.scrollTo({ left, behavior: "smooth" })
    else track.scrollLeft = left
    rawIndexRef.current = rawIdx
  }

  useEffect(() => {
    goToRaw(1, false)
    setActive(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const closestRaw = () => {
      const center = track.scrollLeft + track.clientWidth / 2
      let closest = 0
      let min = Infinity
      slideRefs.current.forEach((el, i) => {
        if (!el) return
        const elCenter = el.offsetLeft + el.offsetWidth / 2
        const dist = Math.abs(elCenter - center)
        if (dist < min) {
          min = dist
          closest = i
        }
      })
      return closest
    }

    let raf = 0
    let settleTimer: ReturnType<typeof setTimeout>

    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0
          const raw = closestRaw()
          rawIndexRef.current = raw
          setActive(((raw - 1) % REAL_COUNT + REAL_COUNT) % REAL_COUNT)
        })
      }

      clearTimeout(settleTimer)
      settleTimer = setTimeout(() => {
        const raw = closestRaw()
        if (raw === 0) goToRaw(REAL_COUNT, false)
        else if (raw === REAL_COUNT + 1) goToRaw(1, false)
      }, SETTLE_MS)
    }

    track.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      track.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
      clearTimeout(settleTimer)
    }
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    const id = setInterval(() => {
      if (!pausedRef.current) goToRaw(rawIndexRef.current + 1, true)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative pt-24 pb-4">
      <div
        ref={trackRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onPointerDown={() => (pausedRef.current = true)}
        onPointerUp={() => setTimeout(() => (pausedRef.current = false), 3000)}
        className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[9vw] pb-2 sm:px-[14vw]"
      >
        {renderItems.map(({ project: p, image }, i) => (
          <Link
            key={`${p.id}-${i}`}
            href={`/projects/${p.id}`}
            ref={(el) => {
              slideRefs.current[i] = el
            }}
            className="group relative aspect-[16/10] w-[82vw] shrink-0 snap-center overflow-hidden sm:aspect-[16/8] sm:w-[68vw] lg:w-[56vw]"
            style={{ background: p.accent }}
          >
            <Image
              src={image}
              alt={p.title}
              fill
              sizes="(min-width: 1024px) 56vw, (min-width: 640px) 68vw, 82vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority={i === 1}
            />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
              <div>
                <p className="text-sm font-medium text-white/70">{p.title}</p>
                <p className="mt-1 max-w-md text-xl font-semibold leading-snug text-white sm:text-2xl">
                  {p.tagline}
                </p>
              </div>
              <span
                aria-hidden
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition-transform group-hover:scale-105"
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-1.5">
        {items.map(({ project: p }, i) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Go to ${p.title}`}
            onClick={() => goToRaw(i + 1, true)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
