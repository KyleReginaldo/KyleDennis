"use client"

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
import { motion } from "motion/react"
import Head from "next/head"
const frameworks = [
  { name: "Flutter", imageLink: "/assets/stacks/flutter.png" },
  { name: "NestJS", imageLink: "/assets/stacks/nest.png" },
  { name: "Next.js", imageLink: "/assets/stacks/nextjs.png" },
  { name: "ReactJS", imageLink: "/assets/stacks/reactjs.png" },
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

const projects = [
  {
    title: "Mobile Medical Lab",
    description: "A medical app that allows users to book appointments easily and without hassle",
    images: ["/assets/mockup/mobilemedicallab.png"],
    tags: ["Flutter", "NestJs" , "Medical"],
    playstore: "https://play.google.com/store/apps/details?id=com.labstogomml.app",
  },
  {
    title: "Mobile Medical Lab",
    description: "A website app that allows users to book appointments easily and without hassle",
    images: ["https://www.mobilemedicallab.com"],
    tags: ["Next.js", "Supabase",  "Pet Care", "Adoption", 'Fundraising', 'Animal Events', 'Admin'],
    isWebsite: true,
    isWebPreview: true,
  },
  {
    title: "Mobile Medical Lab API",
    description: "Robust NestJS backend API powering the Mobile Medical Lab application with comprehensive medical services",
    images: ["/assets/projects/app-preview.png"],
    tags: ["NestJs", "API", "Backend", "Medical"],
    playstore: "https://api.mobilemedicallab.com/api",
    isAPI: true,
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
    tags: ["Flutter", "Supabase", "NextJs", "Services", 'AWS'],
    playstore: "https://play.google.com/store/apps/details?id=com.servebeez.customer",

  },
  {
    title: "Paws Connect",
    description: "A comprehensive pet platform featuring adoption services, fundraising donations, and community events",
    images: ["https://paws-connect-rho.vercel.app/"],
    tags: ["Next.js", "Supabase",  "Pet Care", "Adoption", 'Fundraising', 'Animal Events', 'Admin'],
    playstore: "https://paws-connect-rho.vercel.app/",
    isWebsite: true,
    isWebPreview: true,
  },
  {
    title: "Paws Connect Mobile",
    description: "Mobile companion app for Paws Connect platform with offline support for pet adoption and events",
    images: ["/assets/mockup/pawsconnect.png"],
    tags: ["Flutter", "Mobile", "Pet Care", "Adoption", 'Fundraising', 'Animal Events', 'Supabase'],
    playstore: "https://paws-connect-rho.vercel.app/download/app",
    isMobile: true,
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
              <motion.div 
                className="flex-shrink-0 hidden md:block"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <Avatar className="w-36 h-36 md:w-48 md:h-48 border-4 border-primary/20 shadow-2xl">
                      <AvatarImage src="/assets/kylepogi.jpg" alt="Kyle Reginaldo" />
                      <AvatarFallback className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                        KR
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Badge variant="secondary" className="w-fit">
                      <Code className="w-3 h-3 mr-1" />
                      {/* typing animation showing key tech stacks */}
                      <span className="whitespace-nowrap">
                        {/* client-side typing component */}
                        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                        <Typing items={["Flutter", "NestJS", "TypeScript", "Supabase", "Firebase", "Docker", "Next.js"]} />
                      </span>
                    </Badge>
                  </motion.div>
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    Kyle Reginaldo
                  </motion.h1>
                  <motion.p 
                    className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                   Let&apos;s turn your ideas into reality and build impactful mobile and backend solutions together.
                  </motion.p>
                </motion.div>

                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild size="lg" className="group">
                      <a href="mailto:kyledennis099@gmail.com" className="cursor-pointer">
                        <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Get In Touch
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild variant="outline" size="lg" className="group bg-transparent">
                      <a href="kylereginaldo.pdf">
                        <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Download CV
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-6 text-sm text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MapPin className="w-4 h-4" />
                    Cavite, Philippines
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar className="w-4 h-4" />
                    3+ Years Experience
                  </motion.div>
                </motion.div>
              </motion.div>
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
            <h2 className="text-2xl font-bold mb-4">Technical Stacks</h2>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto">
              Comprehensive technology stack from mobile development to cloud infrastructure
            </p>
          </div>

          {/* GridPattern moved to testimonials section as a background */}

          <Tabs defaultValue="all" className="w-full">
            <TabsContent value="all">
              <div className="flex flex-col gap-3 md:grid md:grid-cols-4">
                {[...frameworks, ...languages, ...tools, ...services].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card
                      className="group hover:shadow-lg transition-all duration-300 hover:border-primary/20 p-0 border-b-zinc-900 h-full"
                    >
                      <CardContent className="p-[24px] flex items-center justify-between gap-4">
                        <motion.img
                          src={item.imageLink || "/placeholder.svg"}
                          alt={item.name}
                          className="w-6 h-6 rounded-md"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        />
                        <h3 className="font-semibold text-[14px]">{item.name}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            
          </Tabs>
        </div>
  </Section>
   <Section id="showcase" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto">
              A showcase of mobile and web applications I've built since 2022
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card
                  className="group overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                >
                  <motion.div 
                    className="relative overflow-hidden h-48"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex gap-2 bg-muted/50 h-full">
                      {project.isWebPreview ? (
                        <iframe
                          className="w-full h-full border-0"
                          src={project.images[0]}
                          title={`${project.title} preview`}
                          loading="lazy"
                        />
                      ) : (
                        project.images.map((image, imgIndex) => (
                          <motion.img
                            key={imgIndex}
                            src={image || "/placeholder.svg"}
                            alt={`${project.title} screenshot ${imgIndex + 1}`}
                            className="flex-1 h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        ))
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                   
                  </motion.div>
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                    >
                      <CardTitle className="group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        asChild
                        size="sm"
                        className="w-fit group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                      >
                        <a href={project.playstore} target="_blank" rel="noopener noreferrer" className="flex items-center mb-[12px]">
                          {project.isAPI ? (
                            <>
                              <Code className="w-4 h-4 mr-2" />
                              View API
                            </>
                          ) : project.isMobile ? (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Download App
                            </>
                          ) :project.isWebsite ? (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12zM6.404 2.36a6.7 6.7 0 0 1 .597.933A9.267 9.267 0 0 1 7.64 4h2.36a7.025 7.025 0 0 0-3.596-1.64M9.5 2.36c.67.204 1.335.82 1.887 1.855.173.324.33.682.468 1.068H13.91a7.025 7.025 0 0 0-3.596-1.64 6.965 6.965 0 0 0-.814-.283M13.91 12a7.025 7.025 0 0 1-3.596 1.64.814.814 0 0 1-.814-.283c-.67-.204-1.335-.82-1.887-1.855a7.97 7.97 0 0 1-.468-1.068zm-.582-3.5c-.03.877-.138 1.718-.312 2.5h2.146a6.957 6.957 0 0 0 .656-2.5z"/>
                              </svg>
                              View Website
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google-play" viewBox="0 0 16 16">
                                <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27"/>
                              </svg>
                              Playstore
                            </>
                          )}
                        </a>
                      </Button>
                    </motion.div>
                    <CardDescription className="leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>
                   
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.div
                          key={tagIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: tagIndex * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-2xl font-bold mb-1">Testimonials</h2>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto">
              Feedback from colleagues and clients who've experienced my work firsthand
            </p>
          </div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              {
                initials: "KJ",
                name: "Kathlyn Jordan", 
                role: "UI/UX Designer",
                quote: "As a freelance UI/UX designer, Kyle has been an invaluable resource. He helped me generate innovative ideas and explore different design options with my clients."
              },
              {
                initials: "KR",
                name: "Karl Reginaldo",
                role: "Full Stack Developer", 
                quote: "Introducing my little brother to Flutter and sharing essential techniques has been rewarding. His dedication and progress in mobile app development are truly commendable."
              },
              {
                initials: "JM",
                name: "Jannray Mostajo",
                role: "Mobile App Developer",
                quote: "Kyle has been instrumental in building mobile apps and teaching important developer skills. His commitment to timely delivery makes him ideal for project management."
              },
              {
                initials: "KB",
                name: "Kimberly Bay",
                role: "Graphic Designer",
                quote: "Sir Kyle is incredibly creative in his thinking. He explains concepts using real-world examples, making it clear what needs to be designed."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={index === 3 ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Avatar>
                          <AvatarFallback>{testimonial.initials}</AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <CardDescription>{testimonial.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      "{testimonial.quote.includes('Kyle') ? (
                        <>
                          {testimonial.quote.split('Kyle')[0]}
                          <span className="text-primary font-semibold">Kyle</span>
                          {testimonial.quote.split('Kyle')[1]}
                        </>
                      ) : (
                        testimonial.quote
                      )}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
  </Section>

  <Section id="experience" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold mb-4">Professional Journey</h2>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto">
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
                    <Badge variant="outline">Dart</Badge>
                    <Badge variant="outline">Supabase</Badge>
                    <Badge variant="outline">OneSignal</Badge>
                    <Badge variant="outline">Typescript</Badge>
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
