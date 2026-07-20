import { Process } from "@/components/sections/process"
import { Services } from "@/components/sections/services"
import { TechStack } from "@/components/sections/tech-stack"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
}

export default function ServicesPage() {
  return (
    <>
      <Services />
      <TechStack />
      <Process />
    </>
  )
}
