"use client"

import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { LocalProfileHeader } from "@/components/local-profile-header"
import { StatsRow } from "@/components/stats-row"
import { ReviewCard } from "@/components/review-card"
import { SafetyNoteBox } from "@/components/safety-note-box"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LocalProfilePage() {
  const router = useRouter()

  const stats = [
    { label: "Met travelers", value: "14", icon: "users" as const },
    { label: "Rating (32 reviews)", value: "4.9", icon: "star" as const },
    { label: "Recent reports", value: "0", icon: "shield" as const },
  ]

  const interests = ["Street Food", "Night Markets", "Coffee Walks", "Photography"]

  const reviews = [
    {
      travelerName: "Sarah",
      travelerImage: "/diverse-woman-smiling.png",
      rating: 5,
      text: "Anna showed me the best hidden street food spots! Super friendly and knows the city inside out.",
    },
    {
      travelerName: "Marcus",
      travelerImage: "/man-happy.jpg",
      rating: 5,
      text: "Great local guide. Very patient and made me feel welcome. Highly recommend meeting with Anna!",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="Local Profile" showBack onBack={() => router.back()} />
      <div className="absolute top-3 right-4 z-50">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      <LocalProfileHeader
        name="Anna"
        location="Bangkok · Thong Lo"
        imageUrl="/asian-woman-smiling.png"
        bio="Love showing travelers the real Bangkok! Street food enthusiast and coffee lover. Let's explore together!"
        verified
      />

      <div className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <Badge key={interest} variant="secondary" className="px-3 py-1.5 text-sm">
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <StatsRow stats={stats} />
      </div>

      <div className="px-6 py-6 space-y-3">
        <h3 className="text-base font-semibold text-foreground mb-3">Recent reviews</h3>
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
        <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/5">
          See all reviews
        </Button>
      </div>

      <div className="px-6 pb-6">
        <SafetyNoteBox text="Meet only in public places. No cash payments. Report unsafe behavior." />
      </div>

      <div className="fixed bottom-20 left-0 right-0 bg-background border-t border-border p-4 max-w-[390px] mx-auto">
        <p className="text-xs text-muted-foreground text-center mb-3">Costs 1 token to request a meetup.</p>
        <Button className="w-full" size="lg" onClick={() => router.push("/request/step1")}>
          Request meetup
        </Button>
      </div>

    <BottomNav />
  </div>
  )
}
