"use client"

import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { RequestsTabs } from "@/components/requests-tabs"
import { RequestCard } from "@/components/request-card"
import { EmptyStatePanel } from "@/components/empty-state-panel"
import { Inbox } from "lucide-react"
import { useState } from "react"

const mockRequests = {
  Pending: [
    {
      id: "1",
      name: "Anna",
      avatarUrl: "/diverse-woman-portrait.png",
      vibe: "Coffee & Chat",
      time: "Today 7–9pm",
      place: "Central Mall · Siam",
      status: "Pending" as const,
    },
    {
      id: "2",
      name: "Tom",
      avatarUrl: "/man.jpg",
      vibe: "Local Eats",
      time: "Tomorrow 12–2pm",
      place: "Chatuchak Market",
      status: "Pending" as const,
    },
  ],
  Accepted: [
    {
      id: "3",
      name: "Sarah",
      avatarUrl: "/diverse-woman-portrait.png",
      vibe: "Walking Tour",
      time: "Fri 3–5pm",
      place: "Grand Palace",
      status: "Accepted" as const,
    },
  ],
  Completed: [
    {
      id: "4",
      name: "Mike",
      avatarUrl: "/diverse-group-friends.png",
      vibe: "Coffee & Chat",
      time: "Dec 15, 4–6pm",
      place: "Starbucks Siam",
      status: "Completed" as const,
    },
  ],
  Canceled: [],
}

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("Pending")

  const currentRequests = mockRequests[activeTab as keyof typeof mockRequests]

  return (
    <div className="min-h-screen bg-background pb-24 max-w-[390px] mx-auto">
      <TopBar title="Requests" />

      <div className="py-4">
        <RequestsTabs
          tabs={["Pending", "Accepted", "Completed", "Canceled"]}
          defaultTab="Pending"
          onTabChange={setActiveTab}
        />
      </div>

      <div className="px-4 space-y-3 pt-2">
        {currentRequests.length > 0 ? (
          currentRequests.map((request) => <RequestCard key={request.id} {...request} />)
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
