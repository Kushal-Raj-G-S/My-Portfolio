import SocialDock from '@/app/components/SocialDock'
import { SOCIAL_DOCK_ITEMS } from '@/constans/socialDockItems'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-end gap-4 pb-20 md:justify-center md:pb-0">
      <h1 className="relative py-3">
        <span className="grid grid-cols-2">
          <span className="block text-center text-sm opacity-90">I'M</span>
        </span>{' '}
        <span className=" z-10 block text-[calc(1.825rem+6.9vw)] font-bold leading-none">KUSHAL RAJ G S</span>{' '}
        <span className="grid grid-cols-2 justify-items-end">
          <span className="block"></span>
          <span className="block text-sm opacity-90">AI Systems Engineer | Backend & Agentic Systems | Product Builder</span>
        </span>
      </h1>
      <SocialDock items={SOCIAL_DOCK_ITEMS} />
    </div>
  )
}
