'use client'
import React from 'react'
import { Badge } from './badge'

// Icons
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-days"><rect width="20" height="18" x="2" y="4" rx="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
)

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></svg>
)

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
)

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
)

const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
)

const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17" /><polyline points="16,7 22,7 22,13" /></svg>
)

const ZapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" /></svg>
)

const CrownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" /></svg>
)

// Types for custom badge components
interface CustomBadgeProps {
    children: React.ReactNode;
    className?: string;
    [key: string]: React.ReactNode | string | undefined | (() => void);
}

interface NeonBadgeProps extends CustomBadgeProps {
    color?: 'blue' | 'purple' | 'pink' | 'green' | 'orange' | 'red';
}

interface GradientBadgeProps extends CustomBadgeProps {
    gradient?: 'blue' | 'purple' | 'green' | 'orange' | 'rainbow' | 'sunset';
}

// Custom Glassy Badge Components
const GlassBadge = ({ children, className = "", ...props }: CustomBadgeProps) => (
    <div
        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
        {...props}
    >
        {children}
    </div>
)

const NeonBadge = ({ children, color = "blue", className = "", ...props }: NeonBadgeProps) => {
    const colors = {
        blue: "shadow-blue-500/50 border-blue-400/50 text-blue-300",
        purple: "shadow-purple-500/50 border-purple-400/50 text-purple-300",
        pink: "shadow-pink-500/50 border-pink-400/50 text-pink-300",
        green: "shadow-green-500/50 border-green-400/50 text-green-300",
        orange: "shadow-orange-500/50 border-orange-400/50 text-orange-300",
        red: "shadow-red-500/50 border-red-400/50 text-red-300",
    }

    return (
        <div
            className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full backdrop-blur-md bg-black/40 border-2 shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse ${colors[color]} ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

const GradientBadge = ({ children, gradient = "blue", className = "", ...props }: GradientBadgeProps) => {
    const gradients = {
        blue: "bg-gradient-to-r from-blue-500/80 to-cyan-500/80",
        purple: "bg-gradient-to-r from-purple-500/80 to-pink-500/80",
        green: "bg-gradient-to-r from-green-500/80 to-emerald-500/80",
        orange: "bg-gradient-to-r from-orange-500/80 to-red-500/80",
        rainbow: "bg-gradient-to-r from-red-500/80 via-yellow-500/80 via-green-500/80 via-blue-500/80 to-purple-500/80",
        sunset: "bg-gradient-to-r from-orange-400/80 via-pink-500/80 to-purple-600/80",
    }

    return (
        <div
            className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full backdrop-blur-md ${gradients[gradient]} border border-white/30 shadow-lg text-white hover:scale-105 transition-all duration-300 ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

const FrostedBadge = ({ children, className = "", ...props }: CustomBadgeProps) => (
    <div
        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 shadow-2xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 ${className}`}
        {...props}
    >
        {children}
    </div>
)

const HolographicBadge = ({ children, className = "", ...props }: CustomBadgeProps) => (
    <div
        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full backdrop-blur-md bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-gradient-x ${className}`}
        style={{
            background: 'linear-gradient(-45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))',
            backgroundSize: '400% 400%',
            animation: 'gradient 3s ease infinite'
        }}
        {...props}
    >
        {children}
    </div>
)

const CrystalBadge = ({ children, className = "", ...props }: CustomBadgeProps) => (
    <div
        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full backdrop-blur-sm bg-gradient-to-br from-white/30 to-white/10 dark:from-white/20 dark:to-white/5 border-2 border-white/40 dark:border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:rotate-1 ${className}`}
        {...props}
    >
        {children}
    </div>
)

const MetallicBadge = ({ children, className = "", ...props }: CustomBadgeProps) => (
    <div
        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300 dark:border-gray-500 ${className}`}
        {...props}
    >
        {children}
    </div>
)

const GoldBadge = ({ children, className = "", ...props }: CustomBadgeProps) => (
    <div
        className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-yellow-900 shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-300 hover:scale-105 ${className}`}
        {...props}
    >
        {children}
    </div>
)



export default function BadgeView() {
  return (
    <div className="space-y-8 p-6">
      {/* Original Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Original Badge Variants</h3>
        <div className='flex flex-wrap gap-2'>
            <Badge>Badge</Badge>
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Soft (Default)</Badge>
            <Badge className="bg-blue-600 text-white">Solid</Badge>
            <Badge className="border border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-300">Outline</Badge>
            <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" onDismiss={() => console.log('Dismissed!')} iconLeft={<CalendarIcon/>}>Dismissible</Badge>
            <Badge className="bg-purple-600 text-white" onClick={() => alert('Badge clicked!')}>Clickable</Badge>
            <Badge className="border border-orange-300 text-orange-700 dark:border-orange-600 dark:text-orange-300" href="#" iconRight={<SendIcon />}>Link</Badge>
        </div>
      </div>

      {/* Glassy Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Glassy Effect Badges</h3>
        <div className='flex flex-wrap gap-3'>
            <GlassBadge>Glass Basic</GlassBadge>
            <GlassBadge className="text-blue-600 dark:text-blue-400">Glass Blue</GlassBadge>
            <GlassBadge className="text-purple-600 dark:text-purple-400">Glass Purple</GlassBadge>
            <GlassBadge className="text-green-600 dark:text-green-400">Glass Green</GlassBadge>
            <GlassBadge className="text-pink-600 dark:text-pink-400">Glass Pink</GlassBadge>
        </div>
      </div>

      {/* Neon Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Neon Glow Badges</h3>
        <div className='flex flex-wrap gap-3'>
            <NeonBadge color="blue">Neon Blue</NeonBadge>
            <NeonBadge color="purple">Neon Purple</NeonBadge>
            <NeonBadge color="pink">Neon Pink</NeonBadge>
            <NeonBadge color="green">Neon Green</NeonBadge>
            <NeonBadge color="orange">Neon Orange</NeonBadge>
            <NeonBadge color="red">Neon Red</NeonBadge>
        </div>
      </div>

      {/* Gradient Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gradient Badges</h3>
        <div className='flex flex-wrap gap-3'>
            <GradientBadge gradient="blue">Ocean Blue</GradientBadge>
            <GradientBadge gradient="purple">Purple Haze</GradientBadge>
            <GradientBadge gradient="green">Forest Green</GradientBadge>
            <GradientBadge gradient="orange">Sunset Orange</GradientBadge>
            <GradientBadge gradient="rainbow">Rainbow</GradientBadge>
            <GradientBadge gradient="sunset">Sunset</GradientBadge>
        </div>
      </div>

      {/* Frosted Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Frosted Glass Badges</h3>
        <div className='flex flex-wrap gap-3'>
            <FrostedBadge className="text-gray-700 dark:text-gray-300">Frosted Basic</FrostedBadge>
            <FrostedBadge className="text-blue-600 dark:text-blue-400">Frosted Blue</FrostedBadge>
            <FrostedBadge className="text-purple-600 dark:text-purple-400">Frosted Purple</FrostedBadge>
            <FrostedBadge className="text-green-600 dark:text-green-400">Frosted Green</FrostedBadge>
            <FrostedBadge className="text-pink-600 dark:text-pink-400">Frosted Pink</FrostedBadge>
        </div>
      </div>

      {/* Holographic Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Holographic Badges</h3>
        <div className='flex flex-wrap gap-3'>
            <HolographicBadge className="text-white">Holographic</HolographicBadge>
            <HolographicBadge className="text-cyan-200">Cyber Holo</HolographicBadge>
            <HolographicBadge className="text-purple-200">Magic Holo</HolographicBadge>
            <HolographicBadge className="text-pink-200">Dream Holo</HolographicBadge>
        </div>
      </div>

      {/* Crystal Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Crystal Badges</h3>
        <div className='flex flex-wrap gap-3'>
            <CrystalBadge className="text-gray-700 dark:text-gray-300">Crystal Clear</CrystalBadge>
            <CrystalBadge className="text-blue-600 dark:text-blue-400">Ice Crystal</CrystalBadge>
            <CrystalBadge className="text-purple-600 dark:text-purple-400">Amethyst</CrystalBadge>
            <CrystalBadge className="text-green-600 dark:text-green-400">Emerald</CrystalBadge>
            <CrystalBadge className="text-pink-600 dark:text-pink-400">Rose Quartz</CrystalBadge>
        </div>
      </div>

      {/* Icon Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Icon Badges with Glass Effects</h3>
        <div className='flex flex-wrap gap-3'>
            <GlassBadge className="text-yellow-600 dark:text-yellow-400">
                <StarIcon />
                <span className="ml-1">Premium</span>
            </GlassBadge>
            <GlassBadge className="text-red-600 dark:text-red-400">
                <HeartIcon />
                <span className="ml-1">Favorite</span>
            </GlassBadge>
            <GlassBadge className="text-green-600 dark:text-green-400">
                <ShieldIcon />
                <span className="ml-1">Verified</span>
            </GlassBadge>
            <GlassBadge className="text-blue-600 dark:text-blue-400">
                <TrendingUpIcon />
                <span className="ml-1">Trending</span>
            </GlassBadge>
            <GlassBadge className="text-purple-600 dark:text-purple-400">
                <ZapIcon />
                <span className="ml-1">Fast</span>
            </GlassBadge>
            <GlassBadge className="text-orange-600 dark:text-orange-400">
                <CrownIcon />
                <span className="ml-1">VIP</span>
            </GlassBadge>
        </div>
      </div>

      {/* Metallic Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Metallic & Luxury Badges</h3>
        <div className='flex flex-wrap gap-3'>
            <MetallicBadge>Silver</MetallicBadge>
            <GoldBadge>Gold Premium</GoldBadge>
            <MetallicBadge className="bg-gradient-to-r from-rose-400 via-pink-300 to-rose-400 text-rose-900">Rose Gold</MetallicBadge>
            <MetallicBadge className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 text-purple-900">Platinum</MetallicBadge>
        </div>
      </div>

      
      {/* Size Variations with Glass Effects */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Size Variations with Glass Effects</h3>
        <div className='flex flex-wrap gap-3 items-center'>
            <GlassBadge className="px-2 py-0.5 text-xs">Extra Small</GlassBadge>
            <GlassBadge className="px-2.5 py-1 text-sm">Small</GlassBadge>
            <GlassBadge className="px-3 py-1.5 text-sm">Medium</GlassBadge>
            <GlassBadge className="px-4 py-2 text-base">Large</GlassBadge>
            <GlassBadge className="px-5 py-2.5 text-lg">Extra Large</GlassBadge>
        </div>
      </div>

      {/* Interactive Badges */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interactive Glass Badges</h3>
        <div className='flex flex-wrap gap-3'>
            <GlassBadge
                className="cursor-pointer hover:bg-white/30 dark:hover:bg-black/30 active:scale-95"
                onClick={() => alert('Glass badge clicked!')}
            >
                Clickable Glass
            </GlassBadge>
            <FrostedBadge
                className="cursor-pointer hover:bg-white/20 dark:hover:bg-white/15 active:scale-95"
                onClick={() => alert('Frosted badge clicked!')}
            >
                Clickable Frosted
            </FrostedBadge>
            <CrystalBadge
                className="cursor-pointer hover:rotate-3 active:scale-95"
                onClick={() => alert('Crystal badge clicked!')}
            >
                Clickable Crystal
            </CrystalBadge>
        </div>
      </div>
    </div>
  )
}
