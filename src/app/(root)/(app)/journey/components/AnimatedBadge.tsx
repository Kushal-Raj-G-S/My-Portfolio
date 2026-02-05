'use client'
import { animated, useSpring } from '@react-spring/web'
import { PropsWithChildren } from 'react'

interface AnimatedBadgeProps {
  isActive?: boolean
  color: string
}

const AnimatedBadge: React.FC<PropsWithChildren<AnimatedBadgeProps>> = ({ children, color, isActive = false }) => {
  const pulseProps = useSpring({
    from: { opacity: 0.7, scale: 0.95 },
    to: async (next) => {
      if (isActive) {
        // Only animate if badge is active (like "Current")
        while (true) {
          await next({ opacity: 1, scale: 1 })
          await next({ opacity: 0.7, scale: 0.95 })
        }
      } else {
        await next({ opacity: 1, scale: 1 })
      }
    },
    config: { tension: 100, friction: 10 },
  })

  return (
    <animated.span
      style={{
        backgroundColor: color,
        ...pulseProps,
      }}
      className="rounded-full px-3 py-1 text-xs text-white"
    >
      {children}
    </animated.span>
  )
}

export default AnimatedBadge
