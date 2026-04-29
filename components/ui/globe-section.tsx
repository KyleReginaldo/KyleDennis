"use client"

import { useEffect, useState } from "react"

type Contribution = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

type GridDay = Contribution | null
type Week = GridDay[]

const LEVEL_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function buildGrid(contributions: Contribution[]): Week[] {
  const first = new Date(contributions[0].date + "T00:00:00")
  const startPad = first.getDay()
  const padded: GridDay[] = [...Array(startPad).fill(null), ...contributions]
  const weeks: Week[] = []
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, Math.min(i + 7, padded.length)))
  }
  const last = weeks[weeks.length - 1]
  while (last.length < 7) last.push(null)
  return weeks
}

export function GlobeSection() {
  const [weeks, setWeeks] = useState<Week[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/KyleReginaldo?y=last")
      .then(r => r.json())
      .then(data => {
        const contributions: Contribution[] = data.contributions
        setWeeks(buildGrid(contributions))
        setTotal(contributions.reduce((s, c) => s + c.count, 0))
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  // Compute which columns get a month label
  const monthCols = new Map<number, string>()
  let lastMonth = -1
  weeks.forEach((week, col) => {
    const firstDay = week.find(d => d !== null)
    if (firstDay) {
      const m = new Date(firstDay.date + "T00:00:00").getMonth()
      if (m !== lastMonth) {
        monthCols.set(col, MONTHS[m])
        lastMonth = m
      }
    }
  })

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-left">
        <h2 className="text-lg font-semibold">Contributions</h2>
        <p className="text-sm text-muted-foreground">
          GitHub activity over the past year.
        </p>
      </div>

      <div className="rounded-2xl border border-muted-foreground/20 px-5 py-4">
        {loading ? (
          <div className="flex h-28 items-center justify-center">
            <span className="text-xs text-muted-foreground/50">Loading…</span>
          </div>
        ) : error ? (
          <div className="flex h-28 items-center justify-center">
            <span className="text-xs text-muted-foreground/50">Could not load contributions.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-fit">
              {/* Month labels */}
              <div className="mb-1 flex" style={{ paddingLeft: 30 }}>
                {weeks.map((_, col) => (
                  <div key={col} className="flex-shrink-0" style={{ width: 12 }}>
                    {monthCols.has(col) && (
                      <span className="select-none whitespace-nowrap text-[10px] text-muted-foreground/60">
                        {monthCols.get(col)}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="flex">
                {/* Day labels */}
                <div className="mr-1.5 flex flex-col" style={{ gap: 2 }}>
                  {DAYS.map((day, i) => (
                    <div key={day} className="flex items-center justify-end" style={{ height: 10 }}>
                      {i % 2 === 1 ? (
                        <span className="w-7 select-none text-right text-[9px] leading-none text-muted-foreground/50">
                          {day}
                        </span>
                      ) : (
                        <span className="w-7" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Tiles */}
                <div className="flex" style={{ gap: 2 }}>
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col" style={{ gap: 2 }}>
                      {Array.from({ length: 7 }, (_, di) => {
                        const day = week[di] ?? null
                        return (
                          <div
                            key={di}
                            title={
                              day
                                ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`
                                : undefined
                            }
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 2,
                              backgroundColor: day ? LEVEL_COLORS[day.level] : "transparent",
                            }}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer row */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground/50">Less</span>
                  {LEVEL_COLORS.map((color, i) => (
                    <div
                      key={i}
                      style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: color }}
                    />
                  ))}
                  <span className="text-[10px] text-muted-foreground/50">More</span>
                </div>
                <span className="text-xs text-muted-foreground/60">
                  {total.toLocaleString()} contributions this year
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <a
        href="https://github.com/KyleReginaldo"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground/60 transition-colors hover:text-foreground"
      >
        View on GitHub →
      </a>
    </div>
  )
}
