import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Coins } from "lucide-react"

interface TokenCardProps {
  balance: number
}

export function TokenCard({ balance }: TokenCardProps) {
  return (
    <Card className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-center gap-2 mb-1">
        <Coins className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Tokens</h3>
      </div>
      <p className="text-3xl font-bold text-foreground mb-1">{balance}</p>
      <p className="text-sm text-muted-foreground mb-4">1 token = 1 meetup request</p>
      <div className="flex gap-2">
        <Button className="flex-1 rounded-xl font-semibold">Buy tokens</Button>
        <Button variant="outline" className="flex-1 rounded-xl font-semibold bg-transparent">
          Invite friends
        </Button>
      </div>
    </Card>
  )
}
