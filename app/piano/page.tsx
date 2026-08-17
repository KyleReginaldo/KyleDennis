import { Piano } from "@/components/games/piano"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Piano",
}

export default function PianoPage() {
  return (
    <section className="flex min-h-[70vh] scroll-mt-14 items-center py-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Piano />
      </div>
    </section>
  )
}
