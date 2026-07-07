import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import { Footer } from "@/components/sections/footer"
import { GithubActivity } from "@/components/sections/github-activity"
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
      <About />
      <div className="border-t border-white/5">
        <Projects />
      </div>
      <div className="border-t border-white/5 bg-white/[0.015]">
        <Services />
      </div>
      <div className="border-t border-white/5">
        <TechStack />
      </div>
      <div className="border-t border-white/5 bg-white/[0.015]">
        <Process />
      </div>
      <div className="border-t border-white/5">
        <TestimonialsSection />
      </div>
      <div className="border-t border-white/5 bg-white/[0.015]">
        <GithubActivity />
      </div>
      <div className="border-t border-white/5">
        <ExperienceTimeline />
      </div>
      <div className="border-t border-white/5 bg-white/[0.015]">
        <Contact />
      </div>
      <Footer />
    </>
  )
}
