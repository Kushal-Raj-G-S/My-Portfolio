'use client'

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Children, cloneElement, ReactElement, useEffect, useRef, useState } from 'react'
import './SocialDock.css'

interface SpringOptions {
  mass?: number
  stiffness?: number
  damping?: number
}

interface DockItemData {
  icon: ReactElement
  label: string
  href: string
}

function DockItem({
  children,
  href,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  label,
}: {
  children: React.ReactNode
  href: string
  mouseX: ReturnType<typeof useMotionValue<number>>
  spring: SpringOptions
  distance: number
  magnification: number
  baseItemSize: number
  label: string
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const isHovered = useMotionValue(0)

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: baseItemSize }
    return val - rect.x - baseItemSize / 2
  })

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize])
  const size = useSpring(targetSize, spring)
  // A small extra lift layered on top of the size growth — real macOS-style
  // docks don't just scale an icon in place, they let it rise as it grows,
  // which reads as much more alive than size alone.
  const lift = useTransform(size, [baseItemSize, magnification], [0, -(magnification - baseItemSize) * 0.22])
  const liftSpring = useSpring(lift, spring)

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener"
      style={{ width: size, height: size, y: liftSpring }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className="dock-item"
      aria-label={label}
    >
      {Children.map(children, (child) => cloneElement(child as ReactElement, { isHovered } as any))}
    </motion.a>
  )
}

function DockLabel({ children, isHovered }: { children: React.ReactNode; isHovered?: ReturnType<typeof useMotionValue<number>> }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isHovered) return
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1)
    })
    return () => unsubscribe()
  }, [isHovered])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -4, scale: 0.85 }}
          animate={{ opacity: 1, y: 10, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
          className="dock-label"
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function DockIcon({ children }: { children: React.ReactNode }) {
  return <div className="dock-icon">{children}</div>
}

interface SocialDockProps {
  items: DockItemData[]
  spring?: SpringOptions
  magnification?: number
  distance?: number
  panelHeight?: number
  dockHeight?: number
  baseItemSize?: number
}

export default function SocialDock({
  items,
  spring = { mass: 0.15, stiffness: 170, damping: 15 },
  magnification = 52,
  distance = 110,
  panelHeight = 48,
  baseItemSize = 38,
}: SocialDockProps) {
  const mouseX = useMotionValue(Infinity)

  // dock-outer's reserved height stays fixed — the panel is absolutely
  // positioned (bottom: 0) inside it, so magnified/lifted icons can bulge
  // upward and overflow it freely without ever resizing this box. Animating
  // this height used to reflow the whole centered hero column on every
  // hover, shoving the name above it up and down — that's what "annoying"
  // meant here, not the icon motion itself.
  return (
    <motion.div style={{ height: panelHeight, scrollbarWidth: 'none' }} className="dock-outer">
      <motion.div
        onMouseMove={({ pageX }) => {
          mouseX.set(pageX)
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity)
        }}
        className="dock-panel"
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Social links"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            href={item.href}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            label={item.label}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  )
}
