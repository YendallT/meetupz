"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    setLoading(false);
    if (error) alert(error.message);
    else setSent(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl border p-6 shadow-sm bg-white">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <p className="text-sm text-gray-600 mt-1">
          We’ll email you a magic link.
        </p>

        <form onSubmit={signInWithEmail} className="mt-4 space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="w-full rounded-xl bg-black text-white py-2 disabled:opacity-60"
            disabled={loading || !email}
          >
            {loading ? "Sending..." : "Send magic link"}
          </button>
        </form>

        {sent && (
          <p className="text-sm text-green-700 mt-3">
            Check your email for the sign-in link.
          </p>
        )}
      </div>
    </div>
  );
}