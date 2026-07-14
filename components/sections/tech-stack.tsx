"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { proficiencyFromYears, stack, stackFlat, type TechItem } from "@/lib/data/stack"
import { motion } from "motion/react"
import { useRef } from "react"

const PROFICIENCY_STYLES: Record<string, string> = {
  Expert: "text-primary",
  Advanced: "text-foreground/80",
  Intermediate: "text-muted-foreground",
  Familiar: "text-muted-foreground/70",
}

function TechIconView({ item }: { item: TechItem }) {
  if (item.icon.type === "image") {
    return <img src={item.icon.src} alt={item.name} className="h-6 w-6 object-contain" />
  }
  const Icon = item.icon.Icon
  return <Icon className="h-6 w-6 text-primary" />
}

function TechCard({ item, index }: { item: TechItem; index: number }) {
  const proficiency = proficiencyFromYears(item.years)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty("--x", `${e.clientX - rect.left}px`)
    card.style.setProperty("--y", `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), color-mix(in srgb, var(--primary) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="relative">
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex cursor-default items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:ring-primary/30">
                  <TechIconView item={item} />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.years}</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p className="text-xs text-gray-300">{item.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-[10px]">
            <span className={`font-medium ${PROFICIENCY_STYLES[proficiency.label] ?? "text-muted-foreground"}`}>
              {proficiency.label}
            </span>
            <span className="text-muted-foreground/70">{proficiency.value}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${proficiency.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: index * 0.05 + 0.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-14 overflow-hidden py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[110px]"
      />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl mx-auto text-center"
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

        <Tabs defaultValue={stack[0].name}>
          <div className="hide-scrollbar mb-8 overflow-x-auto">
            <TabsList className="h-auto w-max gap-1 bg-muted p-1.5">
              {stack.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name}
                  className="px-3.5 py-1.5 text-xs data-[state=active]:font-semibold data-[state=active]:text-primary"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {stack.map((category) => (
            <TabsContent
              key={category.name}
              value={category.name}
              className="data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-2 data-[state=active]:duration-300"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {category.items.map((item, i) => (
                  <TechCard key={item.name} item={item} index={i} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
