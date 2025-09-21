import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DotPattern } from "@/components/ui/dot-pattern"
import { GridPattern } from "@/components/ui/grid-pattern"
import Section from "@/components/ui/section"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import Typing from "@/components/ui/typing"
import { cn } from "@/lib/utils"
import {
  Calendar,
  Code,
  Download,
  Github,
  Mail,
  MapPin
} from "lucide-react"
import Head from "next/head"

const frameworks = [
  { name: "Flutter", imageLink: "/assets/stacks/flutter.png" },
  { name: "NestJS", imageLink: "/assets/stacks/nest.png" },
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
]

const languages = [
  { name: "TypeScript", imageLink: "/assets/stacks/ts.png" },
  { name: "JavaScript", imageLink: "/assets/stacks/js.png" },
  { name: "Python", imageLink: "/assets/stacks/py.png" },
  { name: "Dart", imageLink: "/assets/stacks/dart.png" },
]

const projects = [
  {
    title: "Mobile Medical Lab",
    description: "A medical app that allows users to book appointments easily and without hassle",
    images: ["/assets/mockup/mobilemedicallab.png"],
    tags: ["Flutter", "NestJs" , "Medical"],
    playstore: "https://play.google.com/store/apps/details?id=com.labstogomml.app",
  },
  {
    title: "Celebreak",
    description: "Mobile app that enables user to easily book a match with other football player",
    images: ["/assets/mockup/celebreak.png"],
    tags: ["Flutter", "NestJs", "Football"],
    playstore: "https://play.google.com/store/apps/details?id=com.lewisblack.celebreakOne",

  },
  {
    title: "Servebeez Mobile App",
    description: "Mobile app that allows user to book a service anytime anywhere",
    images: ["/assets/mockup/servebeez.png"],
    tags: ["Flutter", "Supabase", "NextJs", "Services"],
    playstore: "https://play.google.com/store/apps/details?id=com.servebeez.customer",

  },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Kyle Reginaldo - Flutter & NestJS Developer</title>
        <meta
          name="description"
          content="Kyle Reginaldo - Expert Flutter & NestJS Developer specializing in mobile and backend solutions"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

  <Section id="overview" className="relative md:min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
    <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
    <DotPattern
      className="absolute w-min-screen inset-0 z-0 pointer-events-none [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
      // width={800}
    />
  <div className="container mx-auto px-4 py-12 md:py-20 z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 w-full md:w-2/3">
              <div className="flex-shrink-0 hidden md:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
                  <Avatar className="w-36 h-36 md:w-48 md:h-48 border-4 border-primary/20 shadow-2xl float-animation">
                    <AvatarImage src="/assets/kylepogi.jpg" alt="Kyle Reginaldo" />
                    <AvatarFallback className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                      KR
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">
                    <Code className="w-3 h-3 mr-1" />
                    {/* typing animation showing key tech stacks */}
                    <span className="whitespace-nowrap">
                      {/* client-side typing component */}
                      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                      <Typing items={["Flutter", "NestJS", "TypeScript", "Supabase", "Firebase", "Docker", "Next.js"]} />
                    </span>
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
                    Kyle Reginaldo
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                    Flutter & NestJS Developer crafting exceptional mobile experiences and robust backend solutions
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="group">
                    <a href="mailto:kyledennis099@gmail.com" className="cursor-pointer">
                      <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Get In Touch
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group bg-transparent">
                    <a href="kylereginaldo.pdf">
                      <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Download CV
                    </a>
                  </Button>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Cavite, Philippines
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    3+ Years Experience
                  </div>
                </div>
              </div>
            </div>

            {/* spacer for layout balance on wide screens */}
            <div className="hidden md:block md:flex-1"></div>
          </div>
        </div>
  </Section>
  {/* moved GridPattern into the stacks section per request; removed standalone block */}
  <Section id="stacks" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Technical Stacks</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive technology stack from mobile development to cloud infrastructure
            </p>
          </div>

          {/* GridPattern moved to testimonials section as a background */}

          <Tabs defaultValue="all" className="w-full">
            <TabsContent value="all">
              <div className="flex flex-col gap-3 md:grid md:grid-cols-4">
                {[...frameworks, ...languages, ...tools, ...services].map((item, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 p-0 border-b-zinc-900"
                  >
                    <CardContent className="p-[24px] flex items-center justify-between gap-4">
                      <img
                        src={item.imageLink || "/placeholder.svg"}
                        alt={item.name}
                        className="w-6 h-6 rounded-md group-hover:scale-110 transition-transform duration-300"
                      />
                      <h3 className="font-semibold text-[14px]">{item.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            
          </Tabs>
        </div>
  </Section>
  <Section id="testimonials" className="py-20 relative">
          <div className="absolute inset-0 pointer-events-none -z-10">
            <GridPattern
              squares={[
                [4, 4],
                [5, 1],
                [8, 2],
                [5, 3],
                [5, 5],
                [10, 10],
                [12, 15],
                [15, 10],
                [10, 15],
                [15, 10],
                [10, 15],
                [15, 10],
              ]}
              className={cn(
                "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
              )}
            />
          </div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Testimonials</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Feedback from colleagues and clients who've experienced my work firsthand
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>KJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Kathlyn Jordan</CardTitle>
                    <CardDescription>UI/UX Designer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "As a freelance UI/UX designer, <span className="text-primary font-semibold">Kyle</span> has been an
                  invaluable resource. He helped me generate innovative ideas and explore different design options with
                  my clients."
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>KR</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Karl Reginaldo</CardTitle>
                    <CardDescription>Full Stack Developer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "Introducing my little brother to Flutter and sharing essential techniques has been rewarding. His
                  dedication and progress in mobile app development are truly commendable."
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Jannray Mostajo</CardTitle>
                    <CardDescription>Mobile App Developer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "<span className="text-primary font-semibold">Kyle</span> has been instrumental in building mobile
                  apps and teaching important developer skills. His commitment to timely delivery makes him ideal for
                  project management."
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>KB</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Kimberly Bay</CardTitle>
                    <CardDescription>Graphic Designer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  "Sir <span className="text-primary font-semibold">Kyle</span> is incredibly creative in his thinking.
                  He explains concepts using real-world examples, making it clear what needs to be designed."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
  </Section>

  <Section id="experience" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Professional Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              My development journey over the past two years, building expertise through diverse projects and
              collaborations
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Separator className="mb-8" />
            <h3 className="text-2xl font-semibold mb-8 text-center">Professional Experience</h3>

            <div className="space-y-8">
              <Card className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Full-Stack Developer</CardTitle>
                      <CardDescription className="text-lg font-medium text-primary">Labstogo | Mobile Medical Lab</CardDescription>
                      <p className="text-sm text-muted-foreground mt-1">Virginia, USA</p>
                    </div>
                    <Badge variant="secondary">1 year</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Handling Mobile and Backend Development using Flutter and NestJs to build a medical app
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Flutter</Badge>
                    <Badge variant="outline">NestJs</Badge>
                    <Badge variant="outline">Full-time</Badge>
                  </div>
                </CardContent>
              </Card>
               <Card className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Software Engineer</CardTitle>
                      <CardDescription className="text-lg font-medium text-primary">Celebreak</CardDescription>
                      <p className="text-sm text-muted-foreground mt-1">Barcelona, Spain</p>
                    </div>
                    <Badge variant="secondary">2 months</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Developed a comprehensive mobile application using Flutter, focusing on user experience and
                    performance optimization.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Flutter</Badge>
                    <Badge variant="outline">Mobile Development</Badge>
                    <Badge variant="outline">Full-time</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator className="my-12" />
            <h3 className="text-2xl font-semibold mb-8 text-center">Freelance Projects</h3>

            <div className="space-y-8">
              <Card className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Blockchain Mobile App</CardTitle>
                      <CardDescription className="text-lg font-medium">Crypto Trading Platform</CardDescription>
                    </div>
                    <Badge variant="secondary">1.5 months</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Developed a blockchain-based mobile application, gaining deep understanding of cryptocurrency
                    integration and biometric security.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Blockchain</Badge>
                    <Badge variant="outline">Flutter</Badge>
                    <Badge variant="outline">NodeJS</Badge>
                    <Badge variant="outline">Biometrics</Badge>
                    <Badge variant="outline">Figma</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary to-primary"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Attendance Management System</CardTitle>
                      <CardDescription className="text-lg font-medium">Educational Technology</CardDescription>
                    </div>
                    <Badge variant="secondary">1 month</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Built a comprehensive attendance tracking system for educational institutions, enabling students to
                    monitor their attendance records.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Flutter</Badge>
                    <Badge variant="outline">Android</Badge>
                    <Badge variant="outline">Education</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">Laundry Booking Platform</CardTitle>
                      <CardDescription className="text-lg font-medium">Service Management App</CardDescription>
                    </div>
                    <Badge variant="secondary">2 months</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Created a full-featured laundry service booking application with real-time tracking and status
                    updates.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Flutter</Badge>
                    <Badge variant="outline">Firebase</Badge>
                    <Badge variant="outline">Figma</Badge>
                    <Badge variant="outline">Cross-platform</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
  </Section>

  <Section id="showcase" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of mobile and web applications I've built since 2022
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <div className="flex gap-2 p-4 bg-muted/50">
                    {project.images.map((image, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={image || "/placeholder.svg"}
                        alt={`${project.title} screenshot ${imgIndex + 1}`}
                        className="flex-1 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-500"
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Button
                    asChild
                    size="sm"
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  >
                    <a href={project.playstore} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google-play" viewBox="0 0 16 16">
                        <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/>
                      </svg>
                      Playstore
                    </a>
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
  </Section>

      <footer className="bg-muted/50 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing Together</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Ready to bring your mobile app or backend project to life? Let's discuss your ideas.
            </p>
            <div className="flex justify-center gap-4">
            <a href="mailto:kyledennis099@gmail.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Contact Me
              </Button>
            </a>
             <a href="https://github.com/KyleReginaldo" target="_blank" rel="noopener noreferrer">
               <Button variant="outline" size="lg">
                <Github className="w-4 h-4 mr-2" />
                View GitHub
              </Button>
             </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
