import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface LocalProfileHeaderProps {
  name: string
  location: string
  imageUrl: string
  bio: string
  verified?: boolean
}

export function LocalProfileHeader({ name, location, imageUrl, bio, verified = false }: LocalProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center px-6 pt-6 pb-4">
      <Avatar className="h-28 w-28 mb-4 ring-4 ring-background shadow-lg">
        <AvatarImage src={imageUrl || "/placeholder.svg"} alt={name} />
        <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-semibold text-foreground mb-1">{name}</h2>
      <p className="text-sm text-muted-foreground mb-2">{location}</p>
      {verified && (
        <Badge variant="secondary" className="gap-1 mb-3">
          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
          Verified human
        </Badge>
      )}
      <p className="text-sm text-foreground leading-relaxed max-w-sm">{bio}</p>
    </div>
  )
}
