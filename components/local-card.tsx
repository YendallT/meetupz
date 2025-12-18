import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Users } from "lucide-react"

interface LocalCardProps {
  name: string
  area: string
  languages: string[]
  meetCount: number
  rating: number
  reviewCount: number
  interests: string[]
  availability: string
  avatarUrl: string
}

export function LocalCard({
  name,
  area,
  languages,
  meetCount,
  rating,
  reviewCount,
  interests,
  availability,
  avatarUrl,
}: LocalCardProps) {
  return (
    <Card className="p-4 rounded-2xl shadow-sm border border-border bg-card hover:shadow-md transition-shadow">
      <div className="flex gap-3 mb-3">
        <Avatar className="h-14 w-14">
          <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-base text-foreground">
            {name} · {area}
          </h3>
          <p className="text-sm text-muted-foreground">{languages.join(", ")}</p>
          <div className="flex items-center gap-1 mt-1">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Met {meetCount} travelers</span>
            <span className="mx-1 text-muted-foreground">·</span>
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">
              {rating} ({reviewCount})
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        {interests.map((interest) => (
          <span
            key={interest}
            className="px-2.5 py-1 bg-accent text-accent-foreground text-xs rounded-full font-medium"
          >
            {interest}
          </span>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-3">{availability}</p>

      <Button className="w-full rounded-xl font-semibold" size="lg">
        Request meetup
      </Button>
    </Card>
  )
}
