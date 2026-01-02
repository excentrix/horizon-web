import { FooterClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Settings } from '@/payload-types'

export async function Footer() {
  const settings: Settings = await getCachedGlobal('settings', 1)()

  return <FooterClient settings={settings} />
}
