'use client'
import BorderGlow from '@/app/components/BorderGlow'
import { animated, useSpring } from '@react-spring/web'
import { PropsWithChildren, useRef, useState } from 'react'

interface AnimatedCardProps {
  className?: string
  delay?: number
}

const AnimatedCard: React.FC<PropsWithChildren<AnimatedCardProps>> = ({ children, className = '', delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const springProps = useSpring({
    boxShadow: isHovered
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    config: {
      tension: 300,
      friction: 20,
    },
    delay,
  })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 6}deg) translateY(-8px)`
  }

  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current) cardRef.current.style.transform = ''
  }

  return (
    <BorderGlow borderRadius={8} glowRadius={22} glowIntensity={0.7} edgeSensitivity={32}>
      <animated.div
        ref={cardRef}
        style={{ ...springProps, transition: 'transform 300ms ease-out' }}
        className={`rounded-lg bg-white/50 p-6 backdrop-blur dark:bg-black/80 [transform-style:preserve-3d] ${className}`}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </animated.div>
    </BorderGlow>
  )
}

export default AnimatedCard
