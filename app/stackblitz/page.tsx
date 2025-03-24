'use client'

import PageTitle from '@/components/PageTitle'

export default function StackblitzPage() {
  return (
    <>
      <PageTitle>Contentlayer Example</PageTitle>
      <div className="prose dark:prose-invert max-w-none">
        <p className="mb-8 text-lg">
          This is a live example of Contentlayer integration with Next.js, demonstrating how to
          manage and render content using Contentlayer.
        </p>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl shadow-lg">
        <iframe
          src="https://stackblitz.com/edit/contentlayerdev-next-contentlayer-example-eyktqfxq?embed=1&file=README.md"
          className="absolute inset-0 h-full w-full border-0"
          title="Contentlayer Example"
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          loading="lazy"
        />
      </div>
    </>
  )
}
