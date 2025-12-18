"use client"

import { TopBar } from "@/components/top-bar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function RequestStep2Page() {
  const router = useRouter()
  const [selectedWindow, setSelectedWindow] = useState<string>("next-2")

  const timeWindows = [
    { id: "next-2", label: "Next 2 hours" },
    { id: "tonight", label: "Tonight" },
    { id: "tomorrow", label: "Tomorrow" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="Select time" showBack onBack={() => router.back()} />

      <div className="px-6 py-6">
        <div className="flex items-center justify-center mb-6">
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-border" />
          </div>
          <span className="text-sm text-muted-foreground ml-3">Step 2 of 3</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {timeWindows.map((window) => (
            <Badge
              key={window.id}
              variant={selectedWindow === window.id ? "default" : "secondary"}
              className="px-4 py-2 text-sm cursor-pointer"
              onClick={() => setSelectedWindow(window.id)}
            >
              {window.label}
            </Badge>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border p-6 mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Pick time</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Start time</label>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-input rounded-lg text-sm font-medium text-foreground hover:bg-input/80">
                6:00 PM
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">End time</label>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-input rounded-lg text-sm font-medium text-foreground hover:bg-input/80">
                8:00 PM
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 max-w-[390px] mx-auto">
        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="flex-1 bg-transparent" onClick={() => router.back()}>
            Back
          </Button>
          <Button size="lg" className="flex-1" onClick={() => router.push("/request/step3")}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
