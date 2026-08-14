"use client"

import { Marquee } from "@/components/ui/marquee"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { proficiencyFromYears, stack, stackFlat, type TechItem } from "@/lib/data/stack"
import { motion } from "motion/react"

const PROFICIENCY_DOT: Record<string, string> = {
  Expert: "bg-primary",
  Advanced: "bg-primary/70",
  Intermediate: "bg-muted-foreground/60",
  Familiar: "bg-muted-foreground/30",
}

function TechIconView({ item }: { item: TechItem }) {
  if (item.icon.type === "image") {
    return <img src={item.icon.src} alt={item.name} className="h-6 w-6 object-contain" />
  }
  const Icon = item.icon.Icon
  return <Icon className="h-6 w-6 text-primary" />
}

function TechPill({ item }: { item: TechItem }) {
  const proficiency = proficiencyFromYears(item.years)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex w-52 shrink-0 cursor-default items-center gap-2.5 rounded-xl border border-border/60 px-3.5 py-2.5 transition-colors duration-300 hover:border-primary/40">
          <TechIconView item={item} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{item.name}</p>
            <p className="truncate text-xs text-muted-foreground">{item.years}</p>
          </div>
          <span
            aria-hidden
            title={proficiency.label}
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${PROFICIENCY_DOT[proficiency.label]}`}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <p className="text-xs text-black">{item.description}</p>
      </TooltipContent>
    </Tooltip>
  )
}

export function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-14 py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-14 max-w-2xl px-6 text-center"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Technical Stack</p>
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Tools I reach for every day.</h2>

        <div className="mt-7 flex items-center justify-center gap-6 sm:gap-10">
          {[
            { value: stackFlat.length, label: "Technologies" },
            { value: stack.length, label: "Categories" },
            { value: "5+", label: "Years Building" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold tracking-tight sm:text-3xl">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <TooltipProvider delayDuration={150}>
        <div className="mx-auto max-w-4xl space-y-8 px-6">
          {stack.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                {category.name}
              </p>
              <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <Marquee
                  pauseOnHover
                  reverse={i % 2 === 1}
                  repeat={2}
                  style={{ "--duration": `${category.items.length * 4 + 15}s` } as React.CSSProperties}
                >
                  {category.items.map((item) => (
                    <TechPill key={item.name} item={item} />
                  ))}
                </Marquee>
              </div>
            </motion.div>
          ))}
        </div>
      </TooltipProvider>
    </section>
  )
}
