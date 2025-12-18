import { Info } from "lucide-react"

interface SafetyNoteBoxProps {
  text: string
}

export function SafetyNoteBox({ text }: SafetyNoteBoxProps) {
  return (
    <div className="flex gap-3 p-4 bg-accent rounded-xl border border-border">
      <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
      <p className="text-sm text-accent-foreground leading-relaxed">{text}</p>
    </div>
  )
}
