import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { SiGooglescholar, SiLeetcode } from 'react-icons/si'
import { SOCIALS } from './common'

// Shared between the home hero and the Contact page so both dock instances
// stay in sync — add a platform once here, not in two places.
export const SOCIAL_DOCK_ITEMS = [
  { icon: <FaInstagram size={18} />, label: 'Instagram', href: SOCIALS.IG },
  { icon: <FaGithub size={18} />, label: 'GitHub', href: SOCIALS.GH },
  { icon: <FaLinkedin size={18} />, label: 'LinkedIn', href: SOCIALS.IN },
  { icon: <SiGooglescholar size={18} />, label: 'Google Scholar', href: SOCIALS.SCHOLAR },
  { icon: <SiLeetcode size={18} />, label: 'LeetCode', href: SOCIALS.LEETCODE },
]
