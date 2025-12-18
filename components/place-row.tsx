"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlaceRowProps {
  name: string
  type: string
  area: string
  onSelect: () => void
}

export function PlaceRow({ name, type, area, onSelect }: PlaceRowProps) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-between h-auto py-4 px-4 text-left hover:bg-accent"
      onClick={onSelect}
    >
      <div className="flex-1">
        <p className="text-base font-semibold text-foreground mb-0.5">{name}</p>
        <p className="text-sm text-muted-foreground">
          {type} · {area}
        </p>
      </div>
      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
    </Button>
  )
}
