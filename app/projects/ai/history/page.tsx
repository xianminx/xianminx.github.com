'use client'

import { useState, useEffect } from 'react'
import TimelineView, { TimelineEvent, TimelineEra } from '@/components/timeline/TimelineView'
import timelineData from './milestones.json'

export default function AIHistory() {
  const [data, setData] = useState<TimelineEra[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      setData(timelineData as TimelineEra[])
    } catch (error) {
      console.error('Failed to load timeline data:', error)
      setError('Failed to load timeline data. Please try refreshing the page.')
    }
  }, [])

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-red-500">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading timeline data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-pink-50 text-gray-900 dark:from-gray-900 dark:via-purple-950/20 dark:to-pink-950/20 dark:text-white">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,0,255,0.1),rgba(255,0,150,0.05))]"></div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col">
          {/* Header section with enhanced styling */}
          <header className="relative pb-12 pt-16">
            <div className="text-center">
              <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                History of Artificial Intelligence
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                Exploring the fascinating journey from early concepts to modern breakthroughs
              </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 left-1/2 h-40 w-40 -translate-x-1/2 bg-purple-500/10 blur-3xl"></div>
            <div className="absolute -top-4 left-1/3 h-40 w-40 -translate-x-1/2 bg-pink-500/10 blur-3xl"></div>
          </header>

          {/* Timeline view with enhanced container */}
          <div className="relative pb-24">
            <TimelineView data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
