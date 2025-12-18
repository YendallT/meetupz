"use client"

import { ArrowLeft, Filter, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopBarProps {
  title: string
  subtitle?: string
  showBack?: boolean
  showFilter?: boolean
  showSafetyIcon?: boolean
  onBack?: () => void
  onFilter?: () => void
}

export function TopBar({
  title,
  subtitle,
  showBack = false,
  showFilter = false,
  showSafetyIcon = false,
  onBack,
  onFilter,
}: TopBarProps) {
  return (
    <div className="bg-white border-b border-border px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {showBack && (
            <Button variant="ghost" size="icon" className="h-9 w-9 -ml-2" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {showFilter && (
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={onFilter}>
              <Filter className="h-5 w-5" />
            </Button>
          )}
          {showSafetyIcon && (
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Shield className="h-5 w-5 text-green-600" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
