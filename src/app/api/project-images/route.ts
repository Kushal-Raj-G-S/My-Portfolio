import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const repoName = request.nextUrl.searchParams.get('repo')
    if (!repoName) {
      return NextResponse.json({ images: [], videos: [] })
    }

    const projectsDir = path.join(process.cwd(), 'public', 'media', 'projects', repoName)

    if (!fs.existsSync(projectsDir)) {
      return NextResponse.json({ images: [], videos: [] })
    }

    const files = await fs.promises.readdir(projectsDir)
    
    // Scan images
    const validImageExts = ['.jpg', '.jpeg', '.png', '.webp']
    const images = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase()
        const nameWithoutExt = path.basename(file, ext).toLowerCase()
        return validImageExts.includes(ext) && nameWithoutExt !== 'logo'
      })
      .map((file) => `/media/projects/${repoName}/${file}`)
      .sort((a, b) => {
        const getNum = (str: string) => {
          const match = path.basename(str).match(/^(\d+)/)
          return match ? parseInt(match[1], 10) : Infinity
        }
        const aNum = getNum(a)
        const bNum = getNum(b)
        if (aNum !== bNum) return aNum - bNum
        return a.localeCompare(b)
      })

    // Scan videos in the "video" subdirectory
    const videoDir = path.join(projectsDir, 'video')
    let videos: string[] = []
    
    if (fs.existsSync(videoDir)) {
      const videoFiles = await fs.promises.readdir(videoDir)
      const validVideoExts = ['.mp4', '.webm', '.ogg', '.mov']
      videos = videoFiles
        .filter((file) => {
          const ext = path.extname(file).toLowerCase()
          return validVideoExts.includes(ext)
        })
        .map((file) => `/media/projects/${repoName}/video/${file}`)
        .sort()
    }

    return NextResponse.json({ images, videos })
  } catch (error) {
    console.error('Error scanning project media directory:', error)
    return NextResponse.json({ images: [], videos: [] })
  }
}
