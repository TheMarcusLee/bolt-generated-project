import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { generateVideoScript } from '@/lib/ai/claude'
import { generateVoiceover } from '@/lib/ai/azure-speech'
import { generateImage } from '@/lib/ai/replicate'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })
  const { prompt } = await request.json()

  try {
    // Generate script segments
    const segments = await generateVideoScript(prompt)

    // Process each segment
    const processedSegments = await Promise.all(
      segments.map(async (segment) => {
        // Generate voiceover
        const audioBuffer = await generateVoiceover(segment.text)
        
        // Generate image
        const image = await generateImage(segment.visualPrompt)

        // Upload assets to Supabase
        const audioPath = `${params.id}/audio/${Date.now()}.mp3`
        const imagePath = `${params.id}/images/${Date.now()}.png`

        await supabase.storage.from('assets').upload(
          audioPath,
          audioBuffer
        )

        await supabase.storage.from('assets').upload(
          imagePath,
          Buffer.from(await (await fetch(image.output)).arrayBuffer())
        )

        // Get public URLs
        const { data: { publicUrl: audioUrl } } = supabase.storage
          .from('assets')
          .getPublicUrl(audioPath)

        const { data: { publicUrl: imageUrl } } = supabase.storage
          .from('assets')
          .getPublicUrl(imagePath)

        return {
          ...segment,
          audioUrl,
          imageUrl
        }
      })
    )

    // Update project with generated content
    await supabase
      .from('projects')
      .update({
        content: processedSegments,
        status: 'completed'
      })
      .eq('id', params.id)

    return NextResponse.json({ success: true, segments: processedSegments })
  } catch (error) {
    console.error('Generation failed:', error)
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 })
  }
}
