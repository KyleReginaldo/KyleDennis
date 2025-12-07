"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Section from "@/components/ui/section"
import Typing from "@/components/ui/typing"
import { Calendar, Code, Download, Mail, MapPin } from "lucide-react"
import Head from "next/head"

const frameworks = [
  { name: "Flutter", imageLink: "/assets/stacks/flutter.png" },
  { name: "NestJS", imageLink: "/assets/stacks/nest.png" },
  { name: "Next.js", imageLink: "/assets/stacks/nextjs.png" },
  { name: "React", imageLink: "/assets/stacks/reactjs.png" },
]

const services = [
  { name: "Supabase", imageLink: "/assets/stacks/supabase.png" },
  { name: "Firebase", imageLink: "/assets/stacks/firebase.png" },
  { name: "SendGrid", imageLink: "/assets/stacks/sendgrid.png" },
  { name: "Twilio", imageLink: "/assets/stacks/twilio.png" },
  { name: "Stripe", imageLink: "/assets/stacks/stripe.png" },
]

const tools = [
  { name: "GitHub", imageLink: "/assets/stacks/git.png" },
  { name: "Docker", imageLink: "/assets/stacks/docker.png" },
  { name: "Cloud Run", imageLink: "/assets/stacks/cloudrun.png" },
  { name: "Postman", imageLink: "/assets/stacks/postman.png" },
  { name: "Figma", imageLink: "/assets/stacks/figma.png" },
  { name: "VS Code", imageLink: "/assets/stacks/vscode.png" },
  { name: "Vite", imageLink: "/assets/stacks/vite.js.png" },
]

