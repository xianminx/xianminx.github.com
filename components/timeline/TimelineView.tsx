import React from 'react'
import Era from './Era'

export interface TimelineEvent {
  year: string | number
  month?: string
  event: string
  category?: string
  url?: string
  references?: string[]
}

export interface TimelineEra {
  era: string
  events: TimelineEvent[]
}

interface TimelineViewProps {
  data: TimelineEra[]
}

const TimelineView: React.FC<TimelineViewProps> = ({ data }) => {
  return (
    <div className="relative py-12">
      <div className="relative mx-auto my-4 max-w-4xl px-4">
        {/* Timeline axis with gradient effect */}
        <div className="absolute left-6 z-0 h-full w-0.5 bg-gradient-to-b from-purple-400 via-purple-500 to-pink-500 opacity-50 md:left-8"></div>

        {/* Timeline content container */}
        <div className="relative min-h-[60vh] space-y-8">
          {data.map((era, index) => (
            <Era key={era.era} era={era} isEven={false} />
          ))}
        </div>

        {/* Back to top button with improved animation */}
        <button
          className="fixed bottom-8 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:from-purple-600 hover:to-pink-600 hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:bottom-8 sm:right-8 sm:h-12 sm:w-12 dark:shadow-purple-500/20"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>

      {/* Decorative elements */}
      {/* <div className="pointer-events-none absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-purple-50/50 via-purple-50/30 to-transparent dark:from-purple-950/30 dark:via-purple-950/20"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-pink-50/50 via-pink-50/30 to-transparent dark:from-pink-950/30 dark:via-pink-950/20"></div> */}
    </div>
  )
}

export default TimelineView
