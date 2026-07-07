"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CursorGlow } from "@/components/ui/cursor-glow"
import { GlobeSection } from "@/components/ui/globe-section"
import { ProjectsSection } from "@/components/ui/projects-section"
import Section from "@/components/ui/section"
import { TestimonialsSection } from "@/components/ui/testimonials-section"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Typing from "@/components/ui/typing"
import { Calendar, Code, Download, GithubIcon, LinkedinIcon, MapPin } from "lucide-react"
import Head from "next/head"
import Image from "next/image"

const frameworks = [
  { name: "Flutter", imageLink: "https://thesvg.org/icons/flutter/default.svg", years: "5 years", description: "Cross-platform mobile development framework for building beautiful native apps" },
  { name: "NestJS", imageLink: "https://thesvg.org/icons/nestjs/default.svg", years: "4 years", description: "Progressive Node.js framework for building efficient and scalable server-side applications" },
  { name: "Next.js", imageLink: "https://thesvg.org/icons/nextdotjs/default.svg", years: "4 years", description: "React framework for production-grade applications with hybrid static and server rendering" },
  { name: "React", imageLink: "https://thesvg.org/icons/react/default.svg", years: "4 years", description: "JavaScript library for building user interfaces with component-based architecture" },
  { name: "React Native", imageLink: "https://thesvg.org/icons/reactnative/wordmark.svg", years: "4 years", description: "Framework for building native iOS and Android apps from a single JavaScript codebase using React" },

]

const services = [
  { name: "Supabase", imageLink: "https://thesvg.org/icons/supabase/default.svg", years: "4 years", description: "Open source Firebase alternative with Postgres database, authentication, and real-time subscriptions" },
  { name: "Firebase", imageLink: "https://thesvg.org/icons/firebase/default.svg", years: "4 years", description: "Google's platform for mobile and web app development with real-time database and hosting" },
  { name: "Neon", imageLink: "https://thesvg.org/icons/neon/default.svg", years: "2 years", description: "Serverless Postgres with branching, autoscaling, and instant provisioning for modern apps" },
  { name: "SendGrid", imageLink: "https://thesvg.org/icons/azure-sendgrid-accounts/default.svg", years: "4 years", description: "Cloud-based email delivery service for transactional and marketing emails" },
  { name: "Twilio", imageLink: "https://thesvg.org/icons/twilio/default.svg", years: "4 years", description: "Communications platform for SMS, voice, and video messaging integration" },
  { name: "Stripe", imageLink: "https://thesvg.org/icons/stripe/default.svg", years: "4 years", description: "Payment processing platform for online businesses and e-commerce applications" },
  { name: "AWS", imageLink: "https://thesvg.org/icons/aws/default.svg", years: "1 year 2 months", description: "Amazon Web Services cloud computing platform for scalable infrastructure and services" },
]

const tools = [
  { name: "GitHub", imageLink: "https://thesvg.org/icons/github/default.svg", years: "4 years", description: "Version control and collaboration platform for software development teams" },
  { name: "Docker", imageLink: "https://thesvg.org/icons/docker/default.svg", years: "4 years", description: "Containerization platform for building, shipping, and running applications" },
  { name: "Cloud Run", imageLink: "https://thesvg.org/icons/gcp-cloud-run/default.svg", years: "4 years", description: "Fully managed serverless platform for deploying containerized applications" },
  { name: "Postman", imageLink: "https://thesvg.org/icons/postman/default.svg", years: "4 years", description: "API development and testing tool for building and debugging REST APIs" },
  { name: "Figma", imageLink: "https://thesvg.org/icons/figma/default.svg", years: "4 years", description: "Collaborative interface design tool for creating user interfaces and prototypes" },
  { name: "VS Code", imageLink: "https://thesvg.org/icons/visual-studio-code/default.svg", years: "4 years", description: "Lightweight but powerful source code editor with extensive extension support" },
  { name: "Vite", imageLink: "https://thesvg.org/icons/vite/default.svg", years: "4 years", description: "Fast frontend build tool with instant server start and lightning-fast HMR" },
  { name: "Prisma", imageLink: "https://thesvg.org/icons/prisma/default.svg", years: "3 years", description: "Next-generation ORM for Node.js and TypeScript with type-safe database access" },
]

const languages = [
  { name: "TypeScript", imageLink: "https://thesvg.org/icons/typescript/default.svg", years: "4 years", description: "Typed superset of JavaScript that compiles to plain JavaScript for safer code" },
  { name: "JavaScript", imageLink: "https://thesvg.org/icons/javascript/default.svg", years: "4 years", description: "Dynamic programming language for web development and interactive content" },
  { name: "Python", imageLink: "https://thesvg.org/icons/python/default.svg", years: "4 years", description: "High-level programming language for automation, data analysis, and backend development" },
  { name: "Dart", imageLink: "https://thesvg.org/icons/dart/default.svg", years: "4 years", description: "Client-optimized language for building fast apps on any platform with Flutter" },
]

