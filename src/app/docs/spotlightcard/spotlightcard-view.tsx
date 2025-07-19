'use client'
import GlowCard from "./spotlight-card"

export default function SpotlightCardView() {
  return (
   <div className="w-screen flex flex-row items-center justify-center gap-10 custom-cursor">
      <GlowCard>
        <span className="text-white text-6xl flex items-center justify-center">😎</span>
      </GlowCard>
    </div>
  )
}
