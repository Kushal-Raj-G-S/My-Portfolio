import { SOCIALS } from '@/constans/common'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { SiGooglescholar, SiLeetcode } from 'react-icons/si'
import SocialDock from './components/SocialDock'

export const dynamic = 'force-dynamic'

const SOCIAL_DOCK_ITEMS = [
  { icon: <FaInstagram size={18} />, label: 'Instagram', href: SOCIALS.IG },
  { icon: <FaGithub size={18} />, label: 'GitHub', href: SOCIALS.GH },
  { icon: <FaLinkedin size={18} />, label: 'LinkedIn', href: SOCIALS.IN },
  { icon: <SiGooglescholar size={18} />, label: 'Google Scholar', href: SOCIALS.SCHOLAR },
  { icon: <SiLeetcode size={18} />, label: 'LeetCode', href: SOCIALS.LEETCODE },
]

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
