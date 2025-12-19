"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { BottomNav } from "@/components/bottom-nav"
import { ChatHeader } from "@/components/chat-header"
import { SafetyChecklistCard } from "@/components/safety-checklist-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GateSheet } from "@/components/gate-sheet"
import { EmailGate } from "@/components/email-gate"

import { supabase } from "@/lib/supabaseClient"
import { Send } from "lucide-react"

export default function ChatPage() {
  const router = useRouter()

  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [showGate, setShowGate] = useState(false)

  // Local-only draft input (UI MVP)
  const [draft, setDraft] = useState("")

  // Demo messages (keep as-is for now)
  const messages = [
    { id: 1, sender: "local", text: "Hi! Looking forward to meeting you tonight!", time: "2:34 PM" },
    {
      id: 2,
      sender: "traveler",
      text: "Me too! Should I meet you at the main entrance of Central Mall?",
      time: "2:36 PM",
    },
    { id: 3, sender: "local", text: "Yes! I'll be wearing a blue jacket 😊", time: "2:38 PM" },
    { id: 4, sender: "traveler", text: "Perfect! I'll be in a red backpack", time: "2:40 PM" },
  ]

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession()
      const ok = !!data.session
      setAuthed(ok)
      setShowGate(!ok)
      setChecking(false)
    }

    check()

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      check()
    })

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  const onSend = async () => {
    // For now, just block sending unless authed.
    if (!authed) {
      setShowGate(true)
      return
    }
    // UI-only MVP (no DB wiring here yet)
    setDraft("")
  }

  // While checking auth session, render a lightweight shell (prevents flicker)
  if (checking) {
    return (
      <div className="min-h-screen bg-background flex flex-col pb-24">
        <ChatHeader
          name="Nari"
          imageUrl="/asian-woman-happy.jpg"
          meetupInfo="Meetup confirmed · Today 6pm · Central Mall"
          onBack={() => router.back()}
        />
        <div className="flex-1 px-4 py-6 text-sm text-muted-foreground">Loading…</div>
        <BottomNav />
      </div>
    )
  }

  // If not authed, show the chat UI behind (so they "see the product"),
  // but gate interaction via bottom sheet.
  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <ChatHeader
        name="Nari"
        imageUrl="/asian-woman-happy.jpg"
        meetupInfo="Meetup confirmed · Today 6pm · Central Mall"
        onBack={() => router.back()}
      />

      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "traveler" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                message.sender === "traveler"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === "traveler" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 mb-20">
        <SafetyChecklistCard />

        {/* Input row: disable interaction if not authed, but still visible */}
        <div className="flex gap-2">
          <Input
            placeholder={authed ? "Type a message…" : "Continue with email to message…"}
            className="flex-1 rounded-full px-5 h-12"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={!authed}
            onFocus={() => {
              if (!authed) setShowGate(true)
            }}
          />
          <Button
            size="icon"
            className="h-12 w-12 rounded-full flex-shrink-0"
            onClick={onSend}
            disabled={!authed}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {!authed && (
          <button
            className="mt-3 w-full text-center text-sm underline text-muted-foreground"
            onClick={() => setShowGate(true)}
          >
            Continue with email to chat
          </button>
        )}
      </div>

      <BottomNav />

      <GateSheet open={showGate} onClose={() => setShowGate(false)}>
        <EmailGate
          title="Continue to chat"
          subtitle="Enter your email to message safely and get meetup updates."
          onDone={() => setShowGate(false)}
        />
      </GateSheet>
    </div>
  )
}