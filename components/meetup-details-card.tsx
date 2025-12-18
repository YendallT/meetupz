import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"

interface MeetupDetailsCardProps {
  name: string
  avatarUrl: string
  vibe: string
  time: string
  place: string
}

export function MeetupDetailsCard({ name, avatarUrl, vibe, time, place }: MeetupDetailsCardProps) {
  return (
    <Card className="p-4 rounded-2xl shadow-sm border border-border bg-card">
      <div className="flex gap-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-base text-foreground">{name}</h3>
          <span className="inline-block mt-1 px-2.5 py-0.5 bg-accent text-accent-foreground text-xs rounded-full font-medium">
            {vibe}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Time</p>
            <p className="text-sm text-muted-foreground">{time}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Meeting spot</p>
            <p className="text-sm text-muted-foreground">{place}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Meet in public places only.</p>
      </div>
    </Card>
  )
}
