"use client"

import { useEffect, useMemo, useState } from "react"
import { Inbox } from "lucide-react"

import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { RequestsTabs } from "@/components/requests-tabs"
import { RequestCard } from "@/components/request-card"
import { EmptyStatePanel } from "@/components/empty-state-panel"
import { EmailGate } from "@/components/email-gate"

import { supabase } from "@/lib/supabaseClient"

type TabKey = "Pending" | "Accepted" | "Completed" | "Canceled"

type RequestCardModel = {
  id: string
  name: string
  avatarUrl: string
  vibe: string
  time: string
  place: string
  status: "Pending" | "Accepted" | "Completed" | "Canceled"
}

function formatTimeWindow(m: any) {
  // MVP-simple formatting (you can upgrade later)
  if (m.time_window) return m.time_window
  const start = m.start_time ? String(m.start_time) : ""
  const end = m.end_time ? String(m.end_time) : ""
  const range = [start, end].filter(Boolean).join("–")
  return range || "Time TBD"
}

function formatPlace(m: any) {
  if (m.places?.name) {
    const area = m.places?.area ? ` · ${m.places.area}` : ""
    return `${m.places.name}${area}`
  }
  return m.place_free_text || "Public meetup spot"
}

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("Pending")
  const [sessionReady, setSessionReady] = useState(false)
  const [authedUserId, setAuthedUserId] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [meetups, setMeetups] = useState<any[]>([])

  // 1) Check session (NO redirect; inline gate)
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      setAuthedUserId(data.session?.user?.id ?? null)
      setSessionReady(true)
    }
    init()

    const { data: sub } = supabase.auth.onAuthStateChange(async () => {
      const { data } = await supabase.auth.getSession()
      setAuthedUserId(data.session?.user?.id ?? null)
      setSessionReady(true)
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  // 2) Load meetups once authed
  useEffect(() => {
    if (!authedUserId) return

    const load = async () => {
      setLoading(true)

      // Pull meetups where you're either traveler or host
      // Includes joined profiles + place (if you used place_id)
      const { data, error } = await supabase
        .from("meetups")
        .select(
          `
          id,
          traveler_id,
          host_id,
          vibe,
          time_window,
          start_time,
          end_time,
          status,
          place_free_text,
          places:place_id ( name, area )
        `
        )
        .or(`traveler_id.eq.${authedUserId},host_id.eq.${authedUserId}`)
        .order("created_at", { ascending: false })

      if (!error && data) setMeetups(data)
      setLoading(false)
    }

    load()
  }, [authedUserId])

  // 3) Map meetups to your RequestCard props
  const requestsByTab = useMemo(() => {
    const buckets: Record<TabKey, RequestCardModel[]> = {
      Pending: [],
      Accepted: [],
      Completed: [],
      Canceled: [],
    }

    for (const m of meetups) {
      // Translate DB status -> UI tab
      const uiStatus: RequestCardModel["status"] =
        m.status === "pending"
          ? "Pending"
          : m.status === "accepted"
          ? "Accepted"
          : m.status === "completed"
          ? "Completed"
          : "Canceled"

      // For MVP UI, we don’t yet join counterpart profile
      // (you can add a join later when you wire profiles into meetups select)
      const fallbackName =
        m.host_id === authedUserId ? "Traveler" : "Local"
      const fallbackAvatar = "/diverse-woman-portrait.png"

      buckets[uiStatus].push({
        id: String(m.id),
        name: fallbackName,
        avatarUrl: fallbackAvatar,
        vibe: m.vibe || "Meetup",
        time: formatTimeWindow(m),
        place: formatPlace(m),
        status: uiStatus,
      })
    }

    return buckets
  }, [meetups, authedUserId])

  const currentRequests = requestsByTab[activeTab]

  // 4) Not signed in yet -> show inline email gate
  if (!sessionReady) {
    return (
      <div className="min-h-screen bg-background pb-24 max-w-[390px] mx-auto">
        <TopBar title="Requests" />
        <div className="px-4 pt-6">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-sm text-muted-foreground">Loading…</div>
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  if (!authedUserId) {
    return (
      <div className="min-h-screen bg-background pb-24 max-w-[390px] mx-auto">
        <TopBar title="Requests" />

        <div className="px-4 pt-6">
          <EmailGate
            title="View your requests"
            subtitle="Enter your email to see your pending and confirmed meetups."
          />
        </div>

        <BottomNav />
      </div>
    )
  }

  // 5) Authed -> real Requests UI
  return (
    <div className="min-h-screen bg-background pb-24 max-w-[390px] mx-auto">
      <TopBar title="Requests" />

      <div className="py-4">
        <RequestsTabs
          tabs={["Pending", "Accepted", "Completed", "Canceled"]}
          defaultTab="Pending"
          onTabChange={(t) => setActiveTab(t as TabKey)}
        />
      </div>

      <div className="px-4 space-y-3 pt-2">
        {loading ? (
          <div className="rounded-2xl border bg-white p-4 shadow-sm text-sm text-muted-foreground">
            Loading your requests…
          </div>
        ) : currentRequests.length > 0 ? (
          currentRequests.map((request) => (
            <RequestCard key={request.id} {...request} />
          ))
        ) : (
          <EmptyStatePanel
            icon={<Inbox className="h-12 w-12" />}
            title="No requests yet"
            description="Start connecting with locals to see your meetup requests here."
            actionLabel="Go to Home"
            actionHref="/"
          />
        )}
      </div>

      <BottomNav />
    </div>
  )
}