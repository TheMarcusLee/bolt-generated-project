'use client'

import { useEditorStore } from '@/stores/editor'

export function Timeline() {
  const { tracks } = useEditorStore()

  return (
    <div className="h-48 bg-gray-800 p-4">
      <div className="flex flex-col gap-2">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="h-12 bg-gray-700 rounded relative"
          >
            {track.clips.map((clip) => (
              <div
                key={clip.id}
                className="absolute h-full bg-blue-500 rounded"
                style={{
                  left: `${clip.start}%`,
                  width: `${clip.duration}%`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
