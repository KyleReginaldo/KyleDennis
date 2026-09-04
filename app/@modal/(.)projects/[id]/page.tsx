"use client"

import { shade } from "@/components/animata/card/case-study-card"
import { ProjectCaseStudy } from "@/components/sections/project-case-study"
import { BookCoverFace } from "@/components/sections/project-grid-card"
import { clearBookOrigin, peekBookOrigin, type BookOrigin } from "@/lib/book-transition"
import { projects, type Project } from "@/lib/data/projects"
import * as Dialog from "@radix-ui/react-dialog"
import { ChevronLeft, ChevronRight, XIcon } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useRouter } from "next/navigation"
import { use, useCallback, useEffect, useRef, useState } from "react"

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * The book's own easing. The site's usual `EASE` is heavily front-loaded — at a
 * third of the duration it is already ~85% done, which makes an 800ms flip read
 * as a 300ms snap followed by an imperceptible crawl. A physical cover needs to
 * be pushed, carried, and set down, so this is a gentle ease-in-out instead.
 */
const FLIP_EASE = [0.45, 0.05, 0.25, 1] as const

/**
 * Closing gets its own curve and duration. Reusing the open transition made the
 * close run 840ms + a 50ms delay, and FLIP_EASE spends roughly a third of its
 * time on the last fifth of the rotation — so the cover visibly crawled shut and
 * `router.back()` (gated on the slowest exit) fired long after it looked done.
 * A shorter, purely decelerating curve lands it cleanly.
 */
const CLOSE_EASE = [0.4, 0, 0.2, 1] as const
const CLOSE_S = 0.46

const OPEN_S = 0.78
const COVER_S = 0.8
const TURN_S = 0.58

/**
 * The page aspect deliberately matches the grid card's `aspect-[2/3]`. That is
 * what lets the whole book scale uniformly out of the clicked card — a page of
 * any other shape would need scaleX ≠ scaleY and would visibly stretch the cover
 * art and its text through the flip.
 */
const PAGE_ASPECT = 2 / 3

/**
 * A real book does not get bigger because you bought a bigger monitor. Without
 * this the page grew with the viewport, so on a large display you got an ~800px
 * wide text column with a couple of paragraphs floating in an ocean of blank
 * paper. Capping the page keeps the measure readable and fills pages properly.
 */
const MAX_PAGE_H = 820

type Geometry = {
  /** Pages visible when open: 2 = spread with a centre spine, 1 = single page. */
  spread: 1 | 2
  pageW: number
  pageH: number
  frameL: number
  frameT: number
  /** transform-origin x as a % of frame width — the closed cover's own centre. */
  originX: number
  /** Page margin. The column gap is twice this, so columns land exactly inside
   *  each page's text box and the gutter falls on the spine. */
  pad: number
  contentW: number
  contentH: number
}

const FOOTER_H = 30

function measure(): Geometry {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const spread: 1 | 2 = vw >= 640 ? 2 : 1 // Tailwind `sm`

  let pageH = Math.min(vh * 0.86, MAX_PAGE_H)
  let pageW = pageH * PAGE_ASPECT
  if (pageW * spread > vw * 0.94) {
    pageW = (vw * 0.94) / spread
    pageH = pageW / PAGE_ASPECT
  }

  const pad = Math.round(Math.min(44, Math.max(16, pageW * 0.085)))
  return {
    spread,
    pageW,
    pageH,
    frameL: (vw - pageW * spread) / 2,
    frameT: (vh - pageH) / 2,
    // Spread: the closed cover is the right half, hinged on the centre spine → 75%.
    // Single: the cover fills the frame, hinged on its own left edge → 50%.
    originX: spread === 2 ? 75 : 50,
    pad,
    contentW: pageW - pad * 2,
    contentH: pageH - pad * 2 - FOOTER_H,
  }
}

/**
 * The transform that puts the *closed cover* exactly on top of the clicked card.
 * Scaling happens about the cover's own centre, so one uniform scale plus a
 * translate is enough — no width/height animation, nothing that triggers layout
 * per frame.
 */
