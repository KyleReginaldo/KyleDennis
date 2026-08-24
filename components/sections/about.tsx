"use client"

import {
  Boxes,
  Cloud,
  Heart,
  Paintbrush,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { PixelImage } from "../ui/pixel-image";

const points: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Sparkles,
    title: "Self-taught since 2022",
    description: "Started with Java in my first year of college, found Flutter two months later, and never looked back.",
  },
  {
    icon: Boxes,
    title: "Mobile development",
    description: "Flutter applications for iOS and Android, from architecture to App Store and Play Store release.",
  },
  {
    icon: Paintbrush,
    title: "UI development",
    description: "Responsive, reusable Flutter UI components, animated and true to the design.",
  },
  {
    icon: Cloud,
    title: "Full-stack integration",
    description: "REST APIs, Firebase, Supabase, and NestJS backends wired into production Flutter and web apps.",
  },
  {
    icon: Users,
    title: "Collaboration & mentorship",
    description: "From teaching a friend Flutter and landing our first client together, to working directly with founders and engineers today.",
  },
  {
    icon: Heart,
    title: "Obsessed with polish",
    description: "The difference between a working app and a great one is in the details, and I care about both.",
  },
]


export function About() {
  return (
    <section id="about" className="relative scroll-mt-14 py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl lg:sticky lg:top-24 lg:mx-0 lg:max-w-none"
        >
          <PixelImage
            src="/kyle/images/creative-improved.png"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">About</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            I fell in love with code in college, and never stopped.
          </h2>
          <p className="mt-4 max-w-xl text-xl leading-relaxed text-muted-foreground">
            My story starts in 2022, my first year of college. I taught myself Java, but two months
            in, my brother introduced me to Flutter, and that changed everything. I started building
            with it right away, then began teaching a friend, Jannray. Within six months we landed our
            first client together: an app called APlus, built so cashiers in remote areas wouldn&apos;t
            have to write receipts by hand.
          </p>
          <p className="mt-4 max-w-xl text-xl leading-relaxed text-muted-foreground">
            That first project became the foundation. Within a year or two I found full-time work,
            and it&apos;s been non-stop since. Flutter and Dart are still where I spend most of my
            time, four years in, with Next.js, NestJS, Firebase, and Supabase alongside it for the
            web and backend work that ships with every app.
          </p>

          <div className="mt-10 border-t border-border">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-4 border-b border-border py-5"
              >
                <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
