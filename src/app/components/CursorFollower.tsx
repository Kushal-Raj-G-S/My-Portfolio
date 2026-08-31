'use client'

import { useCursorFollower } from '@/contexts/CursorFollowerContext'
import { animated, useSpring } from '@react-spring/web'
import { memo } from 'react'

const CursorFollower: React.FC = () => {
  const { circle, start, scaling, click } = useCursorFollower()

  const wrapperStyles = useSpring({
    to: { x: circle.x - 16, y: circle.y - 16 },
    config: {
      mass: 3,
    },
  })

  const circleStyles = useSpring({
    to: { scale: scaling ? 1.5 : 1 },
    config: {
      mass: 3,
      duration: 100,
    },
  })

  return (
    <>
      {start && (
        <animated.div
          style={{
            ...wrapperStyles,
          }}
          className="pointer-events-none fixed left-0 top-0 z-[140] hidden h-8 w-8 select-none md:block"
        >
          {/* Soft trailing glow */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full"
            style={{
              boxShadow: '0 0 22px 8px rgba(202,138,4,0.35)',
              background: 'radial-gradient(circle, rgba(202,138,4,0.25) 0%, transparent 70%)',
            }}
          />
          <animated.div
            style={{
              ...circleStyles,
            }}
            className={`${click ? 'bg-opacity-40' : 'bg-opacity-10'} h-full w-full rounded-full bg-yellow-600 ring-2 ring-yellow-600/70`}
          ></animated.div>
        </animated.div>
      )}
    </>
  )
}

export default memo(CursorFollower)
