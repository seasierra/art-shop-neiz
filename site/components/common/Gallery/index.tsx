import SwiperCore, { Pagination, Navigation, Lazy } from 'swiper'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide } from 'swiper/react'
//import { CldImage } from 'next-cloudinary';
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import AdaptiveVideoPlayer from '../AdaptiveVideoPlayer'
import { lazyload } from '@cloudinary/react'

SwiperCore.use([Pagination, Navigation])

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
}

const OptimizedCldImage = ({
  src,
  width,
  height,
  alt,
  placeholder,
  blurDataURL,
}: any) => {
  const optimizedSrc = src.replace('/upload/', '/upload/q_auto,f_auto/')

  return (
    /*
    <CldImage
      alt={alt}
      src={optimizedSrc}
      width={width}
      height={height}
      style={{ transform: 'translate3d(0, 0, 0)' }}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      loading="lazy"
    />
    */
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
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
  const galleryId = encodeURIComponent(title)
  const [isVideo, setIsVideo] = useState(false)

  //const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0)
  const [nextSlide, setNextSlide] = useState(1)

  useEffect(() => {
    setNextSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, slides.length])
  /*
  useEffect(() => {
    setLoaded(true);
  }, []);
*/
  const lightboxOptions = { selector: '[data-gallery="' + galleryId + '"]' }

  const handleSlideChange = (swiper: SwiperCore) => {
    setIsVideo(slides[swiper.realIndex].assetName.includes('video'))
    setCurrentSlide(swiper.realIndex)
  }

  return (
    <div className="project item col-md-7 mx-auto mb-6 mb-md-9 offline">
      <div className="post-slider mb-3 mb-md-4">
        <Swiper
          slidesPerView={1}
          spaceBetween={5}
          pagination={{ clickable: true }}
          navigation={true}
          loop={true}
          autoHeight={true} // добавить это
          style={{ height: isVideo ? '500px' : 'auto' }}
          onSlideChange={handleSlideChange}
          onSlideChangeTransitionStart={(swiper) => {
            setIsVideo(slides[swiper.realIndex].assetName.includes('video'))
          }}
        >
          {slides.map(({ assetName, size, blurDataUrl, alt }, idx) => (
            <SwiperSlide key={idx}>
              {/* Preload the next slide */}
              {idx === nextSlide && (
                <OptimizedCldImage
                  alt={slides[nextSlide].alt}
                  src={slides[nextSlide].assetName}
                  width={slides[nextSlide].size[0]}
                  height={slides[nextSlide].size[1]}
                  placeholder="blur"
                  blurDataURL={slides[nextSlide].blurDataUrl}
                />
              )}

              {/* Render the current slide */}
              <a
                className="relative block h-full w-full"
                // href={require(`@assets/image/${id}/${idx}.jpg`).default}
                data-gallery={galleryId}
                onClick={(event) => {
                  event.preventDefault()
                  // Open lightbox
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
