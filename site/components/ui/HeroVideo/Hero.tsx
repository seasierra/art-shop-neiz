import React, { FC, useEffect, useState } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedVideo } from '@cloudinary/react'

import { Container } from '@components/ui'
import { ArrowRight } from '@components/icons'
import s from './Hero.module.css'
import Link from 'next/link'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { trim } from '@cloudinary/url-gen/actions/videoEdit'
import { findClosest } from '@lib/utils'
interface HeroProps {
  className?: string
  sizes: number[]
  videoSrc: string
}

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
})

const Hero: FC<HeroProps> = ({ sizes = [320, 480, 720, 1080], videoSrc }) => {
  const [currentSize, setCurrentSize] = useState(0)

  useEffect(() => {
    const scrSize = screen.width

    setCurrentSize(findClosest(sizes, scrSize))
  }, [sizes])

  console.log(currentSize)

  return (
    <div className="bg-accent-9 border-b border-t border-accent-2">
      <header className="w-full">
        <video className="sm:none">
          <source
            src={cld.video(`${videoSrc}`).resize(scale().width(320)).toURL()}
          ></source>
        </video>
        {/* <AdvancedVideo
          className="w-full"
          autoPlay
          playsInline
          muted
          loop
          cldVid={cld
            .video('media/main_ibrzrf')
            .resize(scale().width(currentSize))
            .format('mp4')}
          cldPoster={cld
            .video('media/main_ibrzrf')
            .videoEdit(trim().startOffset(1).endOffset(3).duration(1))
            .format('jpg')}
        /> */}
      </header>
    </div>
  )
}

export default Hero
