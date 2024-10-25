'use client'

import { useCallback } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEditorStore } from '@/stores/editor'

export function AssetProcessor({ projectId }) {
  const supabase = createClientComponentClient()
  const addAsset = useEditorStore((state) => state.addAsset)

  const uploadAsset = useCallback(async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${projectId}/${fileName}`

    try {
      const { data, error } = await supabase.storage
        .from('assets')
        .upload(filePath, file)

      if (error) throw error

      const { data: { publicUrl } } = supabase.storage
        .from('assets')
        .getPublicUrl(filePath)

      const assetType = file.type.startsWith('image/') ? 'image' :
                       file.type.startsWith('audio/') ? 'audio' :
                       file.type.startsWith('video/') ? 'video' : 'other'

      const asset = {
        projectId,
        type: assetType,
        url: publicUrl,
        metadata: {
          size: file.size,
          type: file.type,
          name: file.name
        }
      }

      const { data: assetData } = await supabase
        .from('assets')
        .insert(asset)
        .select()
        .single()

      addAsset(assetData)
      return assetData
    } catch (error) {
      console.error('Error uploading asset:', error)
      throw error
    }
  }, [projectId, supabase, addAsset])

  return null
}
