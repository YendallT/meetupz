"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export function EmailGate({
  title = "Continue with email",
  subtitle = "We’ll send you updates and keep things accountable.",
  onDone,
}: {
  title?: string
  subtitle?: string
  onDone?: () => void
}) {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const send = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/` },
    })
    setLoading(false)
    if (error) return alert(error.message)
    setSent(true)
    onDone?.()
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-2xl border bg-white p-4 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="mt-4 space-y-3">
        <input
          className="h-11 w-full rounded-xl border px-3"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="h-11 w-full rounded-xl bg-black text-white disabled:opacity-50"
          onClick={send}
          disabled={loading || !email}
        >
          {loading ? "Sending..." : "Send magic link"}
        </button>
        {sent && (
          <div className="rounded-xl bg-muted p-3 text-sm">
            Check your inbox for the magic link.
          </div>
        )}
      </div>
    </div>
  )
}
