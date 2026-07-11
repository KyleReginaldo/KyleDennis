"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GridPattern } from "@/components/ui/grid-pattern"
import { Iphone15Pro } from "@/components/ui/iphone-15-pro"
import { Magnetic } from "@/components/ui/magnetic"
import { ArrowRight, Code2, MapPin } from "lucide-react"
import { motion } from "motion/react"

const HEADLINE = "Building products that users love, from idea to production."

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03 },
  },
}

const word = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background */}
      <GridPattern
        className="fill-white/[0.02] stroke-white/[0.05] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        width={48}
        height={48}
      />
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-[24rem] w-[24rem] rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4"
          >
            <Avatar className="h-7 w-7 shrink-0">
              <AvatarImage src="/assets/kyleai.png" alt="Kyle Reginaldo" />
              <AvatarFallback className="text-[10px]">KR</AvatarFallback>
            </Avatar>
            <span className="h-4 w-px bg-white/10" />
            <span className="text-sm font-medium">Kyle Reginaldo</span>
            <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
              <MapPin className="h-3 w-3" /> Cavite, PH
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available
            </span>
          </motion.div>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {HEADLINE.split(" ").map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w === "love," ? (
                  <span className="bg-gradient-to-r from-primary via-sky-400 to-purple-400 bg-clip-text text-transparent">
                    {w}
                  </span>
                ) : (
                  w
                )}
                {" "}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            I design and build complete digital products: mobile apps, web platforms, and the
            backend systems behind them, with modern architecture, cloud infrastructure, and
            interfaces people genuinely enjoy using.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Magnetic strength={0.3}>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02]"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-muted-foreground/25 bg-transparent px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted/40"
              >
                Contact Me
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right: device mockup + floating cards */}
        <div className="relative mx-auto hidden w-full max-w-sm items-center justify-center lg:flex">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-primary/15 blur-[80px]" />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative drop-shadow-2xl"
            >
              <Iphone15Pro className="h-auto w-[220px]" src="/assets/mockup/celebreak.png" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-6 w-40 rounded-2xl border border-white/10 bg-white/5 p-3 shadow-xl backdrop-blur-md sm:-left-16"
            >
              <div className="flex items-center gap-2">
                <Code2 className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono text-[10px] text-muted-foreground">api/bookings.ts</span>
              </div>
              <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-foreground/70">
                <span className="text-purple-400">export</span> <span className="text-sky-400">async</span> function{"\n"}
                createBooking() {"{}"}
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -right-6 top-1/4 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:-right-14"
            >
              <p className="text-xs font-semibold">4.8 star rating</p>
              <p className="text-[10px] text-muted-foreground">App Store & Play Store</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 bottom-10 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 shadow-xl backdrop-blur-md sm:-right-10"
            >
              <p className="text-xs font-semibold">Mobile, Web, API</p>
              <p className="text-[10px] text-muted-foreground">Full-stack delivery</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
