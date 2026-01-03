import { FooterClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Setting } from '@/payload-types'

export async function Footer() {
  const settings = (await getCachedGlobal('settings', 1)()) as Setting

  return <FooterClient settings={settings} />
}
