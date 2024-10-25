'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Editor } from '@/components/editor/Editor'
import { useParams } from 'next/navigation'

export default function ProjectPage() {
  const params = useParams()
  const supabase = createClientComponentClient()
  const projectId = params.id as string

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single()
      return data
    },
  })

  if (!project) return <div>Loading...</div>

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-gray-800 text-white px-6 py-4">
        <h1 className="text-xl font-bold">{project.name}</h1>
      </header>
      <main className="flex-1">
        <Editor projectId={projectId} />
      </main>
    </div>
  )
}
