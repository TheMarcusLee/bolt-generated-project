import { Configuration } from 'anthropic'

const config = new Configuration({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export interface ScriptSegment {
  text: string
  duration: number
  visualPrompt: string
}

export async function generateVideoScript(prompt: string): Promise<ScriptSegment[]> {
  const systemPrompt = `Create a video script with the following format:
    - Break down into 5-15 second segments
    - Include visual descriptions for each segment
    - Format as JSON array of segments with text, duration, and visualPrompt
    Topic: ${prompt}`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: systemPrompt
        }]
      })
    })

    const data = await response.json()
    return JSON.parse(data.content[0].text)
  } catch (error) {
    console.error('Error generating script:', error)
    throw error
  }
}
