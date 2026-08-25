import type { ContentBlock } from "@/lib/data/blog"
import { ArrowDown, CheckCircle2, RotateCcw } from "lucide-react"

function CleanArchitectureDiagram({ accent }: { accent: string }) {
  const layers = [
    { label: "Presentation", detail: "Widgets · State management" },
    { label: "Domain", detail: "Entities · Use cases · Repository interfaces" },
    { label: "Data", detail: "Repository impl · APIs · Local storage" },
  ]

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
        Dependencies point inward
      </p>
      <div className="flex flex-col items-center gap-2">
        {layers.map((layer, i) => (
          <div key={layer.label} className="flex w-full flex-col items-center gap-2">
            <div
              className="w-full max-w-sm rounded-xl border px-5 py-4 text-center"
              style={{
                borderColor: `${accent}33`,
                backgroundColor: `${accent}0d`,
              }}
            >
              <div className="text-sm font-semibold" style={{ color: accent }}>
                {layer.label}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{layer.detail}</div>
            </div>
            {i < layers.length - 1 && <ArrowDown className="h-4 w-4 text-muted-foreground" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function PlayStoreStepsDiagram({ accent }: { accent: string }) {
  const steps = ["Dev account", "Prepare & sign", "Build .aab", "Store listing", "Test track", "Go live"]

  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex min-w-max items-center gap-2 sm:min-w-0 sm:flex-wrap sm:justify-center">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-2 px-1 text-center">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: accent }}
              >
                {i + 1}
              </div>
              <span className="w-20 text-xs font-medium text-foreground">{step}</span>
            </div>
            {i < steps.length - 1 && <div className="h-px w-6 shrink-0 bg-border sm:w-10" />}
          </div>
        ))}
      </div>
    </div>
  )
}

function AiAgentLoopDiagram({ accent }: { accent: string }) {
  const steps = ["Describe", "Generate", "Review", "Refine"]

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className="rounded-full border px-4 py-2 text-sm font-medium"
              style={{ borderColor: `${accent}40`, backgroundColor: `${accent}0d`, color: accent }}
            >
              {step}
            </div>
            {i < steps.length - 1 && <ArrowDown className="h-4 w-4 -rotate-90 text-muted-foreground" />}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <RotateCcw className="h-3.5 w-3.5" style={{ color: accent }} />
        Repeat until the diff is one you'd sign off on
      </div>
    </div>
  )
}

export function BlogContent({ blocks, accent }: { blocks: ContentBlock[]; accent: string }) {
  return (
    <div className="max-w-none">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="mb-5 text-base leading-relaxed text-foreground/90">
                {block.text}
              </p>
            )
          case "h2":
            return (
              <h2 key={i} className="mb-4 mt-10 text-2xl font-semibold tracking-tight text-foreground">
                {block.text}
              </h2>
            )
          case "h3":
            return (
              <h3 key={i} className="mb-3 mt-6 text-lg font-semibold tracking-tight text-foreground">
                {block.text}
              </h3>
            )
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul"
            return (
              <ListTag key={i} className="mb-5 space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-2.5 text-base leading-relaxed text-foreground/90">
                    {block.ordered ? (
                      <span className="mt-0.5 shrink-0 text-sm font-semibold" style={{ color: accent }}>
                        {j + 1}.
                      </span>
                    ) : (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} />
                    )}
                    <span>{item}</span>
                  </li>
                ))}
              </ListTag>
            )
          }
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-6 rounded-r-lg border-l-4 py-3 pl-5 text-base italic text-foreground/80"
                style={{ borderColor: accent, backgroundColor: `${accent}0a` }}
              >
                {block.text}
              </blockquote>
            )
          case "code":
            return (
              <pre
                key={i}
                className="my-6 overflow-x-auto rounded-xl border border-border bg-[#0d1117] p-4 text-sm text-[#e6edf3]"
              >
                <code>{block.code}</code>
              </pre>
            )
          case "diagram":
            if (block.kind === "clean-architecture") return <CleanArchitectureDiagram key={i} accent={accent} />
            if (block.kind === "playstore-steps") return <PlayStoreStepsDiagram key={i} accent={accent} />
            return <AiAgentLoopDiagram key={i} accent={accent} />
          default:
            return null
        }
      })}
    </div>
  )
}
