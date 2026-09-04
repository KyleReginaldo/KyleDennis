"use client";

import { shade } from "@/components/animata/card/case-study-card";
import { setBookOrigin } from "@/lib/book-transition";
import type { Project } from "@/lib/data/projects";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * The book's front cover. Extracted verbatim from the grid card so the modal can
 * render the *same* cover it animates open — a copy would drift the moment either
 * side is restyled. Markup and classes are unchanged from the original card.
 */
export function BookCoverFace({ project, index }: { project: Project; index: number }) {
  const accent = project.accent ?? "#0071e3"

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-r-2xl rounded-l-md border border-black/10"
      style={{ background: `linear-gradient(155deg, ${accent} 0%, ${shade(accent, -55)} 100%)` }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 15% 0%, rgba(255,255,255,0.25), transparent 55%)" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

      {/* Folded page corner */}
      <div
        className="absolute right-0 top-0 h-7 w-7 opacity-90"
        style={{
          background: "linear-gradient(225deg, rgba(0,0,0,0.25) 50%, transparent 50%)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%)",
        }}
        aria-hidden
      />

      {/* Spine */}
      <div
        className="absolute inset-y-0 left-0 w-3"
        style={{
          background: `linear-gradient(to right, ${shade(accent, -50)}, ${accent} 55%, ${shade(accent, -30)})`,
        }}
        aria-hidden
      />
      <div className="absolute inset-y-0 left-[3px] w-px bg-white/25" aria-hidden />

      <div className="relative z-10 flex h-full flex-col p-5 pl-7">
        <span className="font-mono text-xs text-white/60">{String(index + 1).padStart(2, "0")}</span>

        {project.logo && (
          <div className="flex flex-1 items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/95 p-3 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.logo} alt="" className="h-full w-full object-contain" />
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2">
            
          <h3 className="text-lg font-bold leading-snug tracking-tight text-white sm:text-xl">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-white/70">{project.tagline}</p>
          <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-white/90 transition-transform duration-300 group-hover:translate-x-1">
            Open Book
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </div>
  )
}

export function ProjectGridCard({ project, index }: { project: Project; index: number }) {
  const accent = project.accent ?? "#0071e3"

  return (
    <Link
      href={`/projects/${project.id}`}
      // Hand the modal this card's rect so the book opens from exactly here.
      // Measured off the Link, not the cover: the cover is mid-hover-rotation on
      // click, so its bounding box is the rotated one.
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        setBookOrigin({ top: r.top, left: r.left, width: r.width, height: r.height, index })
      }}
      className="group relative block aspect-[2/3] w-full [perspective:1400px]"
    >
      {/* Stacked pages peeking out from behind the cover */}
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl bg-[#e7e1d3]" aria-hidden />
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-[#f1ede0]" aria-hidden />

      {/* Cover — swings open on its spine on hover */}
      <div
        className="relative z-10 h-full w-full origin-left transform-3d transition-transform duration-500 ease-out group-hover:[transform:rotateY(-16deg)]"
        style={{ boxShadow: "0 1px 2px 0 rgba(0,0,0,0.06)" }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 18px 45px -10px ${accent}60`)}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0,0,0,0.06)")}
      >
        <BookCoverFace project={project} index={index} />
      </div>
    </Link>
  )
}
