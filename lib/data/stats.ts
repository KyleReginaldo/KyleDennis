import { experience } from "./experience"
import { projects } from "./projects"
import { stackFlat } from "./stack"

export type Stat = {
  label: string
  value: number
  suffix: string
}

export const stats: Stat[] = [
  { label: "Years of Experience", value: 4, suffix: "+" },
  { label: "Production Apps", value: projects.length, suffix: "+" },
  { label: "Technologies Used", value: stackFlat.length, suffix: "+" },
  { label: "Companies Collaborated With", value: experience.length, suffix: "" },
]
