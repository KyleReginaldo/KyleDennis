"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Mail } from "lucide-react"
import Link from "next/link"

const EMAIL = "kyledennis099@gmail.com"

export function ContactCard() {
  return (
    <div className="w-full max-w-xs space-y-2.5">
      <div className="overflow-hidden rounded-xl border border-muted-foreground/20 bg-muted/20">
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Mail className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
              Get in touch
            </p>
            <p className="truncate font-mono text-sm">{EMAIL}</p>
          </div>
        </div>

        <div className="flex border-t border-muted-foreground/10">
          <a
            href={`mailto:${EMAIL}`}
            className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-primary transition-colors hover:bg-muted/40"
          >
            <Mail className="h-3.5 w-3.5" />
            Send email
          </a>

          <div className="w-px bg-muted-foreground/10" />

          <a
            href="/kyle_reginaldo.pdf"
            download
            className="flex flex-1 items-center justify-center gap-1.5 py-2.5 text-xs text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
          >
            <Download className="h-3.5 w-3.5" />
            Download CV
          </a>
        </div>
      </div>

      <Button asChild variant="outline" size="sm" className="w-full">
        <Link href="/contact">
          More ways to reach me
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}
