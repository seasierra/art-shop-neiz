import React, { useRef, useState } from 'react';
import s from './AdaptiveVideo.module.css';

const videoSizes = {
  sm: 320,
  md: 480,
  lg: 720,
  xl: 1080,
};

interface AdaptiveVideoPlayerProps {
  sizes?: ('sm' | 'md' | 'lg' | 'xl')[];
  poster: string;
  videoSrc: string;
  autoPlay: boolean;
  controls: boolean;
}

const Video: React.FC<{
  autoPlay: boolean;
  size: 'sm' | 'md' | 'lg' | 'xl';
  poster: string;
  src: string;
  controls: boolean;
  isPlaying: boolean;
}> = ({ size, src, poster, autoPlay, controls, isPlaying }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying && video.paused) {
        video.play();
      } else if (!isPlaying && !video.paused) {
        video.pause();
      }
    }
  }, [isPlaying]);

  return (
    <video
      className={`hidden w-full ${s[size]}`}
      autoPlay={autoPlay}
      muted={autoPlay}
      loop
      controls={controls}
      ref={videoRef}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default function AdaptiveVideoPlayer({
  sizes = ['sm', 'md', 'lg', 'xl'],
  poster,
  videoSrc,
  autoPlay,
  controls,
}: AdaptiveVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const handlePlayButtonClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  return (
    <div className="">
      {(!autoPlay && !isPlaying) && (
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

      {sizes.map((size) => (
        <Video
          key={size}
          size={size}
          src={videoSrc}
          poster={poster}
          autoPlay={autoPlay}
          controls={controls}
          isPlaying={isPlaying}
        />
      ))}
    </div>
  );
}