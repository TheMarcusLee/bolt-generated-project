export async function generateImage(prompt: string) {
  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
        input: {
          prompt: prompt,
          negative_prompt: "blurry, low quality, distorted",
          num_outputs: 1,
          guidance_scale: 7.5,
          num_inference_steps: 50
        }
      })
    })

    const prediction = await response.json()
    return prediction
  } catch (error) {
    console.error('Error generating image:', error)
    throw error
  }
}
