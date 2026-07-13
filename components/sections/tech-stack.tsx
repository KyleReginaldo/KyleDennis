"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { proficiencyFromYears, stack, type TechItem } from "@/lib/data/stack"
import { motion } from "motion/react"

function TechIconView({ item }: { item: TechItem }) {
  if (item.icon.type === "image") {
    return <img src={item.icon.src} alt={item.name} className="h-6 w-6 object-contain" />
  }
  const Icon = item.icon.Icon
  return <Icon className="h-6 w-6 text-primary" />
}

function TechCard({ item, index }: { item: TechItem; index: number }) {
  const proficiency = proficiencyFromYears(item.years)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1"
    >
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex cursor-default items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted/40 transition-transform group-hover:scale-110">
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
        <div className="mb-1.5 flex items-center justify-between text-[10px] text-muted-foreground/70">
          <span>{proficiency.label}</span>
          <span>{proficiency.value}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency.value}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.04 + 0.2, ease: "easeOut" }}
            className="h-full rounded-full bg-primary"
          />
        </div>
      </div>
    </motion.div>
  )
}

export function TechStack() {
  return (
    <section id="stack" className="relative scroll-mt-14 py-28">
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
        </motion.div>

        <Tabs defaultValue={stack[0].name}>
          <div className="hide-scrollbar mb-8 overflow-x-auto">
            <TabsList className="h-auto w-max gap-1 bg-muted p-1.5">
              {stack.map((category) => (
                <TabsTrigger key={category.name} value={category.name} className="px-3.5 py-1.5 text-xs">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {stack.map((category) => (
            <TabsContent key={category.name} value={category.name}>
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
