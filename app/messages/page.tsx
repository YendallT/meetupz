"use client"

import { useState } from "react"
import { TopBar } from "@/components/top-bar"
import { ConversationRow } from "@/components/conversation-row"
import { BottomNav } from "@/components/bottom-nav"
import { EmptyStatePanel } from "@/components/empty-state-panel"
import { MessageCircle } from "lucide-react"

const conversations = [
  {
    id: "1",
    name: "Anna",
    city: "Bangkok",
    message: "Looking forward to meeting tonight!",
    status: "Today 8pm · Central Mall",
    avatarUrl: "/diverse-woman-smiling.png",
    unread: true,
  },
  {
    id: "2",
    name: "David",
    city: "Bangkok",
    message: "Thanks for showing me around!",
    status: "Pending",
    avatarUrl: "/casual-man.png",
    unread: false,
  },
  {
    id: "3",
    name: "Sophia",
    city: "Bangkok",
    message: "The rooftop bar was amazing",
    status: "Completed",
    avatarUrl: "/professional-woman.png",
    unread: false,
  },
  {
    id: "4",
    name: "Liam",
    city: "Chiang Mai",
    message: "Would love to meet for coffee",
    status: "Tomorrow 4pm",
    avatarUrl: "/man-young.jpg",
    unread: true,
  },
  {
    id: "5",
    name: "Emma",
    city: "Phuket",
    message: "Thanks for the food recommendations",
    status: "Pending",
    avatarUrl: "/woman-traveler.png",
    unread: false,
  },
]

export default function MessagesPage() {
  const [showEmpty, setShowEmpty] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-24 max-w-[390px] mx-auto">
      <TopBar title="Messages" />

      {showEmpty || conversations.length === 0 ? (
        <EmptyStatePanel
          icon={<MessageCircle className="h-12 w-12" />}
          title="No messages yet"
          description="Start a conversation by requesting a meetup with a local."
          actionLabel="Browse locals"
          actionHref="/"
        />
      ) : (
        <div className="divide-y divide-border">
          {conversations.map((conversation) => (
            <ConversationRow key={conversation.id} {...conversation} />
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  )
}
