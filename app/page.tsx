"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ContactCard } from "@/components/ui/contact-card"
import { GlobeSection } from "@/components/ui/globe-section"
import { ProjectsSection } from "@/components/ui/projects-section"
import Section from "@/components/ui/section"
import { TestimonialsSection } from "@/components/ui/testimonials-section"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Typing from "@/components/ui/typing"
import { Calendar, Code, MapPin } from "lucide-react"
import Head from "next/head"
import Image from "next/image"

const frameworks = [
  { name: "Flutter", imageLink: "https://thesvg.org/icons/flutter/default.svg", years: "4 years", description: "Cross-platform mobile development framework for building beautiful native apps" },
  { name: "NestJS", imageLink: "https://thesvg.org/icons/nestjs/default.svg", years: "3 years", description: "Progressive Node.js framework for building efficient and scalable server-side applications" },
  { name: "Next.js", imageLink: "https://thesvg.org/icons/nextdotjs/default.svg", years: "3 years", description: "React framework for production-grade applications with hybrid static and server rendering" },
  { name: "React", imageLink: "https://thesvg.org/icons/react/default.svg", years: "3 years", description: "JavaScript library for building user interfaces with component-based architecture" },
]

const services = [
  { name: "Supabase", imageLink: "https://thesvg.org/icons/supabase/default.svg", years: "3 years", description: "Open source Firebase alternative with Postgres database, authentication, and real-time subscriptions" },
  { name: "Firebase", imageLink: "https://thesvg.org/icons/firebase/default.svg", years: "3 years", description: "Google's platform for mobile and web app development with real-time database and hosting" },
  { name: "Neon", imageLink: "https://thesvg.org/icons/neon/default.svg", years: "1 year", description: "Serverless Postgres with branching, autoscaling, and instant provisioning for modern apps" },
  { name: "SendGrid", imageLink: "https://thesvg.org/icons/azure-sendgrid-accounts/default.svg", years: "3 years", description: "Cloud-based email delivery service for transactional and marketing emails" },
  { name: "Twilio", imageLink: "https://thesvg.org/icons/twilio/default.svg", years: "3 years", description: "Communications platform for SMS, voice, and video messaging integration" },
  { name: "Stripe", imageLink: "https://thesvg.org/icons/stripe/default.svg", years: "3 years", description: "Payment processing platform for online businesses and e-commerce applications" },
  { name: "AWS", imageLink: "https://thesvg.org/icons/aws/default.svg", years: "2 months", description: "Amazon Web Services cloud computing platform for scalable infrastructure and services" },
]

const tools = [
  { name: "GitHub", imageLink: "https://thesvg.org/icons/github/default.svg", years: "3 years", description: "Version control and collaboration platform for software development teams" },
  { name: "Docker", imageLink: "https://thesvg.org/icons/docker/default.svg", years: "3 years", description: "Containerization platform for building, shipping, and running applications" },
  { name: "Cloud Run", imageLink: "https://thesvg.org/icons/gcp-cloud-run/default.svg", years: "3 years", description: "Fully managed serverless platform for deploying containerized applications" },
  { name: "Postman", imageLink: "https://thesvg.org/icons/postman/default.svg", years: "3 years", description: "API development and testing tool for building and debugging REST APIs" },
  { name: "Figma", imageLink: "https://thesvg.org/icons/figma/default.svg", years: "3 years", description: "Collaborative interface design tool for creating user interfaces and prototypes" },
  { name: "VS Code", imageLink: "https://thesvg.org/icons/visual-studio-code/default.svg", years: "3 years", description: "Lightweight but powerful source code editor with extensive extension support" },
  { name: "Vite", imageLink: "https://thesvg.org/icons/vite/default.svg", years: "3 years", description: "Fast frontend build tool with instant server start and lightning-fast HMR" },
  { name: "Prisma", imageLink: "https://thesvg.org/icons/prisma/default.svg", years: "2 years", description: "Next-generation ORM for Node.js and TypeScript with type-safe database access" },
]

const languages = [
  { name: "TypeScript", imageLink: "https://thesvg.org/icons/typescript/default.svg", years: "3 years", description: "Typed superset of JavaScript that compiles to plain JavaScript for safer code" },
  { name: "JavaScript", imageLink: "https://thesvg.org/icons/javascript/default.svg", years: "3 years", description: "Dynamic programming language for web development and interactive content" },
  { name: "Python", imageLink: "https://thesvg.org/icons/python/default.svg", years: "3 years", description: "High-level programming language for automation, data analysis, and backend development" },
  { name: "Dart", imageLink: "https://thesvg.org/icons/dart/default.svg", years: "3 years", description: "Client-optimized language for building fast apps on any platform with Flutter" },
]

const workHistory = [
  {
    company: "Mobile Medical Lab",
    role: "Lead Flutter & API Engineer",
    period: "2023 — Present",
    logo: "/mobilemedicallab-logo.webp",
  },
  {
    company: "Celebreak",
    role: "Flutter Developer",
    period: "2022 — 2023",
    logo: "/celebreak-logo.webp",
  },
  {
    company: "Servebeez",
    role: "Mobile Engineer",
    period: "2021 — 2022",
    logo: "/servebeez-logo.webp",
  },
]


const labelClassName = "text-sm font-semibold uppercase tracking-wide text-white mb-[10px]"



export default function Home() {
  const stackItems = [...frameworks, ...languages, ...tools, ...services]

  return (
    <>
      <Head>
        <title>Kyle Reginaldo - Flutter and NestJS Developer</title>
        <meta
          name="description"
          content="Minimal portfolio for Kyle Reginaldo, showcasing Flutter and NestJS product work."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex w-full max-w-[680px] flex-col gap-24 px-6 py-16 pb-36">
        <Section id="overview" className="space-y-0">
          <div className="flex flex-col items-center gap-6 text-center">
            <Avatar className="h-28 w-28 border border-primary/20">
              <AvatarImage src="/assets/kyleai.png" alt="Kyle Reginaldo" />
              <AvatarFallback className="text-3xl font-semibold">KR</AvatarFallback>
            </Avatar>

            <Badge variant="outline" className="gap-2 px-3 py-1 text-xs uppercase tracking-wide">
              <Code className="h-3.5 w-3.5" />
              <span className="font-medium">
                <Typing items={["Flutter", "NestJS", "TypeScript", "Supabase", "Firebase"]} />
              </span>
            </Badge>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight">Kyle Reginaldo</h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Flutter and NestJS developer crafting focused mobile, web, and API solutions for teams that value simple products.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Cavite, Philippines
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> 3+ years experience
              </span>
            </div>

            <ContactCard />
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
                  className="flex items-center gap-1 py-1"
                >
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-muted-foreground/10 bg-muted">
                    <img
                      src={entry.logo}
                      alt={`${entry.company} logo`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1 text-sm">
                    <span className="font-medium text-foreground">{entry.company}</span>
                    <span className="text-muted-foreground">{entry.role}</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground/80">
                    {entry.period}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2 text-left">
            <h2 className="text-lg font-semibold">Capabilities</h2>
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

        <Section id="reach" className="space-y-6">
          <GlobeSection />
        </Section>
      </main>
    </>
  )
}
