"use server"

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export type SendEmailState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string }

export async function sendEmail(
  _prev: SendEmailState,
  formData: FormData,
): Promise<SendEmailState> {
  const name = formData.get("name")?.toString().trim()
  const email = formData.get("email")?.toString().trim()
  const message = formData.get("message")?.toString().trim()

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in all fields." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { status: "error", message: "Please enter a valid email address." }
  }

  const timestamp = new Date().toISOString()

  console.log(`[contact-form] [${timestamp}] Incoming message — name: "${name}" email: "${email}"`)

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      // Once you verify a domain at resend.com/domains, change this to "kyledennis099@gmail.com"
      to: "dennissenaris09@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111">
          <p style="font-size:13px;color:#6b7280;margin-bottom:24px">
            Sent via kylereginaldo.dev contact form
          </p>
          <h2 style="font-size:20px;font-weight:600;margin:0 0 4px">${name}</h2>
          <p style="font-size:13px;color:#6b7280;margin:0 0 24px">
            <a href="mailto:${email}" style="color:#3b82f6">${email}</a>
          </p>
          <div style="background:#f9fafb;border-radius:8px;padding:16px 20px;font-size:15px;line-height:1.6;white-space:pre-wrap">${message}</div>
        </div>
      `,
    })

    if (error) {
      console.error(`[contact-form] [${timestamp}] Resend error — name: "${error.name}" message: "${error.message}"`)
      return { status: "error", message: "Failed to send. Please try again." }
    }

    console.log(`[contact-form] [${timestamp}] Email sent — id: ${data?.id}`)

    return { status: "success" }
  } catch (err) {
    console.error(`[contact-form] [${timestamp}] Unexpected error —`, err)
    return { status: "error", message: "Failed to send. Please try again." }
  }
}
