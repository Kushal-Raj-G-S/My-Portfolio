'use client'

import { useEffect, useRef, useState } from 'react'

// Home's ghost-title watermark renders the literal text "._." (title "._" plus
// the trailing "." every route always appends) — a period, underscore, period.
// Purely by typographic accident that reads as two eyes and a flat mouth. This
// replaces those three glyphs with three real shapes at the exact same
// proportions (measured from the live rendered glyphs: eyes are 27x27px
// circles 115px apart center-to-center, the mouth is a 72x14px bar 12px below
// the eyes' baseline, all at a 185.888px reference font-size) — expressed in
// em so it scales with the responsive vw-based title size exactly like the
// text used to, without any resize-observer JS.
const EYE_SIZE = 27 / 185.888
const EYE_GAP = 115 / 185.888
const MOUTH_WIDTH = 72 / 185.888
const MOUTH_HEIGHT = 14 / 185.888
const EYE_TOP = 0.49
const MOUTH_TOP = EYE_TOP + EYE_SIZE + 12 / 185.888
const EYE1_LEFT = 0
const EYE2_LEFT = EYE_GAP
const MOUTH_LEFT = (EYE1_LEFT + EYE_SIZE / 2 + (EYE2_LEFT + EYE_SIZE / 2)) / 2 - MOUTH_WIDTH / 2

type Expression = 'neutral' | 'happy' | 'sad' | 'surprised' | 'wink' | 'blink'

// Every expression is still just the same two circles + one rectangle,
// restyled with transforms/border-radius — no new shapes added.
const EYE_TRANSFORM: Record<Expression, { eye1: string; eye2: string }> = {
  neutral: { eye1: 'none', eye2: 'none' },
  happy: { eye1: 'scaleY(0.82)', eye2: 'scaleY(0.82)' },
  sad: { eye1: 'scaleY(0.88) translateY(10%)', eye2: 'scaleY(0.88) translateY(10%)' },
  surprised: { eye1: 'scale(1.25)', eye2: 'scale(1.25)' },
  wink: { eye1: 'none', eye2: 'scaleY(0.12)' },
  blink: { eye1: 'scaleY(0.12)', eye2: 'scaleY(0.12)' },
}

const MOUTH_STYLE: Record<Expression, { transform: string; radius: string }> = {
  neutral: { transform: 'none', radius: '2px' },
  happy: {
    transform: `translateY(${MOUTH_HEIGHT * 1.4}em) scaleY(2.6)`,
    radius: `0 0 ${MOUTH_WIDTH}em ${MOUTH_WIDTH}em`,
  },
  sad: {
    transform: `translateY(-${MOUTH_HEIGHT * 1.1}em) scaleY(1.8)`,
    radius: `${MOUTH_WIDTH}em ${MOUTH_WIDTH}em 0 0`,
  },
  surprised: { transform: 'scaleX(0.5) scaleY(3.6)', radius: '50%' },
  wink: { transform: 'rotate(-10deg) scaleY(1.3)', radius: '3px' },
  blink: { transform: 'scaleX(0.72) scaleY(1.6)', radius: '2px' },
}

// Idle "personality" cycle: mostly a quick blink, occasionally a beat of an
// actual expression, otherwise resting neutral. Hovering always wins (happy).
const IDLE_POOL: { type: Expression; hold: number; weight: number }[] = [
  { type: 'blink', hold: 90, weight: 6 },
  { type: 'sad', hold: 750, weight: 1 },
  { type: 'surprised', hold: 600, weight: 1 },
  { type: 'wink', hold: 550, weight: 1 },
  { type: 'happy', hold: 700, weight: 1 },
]

function pickIdle(excludeType?: Expression) {
  const pool = IDLE_POOL.filter((e) => e.type !== excludeType)
  const total = pool.reduce((sum, e) => sum + e.weight, 0)
  let r = Math.random() * total
  for (const entry of pool) {
    if (r < entry.weight) return entry
    r -= entry.weight
  }
  return pool[0]
}

export default function HomeFaceMark() {
  const [expression, setExpression] = useState<Expression>('neutral')
  const [hovered, setHovered] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const lastType = useRef<Expression>('neutral')

  useEffect(() => {
    const scheduleNext = () => {
      timer.current = setTimeout(tick, 900 + Math.random() * 1400)
    }
    const tick = () => {
      // Never repeat the same expression back to back — always exclude
      // whatever just played, so e.g. two sads or two blinks in a row can't happen.
      const next = pickIdle(lastType.current)
      lastType.current = next.type
      setExpression(next.type)
      timer.current = setTimeout(() => {
        setExpression('neutral')
        scheduleNext()
      }, next.hold)
    }
    scheduleNext()
    return () => clearTimeout(timer.current)
  }, [])

  const active = hovered ? 'happy' : expression
  const eyes = EYE_TRANSFORM[active]
  const mouth = MOUTH_STYLE[active]
  const fastTransition = active === 'blink' || active === 'wink'

  return (
    <span
      className="relative inline-block select-none align-baseline"
      style={{ width: `${EYE2_LEFT + EYE_SIZE}em`, height: '1em' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden
    >
      <span
        className={`absolute rounded-full bg-white ease-out ${fastTransition ? 'transition-transform duration-100' : 'transition-transform duration-200'}`}
        style={{
          left: `${EYE1_LEFT}em`,
          top: `${EYE_TOP}em`,
          width: `${EYE_SIZE}em`,
          height: `${EYE_SIZE}em`,
          transform: eyes.eye1,
        }}
      />
      <span
        className={`absolute rounded-full bg-white ease-out ${fastTransition ? 'transition-transform duration-100' : 'transition-transform duration-200'}`}
        style={{
          left: `${EYE2_LEFT}em`,
          top: `${EYE_TOP}em`,
          width: `${EYE_SIZE}em`,
          height: `${EYE_SIZE}em`,
          transform: eyes.eye2,
        }}
      />
      <span
        className={`absolute bg-white ease-out ${fastTransition ? 'transition-transform duration-100' : 'transition-all duration-200'}`}
        style={{
          left: `${MOUTH_LEFT}em`,
          top: `${MOUTH_TOP}em`,
          width: `${MOUTH_WIDTH}em`,
          height: `${MOUTH_HEIGHT}em`,
          borderRadius: mouth.radius,
          transform: mouth.transform,
        }}
      />
    </span>
  )
}
