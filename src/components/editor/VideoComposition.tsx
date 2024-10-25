import { AbsoluteFill, Sequence, Audio, Img } from 'remotion'
import { z } from 'zod'

export const schema = z.object({
  segments: z.array(z.object({
    id: z.string(),
    start: z.number(),
    duration: z.number(),
    imageUrl: z.string(),
    audioUrl: z.string().optional(),
    text: z.string()
  }))
})

export const VideoComposition = ({ segments }) => {
  return (
    <AbsoluteFill>
      {segments.map((segment) => (
        <Sequence key={segment.id} from={segment.start} durationInFrames={segment.duration}>
          <AbsoluteFill>
            <Img src={segment.imageUrl} />
            {segment.audioUrl && (
              <Audio src={segment.audioUrl} />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
              <p className="text-white text-2xl">{segment.text}</p>
            </div>
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  )
}
