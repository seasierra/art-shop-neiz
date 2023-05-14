import SwiperCore, { Pagination, Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CldImage, CldVideoPlayer } from 'next-cloudinary';
import { useState } from 'react';

SwiperCore.use([Pagination, Navigation]);

interface GalleryProps {
  id?: number;
  title: string;
  slides: {
    assetName: string;
    size: number[];
    alt: string;
    blurDataUrl: string;
  }[];
  category: string;
}

export default function Gallery({ id, title, category, slides }: GalleryProps) {
  const galleryId = encodeURIComponent(title);
  const [isVideo, setIsVideo] = useState(false);

  const lightboxOptions = { selector: '[data-gallery="' + galleryId + '"]' };

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
        
          onSlideChangeTransitionStart={(swiper) => {

            setIsVideo(slides[swiper.realIndex].assetName.includes('video'));
          }}
         
       
        >
          {slides.map(({ assetName, size, blurDataUrl, alt }, idx) => (
            <SwiperSlide key={idx}>
              <a
                className="relative block h-full w-full"
                // href={require(`@assets/image/${id}/${idx}.jpg`).default}
                data-gallery={galleryId}
                onClick={async (event) => {
                  event.preventDefault();

                  const GLightbox = (await import('glightbox')).default;

                //  GLightbox(lightboxOptions).open();
                }}
              >
                {assetName.includes('video') ? (
                  <CldVideoPlayer width={300} height={300} src={assetName} />
                ) : (
                  <CldImage
                    alt={alt}
                    src={assetName}
                    width={size[0]}
                    height={size[1]}
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                    sizes="xs: 480px, md: 680px, xl: 1025px"
                  />
                )}
                {/* <img
                  className="lazyload"
                  data-src={require(`@assets/image/${id}/${idx}.jpg`).default}
                  src={require(`@assets/image/${id}/${idx}.jpg`).default}
                  alt={title}
                /> */}
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
  );
}