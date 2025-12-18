import { CheckCircle2 } from "lucide-react"

const safetyItems = ["Meet in public place", "Share details with a friend", "Report unsafe behavior"]

export function SafetyChecklistCard() {
  return (
    <div className="bg-accent border border-border rounded-xl p-4 mb-3">
      <div className="space-y-2">
        {safetyItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
            <p className="text-xs text-accent-foreground">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
