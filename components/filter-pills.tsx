"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface FilterPillsProps {
  filters: string[]
  defaultFilter?: string
  onFilterChange?: (filter: string) => void
}

export function FilterPills({ filters, defaultFilter, onFilterChange }: FilterPillsProps) {
  const [activeFilter, setActiveFilter] = useState(defaultFilter || filters[0])

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter)
    onFilterChange?.(filter)
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            activeFilter === filter
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
