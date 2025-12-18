import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface ConversationRowProps {
  id: string
  name: string
  city: string
  message: string
  status: string
  avatarUrl: string
  unread?: boolean
}

export function ConversationRow({ id, name, city, message, status, avatarUrl, unread = false }: ConversationRowProps) {
  return (
    <Link
      href={`/messages/${id}`}
      className="flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors border-b border-border last:border-b-0"
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        {unread && (
          <div className="absolute -top-0.5 -right-0.5 h-3 w-3 bg-primary rounded-full border-2 border-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <h3 className="font-semibold text-sm text-foreground">{name}</h3>
          <span className="text-xs text-muted-foreground">· {city}</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{message}</p>
      </div>

      <div className="flex-shrink-0">
        <span className="text-xs px-2.5 py-1 bg-accent text-accent-foreground rounded-full font-medium">{status}</span>
      </div>
    </Link>
  )
}
