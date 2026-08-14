import { Process } from "@/components/sections/process"
import { TechStack } from "@/components/sections/tech-stack"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tech Stacks",
}

export default function ServicesPage() {
  return (
    <>
      <TechStack />
      <Process />
    </>
  )
}
