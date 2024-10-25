export async function generateVoiceover(text: string, voice = 'en-US-JennyNeural') {
  const endpoint = process.env.AZURE_SPEECH_ENDPOINT
  const key = process.env.AZURE_SPEECH_KEY

  try {
    const response = await fetch(`${endpoint}/cognitiveservices/v1`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key!,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
      },
      body: `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis">
          <voice name="${voice}">${text}</voice>
        </speak>
      `
    })

    const audioBuffer = await response.arrayBuffer()
    return audioBuffer
  } catch (error) {
    console.error('Error generating voiceover:', error)
    throw error
  }
}
