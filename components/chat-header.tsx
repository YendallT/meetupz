"use client"

import { ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ChatHeaderProps {
  name: string
  imageUrl: string
  meetupInfo: string
  onBack?: () => void
  onSafety?: () => void
}

export function ChatHeader({ name, imageUrl, meetupInfo, onBack, onSafety }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-border px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" size="icon" className="h-9 w-9 -ml-2 flex-shrink-0" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={imageUrl || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{meetupInfo}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-9 w-9 -mr-2 flex-shrink-0" onClick={onSafety}>
          <Shield className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
