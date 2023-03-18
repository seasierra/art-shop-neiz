import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedVideo } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import s from './AdaptiveVideo.module.css' // import { trim } from '@cloudinary/url-gen/actions/videoEdit'

const videoSizes = {
  sm: 320,
  md: 480,
  lg: 720,
  xl: 1080,
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

const Video: React.FC<{
  size: keyof typeof videoSizes
  src: string
}> = ({ size, src }) => (
  <AdvancedVideo
    className={`hidden w-full ${s[size]} `}
    autoPlay
    playsInline
    muted
    loop
    cldVid={cld
      .video(src)
      .resize(scale().width(videoSizes[size]))
      .format('mp4')}
    cldPoster={cld.video(src).format('jpg')}
  />
)

export default function AdaptiveVideoPlayer({
  sizes = ['sm', 'md', 'lg', 'xl'],
  videoSrc,
}: AdaptiveVideoPlayerProps) {
  return (
    <div className="">
      <Video size="sm" src={videoSrc} />
      <Video size="md" src={videoSrc} />
      <Video size="lg" src={videoSrc} />
      <Video size="xl" src={videoSrc} />
    </div>
  )
}
