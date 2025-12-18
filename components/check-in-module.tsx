"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Loader2 } from "lucide-react"
import Link from "next/link"

type CheckInState = "not-checked-in" | "waiting" | "both-checked-in"

interface CheckInModuleProps {
  initialState?: CheckInState
  localName?: string
}

export function CheckInModule({ initialState = "not-checked-in", localName = "Anna" }: CheckInModuleProps) {
  const [state, setState] = useState<CheckInState>(initialState)

  const handleCheckIn = () => {
    setState("waiting")
    // Simulate waiting period
    setTimeout(() => {
      setState("both-checked-in")
    }, 3000)
  }

  return (
    <Card className="p-5 rounded-2xl shadow-sm border border-border bg-card">
      {state === "not-checked-in" && (
        <div className="text-center space-y-3">
          <h3 className="font-semibold text-base text-foreground">Check-in</h3>
          <Button onClick={handleCheckIn} className="w-full rounded-xl font-semibold" size="lg">
            Check in now
          </Button>
          <p className="text-xs text-muted-foreground">Only tap when you're at the meeting spot.</p>
        </div>
      )}

      {state === "waiting" && (
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <h3 className="font-semibold text-base text-foreground">Waiting for {localName} to check in...</h3>
          </div>
          <p className="text-sm text-muted-foreground">You've checked in. Waiting for the other person.</p>
        </div>
      )}

      {state === "both-checked-in" && (
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <h3 className="font-semibold text-base">Both checked in</h3>
          </div>
          <Link href="/review">
            <Button className="w-full rounded-xl font-semibold" size="lg">
              Leave quick review
            </Button>
          </Link>
        </div>
      )}
    </Card>
  )
}
