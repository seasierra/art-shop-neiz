import React, { useEffect, useRef, useState } from 'react'
import s from './AdaptiveVideo.module.css'
import { useMediaQuery } from 'react-responsive'

interface VideoProps {
  autoPlay: boolean
  size: 'small' | 'large'
  poster: string
  src: string
  controls: boolean
  isPlaying: boolean
  onLoadedData?: () => void
}

const Video: React.FC<VideoProps> = ({
  autoPlay,
  size,
  src,
  poster,
  controls,
  isPlaying,
  onLoadedData,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      if (isPlaying && video.paused) {
        video.play()
      } else if (!isPlaying && !video.paused) {
        video.pause()
      }
    }
  }, [isPlaying])

  return (
    <video
      className={`hidden w-full ${s[size]}`}
      autoPlay={autoPlay}
      muted={autoPlay}
      loop
      controls={controls}
      ref={videoRef}
      onLoadedData={onLoadedData}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}

interface AdaptiveVideoPlayerProps {
  sizes?: ('small' | 'large')[]
  poster: string
  videoSrc: string
  autoPlay: boolean
  controls: boolean
}

const AdaptiveVideoPlayer: React.FC<AdaptiveVideoPlayerProps> = ({
  sizes = ['small', 'large'],
  poster,
  videoSrc,
  autoPlay,
  controls,
}) => {
  const [isReady, setIsReady] = useState(false)
  const isLargeScreen = useMediaQuery({ minWidth: 720 })
  const size = isLargeScreen ? 'large' : 'small'

  const [isPlaying, setIsPlaying] = useState(autoPlay)

  const handlePlayButtonClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying)
  }

  const getVideoSrc = (size: 'small' | 'large', videoSrc: string) => {
    if (size === 'small') {
      return videoSrc.replace('.mp4', '-small.mp4')
    }
    return videoSrc
  }

  const handleLoadedData = () => {
    // Действия после загрузки видео
  }

  useEffect(() => {
    setIsReady(true)
  }, [])

  if (!isReady) {
    return null // Или любой другой способ отображения загрузки или запасного контента
  }

  return (
    <div className="">
      {!autoPlay && !isPlaying && (
        <button className={s.button} onClick={handlePlayButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="24px"
            height="24px"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        </button>
      )}

      <Video
        size={sizes[size === 'large' ? 1 : 0]}
        src={getVideoSrc(size, videoSrc)}
        poster={poster}
        autoPlay={autoPlay}
        controls={controls}
        isPlaying={isPlaying}
        onLoadedData={handleLoadedData}
      />
    </div>
  )
}

export default AdaptiveVideoPlayer
