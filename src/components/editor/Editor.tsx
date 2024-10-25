'use client'

import { useState } from 'react'
import { Player, PlayerRef } from '@remotion/player'
import { Timeline } from './Timeline'
import { Controls } from './Controls'
import { AssetPanel } from './AssetPanel'
import { useEditorStore } from '@/stores/editor'

interface EditorProps {
  projectId: string
}

export function Editor({ projectId }: EditorProps) {
  const [playerRef, setPlayerRef] = useState<PlayerRef>(null)
  const { composition } = useEditorStore()

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex">
        <div className="w-64 bg-gray-100 p-4">
          <AssetPanel projectId={projectId} />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center bg-gray-900">
            {composition && (
              <Player
                ref={setPlayerRef}
                component={composition.component}
                durationInFrames={composition.durationInFrames}
                fps={30}
                compositionWidth={1920}
                compositionHeight={1080}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            )}
          </div>
          <Controls playerRef={playerRef} />
        </div>
      </div>
      <Timeline />
    </div>
  )
}
