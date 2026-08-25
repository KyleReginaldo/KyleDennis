"use client"

import { blogPosts } from "@/lib/data/blog"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"

const EASE = [0.16, 1, 0.3, 1] as const

export function BlogTeaser() {
  const posts = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)

  return (
    <section id="blog" className="relative scroll-mt-14 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Writing</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">From the blog</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Notes on Flutter architecture, shipping to the Play Store, and using AI coding agents without letting
              them make a mess of your project.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.coverAlt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={{ backgroundColor: post.accent }} aria-hidden />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className="text-[11px] font-medium" style={{ color: post.accent }}>
                    {post.tags[0]}
                  </span>
                  <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
                    {post.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
                    <span>{post.readTime}</span>
                    <ArrowUpRight className="h-4 w-4 transition-colors group-hover:text-foreground" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
