import { FeaturedCarousel } from "@/components/sections/featured-carousel"
import { Projects } from "@/components/sections/projects"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
}

export default function ProjectsPage() {
  return (
    <>
      <FeaturedCarousel />
      <Projects />
    </>
  )
}
