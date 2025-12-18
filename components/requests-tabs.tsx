"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface RequestsTabsProps {
  tabs: string[]
  defaultTab?: string
  onTabChange?: (tab: string) => void
}

export function RequestsTabs({ tabs, defaultTab, onTabChange }: RequestsTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0])

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    onTabChange?.(tab)
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={cn(
            "px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            activeTab === tab
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
