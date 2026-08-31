'use client'
import TextTransition from '@/app/components/TextTransition'
import langColors from '@/constans/langColors'
import { LANG_ICONS } from '@/constans/langIcons'
import { useMount } from '@/contexts/MountContext'
import { config } from '@react-spring/web'
import { memo, useEffect, useState } from 'react'

const LangTextAnimation: React.FC<{ items: string[] }> = ({ items }) => {
  const mounted = useMount()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => (index === items.length - 1 ? 0 : index + 1)), 3000)
    return () => clearTimeout(intervalId)
  }, [items])

  const current = items[index]
  const langIcon = LANG_ICONS[current]

  return (
    <>
      {mounted && (
        <div className="relative inline-block text-sm font-bold">
          <TextTransition springConfig={config.wobbly} inline>
            {current}
          </TextTransition>
          {langIcon ? (
            <span className="absolute -right-6 top-1/2 flex h-[1.15em] w-[1.15em] -translate-y-1/2 items-center justify-center transition-opacity duration-500">
              <langIcon.Icon size={15} color={langIcon.color} />
            </span>
          ) : (
            <span
              className="absolute -right-6 top-1/2 block h-[1em] w-[1em] -translate-y-1/2 rounded-full pt-px transition-colors duration-500"
              style={{ backgroundColor: langColors[current] || '#cccccc' }}
            />
          )}
        </div>
      )}
    </>
  )
}

export default memo(LangTextAnimation)
