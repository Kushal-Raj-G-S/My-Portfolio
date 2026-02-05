import { HOST } from '@/constans/common'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const postTitle = searchParams.get('title')

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 120px',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              textAlign: 'center',
              maxWidth: '1200px',
              lineHeight: 1.2,
              marginBottom: 40,
            }}
          >
            {postTitle || 'Kushal Raj G S'}
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#fbbf24',
              fontWeight: 600,
            }}
          >
            AI Product Builder & Developer
          </div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    },
  )
}
