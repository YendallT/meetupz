import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { EmptyStatePanel } from "@/components/empty-state-panel"
import { MapPin, Inbox, MessageCircle } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function EmptyStatesPage() {
  return (
    <div className="min-h-screen bg-background pb-24 max-w-[390px] mx-auto">
      <TopBar title="Empty States" showBack />

      <div className="px-4 py-6 space-y-8">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 px-1">Home Empty State</h2>
          <Card className="rounded-2xl overflow-hidden">
            <EmptyStatePanel
              icon={<MapPin className="h-12 w-12" />}
              title="No locals available right now"
              description="Check back later or invite a friend to join the community."
              actionLabel="Invite a friend"
              actionHref="#"
            />
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 px-1">Requests Empty State</h2>
          <Card className="rounded-2xl overflow-hidden">
            <EmptyStatePanel
              icon={<Inbox className="h-12 w-12" />}
              title="No requests yet"
              description="Start connecting with locals to see your meetup requests here."
              actionLabel="Go to Home"
              actionHref="/"
            />
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 px-1">Messages Empty State</h2>
          <Card className="rounded-2xl overflow-hidden">
            <EmptyStatePanel
              icon={<MessageCircle className="h-12 w-12" />}
              title="No messages yet"
              description="Start a conversation by requesting a meetup with a local."
              actionLabel="Browse locals"
              actionHref="/"
            />
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
