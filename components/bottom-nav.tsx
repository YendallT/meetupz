"use client"

import { Home, MessageSquare, User, Inbox } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const tabs = [
    { name: "Home", href: "/", icon: Home },
    { name: "Requests", href: "/requests", icon: Inbox },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Profile", href: "/profile", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 max-w-[390px] mx-auto">
      <div className="flex items-center justify-around h-20 px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          const Icon = tab.icon

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-lg transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className={cn("text-xs font-medium", isActive && "font-semibold")}>{tab.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
