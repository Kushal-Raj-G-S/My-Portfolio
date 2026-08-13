'use client'
import { animated, useInView, useSpring } from '@react-spring/web'

interface SkillBarProps {
  name: string
  level: number // 0-100
  color: string
  delay?: number
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, color, delay = 0 }) => {
  const [ref, inView] = useInView({
    once: true,
    rootMargin: '-50px 0px',
  })

  const props = useSpring({
    width: inView ? `${level}%` : '0%',
    config: {
      tension: 120,
      friction: 14,
    },
    delay,
  })

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between mb-1 text-sm">
        <span className="font-medium">{name}</span>
        <span>{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
        <animated.div
          className="h-2 rounded-full"
          style={{
            ...props,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  )
}

export default SkillBar