const workHistory = [
  {
    company: "Mobile Medical Lab",
    role: "Flutter, Next.js & NestJS Developer",
    period: "May 2024 — May 2025",
    logo: "/mobilemedicallab-logo.webp",
    description: "Developed and maintained the mobile app enabling users to conveniently book on-demand medical services, built a seamless booking experience across iOS and Android plus the companion website with Next.js, and collaborated with product managers and backend developers to optimize performance and user experience.",
  },
  {
    company: "Celebreak",
    role: "Flutter Developer",
    period: "Nov 2024 — Feb 2025",
    logo: "/celebreak-logo.webp",
    description: "Contributed to TownSquare, an application fostering community interaction among users.",
  },
  {
    company: "Avyan Global",
    role: "Flutter Developer",
    period: "Jun 2022 — Mar 2024",
    logo: null,
    description: "Developed Alt Switch, a blockchain-based mobile application, gaining hands-on experience with RESTful APIs and decentralized technologies.",
  },
]


const labelClassName = "text-sm font-semibold uppercase tracking-wide text-foreground mb-[10px]"



export default function Home() {
  const stackItems = [...frameworks, ...languages, ...tools, ...services]

  return (
    <>
      <Head>
        <title>Kyle Reginaldo - Full Stack Developer</title>
        <meta
          name="description"
          content="Minimal portfolio for Kyle Reginaldo, a full stack developer building mobile, web, and API products."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CursorGlow />

      <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <main className="mx-auto flex w-full max-w-[680px] flex-col gap-24 px-6 py-16 pb-36">
        <Section id="overview" className="space-y-0">
          <div className="relative flex flex-col items-center gap-6 text-center">
            <div className="relative">
              <Avatar className="h-28 w-28 border-2 border-primary/20 shadow-lg shadow-primary/10">
                <AvatarImage src="/assets/kyleai.png" alt="Kyle Reginaldo" />
                <AvatarFallback className="text-3xl font-semibold">KR</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-1 right-1 flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-background bg-emerald-500" />
              </span>
            </div>

            <Badge variant="outline" className="gap-2 px-3 py-1 text-xs uppercase tracking-wide">
              <Code className="h-3.5 w-3.5" />
              <span className="font-medium">
                <Typing items={["Flutter", "NestJS", "TypeScript", "Supabase", "Firebase"]} />
              </span>
            </Badge>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">Kyle Reginaldo</h1>
              <p className="text-base font-medium text-primary">Full Stack Developer</p>
              <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
                Crafting focused mobile, web, and API solutions for teams that value simple, production-ready products.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1">
                <MapPin className="h-3.5 w-3.5" /> Cavite, Philippines
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1">
                <Calendar className="h-3.5 w-3.5" /> 4+ years experience
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Available for work
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button asChild size="sm" variant="outline">
                <a href="/kylereginaldo.pdf" download>
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </Button>
              <div className="flex items-center gap-1">
                <Button asChild size="icon" variant="ghost">
                  <a
                    href="https://github.com/KyleReginaldo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="icon" variant="ghost">
                  <a
                    href="https://www.linkedin.com/in/kyle-dennis-reginaldo-a0852a2a2"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Section>

        <Section id="stacks" className="space-y-6">
          <div className="space-y-4">
            <span className={labelClassName}>
              Work Experience
            </span>
            <div className="space-y-3">
              {workHistory.map((entry) => (
                <div
                  key={entry.company}
                  className="flex items-start gap-3 py-2"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-muted-foreground/10 bg-muted">
                    {entry.logo ? (
                      <img
                        src={entry.logo}
                        alt={`${entry.company} logo`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-muted-foreground">
                        {entry.company
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-foreground">{entry.company}</span>
                      <span className="shrink-0 text-xs font-medium text-muted-foreground/80">
                        {entry.period}
                      </span>
                    </div>
                    <span className="text-muted-foreground">{entry.role}</span>
                    <p className="text-xs leading-relaxed text-muted-foreground/90">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 text-left">
            <h2 className="text-lg font-semibold">Technical Stacks</h2>
            <p className="text-sm text-muted-foreground">
              Tools, frameworks, and services I rely on to ship production-ready products.
            </p>
          </div>
          <TooltipProvider delayDuration={100}>
            <div className="flex flex-wrap gap-2">
              {stackItems.map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <div>
                      <Badge variant="outline" className="rounded-full px-3 py-1 bg-gray-600 text-xs cursor-pointer transition-all hover:bg-gray-500">
                        <Image src={item.imageLink} alt={item.name} width={20} height={20} /> {item.name}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs bg-popover text-popover-foreground">
                    <div className="space-y-1">
                      <p className="font-semibold text-white">{item.name} • {item.years}</p>
                      <p className="text-xs text-gray-300">{item.description}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </Section>

        <Section id="projects" className="space-y-6">
          <ProjectsSection />
        </Section>

        <Section id="testimonials" className="space-y-6">
          <TestimonialsSection />
        </Section>

        <Section id="activity" className="space-y-6">
          <GlobeSection />
        </Section>
      </main>
    </>
  )
}
