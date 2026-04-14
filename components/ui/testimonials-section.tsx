"use client"

const OPEN_QUOTE = '\u201C'
const CLOSE_QUOTE = '\u201D'

const testimonials = [
  {
    initials: "KJ",
    name: "Kathlyn Jordan",
    role: "UI/UX Designer",
    quote: "Kyle helped me translate complex product briefs into clean user journeys that shipped on schedule.",
  },
  {
    initials: "KR",
    name: "Karl Reginaldo",
    role: "Full Stack Developer",
    quote: "Watching Kyle grow into a reliable Flutter engineer has been inspiring—he handles projects end-to-end with care.",
  },
  {
    initials: "JM",
    name: "Jannray Mostajo",
    role: "Mobile App Developer",
    quote: "From project planning to release, Kyle keeps teams aligned and QA focused without heavy process.",
  },
  {
    initials: "KB",
    name: "Kimberly Bay",
    role: "Graphic Designer",
    quote: "He communicates ideas clearly and backs design suggestions with real-world references my clients love.",
  },
]

export function TestimonialsSection() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left">
        <h2 className="text-lg font-semibold">Kind words</h2>
        <p className="text-sm text-muted-foreground">
          Honest feedback from collaborators who value clarity, delivery, and calm problem-solving.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-muted-foreground/10">
        {testimonials.map((t) => (
          <div key={t.name} className="relative py-8 first:pt-2 last:pb-0">
            {/* Decorative large quote mark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-4 select-none font-serif text-[96px] leading-none text-foreground/[0.05]"
            >
              {OPEN_QUOTE}
            </span>

            <div className="space-y-5">
              <p className="text-[15px] leading-relaxed text-foreground/90">
                {OPEN_QUOTE}{t.quote}{CLOSE_QUOTE}
              </p>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-muted-foreground/20 bg-muted text-xs font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
