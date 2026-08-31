import { SiCss3, SiDocker, SiJavascript, SiLatex, SiPython, SiTypescript } from 'react-icons/si'

type LangIconType = React.ComponentType<{ size?: number; color?: string }>

// Real brand marks for the languages that actually show up in this repo set
// (GitHub's language names, not the display names) — same "real logo, own
// color" approach as the Skills accordion. Anything not listed here (MATLAB,
// PLpgSQL, Unknown, ...) has no Simple Icons mark at all, so
// LangTextAnimation falls back to the plain colored dot for those.
export const LANG_ICONS: Record<string, { Icon: LangIconType; color: string }> = {
  Python: { Icon: SiPython, color: '#3776AB' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  CSS: { Icon: SiCss3, color: '#1572B6' },
  Dockerfile: { Icon: SiDocker, color: '#2496ED' },
  TeX: { Icon: SiLatex, color: '#008080' },
}
