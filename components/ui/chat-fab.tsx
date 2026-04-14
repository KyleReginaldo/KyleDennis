"use client"

import { Loader2, Send, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function renderInline(line: string) {
  // Split on images, links, bold, italic
  const tokens = line.split(/(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return tokens.map((token, i) => {
    // Inline image ![alt](src)
    const imgMatch = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imgMatch) {
      return (
        <img key={i} src={imgMatch[2]} alt={imgMatch[1]}
          className="mt-2 w-full rounded-xl object-cover" />
      )
    }
    // Link [label](url)
    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const isInternal = linkMatch[2].startsWith("/")
      return (
        <a key={i} href={linkMatch[2]}
          target={isInternal ? "_self" : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          className="font-medium text-primary underline underline-offset-2 hover:text-primary/70"
        >
          {linkMatch[1]}
        </a>
      )
    }
    // Bold **text**
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={i}>{token.slice(2, -2)}</strong>
    }
    // Italic *text*
    if (token.startsWith("*") && token.endsWith("*")) {
      return <em key={i}>{token.slice(1, -1)}</em>
    }
    return token
  })
}

function renderMarkdown(text: string) {
  const lines = text.split("\n")
  return lines.map((line, li) => {
    // Block image — line is only an image tag
    const blockImg = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (blockImg) {
      return (
        <img key={li} src={blockImg[2]} alt={blockImg[1]}
          className="mt-2 w-full rounded-xl border border-muted-foreground/10 object-cover" />
      )
    }
    return (
      <span key={li}>
        {renderInline(line)}
        {li < lines.length - 1 && <br />}
      </span>
    )
  })
}

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

const SUGGESTIONS = [
  "What does Kyle specialize in?",
  "What projects has he shipped?",
  "Is Kyle available for hire?",
  "How do I contact him?",
]

const MAX_CHARS = 1000

export function ChatFab() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content:
            "Hey! I'm Kyle. Feel free to ask me anything — my work, stack, availability, or anything else. Happy to chat!",
        },
      ])
    }
  }, [open, messages.length])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const send = async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        console.error("[chat-fab] API error:", data)
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: `Error: ${data.error ?? "Unknown error"}`,
          },
        ])
        return
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.text ?? "Sorry, something went wrong.",
        },
      ])
    } catch (err) {
      console.error("[chat-fab] Fetch error:", err)
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Network error — please try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  const showSuggestions = messages.length <= 1 && !loading

  return (
    <div className="fixed bottom-8 right-5 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="flex h-[520px] w-[360px] flex-col overflow-hidden rounded-2xl border border-muted-foreground/20 bg-background shadow-2xl shadow-black/50">

          {/* Header */}
          <div className="flex items-center gap-3 border-b border-muted-foreground/10 bg-background px-4 py-3">
            <div className="shrink-0">
              <img
                src="/assets/kyleai.png"
                alt="Kyle Reginaldo"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Chat with Kyle</p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-emerald-500">Online</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.role === "assistant" ? (
                  <div className="flex items-start gap-2.5">
                    <img
                      src="/assets/kyleai.png"
                      alt="Kyle"
                      className="mt-0.5 h-7 w-7 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-[11px] font-medium text-muted-foreground">Kyle Reginaldo</p>
                      <div className="w-full break-words rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm leading-relaxed text-foreground">
                        {renderMarkdown(msg.content)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="max-w-[80%] break-words rounded-2xl rounded-br-sm bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground">
                      {msg.content}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-start gap-2.5">
                <img
                  src="/assets/kyleai.png"
                  alt="Kyle"
                  className="mt-0.5 h-7 w-7 shrink-0 rounded-full object-cover"
                />
                <div className="space-y-1">
                  <p className="text-[11px] font-medium text-muted-foreground">Kyle Reginaldo</p>
                  <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Suggestion chips */}
            {showSuggestions && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-muted-foreground/20 bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-muted-foreground/40 hover:bg-muted hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-muted-foreground/10 p-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); send(input) }
                }}
                placeholder="Type a message..."
                disabled={loading}
                className="flex-1 rounded-xl border border-muted-foreground/20 bg-muted/20 px-3.5 py-2.5 text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-muted-foreground/30 disabled:opacity-50"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background transition-opacity hover:opacity-80 disabled:opacity-30"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between px-1">
              <p className="text-[11px] text-muted-foreground/40">Ask me about programming, my work, or tech!</p>
              <p className="text-[11px] text-muted-foreground/40">{input.length}/{MAX_CHARS}</p>
            </div>
          </div>
        </div>
      )}

      {/* FAB pill button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-full border border-white/10 bg-zinc-900 py-2 pl-2 pr-4 shadow-xl shadow-black/40 ring-1 ring-white/5 transition-all hover:bg-zinc-800 active:scale-95"
      >
        {open ? (
          <>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
              <X className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs font-medium text-white/80">Close</span>
          </>
        ) : (
          <>
            <img
              src="/assets/kyleai.png"
              alt="Kyle"
              className="h-7 w-7 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-xs font-semibold text-white leading-tight">Chat with Kyle</p>
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-white/50">Online</span>
              </div>
            </div>
          </>
        )}
      </button>
    </div>
  )
}
