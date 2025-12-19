"use client"

import { TopBar } from "@/components/top-bar"
import { Button } from "@/components/ui/button"
import { PlaceRow } from "@/components/place-row"
import { GateSheet } from "@/components/gate-sheet"
import { EmailGate } from "@/components/email-gate"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RequestStep3Page() {
  const router = useRouter()
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null)
  const [showGate, setShowGate] = useState(false)
  const [loading, setLoading] = useState(false)

  const places = [
    { id: "1", name: "Central Mall", type: "Mall", area: "Siam" },
    { id: "2", name: "Café Latte", type: "Café", area: "Thong Lo" },
    { id: "3", name: "Terminal 21", type: "Mall", area: "Asok" },
    { id: "4", name: "The Commons", type: "Plaza", area: "Thong Lo" },
    { id: "5", name: "Siam Paragon", type: "Mall", area: "Siam" },
  ]

  const handleConfirm = async () => {
    setLoading(true)

    const { data } = await supabase.auth.getSession()

    // If not logged in → show email gate
    if (!data.session) {
      setLoading(false)
      setShowGate(true)
      return
    }

    // TEMP MVP BEHAVIOR:
    // Skip DB write for now and go straight to chat
    // Later: create meetup + hold token here
    setLoading(false)
    router.push("/chat/1")
  }

  return (
    <div className="min-h-screen bg-background max-w-[390px] mx-auto">
      <TopBar title="Meeting spot" showBack onBack={() => router.back()} />

      <div className="px-6 py-6">
        {/* Step indicator */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <span className="text-sm text-muted-foreground ml-3">
            Step 3 of 3
          </span>
        </div>

        {/* Places */}
        <div className="bg-card rounded-xl border border-border divide-y divide-border mb-6">
          {places.map((place) => (
            <PlaceRow
              key={place.id}
              name={place.name}
              type={place.type}
              area={place.area}
              selected={selectedPlace === place.id}
              onSelect={() => setSelectedPlace(place.id)}
            />
          ))}
        </div>

        {/* Summary */}
        <div className="bg-accent rounded-xl border border-border p-4 mb-4">
          <h3 className="text-sm font-semibold text-accent-foreground mb-3">
            Summary
          </h3>
          <div className="space-y-2 text-sm text-accent-foreground">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vibe:</span>
              <span className="font-medium">Coffee & Chat</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">
                Tonight 6:00 PM – 8:00 PM
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Area:</span>
              <span className="font-medium">Thong Lo</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Sending this request will place 1 token on hold until check-in.
        </p>
      </div>

      {/* Confirm button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 max-w-[390px] mx-auto">
        <Button
          className="w-full"
          size="lg"
          disabled={!selectedPlace || loading}
          onClick={handleConfirm}
        >
          {loading ? "Checking..." : "Confirm"}
        </Button>
      </div>

      {/* Email gate */}
      <GateSheet open={showGate} onClose={() => setShowGate(false)}>
        <EmailGate
          title="Confirm your request"
          subtitle="Enter your email to send the request and receive updates."
          onDone={() => {
            setShowGate(false)
            router.push("/chat/1")
          }}
        />
      </GateSheet>
    </div>
  )
}