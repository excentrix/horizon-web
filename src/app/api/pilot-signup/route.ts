import { NextResponse } from 'next/server'

const TO_EMAIL = 'hello@excentrix.tech'
const CC_EMAIL = 'sidkarthik@excentrix.tech'
const RESEND_ENDPOINT = 'https://api.resend.com/emails'

type PilotSignupPayload = {
  name?: string
  email?: string
  organization?: string
  role?: string
  interest?: string
  context?: string
  website?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function field(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }
    return entities[char] || char
  })
}

function formatLine(label: string, value: string) {
  return `${label}: ${value || 'Not provided'}`
}

export async function POST(request: Request) {
  let body: PilotSignupPayload

  try {
    body = (await request.json()) as PilotSignupPayload
  } catch {
    return NextResponse.json({ message: 'Invalid pilot request.' }, { status: 400 })
  }

  if (field(body.website)) {
    return NextResponse.json({ message: 'Pilot request received.' })
  }

  const name = field(body.name)
  const email = field(body.email).toLowerCase()
  const organization = field(body.organization)
  const role = field(body.role)
  const interest = field(body.interest)
  const context = field(body.context)

  if (!name || !email || !interest) {
    return NextResponse.json(
      { message: 'Name, email, and pilot focus are required.' },
      { status: 400 },
    )
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json({ message: 'Use a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { message: 'Pilot signup email is not configured yet.' },
      { status: 500 },
    )
  }

  const fromEmail = process.env.PILOT_SIGNUP_FROM_EMAIL || 'Excentrix <hello@excentrix.tech>'
  const subjectEntity = organization || name
  const subject = `Pilot signup: ${interest} - ${subjectEntity}`
  const text = [
    'New Excentrix pilot signup',
    '',
    formatLine('Name', name),
    formatLine('Email', email),
    formatLine('Organization', organization),
    formatLine('Role', role),
    formatLine('Pilot focus', interest),
    '',
    'Context:',
    context || 'Not provided',
  ].join('\n')

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#161616;line-height:1.55">
      <h1 style="font-size:22px;margin:0 0 18px">New Excentrix pilot signup</h1>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${[
          ['Name', name],
          ['Email', email],
          ['Organization', organization || 'Not provided'],
          ['Role', role || 'Not provided'],
          ['Pilot focus', interest],
        ]
          .map(
            ([label, value]) => `
              <tr>
                <td style="border-top:1px solid #e8e2d5;padding:10px 14px 10px 0;color:#6f6758;font-size:13px;text-transform:uppercase;letter-spacing:.08em">${escapeHtml(label)}</td>
                <td style="border-top:1px solid #e8e2d5;padding:10px 0">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join('')}
      </table>
      <h2 style="font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#6f6758;margin:24px 0 8px">Context</h2>
      <p style="white-space:pre-wrap;margin:0">${escapeHtml(context || 'Not provided')}</p>
    </div>
  `

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [TO_EMAIL],
      cc: [CC_EMAIL],
      reply_to: email,
      subject,
      text,
      html,
    }),
  })

  if (!response.ok) {
    const details = await response.text().catch(() => '')
    console.error('Pilot signup email failed:', details)
    return NextResponse.json({ message: 'Could not send the pilot request.' }, { status: 502 })
  }

  return NextResponse.json({ message: 'Pilot request sent.' })
}
