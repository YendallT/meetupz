"use client"

import { TopBar } from "@/components/top-bar"
import { Button } from "@/components/ui/button"
import { Coffee, Utensils, Map, Languages, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RequestStep1Page() {
  const router = useRouter()
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null)

  const vibes = [
    { id: "eat", label: "Eat & Chill", icon: Utensils },
    { id: "explore", label: "Explore the City", icon: Map },
    { id: "coffee", label: "Coffee & Chat", icon: Coffee },
    { id: "street-food", label: "Street Food Run", icon: Utensils },
    { id: "language", label: "Language Exchange", icon: Languages },
    { id: "other", label: "Other", icon: MoreHorizontal },
  ]

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="Pick vibe" showBack onBack={() => router.back()} />

      <div className="px-6 py-6">
        <div className="flex items-center justify-center mb-6">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-border" />
            <div className="h-2 w-2 rounded-full bg-border" />
          </div>
          <span className="text-sm text-muted-foreground ml-3">Step 1 of 3</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {vibes.map((vibe) => {
            const Icon = vibe.icon
            const isSelected = selectedVibe === vibe.id
            return (
              <button
                key={vibe.id}
                onClick={() => setSelectedVibe(vibe.id)}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                  isSelected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <Icon className={`h-8 w-8 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-sm font-medium text-center ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {vibe.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 max-w-[390px] mx-auto">
        <Button className="w-full" size="lg" disabled={!selectedVibe} onClick={() => router.push("/request/step2")}>
          Next
        </Button>
      </div>
    </div>
  )
}