function closedTransform(g: Geometry, origin: BookOrigin) {
  const originAbsX = g.frameL + g.pageW * g.spread * (g.originX / 100)
  const originAbsY = g.frameT + g.pageH / 2
  return {
    x: origin.left + origin.width / 2 - originAbsX,
    y: origin.top + origin.height / 2 - originAbsY,
    scale: origin.width / g.pageW,
    opacity: 1,
  }
}

/**
 * Pagination rules. On a spread the inside front cover faces column 0, exactly
 * like a real book, so leaf 0 shows [inside-cover, page 1] and every leaf after
 * it shows two content columns.
 */
const leftColOf = (leaf: number, isSpread: boolean) =>
  !isSpread ? leaf : leaf === 0 ? -1 : leaf * 2 - 1

const leafCount = (cols: number, isSpread: boolean) =>
  !isSpread ? Math.max(1, cols) : cols <= 1 ? 1 : 1 + Math.ceil((cols - 1) / 2)

const PAPER = "linear-gradient(to left, #efe9da 0%, #f7f3e9 42%)"

/** The cover's reverse face: the inside front cover of the open book. */
function TitlePage({ project, pad }: { project: Project; pad: number }) {
  const accent = project.accent ?? "#0071e3"
  const facts = [
    ["Role", project.role],
    ["Duration", project.duration],
    ["Team", project.teamSize],
  ].filter(([, v]) => v) as [string, string][]

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-l-2xl border border-black/10"
      style={{ background: PAPER, padding: pad }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-12"
        style={{ background: "linear-gradient(to left, rgba(0,0,0,0.18), transparent)" }}
      />

      <div className="relative">
        {project.logo && (
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white p-2.5 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.logo} alt="" className="h-full w-full object-contain" />
          </span>
        )}
        <p className="mt-6 font-mono text-xs tracking-[0.25em]" style={{ color: shade(accent, -40) }}>
          {project.categories[0]}
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
          {project.title}
        </h2>
        <p className="mt-4 max-w-sm text-base leading-relaxed text-neutral-600">{project.tagline}</p>
      </div>

      {facts.length > 0 && (
        <dl className="relative flex flex-col gap-3 border-t border-neutral-900/10 pt-6">
          {facts.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-4">
              <dt className="font-mono text-xs tracking-[0.18em] text-neutral-500">{label.toUpperCase()}</dt>
              <dd className="text-sm font-medium text-neutral-800">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}

/** A blank sheet, used only while a page is physically turning. */
function Leaf({ side }: { side: "front" | "back" }) {
  return (
    <div
      className="absolute inset-0 [backface-visibility:hidden]"
      style={{
        background: PAPER,
        borderRadius: side === "front" ? "0 16px 16px 0" : "16px 0 0 16px",
        boxShadow:
          side === "front"
            ? "inset 14px 0 24px -14px rgba(0,0,0,0.28), 0 18px 40px -14px rgba(0,0,0,0.35)"
            : "inset -14px 0 24px -14px rgba(0,0,0,0.28), 0 18px 40px -14px rgba(0,0,0,0.35)",
        transform: side === "back" ? "rotateY(180deg)" : undefined,
      }}
    />
  )
}

export default function ProjectModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = projects.find((p) => p.id === id)
  const router = useRouter()
  const reduced = useReducedMotion() ?? false
  const [open, setOpen] = useState(true)

  // Peeked (not consumed) so React's dev double-render sees the same rect twice;
  // released on unmount so it can't leak into an open that didn't come from a card.
  const [origin] = useState(peekBookOrigin)
  useEffect(() => clearBookOrigin, [])

  // window-dependent, so it can only be measured after mount. Re-measured on
  // resize/orientation change: at rest the frame sits at scale 1, so updating
  // its box is a plain relayout with nothing mid-flight.
  const [geo, setGeo] = useState<Geometry | null>(null)
  useEffect(() => {
    const update = () => setGeo(measure())
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const flowRef = useRef<HTMLDivElement>(null)
  const [cols, setCols] = useState(1)
  const [leaf, setLeaf] = useState(0)
  const [turn, setTurn] = useState<{ id: number; dir: 1 | -1 } | null>(null)

  const isSpread = geo?.spread === 2
  const leaves = leafCount(cols, isSpread)

  // How many columns the case study broke into. `width: max-content` on a
  // multi-column box makes it exactly n*(contentW+gap)-gap wide, so the count
  // divides out. Re-measured on resize because images change the flow.
  useEffect(() => {
    const el = flowRef.current
    if (!el || !geo) return
    const step = geo.pageW // contentW + gap === pageW by construction
    const recount = () => setCols(Math.max(1, Math.round((el.scrollWidth + geo.pad * 2) / step)))
    recount()
    const ro = new ResizeObserver(recount)
    ro.observe(el)
    return () => ro.disconnect()
  }, [geo])

  // Images finishing later can shrink the book; never strand the reader past the end.
  useEffect(() => {
    setLeaf((l) => Math.min(l, Math.max(0, leaves - 1)))
  }, [leaves])

  const go = useCallback(
    (dir: 1 | -1) => {
      setLeaf((l) => {
        const next = l + dir
        if (next < 0 || next > leaves - 1) return l
        // The turning sheet covers the page being replaced for the first half of
        // its arc, so the index can change immediately — the swap happens behind
        // the paper and is never visible.
        if (!reduced) setTurn({ id: Date.now(), dir })
        return next
      })
    },
    [leaves, reduced],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1) }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(-1) }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  const index = origin?.index ?? projects.findIndex((p) => p.id === id)

  // The cover and the first content page occupy the same slot — the cover swings off it.
  const slot = isSpread ? { left: "50%", width: "50%" } : { left: 0, width: "100%" }

  // No rect means this open didn't come from a card (a soft nav from elsewhere),
  // so there is nothing to fly out of — settle in place instead.
  const closed =
    geo && origin ? closedTransform(geo, origin) : { x: 0, y: 0, scale: 0.92, opacity: 0 }

  const leftCol = leftColOf(leaf, !!isSpread)
  const atStart = leaf === 0
  const atEnd = leaf >= leaves - 1

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {open && project && (
        <Dialog.Root open modal onOpenChange={(v) => !v && setOpen(false)}>
          <Dialog.Portal forceMount>
            {/* Pagination rules for the case study. Only the container is styled —
                the content itself is untouched; these just stop cards, figures and
                mockups from being sliced down the middle by a column break. */}
            <style href="book-pagination" precedence="default">{`
              /* Nothing may be wider than its column, or it bleeds across the
                 spine onto the facing page.
                 NOT max-width:100% — inside a multi-column box a percentage
                 resolves against the whole multicol content box (the full flow,
                 2000px+), not against one column, so flex containers happily
                 stayed 684px wide in a 428px column. The cap has to be the
                 column width in absolute units. min-width:0 is what lets flex
                 children actually give up their intrinsic width. */
              .book-flow * { max-width: var(--book-col); min-width: 0; }

              /* Keep atomic things whole, but let *sections* break: protecting
                 whole sections pushed each one to a fresh column and left half
                 the page empty. */
              .book-flow img, .book-flow video, .book-flow svg,
              .book-flow figure, .book-flow table { break-inside: avoid-column; }
              .book-flow h1, .book-flow h2, .book-flow h3, .book-flow h4 { break-after: avoid-column; }

              /* No vertical scrolling anywhere in the book — it paginates instead.
                 Horizontal snap carousels are content widgets and stay usable. */
              .book-flow [class*="overflow-y"] { overflow-y: visible !important; }
              .book-flow * { overflow-anchor: none; }

              /* Screenshots become a small grid inside the book. A horizontal
                 scroller cannot be paginated — it is one tall unbreakable block,
                 which is what left pages half empty — and panning it by touch
                 inside a transformed, column-fragmented page is unreliable. Web
                 slides were also sized w-[min(75vw,340px)]: a *viewport* unit,
                 so on a phone each slide filled the column and there was nothing
                 left to pan. A grid breaks across columns and needs no gesture. */
              .book-flow [data-rail] {
                display: block !important;
                overflow: visible !important;
                padding-bottom: 0 !important;
                font-size: 0;          /* kills whitespace between inline-blocks */
                margin-right: -10px;   /* absorbs the last item's gutter so the
                                          right edge stays flush with the text */
              }
              /* inline-block, NOT grid or wrapped flex: a grid container is
                 monolithic in multi-column layout — Chrome will not fragment it
                 across columns — so a grid taller than the page silently clipped
                 139px of content. Inline-level boxes flow and break between rows
                 exactly like text, so a long gallery spills onto the next page.

                 Widths are percentages, not computed pixels: the case study adds
                 its own px-6, so a width derived from the page column was always
                 ~48px too wide and only ever fitted one item per row. A
                 percentage resolves against the real container. */
              .book-flow [data-rail] > * {
                display: inline-block !important;
                vertical-align: top;
                font-size: 1rem;
                margin: 0 10px 12px 0;
              }
              .book-flow [data-rail="app"] > * { width: calc(33.333% - 10px) !important; }
              .book-flow [data-rail="web"] > * { width: calc(50% - 10px) !important; }

              /* Captions run to one or two lines, which pushed each browser shot
                 to a different height and left the row ragged. Fixing the caption
                 box makes every frame in a row start on the same line. */
              .book-flow [data-rail="web"] > * > div:first-child {
                height: 3.6em;
                overflow: hidden;
              }
              .book-flow [data-rail="web"] h5 {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
              /* one line, so it can never push the headline out of the box */
              .book-flow [data-rail="web"] > * > div:first-child p {
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }

              /* A single phone page is far too narrow for two browser shots side
                 by side — the captions truncated to one word. Give web shots the
                 full measure there and put the phones two-up instead of three. */
              @media (max-width: 639px) {
                .book-flow [data-rail="web"] > * { width: 100% !important; }
                .book-flow [data-rail="app"] > * { width: calc(50% - 10px) !important; }
                .book-flow [data-rail="web"] > * > div:first-child { height: auto; }
              }

              /* the rail's arrows scroll nothing once it is a gallery */
              .book-flow button[aria-label^="Scroll"] { display: none !important; }

              /* Backstop: nothing may exceed one page, or the column algorithm
                 has nowhere to put it. */
              .book-flow [data-rail] > *, .book-flow img, .book-flow svg { max-height: var(--book-h); }

              /* A section label stranded at the foot of a page with its figure
                 on the next one is what left pages looking half-empty. */
              .book-flow [class*="uppercase"] { break-after: avoid-column; }
            `}</style>

            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: CLOSE_S, ease: CLOSE_EASE } }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              onEscapeKeyDown={() => setOpen(false)}
              onPointerDownOutside={(e) => {
                if (e.target instanceof Element && e.target.closest("[data-hero-video-dialog]")) {
                  e.preventDefault()
                  return
                }
                setOpen(false)
              }}
            >
              {/* Perspective lives here: a fixed, non-scrolling ancestor whose
                  centre is the viewport centre, which is also the book's centre.
                  pointer-events-none lets pointer-downs on the backdrop reach the
                  overlay so Radix still reports them as outside. */}
              <div className="pointer-events-none fixed inset-0 z-50 [perspective:2200px]">
                <Dialog.Title className="sr-only">{project.title}</Dialog.Title>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="pointer-events-auto fixed right-4 top-4 z-[70] flex h-10 w-10 items-center justify-center rounded-full bg-background/85 text-muted-foreground shadow-lg backdrop-blur transition-colors hover:text-foreground"
                >
                  <XIcon className="h-5 w-5" />
                </button>

                {geo && (
                  <motion.div
                    className="pointer-events-auto absolute"
                    style={{
                      left: geo.frameL,
                      top: geo.frameT,
                      width: geo.pageW * geo.spread,
                      height: geo.pageH,
                      transformOrigin: `${geo.originX}% 50%`,
                      transformStyle: "preserve-3d",
                    }}
                    initial={reduced ? false : closed}
                    animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    exit={
                      reduced
                        ? { opacity: 0, transition: { duration: 0.15 } }
                        : { ...closed, transition: { duration: CLOSE_S, ease: CLOSE_EASE } }
                    }
                    transition={{ duration: reduced ? 0.2 : OPEN_S, ease: FLIP_EASE }}
                  >
                    {/* Everything except the cover. On close this fades out fast so
                        the only thing still moving is the cover swinging shut — the
                        beige paper used to stay fully opaque all the way down to the
                        card and read as a hard slab lagging behind the animation. */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ transformStyle: "preserve-3d" }}
                      exit={{ opacity: 0, transition: { duration: 0.18, ease: "linear" } }}
                    >
                    {/* Page-block thickness, mirroring the grid card's stacked sheets */}
                    <div aria-hidden className="absolute rounded-r-2xl bg-[#ddd6c4]"
                      style={{ ...slot, top: 0, bottom: 0, transform: "translate(13px, 10px)" }} />
                    <div aria-hidden className="absolute rounded-r-2xl bg-[#e9e3d4]"
                      style={{ ...slot, top: 0, bottom: 0, transform: "translate(8px, 6px)" }} />
                    <div aria-hidden className="absolute rounded-r-2xl bg-[#f3efe3]"
                      style={{ ...slot, top: 0, bottom: 0, transform: "translate(4px, 3px)" }} />

                    {/* Left page surface (spread only) */}
                    {isSpread && (
                      <div aria-hidden className="absolute rounded-l-2xl border border-black/10"
                        style={{ left: 0, width: "50%", top: 0, bottom: 0, background: PAPER }} />
                    )}

                    {/* Right page surface. Settles flat as the cover clears it. */}
                    <motion.div
                      className="absolute rounded-r-2xl border border-black/10"
                      style={{
                        ...slot,
                        top: 0,
                        bottom: 0,
                        background: PAPER,
                        transformOrigin: "0% 50%",
                        transformStyle: "preserve-3d",
                        boxShadow: "0 30px 80px -20px rgba(0,0,0,0.45)",
                      }}
                      initial={reduced ? false : { rotateY: -8 }}
                      animate={{ rotateY: 0 }}
                      transition={{ duration: reduced ? 0.2 : 0.72, delay: reduced ? 0 : 0.12, ease: FLIP_EASE }}
                    />

                    {/* The typeset block. One multi-column flow spanning the whole
                        spread: the column gap lands exactly on the spine, so a
                        "page" is a column and turning is a translate — no scrolling
                        anywhere in the book. */}
                    <motion.div
                      className="absolute overflow-hidden"
                      style={{
                        left: geo.pad,
                        top: geo.pad,
                        width: isSpread ? geo.pageW * 2 - geo.pad * 2 : geo.contentW,
                        height: geo.contentH,
                      }}
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.16 } }}
                      transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : 0.2, ease: "linear" }}
                    >
                      <motion.div
                        ref={flowRef}
                        className="book-flow"
                        style={
                          {
                            height: geo.contentH,
                            width: "max-content",
                            columnWidth: geo.contentW,
                            columnGap: geo.pad * 2,
                            columnFill: "auto",
                            "--book-col": `${geo.contentW}px`,
                            "--book-h": `${geo.contentH}px`,
                          } as React.CSSProperties
                        }
                        animate={{ x: -leftCol * geo.pageW }}
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { duration: TURN_S, ease: FLIP_EASE, delay: TURN_S * 0.34 }
                        }
                      >
                        <ProjectCaseStudy project={project} />
                      </motion.div>
                    </motion.div>

                    {/* Gutter shadow on the spine */}
                    <div aria-hidden className="pointer-events-none absolute inset-y-0 z-20 w-12"
                      style={{
                        left: isSpread ? "50%" : 0,
                        background: "linear-gradient(to right, rgba(0,0,0,0.22), transparent)",
                      }} />
                    {isSpread && (
                      <div aria-hidden className="pointer-events-none absolute inset-y-0 z-20 w-12"
                        style={{
                          right: "50%",
                          background: "linear-gradient(to left, rgba(0,0,0,0.16), transparent)",
                        }} />
                    )}

                    {/* Folio numbers, in the outer bottom corners like a real book */}
                    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between font-mono text-[11px] text-neutral-500"
                      style={{ height: FOOTER_H + geo.pad, paddingLeft: geo.pad, paddingRight: geo.pad, paddingBottom: geo.pad / 2 }}>
                      <span>{isSpread && leftCol >= 0 ? leftCol + 1 : ""}</span>
                      <span>{leftCol + 2 <= cols ? (isSpread ? leftCol + 2 : leftCol + 1) : ""}</span>
                    </div>
                    </motion.div>

                    {/* The sheet that physically turns. Blank on both faces: it is
                        only visible while it is edge-on-ish, and it hides the column
                        swap happening underneath it.
                        ponytail: blank leaf, not content-bearing — carrying the real
                        columns on it needs a second render of the case study; do that
                        only if the turn ever needs to be readable mid-arc. */}
                    <AnimatePresence>
                      {turn && (
                        <motion.div
                          key={turn.id}
                          className="absolute z-[25]"
                          style={{ ...slot, top: 0, bottom: 0, transformOrigin: "0% 50%", transformStyle: "preserve-3d" }}
                          initial={{ rotateY: turn.dir > 0 ? 0 : -180 }}
                          animate={{ rotateY: turn.dir > 0 ? -180 : 0 }}
                          transition={{ duration: TURN_S, ease: FLIP_EASE }}
                          onAnimationComplete={() => setTurn(null)}
                        >
                          <Leaf side="front" />
                          <Leaf side="back" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* The cover. Hinged on its own left edge — the centre spine on a
                        spread, the book's left edge on a single page. Once the reader
                        turns past the first leaf it is buried under paper, so it goes. */}
                    <motion.div
                      data-book-cover
                      className="absolute z-30"
                      style={{ ...slot, top: 0, bottom: 0, transformOrigin: "0% 50%", transformStyle: "preserve-3d" }}
                      initial={reduced ? false : { rotateY: 0, opacity: 1 }}
                      animate={{
                        rotateY: -180,
                        // On a single page the cover would end up hanging off the
                        // left of the viewport, so it fades as it goes past flat.
                        opacity: isSpread ? (atStart ? 1 : 0) : [1, 1, 0],
                      }}
                      exit={{
                        rotateY: 0,
                        opacity: 1,
                        transition: {
                          duration: CLOSE_S,
                          ease: CLOSE_EASE,
                          // instant, not a fade: past leaf 0 the cover is hidden, and
                          // fading it back in popped the beige inside-cover into view
                          opacity: { duration: 0 },
                        },
                      }}
                      transition={{
                        duration: reduced ? 0.2 : COVER_S,
                        delay: reduced ? 0 : 0.03,
                        ease: FLIP_EASE,
                        opacity: isSpread
                          ? { duration: 0.3, ease: "linear" }
                          : { duration: reduced ? 0.2 : COVER_S, times: [0, 0.78, 1], ease: "linear" },
                      }}
                    >
                      <div className="absolute inset-0 [backface-visibility:hidden]">
                        <BookCoverFace project={project} index={index} />
                      </div>
                      {/* The inside front cover. Dropped the instant a close starts:
                          it is the beige face, and watching it rotate shut is what
                          looked wrong. Going out, only the accent front face shows. */}
                      <motion.div
                        className="absolute inset-0 [backface-visibility:hidden]"
                        style={{ transform: "rotateY(180deg)" }}
                        exit={{ opacity: 0, transition: { duration: 0 } }}
                      >
                        <TitlePage project={project} pad={geo.pad} />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Reading controls. Chrome, not book content, so they sit outside
                    the 3D frame where nothing can rotate them out of reach. */}
                {geo && leaves > 1 && (
                  <motion.div
                    className="pointer-events-auto absolute left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-background/85 px-2 py-1.5 shadow-lg backdrop-blur"
                    style={{ top: geo.frameT + geo.pageH + 8 }}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.3, delay: reduced ? 0 : 0.6 }}
                  >
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      disabled={atStart}
                      aria-label="Previous page"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="min-w-[4.5rem] text-center font-mono text-xs text-muted-foreground">
                      {leaf + 1} / {leaves}
                    </span>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      disabled={atEnd}
                      aria-label="Next page"
                      className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  )
}
