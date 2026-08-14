"use client"

import { sendEmail, type SendEmailState } from "@/app/actions/send-email"
import { Reveal } from "@/components/ui/reveal"
import { ArrowLeft, CheckCircle, Loader2, Send } from "lucide-react"
import Link from "next/link"
import { useActionState } from "react"

const socials = [
  {
    label: "GitHub",
    handle: "@KyleReginaldo",
    href: "https://github.com/KyleReginaldo",
    icon: (
      <svg viewBox="0 0 438.549 438.549" className="h-4 w-4" fill="currentColor">
        <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    handle: "kyle-dennis-reginaldo",
    href: "https://www.linkedin.com/in/kyle-dennis-reginaldo-a0852a2a2",
    icon: (
      <svg viewBox="0 0 28.87 28.87" className="h-4 w-4" fill="none">
        <rect width="28.87" height="28.87" rx="6.48" fill="#0b86ca" />
        <path d="M8 12h3v9.68H8zm1.53-4.81a1.74 1.74 0 1 1-1.74 1.75 1.74 1.74 0 0 1 1.74-1.75M12.92 12h2.89v1.32a3.16 3.16 0 0 1 2.85-1.56c3 0 3.61 2 3.61 4.61v5.31h-3V17c0-1.12 0-2.57-1.56-2.57s-1.8 1.22-1.8 2.48v4.79h-3z" fill="#fff" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    handle: "+63 992 318 9664",
    href: "https://wa.me/639923189664",
    icon: (
      <svg viewBox="0 0 175.216 175.552" className="h-4 w-4">
        <path fill="#25d366" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z" />
        <path fill="#fff" fillRule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    handle: "kyle.dennis.26",
    href: "https://www.facebook.com/kyle.dennis.26",
    icon: (
      <svg viewBox="0 0 1024 1024" className="h-4 w-4" fill="none">
        <rect width="1024" height="1024" rx="160" fill="#1877f2" />
        <path d="M711.3 660 734 512H592V415.957C592 375.467 611.835 336 675.437 336H740V210s-58.592-10-114.611-10C508.439 200 432 270.88 432 399.2V512H302v148h130v357.778a517.396 517.396 0 0 0 160 0V660z" fill="#fff" />
      </svg>
    ),
  },
]

const initialState: SendEmailState = { status: "idle" }

export default function ContactPage() {
  const [state, action, pending] = useActionState(sendEmail, initialState)

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-14 px-6 py-24">
      <Link
        href="/"
        className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <Reveal className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-emerald-500">Available for work</span>
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">{"Let's build something."}</h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            Open to freelance projects, full-time roles, and collaborations. If you have an idea or an
            opportunity, I would love to hear about it.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
          Send a message
        </p>

        {state.status === "success" ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle className="h-6 w-6 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold">Message sent!</p>
              <p className="text-sm text-muted-foreground">
                Thanks for reaching out. I will get back to you within 24 hours.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="text-xs text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Send another
            </button>
          </div>
        ) : (
          <form action={action} className="overflow-hidden rounded-3xl border border-border bg-card">
            <div className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <div className="flex flex-col gap-1 px-4 py-3.5">
                <label htmlFor="name" className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Smith"
                  disabled={pending}
                  className="bg-transparent text-sm placeholder:text-muted-foreground/30 focus:outline-none disabled:opacity-50"
                />
              </div>
              <div className="flex flex-col gap-1 px-4 py-3.5">
                <label htmlFor="email" className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                  Your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  disabled={pending}
                  className="bg-transparent text-sm placeholder:text-muted-foreground/30 focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 border-t border-border px-4 py-3.5">
              <label htmlFor="message" className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Hi Kyle, I have a project I would like to discuss..."
                disabled={pending}
                className="resize-none bg-transparent text-sm leading-relaxed placeholder:text-muted-foreground/30 focus:outline-none disabled:opacity-50"
              />
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              {state.status === "error" ? (
                <p className="text-xs text-red-400">{state.message}</p>
              ) : (
                <p className="text-xs text-muted-foreground/40">
                  Replies go to your email
                </p>
              )}
              <button
                type="submit"
                disabled={pending}
                className="flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {pending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
                {pending ? "Sending..." : "Send message"}
              </button>
            </div>
          </form>
        )}
      </Reveal>

      <Reveal delay={0.15} className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
          Also reachable on
        </p>
        <div className="divide-y divide-border border-t border-border">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5 py-4"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center">{s.icon}</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{s.label}</p>
                <p className="truncate text-xs text-muted-foreground">{s.handle}</p>
              </div>
              <ArrowLeft className="h-3.5 w-3.5 rotate-180 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          ))}
        </div>
      </Reveal>
    </main>
  )
}
