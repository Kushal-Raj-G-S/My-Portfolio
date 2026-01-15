'use client'
import { animated, config, useInView, useSpring } from '@react-spring/web'
import { PropsWithChildren } from 'react'

interface AnimatedSectionProps {
  delay?: number
  className?: string
}

const AnimatedSection: React.FC<PropsWithChildren<AnimatedSectionProps>> = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({
    once: true,
    rootMargin: '-50px 0px',
  })

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px)' : 'translateY(50px)',
    config: config.gentle,
    delay,
  })

  return (
    <animated.section ref={ref} style={props} className={className}>
      {children}
    </animated.section>
  )
}

export default AnimatedSection
