'use client'
import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react'

interface AnimatedSkillProps {
  text: string
}

const AnimatedSkill: React.FC<AnimatedSkillProps> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false)

  const springProps = useSpring({
    scale: isHovered ? 1.1 : 1,
    fontWeight: isHovered ? '700' : '400',
    color: isHovered ? 'var(--color-accent)' : 'inherit',
    config: {
      tension: 300,
      friction: 10,
    },
  })

  return (
    <animated.li
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="transition-all duration-300"
    >
      {text}
    </animated.li>
  )
}

export default AnimatedSkill
