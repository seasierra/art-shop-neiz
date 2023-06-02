import React, { useEffect, useRef, useState } from 'react';
import s from './AdaptiveVideo.module.css';

interface AdaptiveVideoPlayerProps {
  sizes?: ('small' | 'large')[];
  poster: string;
  videoSrc: string;
  autoPlay: boolean;
  controls: boolean;
}

const Video: React.FC<{
  autoPlay: boolean;
  size: 'small' | 'large';
  poster: string;
  src: string;
  controls: boolean;
  isPlaying: boolean;
}> = ({ size, src, poster, autoPlay, controls, isPlaying }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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

const AdaptiveVideoPlayer: React.FC<AdaptiveVideoPlayerProps> = ({
  sizes = ['small', 'large'],
  poster,
  videoSrc,
  autoPlay,
  controls,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentSizeIndex, setCurrentSizeIndex] = useState(0);

  const handlePlayButtonClick = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newIndex = windowWidth >= 720 ? 1 : 0;
      setCurrentSizeIndex(newIndex);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getVideoSrc = (size: 'small' | 'large', videoSrc: string) => {
    debugger
    if (size === 'small') {
      return videoSrc.replace('.mp4', '-small.mp4');
    }
    return videoSrc;
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

      <Video
        size={sizes[currentSizeIndex]}
        src={getVideoSrc(sizes[currentSizeIndex], videoSrc)}
        poster={poster}
        autoPlay={autoPlay}
        controls={controls}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default AdaptiveVideoPlayer;