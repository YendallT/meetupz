import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle } from "lucide-react"
import Link from "next/link"

interface RequestCardProps {
  id: string
  name: string
  avatarUrl: string
  vibe: string
  time: string
  place: string
  status: "Pending" | "Accepted" | "Completed" | "Canceled"
}

export function RequestCard({ id, name, avatarUrl, vibe, time, place, status }: RequestCardProps) {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-green-100 text-green-800",
    Completed: "bg-blue-100 text-blue-800",
    Canceled: "bg-gray-100 text-gray-600",
  }

  return (
    <Card className="p-4 rounded-2xl shadow-sm border border-border bg-card">
      <div className="flex gap-3 mb-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-base text-foreground">{name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2.5 py-0.5 bg-accent text-accent-foreground text-xs rounded-full font-medium">
              {vibe}
            </span>
            <span className={`px-2.5 py-0.5 text-xs rounded-full font-medium ${statusColors[status]}`}>{status}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1.5 mb-3">
        <p className="text-sm text-foreground">
          <span className="font-medium">Time:</span> {time}
        </p>
        <p className="text-sm text-foreground">
          <span className="font-medium">Place:</span> {place}
        </p>
      </div>

      {status === "Pending" && (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 rounded-xl bg-transparent">
            <MessageCircle className="h-4 w-4 mr-1.5" />
            Message
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 rounded-xl text-muted-foreground">
            Cancel
          </Button>
        </div>
      )}

      {status === "Accepted" && (
        <Link href={`/meetup/${id}`}>
          <Button className="w-full rounded-xl font-semibold" size="sm">
            View details
          </Button>
        </Link>
      )}
    </Card>
  )
}
