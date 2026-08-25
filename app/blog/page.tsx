import { blogPosts } from "@/lib/data/blog"
import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

const TITLE = "Blog — Flutter, Architecture & Deployment Notes"
const DESCRIPTION =
  "Practical writing on Flutter development: clean architecture, app-store publishing, and shipping production-ready mobile apps."

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <header className="mb-14">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Writing</span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Blog</h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          Notes from building production Flutter apps — architecture decisions, deployment steps, and things I wish
          someone had told me earlier.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.coverAlt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{ backgroundColor: post.accent }}
                aria-hidden
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    style={{ backgroundColor: `${post.accent}14`, color: post.accent }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground">{post.title}</h2>
              <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
                <span>
                  {formatDate(post.date)} · {post.readTime}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
