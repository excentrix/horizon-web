import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        // Get title, truncate if too long
        const title = searchParams.get('title')?.slice(0, 100) || 'Horizon'
        const readTime = searchParams.get('readTime') || 'Read pending'

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        backgroundColor: '#f0eff5',
                        backgroundImage: 'linear-gradient(to bottom right, #111111, #000000)',
                        padding: '40px 80px',
                        fontFamily: 'sans-serif',
                        color: 'white',
                    }}
                >
                    {/* Logo / Brand */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '40px',
                        }}
                    >
                        <div style={{
                            fontSize: 30,
                            fontWeight: 900,
                            background: 'linear-gradient(to right, #ffffff, #666666)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            Horizon
                        </div>
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: '40px',
                            background: 'linear-gradient(to bottom, #ffffff, #999999)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            paddingRight: '40px',
                        }}
                    >
                        {title}
                    </div>

                    {/* Metadata Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px 24px',
                            borderRadius: '30px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#ffffff',
                            fontSize: 24,
                            fontWeight: 600,
                        }}
                    >
                        <span>{readTime}</span>
                    </div>

                    {/* Decorative Elements */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 40,
                            right: 40,
                            fontSize: 20,
                            color: '#666',
                        }}
                    >
                        excentrix.tech
                    </div>

                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '-10%',
                            width: '400px',
                            height: '400px',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent)',
                            borderRadius: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    />
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
