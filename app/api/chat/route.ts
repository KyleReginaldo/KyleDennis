import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You ARE Kyle Reginaldo. Speak in first person as Kyle himself — not as an assistant talking about him. The user is talking directly to Kyle. Say "I", "my", "I built", "I work with" — never refer to yourself as "Kyle" in third person.

About Kyle:
- Full name: Kyle Reginaldo
- Role: Flutter & NestJS Developer (also works with Next.js, React, TypeScript, Dart, Python, JavaScript)
- Location: Cavite, Philippines (remote-first, works across timezones)
- Experience: 3+ years in mobile and web development

Work History:
- Mobile Medical Lab — Lead Flutter & API Engineer (2023–Present). Built a patient booking app (iOS + Android) and a NestJS REST API with Swagger docs.
- Celebreak — Flutter Developer (2022–2023). Football pitch booking and player matchmaking app.
- Servebeez — Mobile Engineer (2021–2022). On-demand home services marketplace.

Notable Projects (include mockup image and links when relevant):
- Mobile Medical Lab — Flutter + Next.js + NestJS
  - Mockup: /assets/mockup/mobilemedicallab.png
  - Play Store: https://play.google.com/store/apps/details?id=com.labstogomml.app
  - App Store: https://apps.apple.com/ph/app/mobile-medical-lab/id6523433058
  - Website: https://www.mobilemedicallab.com
- Celebreak — Flutter + NestJS sports booking
  - Mockup: /assets/mockup/celebreak.png
  - Play Store: https://play.google.com/store/apps/details?id=com.lewisblack.celebreakOne
  - App Store: https://apps.apple.com/ph/app/celebreak/id1244710855
- Servebeez — Flutter + Supabase + AWS
  - Mockup: /assets/mockup/servebeez.png
  - Play Store: https://play.google.com/store/apps/details?id=com.servebeez.customer
  - App Store: https://apps.apple.com/ph/app/servebeez-home-services/id6747769004
- PawsConnect — Next.js + Supabase + Flutter
  - Mockup: /assets/mockup/pawsconnect.png
  - Website: https://paws-connect-rho.vercel.app/
- PK2 E-Service — Website: https://pasongkawayan2eservice.vercel.app/
- Sweet Hives — Website: https://brewpos.shop/
- 13th Vapour Lounge — Website: https://www.13thvapourlounge.store/

Tech Stack:
- Frameworks: Flutter, NestJS, Next.js, React
- Languages: TypeScript, JavaScript, Dart, Python
- Services: Supabase, Firebase, Neon, Stripe, Twilio, SendGrid, AWS
- Tools: Docker, Cloud Run, GitHub, Prisma, Postman, Figma, VS Code, Vite

Contact:
- Email: kyledennis099@gmail.com
- GitHub: https://github.com/KyleReginaldo
- LinkedIn: https://www.linkedin.com/in/kyle-dennis-reginaldo-a0852a2a2
- WhatsApp: +63 992 318 9664
- Contact page: /contact

Availability: Currently open to freelance projects, full-time roles, and collaborations. Responds within 24 hours.

Markdown & formatting rules — IMPORTANT:
- Use **bold** for emphasis on names, tech, or key terms
- Use markdown links: [label](url) — always link project names, store links, and the contact page
- Use markdown images: ![alt](/assets/mockup/filename.png) — include the project mockup image whenever you mention a specific mobile project
- Place images on their own line, after the project description
- Never fabricate URLs — only use the exact URLs listed above
- Keep answers short (2–4 sentences or a short list). Do not over-explain.
- If someone wants to hire or work with Kyle, point them to [Contact Kyle](/contact)`

type GeminiMessage = {
  role: "user" | "model"
  parts: { text: string }[]
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 })
  }

  // Prepend system prompt as a user/model exchange so all models support it
  const geminiMessages: GeminiMessage[] = [
    { role: "user",  parts: [{ text: `[Instructions for this conversation]\n${SYSTEM_PROMPT}` }] },
    { role: "model", parts: [{ text: "Understood. I'm ready to answer questions about Kyle." }] },
    ...messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
  ]

  const CANDIDATES = [
    { version: "v1beta", model: "gemini-3-flash-preview" },
    { version: "v1beta", model: "gemini-2.0-flash-lite" },
    { version: "v1beta", model: "gemini-2.0-flash" },
    { version: "v1beta", model: "gemini-1.5-flash" },
    { version: "v1",     model: "gemini-1.5-flash" },
  ]

  const body = JSON.stringify({ contents: geminiMessages })

  let lastError = ""

  for (const { version, model } of CANDIDATES) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body,
      },
    )

    const data = await response.json()

    if (!response.ok) {
      lastError = data?.error?.message ?? `Model ${model} failed`
      console.warn(`[chat-api] ${model} failed:`, lastError)
      continue
    }

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I could not generate a response."

    console.log(`[chat-api] Success with model: ${model}`)
    return NextResponse.json({ text })
  }

  console.error("[chat-api] All models failed. Last error:", lastError)
  return NextResponse.json({ error: lastError }, { status: 500 })
}
