import { TopBar } from "@/components/top-bar"
import { TokenCard } from "@/components/token-card"
import { BottomNav } from "@/components/bottom-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { ChevronRight, Star, Users, Calendar, ShieldCheck } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { label: "My reviews", href: "/profile/reviews", icon: Star },
  { label: "Safety & Guidelines", href: "/profile/safety", icon: ShieldCheck },
  { label: "Settings", href: "/profile/settings", icon: null },
  { label: "Log out", href: "/logout", icon: null },
]

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-24 max-w-[390px] mx-auto">
      <TopBar title="Profile" showBack />

      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src="/man-profile.png" alt="Michael" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">Michael</h2>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">Chiang Mai</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <ShieldCheck className="h-4 w-4 text-success" />
            <span className="text-sm text-success font-medium">Verified human</span>
          </div>
        </div>

        {/* Hosting Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-accent">
          <span className="font-semibold text-foreground">I am available to host today</span>
          <Switch />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary">
            <Users className="h-5 w-5 text-primary mb-1" />
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-xs text-muted-foreground text-center">Travelers hosted</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary">
            <Star className="h-5 w-5 text-yellow-400 mb-1" />
            <p className="text-2xl font-bold text-foreground">4.8</p>
            <p className="text-xs text-muted-foreground text-center">Avg rating</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary">
            <Calendar className="h-5 w-5 text-primary mb-1" />
            <p className="text-2xl font-bold text-foreground">30</p>
            <p className="text-xs text-muted-foreground text-center">Meetups</p>
          </div>
        </div>

        {/* Token Card */}
        <TokenCard balance={12} />

        {/* Menu List */}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon && <item.icon className="h-5 w-5 text-muted-foreground" />}
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
