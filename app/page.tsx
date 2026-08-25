import { About } from "@/components/sections/about"
import { BlogTeaser } from "@/components/sections/blog-teaser"
import { Hero } from "@/components/sections/hero"
import { StatsMarquee } from "@/components/sections/stats-marquee"
import { TestimonialsSection } from "@/components/ui/testimonials-section"

export default function Home() {
  return (
    <>
      <Hero />
      <StatsMarquee />
      <About />
      <TestimonialsSection />
      <BlogTeaser />
    </>
  )
}
