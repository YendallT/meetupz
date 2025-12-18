import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface ReviewCardProps {
  travelerName: string
  travelerImage: string
  rating: number
  text: string
}

export function ReviewCard({ travelerName, travelerImage, rating, text }: ReviewCardProps) {
  return (
    <div className="flex gap-3 p-4 bg-card rounded-xl border border-border">
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={travelerImage || "/placeholder.svg"} alt={travelerName} />
        <AvatarFallback>{travelerName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-semibold text-foreground">{travelerName}</p>
          <div className="flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-xs font-medium text-foreground">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{text}</p>
      </div>
    </div>
  )
}
