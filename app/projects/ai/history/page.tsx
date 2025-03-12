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
    <div className="w-full bg-transparent text-gray-900 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col">
          {/* Header section */}
          <header className="pb-6 pt-8">
            <h1 className="text-center text-3xl font-bold">History of Artificial Intelligence</h1>
          </header>
          {/* Timeline view */}
          <div className="pb-24">
            <TimelineView data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}
