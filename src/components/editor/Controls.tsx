'use client'

import { PlayerRef } from '@remotion/player'

interface ControlsProps {
  playerRef: PlayerRef
}

export function Controls({ playerRef }: ControlsProps) {
  return (
    <div className="h-16 bg-gray-700 flex items-center justify-center gap-4">
      <button
        onClick={() => playerRef?.play()}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Play
      </button>
      <button
        onClick={() => playerRef?.pause()}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Pause
      </button>
    </div>
  )
}
