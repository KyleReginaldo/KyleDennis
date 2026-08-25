import { BlogContent } from "@/components/sections/blog-content"
import { blogPosts, getBlogPost } from "@/lib/data/blog"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const SITE_URL = "https://kyle-reginaldo.vercel.app"
const AUTHOR = "Kyle Reginaldo"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  const url = `${SITE_URL}/blog/${post.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: url },
    authors: [{ name: AUTHOR, url: SITE_URL }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      authors: [AUTHOR],
      tags: post.tags,
      images: [{ url: post.coverImage, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) notFound()

  const url = `${SITE_URL}/blog/${post.slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
    publisher: { "@type": "Person", name: AUTHOR, url: SITE_URL },
  }

  return (
    <article className="mx-auto max-w-2xl px-6 pb-24 pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to blog
      </Link>

      <div className="mb-5 flex flex-wrap gap-2">
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

      <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {post.readTime}
        </span>
      </div>

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
        <Image src={post.coverImage} alt={post.coverAlt} fill sizes="(min-width: 768px) 672px, 100vw" priority className="object-cover" />
      </div>

      <div className="mt-10">
        <BlogContent blocks={post.content} accent={post.accent} />
      </div>

      <div className="mt-14 rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">Building a Flutter app and want a second pair of eyes on it?</p>
        <Link
          href="/contact"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Get in touch <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
        </Link>
      </div>
    </article>
  )
}
