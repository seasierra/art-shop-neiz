import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedVideo, lazyload } from '@cloudinary/react'
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
  poster: string
  videoSrc: string
}

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
})

const Video: React.FC<{
  size: keyof typeof videoSizes
  poster: string
  src: string
}> = ({ size, src, poster }) => (
  <AdvancedVideo
    className={`hidden w-full ${s[size]} `}
    autoPlay
    playsInline
    muted
    loop
    preload="none"
    cldVid={cld.video(src).resize(scale().width(videoSizes[size]))}
    cldPoster={cld.image(poster)}
  />
)

export default function AdaptiveVideoPlayer({
  sizes = ['sm', 'md', 'lg', 'xl'],
  poster,
  videoSrc,
}: AdaptiveVideoPlayerProps) {
  return (
    <div className="">
      <Video size="sm" src={videoSrc} poster={poster} />
      <Video size="md" src={videoSrc} poster={poster} />
      <Video size="lg" src={videoSrc} poster={poster} />
      <Video size="xl" src={videoSrc} poster={poster} />
    </div>
  )
}
