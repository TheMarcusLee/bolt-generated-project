'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface AssetPanelProps {
  projectId: string
}

export function AssetPanel({ projectId }: AssetPanelProps) {
  const supabase = createClientComponentClient()

  const { data: assets } = useQuery({
    queryKey: ['assets', projectId],
    queryFn: async () => {
      const { data } = await supabase
        .from('assets')
        .select('*')
        .eq('project_id', projectId)
      return data
    },
  })

  return (
    <div className="h-full">
      <h3 className="text-lg font-semibold mb-4">Assets</h3>
      <div className="space-y-2">
        {assets?.map((asset) => (
          <div
            key={asset.id}
            className="p-2 bg-white rounded shadow"
          >
            <div className="text-sm font-medium">{asset.type}</div>
            <div className="text-xs text-gray-500 truncate">{asset.url}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
