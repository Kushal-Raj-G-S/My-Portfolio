'use client'
import { animated, useSpring } from '@react-spring/web'
import { PropsWithChildren, useState } from 'react'

interface AnimatedCardProps {
  className?: string
  delay?: number
}

const AnimatedCard: React.FC<PropsWithChildren<AnimatedCardProps>> = ({ children, className = '', delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)

  const springProps = useSpring({
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0px)',
    boxShadow: isHovered
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    config: {
      tension: 300,
      friction: 20,
    },
    delay,
  })

  return (
    <animated.div
      style={springProps}
      className={`rounded-lg bg-white/50 p-6 backdrop-blur dark:bg-black/80 transition-all ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </animated.div>
  )
}

export default AnimatedCard
