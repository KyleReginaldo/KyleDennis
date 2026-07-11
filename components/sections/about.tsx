"use client"

import { CountUp } from "@/components/ui/count-up"
import { stats } from "@/lib/data/stats"
import {
  Boxes,
  Cloud,
  Heart,
  Paintbrush,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"
import { motion } from "motion/react"

const points: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Sparkles,
    title: "3+ years shipping real products",
    description: "Taking ideas from first commit to a live product people actually use, end-to-end.",
  },
  {
    icon: Boxes,
    title: "Scalable architecture",
    description: "Clean, feature-first architecture across mobile and web that scales with the team.",
  },
  {
    icon: Paintbrush,
    title: "UI/UX implementation",
    description: "Pixel-perfect UI from Figma, with animation and micro-interactions baked in.",
  },
  {
    icon: Cloud,
    title: "Backend integration",
    description: "REST APIs, Firebase, Supabase, and NestJS backends wired into real, working products.",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description: "Comfortable working directly with founders, designers, and other engineers to ship fast.",
  },
  {
    icon: Heart,
    title: "Obsessed with polish",
    description: "The difference between a working app and a great one is in the details, and I care about both.",
  },
]

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">About</p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            I build the whole product, not just the screens.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            I build for the people who end up using the product, whether it&apos;s mobile, web, or the
            backend behind it, focused on shipping something fast, polished, and built to last.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <p.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6"
              >
                <CountUp
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-4xl font-bold tracking-tight"
                />
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
