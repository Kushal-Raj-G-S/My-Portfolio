'use client'

import TextTransition from '@/app/components/TextTransition'
import { PAGE_TITLES } from '@/constans/common'
import { useMount } from '@/contexts/MountContext'
import { config } from '@react-spring/web'
import { usePathname } from 'next/navigation'
import { memo, useEffect, useState } from 'react'
import HomeFaceMark from './HomeFaceMark'

const PageTitleAnimation: React.FC = () => {
  const [title, setTitle] = useState('')
  const pathname = usePathname()
  const mounted = useMount()

  useEffect(() => {
    // @ts-expect-error
    setTitle(PAGE_TITLES[pathname] || '')
  }, [pathname, mounted])

  // On '/', the title "._" plus the trailing "." every route always appends
  // renders as the literal text "._." — two dots and an underscore that, at
  // this display size, read as a little face. HomeFaceMark swaps that
  // coincidence for real shapes so it can actually blink/smile.
  const isHome = pathname === '/'

  return (
    <>
      {mounted && (
        <span className="fixed top-0 block select-none px-3 text-[calc(2rem+6.9vw)] md:left-16 md:px-5 lg:px-10 ">
          <span className="block text-[1.5em] font-bold md:text-[1.6em]">
            {isHome ? (
              <HomeFaceMark />
            ) : (
              <>
                <TextTransition springConfig={config.wobbly} inline>
                  <span data-text={title} className="after:content-[attr(data-text)]" />
                </TextTransition>
                <span data-text="." className="after:content-[attr(data-text)]" />
              </>
            )}
          </span>
        </span>
      )}
    </>
  )
}

export default memo(PageTitleAnimation)
