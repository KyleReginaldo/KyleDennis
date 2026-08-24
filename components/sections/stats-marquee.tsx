"use client"

import { CountUp } from "@/components/ui/count-up"
import { Marquee } from "@/components/ui/marquee"
import { stats } from "@/lib/data/stats"
import { stackFlat } from "@/lib/data/stack"

const MARQUEE_TECH = [
  "Flutter",
  "Dart",
  "Next.js",
  "NestJS",
  "TypeScript",
  "Firebase",
  "Supabase",
  "Stripe",
  "Twilio",
  "Codemagic",
]

const iconByName = new Map(stackFlat.map((i) => [i.name, i] as const))

export function StatsMarquee() {
  return (
    <section className="relative border-y border-border py-10">
      <Marquee pauseOnHover className="[--duration:32s]">
        {MARQUEE_TECH.map((name) => {
          const item = iconByName.get(name)
          if (!item || item.icon.type !== "image") return null
          return (
            <span key={name} className="flex items-center gap-2.5 px-6 opacity-60 grayscale transition-opacity hover:opacity-100 hover:grayscale-0">
              <img src={item.icon.src} alt="" className="h-6 w-6 object-contain" />
              <span className="font-mono text-sm text-muted-foreground">{name}</span>
            </span>
          )
        })}
      </Marquee>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-6 px-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <CountUp value={stat.value} suffix={stat.suffix} className="text-3xl font-semibold tracking-tight sm:text-4xl" />
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
