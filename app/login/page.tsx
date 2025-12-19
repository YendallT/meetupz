"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSend = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/` },
    })
    setLoading(false)
    if (!error) setSent(true)
    else alert(error.message)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-4 p-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <p className="text-sm text-muted-foreground">
        We’ll email you a magic link.
      </p>

      <input
        className="h-11 rounded-xl border px-3"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        className="h-11 rounded-xl bg-black text-white disabled:opacity-50"
        onClick={onSend}
        disabled={loading || !email}
      >
        {loading ? "Sending..." : "Send magic link"}
      </button>

      {sent && (
        <div className="rounded-xl bg-muted p-3 text-sm">
          Magic link sent. Check your inbox.
        </div>
      )}

      <button
        className="text-sm underline"
        onClick={() => router.push("/")}
      >
        Back
      </button>
    </div>
  )
}