'use client'

import { useRootBackground } from '@/contexts/RootBackgroundContext'
import Image from 'next/image'
import React, { memo } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

const RootBackground: React.FC = () => {
  const { isVideoPlayed, toggleVideo } = useRootBackground()

  return (
    <>
      <button
        aria-label="Audio toggle"
        type="button"
        className="fixed right-0 top-0 z-[120] mr-3 mt-3 leading-none md:mr-5 md:mt-5 lg:mr-10"
        onClick={() => toggleVideo()}
      >
        {isVideoPlayed ? <FiVolume2 size={18} /> : <FiVolumeX size={18} />}
      </button>
      <div className="fixed left-0 top-0 h-full w-full overflow-hidden bg-white dark:bg-black">
        <div className="relative w-full h-full">
          <Image
            src="/media/bbg.jpg"
            alt="Background image"
            className={'block h-full w-full object-cover brightness-125'}
            fill
            unoptimized
          />
          <div className="absolute inset-0 bg-white/10 backdrop-brightness-110"></div>
        </div>
        {isVideoPlayed && (
          <video
            src="/media/bg.mp4"
            loop
            autoPlay
            muted={false}
            playsInline
            onPlay={() => console.log('Video is playing')}
            onError={(e) => console.error('Video error:', e)}
            className={'absolute top-0 z-20 block h-full w-full object-cover brightness-110'}
          />
        )}
      </div>
    </>
  )
}

export default memo(RootBackground)
