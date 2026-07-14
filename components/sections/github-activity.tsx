"use client"

import { BookMarked, GitFork, Star } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
type GridDay = Contribution | null
type Week = GridDay[]

type GithubUser = {
  public_repos: number
  followers: number
  html_url: string
}

type GithubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
}

const LEVEL_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const GITHUB_USER = "KyleReginaldo"

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

export function GithubActivity() {
  const [weeks, setWeeks] = useState<Week[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [user, setUser] = useState<GithubUser | null>(null)
  const [repos, setRepos] = useState<GithubRepo[]>([])

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`)
      .then((r) => r.json())
      .then((data) => {
        const contributions: Contribution[] = data.contributions
        setWeeks(buildGrid(contributions))
        setTotal(contributions.reduce((s, c) => s + c.count, 0))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })

    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then((r) => r.json())
      .then(setUser)
      .catch(() => {})

    // Approximates "pinned repos" via most-recently-active public repos —
    // true pinned repos require the GitHub GraphQL API and an auth token.
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6`)
      .then((r) => r.json())
      .then((data) => (Array.isArray(data) ? setRepos(data) : []))
      .catch(() => {})
  }, [])

  const monthCols = new Map<number, string>()
  let lastMonth = -1
  weeks.forEach((week, col) => {
    const firstDay = week.find((d) => d !== null)
    if (firstDay) {
      const m = new Date(firstDay.date + "T00:00:00").getMonth()
      if (m !== lastMonth) {
        monthCols.set(col, MONTHS[m])
        lastMonth = m
      }
    }
  })

  return (
    <section id="github" className="relative scroll-mt-14 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl mx-auto text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">GitHub Activity</p>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Code I ship, in public.</h2>
        </motion.div>

        {user && (
          <div className="mb-8 grid grid-cols-3 gap-4 sm:max-w-md">
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-xl font-bold">{user.public_repos}</p>
              <p className="text-[11px] text-muted-foreground">Public Repos</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-xl font-bold">{user.followers}</p>
              <p className="text-[11px] text-muted-foreground">Followers</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 text-center">
              <p className="text-xl font-bold">{total.toLocaleString()}</p>
              <p className="text-[11px] text-muted-foreground">Contributions</p>
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-border bg-card px-5 py-5">
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

                <div className="flex">
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

                  <div className="flex" style={{ gap: 2 }}>
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col" style={{ gap: 2 }}>
                        {Array.from({ length: 7 }, (_, di) => {
                          const day = week[di] ?? null
                          return (
                            <div
                              key={di}
                              title={day ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}` : undefined}
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

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground/50">Less</span>
                    {LEVEL_COLORS.map((color, i) => (
                      <div key={i} style={{ width: 10, height: 10, borderRadius: 2, backgroundColor: color }} />
                    ))}
                    <span className="text-[10px] text-muted-foreground/50">More</span>
                  </div>
                  <a
                    href={`https://github.com/${GITHUB_USER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground/60 transition-colors hover:text-foreground"
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {repos.length > 0 && (
          <div className="mt-8">
            <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
              <BookMarked className="h-3.5 w-3.5" /> Recently active repositories
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground/20"
                >
                  <p className="truncate text-sm font-medium">{repo.name}</p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {repo.description ?? "No description provided."}
                  </p>
                  <div className="mt-auto flex items-center gap-3 pt-1 text-[11px] text-muted-foreground/70">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" /> {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
