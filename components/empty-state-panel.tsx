import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStatePanelProps {
  icon?: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyStatePanel({ icon, title, description, actionLabel, actionHref }: EmptyStatePanelProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button className="rounded-xl font-semibold" size="lg">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  )
}
