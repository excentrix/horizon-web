'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react'



interface Stat {
  icon: React.ReactNode
  value: number
  label: string
  suffix?: string
}

const stats: Stat[] = [
  {
    icon: <Users className="w-8 h-8" />,
    value: 10000,
    label: 'Active Students',
    suffix: '+',
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    value: 500,
    label: 'Resources',
    suffix: '+',
  },
  {
    icon: <Award className="w-8 h-8" />,
    value: 50,
    label: 'Case Studies',
    suffix: '+',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    value: 95,
    label: 'Success Rate',
    suffix: '%',
  },
]

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        onEnter: () => {
          if (!hasAnimated) {
            animateStats()
            setHasAnimated(true)
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [hasAnimated])

  const animateStats = () => {
    stats.forEach((stat, index) => {
      gsap.to(
        {},
        {
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            const progress = this.progress()
            const currentValue = Math.floor(stat.value * progress)
            setAnimatedStats((prev) => {
              const newStats = [...prev]
              newStats[index] = currentValue
              return newStats
            })
          },
        },
      )
    })
  }

  return (
    <div ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {animatedStats[index].toLocaleString()}
                {stat.suffix}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
