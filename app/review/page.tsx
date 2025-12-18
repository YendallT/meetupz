import { TopBar } from "@/components/top-bar"
import { BottomNav } from "@/components/bottom-nav"
import { QuickReviewCard } from "@/components/quick-review-card"
import { PhotoUploadCard } from "@/components/photo-upload-card"
import { Button } from "@/components/ui/button"

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-background pb-24 max-w-[390px] mx-auto">
      <TopBar title="Quick review" showBack />

      <div className="px-4 py-6 space-y-4">
        <QuickReviewCard />

        <PhotoUploadCard />

        <Button className="w-full rounded-xl font-semibold" size="lg">
          Submit review
        </Button>

        <p className="text-xs text-center text-muted-foreground px-4">
          Submitting will release the token (or after the grace period).
        </p>
      </div>

      <BottomNav />
    </div>
  )
}
