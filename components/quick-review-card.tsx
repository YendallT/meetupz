"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function QuickReviewCard() {
  const [feltSafe, setFeltSafe] = useState<boolean | null>(null)
  const [vibeGood, setVibeGood] = useState<boolean | null>(null)

  return (
    <Card className="p-5 rounded-2xl shadow-sm border border-border bg-card space-y-6">
      <div className="space-y-3">
        <h3 className="font-semibold text-base text-foreground">Did you feel safe?</h3>
        <div className="flex gap-3">
          <Button
            variant={feltSafe === true ? "default" : "outline"}
            className={cn(
              "flex-1 rounded-xl font-semibold h-12",
              feltSafe === true && "bg-green-600 hover:bg-green-700",
            )}
            onClick={() => setFeltSafe(true)}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Yes
          </Button>
          <Button
            variant={feltSafe === false ? "default" : "outline"}
            className={cn("flex-1 rounded-xl font-semibold h-12", feltSafe === false && "bg-red-600 hover:bg-red-700")}
            onClick={() => setFeltSafe(false)}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            No
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-base text-foreground">How was the vibe?</h3>
        <div className="flex gap-3">
          <Button
            variant={vibeGood === true ? "default" : "outline"}
            className={cn(
              "flex-1 rounded-xl font-semibold h-12",
              vibeGood === true && "bg-green-600 hover:bg-green-700",
            )}
            onClick={() => setVibeGood(true)}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            Good
          </Button>
          <Button
            variant={vibeGood === false ? "default" : "outline"}
            className={cn("flex-1 rounded-xl font-semibold h-12", vibeGood === false && "bg-red-600 hover:bg-red-700")}
            onClick={() => setVibeGood(false)}
          >
            <ThumbsDown className="h-4 w-4 mr-2" />
            Not great
          </Button>
        </div>
      </div>
    </Card>
  )
}
