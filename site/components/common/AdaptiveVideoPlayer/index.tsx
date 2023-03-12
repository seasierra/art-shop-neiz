import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedVideo } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
// import { trim } from '@cloudinary/url-gen/actions/videoEdit'

const videoSizes = {
  xs: 320,
  sm: 480,
  md: 720,
  lg: 1080,
}

interface AdaptiveVideoPlayerProps {
  sizes?: (keyof typeof videoSizes)[]
  videoSrc: string
}

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
})

export default function AdaptiveVideoPlayer({
  sizes = ['xs', 'sm', 'md', 'lg'],
  videoSrc,
}: AdaptiveVideoPlayerProps) {
  return (
    <div className="xs:w-full">
      {sizes.map((size) => (
        <video key={size} className={`xs:w-full`}>
          <source
            src={cld
              .video(`${videoSrc}`)
              .resize(scale().width(videoSizes[size]))
              .toURL()}
          />
        </video>
      ))}
    </div>
  )
}
