import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import { Footer } from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import { Process } from "@/components/sections/process"
import { Projects } from "@/components/sections/projects"
import { Services } from "@/components/sections/services"
import { TechStack } from "@/components/sections/tech-stack"
import { TestimonialsSection } from "@/components/ui/testimonials-section"

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <ExperienceTimeline />
      <TechStack />
      <Services />
      <Process />
      <TestimonialsSection />
      <Contact />
      <Footer />
    </>
  )
}
