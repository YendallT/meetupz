"use client"

import { BottomNav } from "@/components/bottom-nav"
import { ChatHeader } from "@/components/chat-header"
import { SafetyChecklistCard } from "@/components/safety-checklist-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ChatPage() {
  const router = useRouter()

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
        <div className="flex gap-2">
          <Input placeholder="Type a message…" className="flex-1 rounded-full px-5 h-12" />
          <Button size="icon" className="h-12 w-12 rounded-full flex-shrink-0">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
