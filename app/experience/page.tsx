import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experience",
}

export default function ExperiencePage() {
  return <ExperienceTimeline />
}
