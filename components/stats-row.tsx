import { Users, Star, ShieldAlert } from "lucide-react"

interface Stat {
  label: string
  value: string
  icon: "users" | "star" | "shield"
}

interface StatsRowProps {
  stats: Stat[]
}

export function StatsRow({ stats }: StatsRowProps) {
  const iconMap = {
    users: Users,
    star: Star,
    shield: ShieldAlert,
  }

  return (
    <div className="grid grid-cols-3 gap-4 px-6 py-4">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon]
        return (
          <div key={index} className="flex flex-col items-center text-center">
            <Icon className="h-5 w-5 text-muted-foreground mb-2" />
            <p className="text-sm font-semibold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground leading-tight mt-0.5">{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}
