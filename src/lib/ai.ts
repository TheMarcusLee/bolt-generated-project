import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function generateScript(prompt: string) {
  const response = await fetch('/api/ai/script', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })
  return response.json()
}

export async function generateVoiceover(text: string) {
  const response = await fetch('/api/ai/voice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  return response.json()
}

export async function generateImages(prompt: string) {
  const response = await fetch('/api/ai/images', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })
  return response.json()
}
