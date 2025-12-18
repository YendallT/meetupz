import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { MeetupDetailsCard } from "@/components/meetup-details-card"
import { CheckInModule } from "@/components/check-in-module"
import { SafetyChecklistCard } from "@/components/safety-checklist-card"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

export default function MeetupDetailsPage() {
  return (
    <div className="min-h-screen bg-background pb-24 max-w-[390px] mx-auto">
      <TopBar title="Meetup details" showBack showSafetyIcon />

      <div className="px-4 py-6 space-y-4">
        <MeetupDetailsCard
          name="Anna"
          avatarUrl="/diverse-woman-portrait.png"
          vibe="Coffee & Chat"
          time="Today 7–9pm"
          place="Central Mall · Siam, Starbucks 2nd floor"
        />

        <CheckInModule localName="Anna" />

        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-foreground px-1">Safety</h3>
          <SafetyChecklistCard />

          <Button variant="outline" className="w-full rounded-xl font-medium bg-transparent" size="lg">
            <Copy className="h-4 w-4 mr-2" />
            Copy meetup details
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
