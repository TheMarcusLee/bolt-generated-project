import { create } from 'zustand'
import { VideoComposition } from '@/components/editor/VideoComposition'

interface Asset {
  id: string
  type: 'image' | 'audio' | 'video'
  url: string
  metadata: Record<string, any>
}

interface EditorState {
  assets: Asset[]
  segments: any[]
  composition: {
    component: typeof VideoComposition
    durationInFrames: number
  } | null
  addAsset: (asset: Asset) => void
  updateSegment: (id: string, updates: Partial<any>) => void
  setComposition: (composition: EditorState['composition']) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  assets: [],
  segments: [],
  composition: null,
  addAsset: (asset) =>
    set((state) => ({
      assets: [...state.assets, asset]
    })),
  updateSegment: (id, updates) =>
    set((state) => ({
      segments: state.segments.map((segment) =>
        segment.id === id ? { ...segment, ...updates } : segment
      )
    })),
  setComposition: (composition) => set({ composition })
}))
