import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Brand: charcoal #414141 · indigo #5858CC · energy #EC5B13 · cream #FAEDCD
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const title = searchParams.get('title')?.slice(0, 100) || 'The AI mentor that knows you'
    const readTime = searchParams.get('readTime')

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: '#FDF8EC',
            padding: '64px 80px',
            fontFamily: 'sans-serif',
            color: '#262626',
            position: 'relative',
          }}
        >
          {/* Rising sun, clipped by the horizon line */}
          <div
            style={{
              position: 'absolute',
              right: 96,
              bottom: 0,
              width: 360,
              height: 180,
              borderTopLeftRadius: 360,
              borderTopRightRadius: 360,
              background: 'radial-gradient(circle at 50% 100%, #FFB36B 0%, #EC5B13 80%)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 6,
              backgroundColor: '#414141',
              display: 'flex',
            }}
          />

          {/* Brand row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 44,
                background: 'radial-gradient(circle at 50% 30%, #FFB36B 0%, #EC5B13 75%)',
                display: 'flex',
              }}
            />
            <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', display: 'flex' }}>
              horizon
            </div>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 28,
              maxWidth: 920,
              marginBottom: 60,
            }}
          >
            <div
              style={{
                fontSize: title.length > 50 ? 56 : 76,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#262626',
                display: 'flex',
              }}
            >
              {title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {readTime && (
                <div
                  style={{
                    display: 'flex',
                    padding: '8px 20px',
                    borderRadius: 999,
                    backgroundColor: '#5858CC',
                    color: '#FDF8EC',
                    fontSize: 22,
                    fontWeight: 600,
                  }}
                >
                  {readTime}
                </div>
              )}
              <div style={{ fontSize: 22, color: '#737373', display: 'flex' }}>excentrix.tech</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (_e: unknown) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
