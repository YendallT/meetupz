"use client"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { FilterPills } from "@/components/filter-pills"
import { LocalCard } from "@/components/local-card"
import { BottomNav } from "@/components/bottom-nav"
import { EmptyStatePanel } from "@/components/empty-state-panel"
import { MapPin } from "lucide-react"

const filters = ["All", "Eat & Chill", "Explore", "Coffee & Chat", "Drinks", "Language Exchange"]

const locals = [
  {
    id: "1",
    name: "Anna",
    area: "Thong Lo",
    languages: ["English", "Thai"],
    meetCount: 12,
    rating: 4.9,
    reviewCount: 32,
    interests: ["Street Food", "Night Markets"],
    availability: "Free 7–10pm",
    avatarUrl: "/diverse-woman-smiling.png",
  },
  {
    id: "2",
    name: "David",
    area: "Sukhumvit",
    languages: ["English", "Spanish", "Thai"],
    meetCount: 24,
    rating: 4.8,
    reviewCount: 45,
    interests: ["Coffee", "Photography"],
    availability: "Free 6–9pm",
    avatarUrl: "/casual-man.png",
  },
  {
    id: "3",
    name: "Sophia",
    area: "Silom",
    languages: ["English", "French"],
    meetCount: 8,
    rating: 5.0,
    reviewCount: 18,
    interests: ["Art", "Rooftop Bars"],
    availability: "Free 8–11pm",
    avatarUrl: "/professional-woman.png",
  },
  {
    id: "4",
    name: "Marco",
    area: "Ari",
    languages: ["English", "Italian", "Thai"],
    meetCount: 31,
    rating: 4.7,
    reviewCount: 52,
    interests: ["Food Tours", "Local Gems"],
    availability: "Free 7–10pm",
    avatarUrl: "/man-friendly.jpg",
  },
]

export default function HomePage() {
  const [showEmpty, setShowEmpty] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-24 max-w-[390px] mx-auto">
      <TopBar title="Home" subtitle="Bangkok · Tonight" showFilter />

      <div className="py-4">
        <FilterPills filters={filters} defaultFilter="All" />
      </div>

      {showEmpty || locals.length === 0 ? (
        <EmptyStatePanel
          icon={<MapPin className="h-12 w-12" />}
          title="No locals available right now"
          description="Check back later or invite a friend to join the community."
          actionLabel="Invite a friend"
          actionHref="#"
        />
      ) : (
        <div className="px-4 space-y-4">
          {locals.map((local) => (
            <LocalCard key={local.id} {...local} />
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  )
}
