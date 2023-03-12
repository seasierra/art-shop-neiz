// @ts-nocheck
import { Pagination, Navigation } from 'swiper'
import { SwiperSlide } from 'swiper/react'
import dynamic from 'next/dynamic'
import { CldImage } from 'next-cloudinary'

const DynamicSwiper = dynamic(
  () => import('swiper/react').then((swiper) => swiper.Swiper),
  {
    ssr: false,
  }
)

interface GalleryProps {
  id?: number
  title: string
  slides: string[]
  category: string
}

export default function Gallery({ id, title, category, slides }: GalleryProps) {
  const galleryId = encodeURIComponent(title)

  const lightboxOptions = { selector: '[data-gallery="' + galleryId + '"]' }

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 5,
    pagination: { clickable: true },
    navigation: true,
    loop: true,
  }

  return (
    <div className="project item col-md-7 mx-auto mb-6 mb-md-9 offline">
      <div className="post-slider mb-3 mb-md-4">
        <DynamicSwiper modules={[Pagination, Navigation]} {...swiperOptions}>
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              {({ isActive, isNext }) => {
                return (
                  <figure>
                    <a
                      className="relative block h-full w-full aspect-[3/4]"
                      // href={require(`@assets/image/${id}/${idx}.jpg`).default}
                      data-glightbox={`title:${title};data-gallery:${galleryId}`}
                      onClick={async (event) => {
                        event.preventDefault()

                        const GLightbox = (await import('glightbox')).default

                        GLightbox(lightboxOptions).open()
                      }}
                    >
                      <CldImage
                        loading={isActive || isNext ? 'eager' : 'lazy'}
                        alt={title}
                        src={`assets/${slide}`}
                        fill
                        sizes="sm: 100vw, md; 100vw, xl: 100vw"
                      />
                      {/* <img
                  className="lazyload"
                  data-src={require(`@assets/image/${id}/${idx}.jpg`).default}
                  src={require(`@assets/image/${id}/${idx}.jpg`).default}
                  alt={title}
                /> */}
                    </a>
                  </figure>
                )
              }}
            </SwiperSlide>
          ))}
        </DynamicSwiper>
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