const languages = [
  { name: "TypeScript", imageLink: "/assets/stacks/ts.png" },
  { name: "JavaScript", imageLink: "/assets/stacks/js.png" },
  { name: "Python", imageLink: "/assets/stacks/py.png" },
  { name: "Dart", imageLink: "/assets/stacks/dart.png" },
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

const projects = [
  {
    title: "Mobile Medical Lab",
    description: "Book mobile lab services effortlessly through an intuitive Flutter experience.",
    images: ["/assets/mockup/mobilemedicallab.png"],
    tags: ["Flutter", "NestJS", "Medical"],
    link: "https://play.google.com/store/apps/details?id=com.labstogomml.app",
    linkLabel: "Download on Google Play",
  },
  {
    title: "Mobile Medical Lab Web",
    description: "A patient-first booking portal with streamlined scheduling and responsive design.",
    images: ["/assets/projects/app-preview.png"],
    tags: ["Next.js", "Supabase", "Healthcare"],
    link: "https://www.mobilemedicallab.com",
    linkLabel: "Visit the website",
    isWebPreview: true,
  },
  {
    title: "Mobile Medical Lab API",
    description: "NestJS backend delivering secure clinical data workflows and integrations.",
    images: ["/assets/projects/app-preview.png"],
    tags: ["NestJS", "API", "Backend"],
    link: "https://api.mobilemedicallab.com/api",
    linkLabel: "Inspect the API",
  },
  {
    title: "Celebreak",
    description: "Match with local football players and reserve pitches in minutes.",
    images: ["/assets/mockup/celebreak.png"],
    tags: ["Flutter", "NestJS", "Sports"],
    link: "https://play.google.com/store/apps/details?id=com.lewisblack.celebreakOne",
    linkLabel: "Download on Google Play",
  },
  {
    title: "Servebeez",
    description: "On-demand service marketplace with flexible scheduling and provider tooling.",
    images: ["/assets/mockup/servebeez.png"],
    tags: ["Flutter", "Supabase", "AWS"],
    link: "https://play.google.com/store/apps/details?id=com.servebeez.customer",
    linkLabel: "Download on Google Play",
  },
  {
    title: "PawsConnect Web",
    description: "Adoption, fundraising, and events in one friendly community platform.",
    images: ["/pawsconnect-logo.png"],
    tags: ["Next.js", "Supabase", "Pet Care"],
    link: "https://paws-connect-rho.vercel.app/",
    linkLabel: "Visit the website",
    isWebPreview: true,
  },
  {
    title: "PawsConnect Mobile",
    description: "Mobile companion for animal lovers and shelter partners.",
    images: ["/assets/mockup/pawsconnect.png"],
    tags: ["Flutter", "Supabase", "Mobile"],
    link: "https://paws-connect-rho.vercel.app/download/app",
    linkLabel: "Download the app",
  },
]

const testimonials = [
  {
    initials: "KJ",
    name: "Kathlyn Jordan",
    role: "UI/UX Designer",
    quote:
      "Kyle helped me translate complex product briefs into clean user journeys that shipped on schedule.",
  },
  {
    initials: "KR",
    name: "Karl Reginaldo",
    role: "Full Stack Developer",
    quote:
      "Watching Kyle grow into a reliable Flutter engineer has been inspiring—he handles projects end-to-end with care.",
  },
  {
    initials: "JM",
    name: "Jannray Mostajo",
    role: "Mobile App Developer",
    quote:
      "From project planning to release, Kyle keeps teams aligned and QA focused without heavy process.",
  },
  {
    initials: "KB",
    name: "Kimberly Bay",
    role: "Graphic Designer",
    quote:
      "He communicates ideas clearly and backs design suggestions with real-world references my clients love.",
  },
]

const labelClassName = "text-sm font-semibold uppercase tracking-wide text-black mb-[10px]"


const resolveLinkLabel = (project: (typeof projects)[number]) => {
  if (project.linkLabel) return project.linkLabel
  return "View project"
}

export default function Home() {
  const stackItems = [...frameworks, ...languages, ...tools, ...services]

  return (
    <>
      <Head>
        <title>Kyle Reginaldo - Flutter & NestJS Developer</title>
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
            <Avatar className="h-24 w-24 border border-primary/20">
              <AvatarImage src="/assets/kylepogi.jpg" alt="Kyle Reginaldo" />
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

            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="sm">
                <a href="mailto:kyledennis099@gmail.com">
                  <Mail className="h-4 w-4" /> Say hello
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="kylereginaldo.pdf">
                  <Download className="h-4 w-4" /> Download CV
                </a>
              </Button>
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
          <div className="flex flex-wrap gap-2">
            {stackItems.map((item) => (
              <Badge key={item.name} variant="outline" className="rounded-full px-3 py-1 text-xs">
                {item.name}
              </Badge>
            ))}
          </div>
        </Section>

        <Section id="projects" className="space-y-6">
          <div className="space-y-2 text-left">
            <h2 className="text-lg font-semibold">Selected work</h2>
            <p className="text-sm text-muted-foreground">
              A concise snapshot of products shipped across mobile, web, and backend since 2022.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {projects.map((project) => {
              const tagLine = project.tags.join(" · ");
              const previewSrc = project.images[0] || "/placeholder.svg";

              return (
                <div
                  key={project.title}
                  className="rounded-2xl border border-muted-foreground/20 bg-background/60 px-4 py-4 transition-colors duration-200 hover:border-muted-foreground/40"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                    <img
                          src={previewSrc}
                          alt={`${project.title} preview`}
                          className="h-12 w-12 shrink-0 rounded-xl border border-muted-foreground/20 object-cover"
                        />

                      <div className="flex-1 space-y-1">
                        <h3 className="text-base font-medium leading-tight">{project.title}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>{tagLine}</span>
                      {project.link ? (
                        <span aria-hidden="true">·</span>
                      ) : null}
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/70"
                        >
                          {resolveLinkLabel(project)}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section id="testimonials" className="space-y-6">
          <div className="space-y-2 text-left">
            <h2 className="text-lg font-semibold">Kind words</h2>
            <p className="text-sm text-muted-foreground">
              Honest feedback from collaborators who value clarity, delivery, and calm problem-solving.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-muted-foreground/20 bg-background/80 shadow-none">
                <CardContent className="space-y-3 p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    “{testimonial.quote}”
                  </p>
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground/70">
                    {testimonial.name} · {testimonial.role}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </main>
    </>
  )
}
