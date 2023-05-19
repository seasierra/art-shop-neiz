import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedVideo, lazyload } from '@cloudinary/react'
import { scale } from '@cloudinary/url-gen/actions/resize'
import s from './AdaptiveVideo.module.css' // import { trim } from '@cloudinary/url-gen/actions/videoEdit'
import { useState } from 'react'



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
  autoPlay: boolean
  controls: boolean
}

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
})

const Video: React.FC<{
  autoPlay:boolean
  size: keyof typeof videoSizes
  poster: string  
  src: string
  controls: boolean
 
}> = ({ size, src, poster, autoPlay, controls }) =>{
 return(
  
  <AdvancedVideo
    className={`hidden w-full ${s[size]} `}
    autoPlay={autoPlay}
    playsInline
    muted
    loop
    preload="metadata"
    controls={controls}
    cldVid={cld.video(src).resize(scale().width(videoSizes[size]))}
    cldPoster={cld.image(poster)}
  > </AdvancedVideo>
)
}

export default function AdaptiveVideoPlayer({
  sizes = ['sm', 'md', 'lg', 'xl'],
  poster,
  videoSrc,
  autoPlay,
  controls
}: AdaptiveVideoPlayerProps) {
  const [autoplayState, setAutoplay] = useState(autoPlay);

  const toggleAutoplay = () => {
    setAutoplay(!autoplayState);
  };


  return (
    <div className="">
        {!autoplayState && (
       <button className={s.button} onClick={toggleAutoplay}>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
         <path d="M0 0h24v24H0V0z" fill="none"/>
         <path d="M8 5v14l11-7L8 5z"/>
       </svg>
     </button>
      )}
      
      <Video size="sm" src={videoSrc} poster={poster} autoPlay={autoplayState} controls={controls} />
      <Video size="md" src={videoSrc} poster={poster} autoPlay={autoplayState} controls={controls} />
      <Video size="lg" src={videoSrc} poster={poster} autoPlay={autoplayState} controls={controls} />
      <Video size="xl" src={videoSrc} poster={poster} autoPlay={autoplayState} controls={controls} />
    </div>
  )
}
