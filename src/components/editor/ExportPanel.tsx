'use client'

import { useState } from 'react'
import { useEditorStore } from '@/stores/editor'
import { renderMedia } from '@remotion/renderer'

export function ExportPanel() {
  const [exporting, setExporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const composition = useEditorStore((state) => state.composition)

  const handleExport = async () => {
    if (!composition) return
    setExporting(true)

    try {
      const outputLocation = `/tmp/${Date.now()}.mp4`
      
      await renderMedia({
        composition: composition.component,
        serveUrl: window.location.origin,
        codec: 'h264',
        outputLocation,
        onProgress: ({ progress }) => {
          setProgress(Math.round(progress * 100))
        },
      })

      // Here you would typically upload the rendered video
      // to your storage solution and create a download link
      
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setExporting(false)
      setProgress(0)
    }
  }

  return (
    <div className="p-4 border-t">
      <button
        onClick={handleExport}
        disabled={exporting || !composition}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
      >
        {exporting ? `Exporting (${progress}%)` : 'Export Video'}
      </button>
    </div>
  )
}
