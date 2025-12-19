"use client"

import { useEffect, useState } from "react"
import { TopBar } from "@/components/top-bar"
import { FilterPills } from "@/components/filter-pills"
import { LocalCard } from "@/components/local-card"
import { BottomNav } from "@/components/bottom-nav"
import { EmptyStatePanel } from "@/components/empty-state-panel"
import { MapPin } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

const filters = [
  "All",
  "Eat & Chill",
  "Explore",
  "Coffee & Chat",
  "Drinks",
  "Language Exchange",
]

type LocalUI = {
  id: string
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

export default function HomePage() {
  const city = "Bangkok"

  const [locals, setLocals] = useState<LocalUI[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadLocals() {
      setLoading(true)

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, display_name, area, city, languages, interests, availability_text, met_count, avg_rating, review_count, avatar_path, hosting_today"
        )
        .eq("city", city)
        .eq("hosting_today", true)
        .limit(30)

      if (cancelled) return

      if (error) {
        console.error("Failed to load locals:", error.message)
        setLocals([])
        setLoading(false)
        return
      }

      const mapped: LocalUI[] = (data ?? []).map((p: any) => {
        // NOTE: avatar_path is a storage path, not a full URL.
        // For now we fall back to a local placeholder until you wire storage public URLs.
        const avatarUrl =
          typeof p.avatar_path === "string" && p.avatar_path.length > 0
            ? p.avatar_path
            : "/casual-man.png"

        return {
          id: p.id,
          name: p.display_name || "Local",
          area: p.area || "",
          languages: p.languages || [],
          meetCount: p.met_count ?? 0,
          rating: Number(p.avg_rating ?? 0),
          reviewCount: p.review_count ?? 0,
          interests: (p.interests || []).slice(0, 2),
          availability: p.availability_text || "",
          avatarUrl,
        }
      })

      setLocals(mapped)
      setLoading(false)
    }

    loadLocals()

    return () => {
      cancelled = true
    }
  }, [city])

  return (
    <div className="mx-auto min-h-screen max-w-[390px] bg-background pb-24">
      <TopBar title="Home" subtitle={`${city} · Tonight`} showFilter />

      <div className="py-4">
        <FilterPills filters={filters} defaultFilter="All" />
      </div>

      {loading && (
        <div className="px-4 text-sm text-muted-foreground">
          Loading locals…
        </div>
      )}

      {!loading && locals.length === 0 ? (
        <EmptyStatePanel
          icon={<MapPin className="h-12 w-12" />}
          title="No locals available right now"
          description="Check back later or invite a friend to join the community."
          actionLabel="Invite a friend"
          actionHref="#"
        />
      ) : (
        <div className="space-y-4 px-4">
          {locals.map((local) => (
            <LocalCard key={local.id} {...local} />
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  )
}