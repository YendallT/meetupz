"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlaceRowProps {
  name: string
  type: string
  area: string
  onSelect: () => void
  selected?: boolean
}

export function PlaceRow({ name, type, area, onSelect, selected }: PlaceRowProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-4 py-3 flex items-center justify-between ${
        selected ? "bg-accent" : ""
      }`}
    >
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">{type} · {area}</div>
      </div>
      <div className="text-muted-foreground">{">"}</div>
    </button>
  )
}
