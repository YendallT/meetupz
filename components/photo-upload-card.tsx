"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"
import Image from "next/image"

export function PhotoUploadCard() {
  const [photo, setPhoto] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="p-5 rounded-2xl shadow-sm border border-border bg-card">
      <h3 className="font-semibold text-base text-foreground mb-2">Add a meetup photo (optional)</h3>
      <p className="text-xs text-muted-foreground mb-4">The other person can approve it for a Meet Badge.</p>

      {!photo ? (
        <label className="block">
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:bg-accent/50 transition-colors">
            <Camera className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Tap to upload photo</p>
          </div>
        </label>
      ) : (
        <div className="relative rounded-xl overflow-hidden">
          <Image
            src={photo || "/placeholder.svg"}
            alt="Meetup photo"
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
            onClick={() => setPhoto(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  )
}
