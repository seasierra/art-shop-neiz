// Gallery.tsx
import SwiperCore, { Pagination, Navigation, Lazy } from 'swiper'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useRef, useState } from 'react'
import AdaptiveVideoPlayer from '../AdaptiveVideoPlayer'
import { lazyload } from '@cloudinary/react'
import Image from 'next/image'

SwiperCore.use([Pagination, Navigation, Lazy])

interface GalleryProps {
  id?: number
  title: string
  slides: {
    assetName: string
    size: number[]
    alt: string
    blurDataUrl: string
  }[]
  category: string
  activeVideo: number
  setActiveVideo: React.Dispatch<React.SetStateAction<number>>
}

interface OptimizedCldImageProps {
  src: string
  width: number
  height: number
  alt: string
  placeholder?: string
  blurDataURL?: string
  eagerLoading?: boolean // Добавляем eagerLoading пропс
}

const OptimizedCldImage = ({
  src,
  width,
  height,
  alt,
  placeholder,
  blurDataURL,
  eagerLoading,
}: OptimizedCldImageProps) => {
  const optimizedSrc = src.replace('/upload/', '/upload/q_auto,f_auto/')

  return (
    <Image
      loading={eagerLoading ? 'eager' : 'lazy'} // Здесь меняем значение loading в зависимости от eagerLoading
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      className="flex justify-center items-center"
    />
  )
}

export default function Gallery({
  id,
  title,
  category,
  slides,
  activeVideo,
  setActiveVideo,
}: GalleryProps) {
  const swiperRef = useRef<any>(null)
  const galleryId = encodeURIComponent(title)
  const [isVideo, setIsVideo] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [nextSlide, setNextSlide] = useState(1)

  useEffect(() => {
    setNextSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, slides.length])

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveVideo(0)
    setIsVideo(slides[swiper.realIndex].assetName.includes('video'))
    setCurrentSlide(swiper.realIndex)
  }

  useEffect(() => {
    setCurrentSlide(0)
  }, [slides])

  const swiperStyles = {
    minHeight: '100%',
    height: isVideo ? '100%' : 'auto',
    transition: 'height 0.7s ease', // Анимация изменения высоты
  }

  return (
    <div className="project item col-md-7 mx-auto mb-6 mb-md-9 offline">
      <div className="post-slider mb-3 mb-md-4">
        <Swiper
          style={swiperStyles} // Используем инлайн стили
          ref={swiperRef}
          observer={true}
          observeParents={true}
          slidesPerView={1}
          spaceBetween={5}
          pagination={{ clickable: true }}
          loop={true}
          autoHeight={true}
          onSlideChange={handleSlideChange}
          onSlideChangeTransitionStart={(swiper) => {
            setIsVideo(slides[swiper.realIndex].assetName.includes('video'))
          }}
        >
          {slides.map(({ assetName, size, blurDataUrl, alt }, idx) => (
            <SwiperSlide key={idx}>
              <a
                className="relative h-full w-full flex justify-center items-center"
                data-gallery={galleryId}
                onClick={(event) => {
                  event.preventDefault()
                }}
              >
                {assetName.includes('mp4') ? (
                  <AdaptiveVideoPlayer
                    videoSrc={assetName}
                    poster="https://res.cloudinary.com/dnivjtz3i/image/upload/v1678030124/assets/1_video1_preview.png"
                    autoPlay={false}
                    controls={false}
                    activeVideo={activeVideo}
                    setActiveVideo={setActiveVideo}
                  />
                ) : (
                  <OptimizedCldImage
                    alt={alt}
                    src={assetName}
                    width={size[0]}
                    height={size[1]}
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                    eagerLoading={idx === nextSlide} // Передаем eagerLoading пропс
                  />
                )}
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="post-header">
        <h2 className="post-title h4 mb-1 fw-normal">
          <a className="link-white" href="">
            {title}
          </a>
        </h2>
      </div>
      <div className="post-footer">
        <ul className="post-meta">
          <li className="post-comments">{category}</li>
        </ul>
      </div>
    </div>
  )
}
