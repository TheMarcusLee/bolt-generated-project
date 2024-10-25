'use client'

import { useQuery } from '@tanstack/react-query'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useState } from 'react'

export default function Projects() {
  const supabase = createClientComponentClient()
  const [newProjectName, setNewProjectName] = useState('')

  const { data: projects, refetch } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      return data
    },
  })

  const createProject = async () => {
    if (!newProjectName) return

    await supabase.from('projects').insert({
      name: newProjectName,
      status: 'draft',
      settings: {
        length: 30,
        aspect_ratio: '16:9',
      },
    })

    setNewProjectName('')
    refetch()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <div className="flex gap-4">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="New project name"
            className="px-4 py-2 border rounded-md"
          />
          <button
            onClick={createProject}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="block p-6 border rounded-lg hover:border-blue-500"
          >
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Status: {project.status}</span>
              <span>{new Date(project.created_at).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
