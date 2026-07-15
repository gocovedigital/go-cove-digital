import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { client } from '@/tina/__generated__/client'

export const metadata: Metadata = {
  title: 'Scholl Creative Media | Strategic Branding & Digital Systems',
  description: 'We rebuild the brands and marketing presence of local businesses — Wayne & Pike County, PA.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let nav = null
  let footer = null
  try {
    const res = await client.queries.global({ relativePath: 'global.json' })
    nav    = res.data.global.nav
    footer = res.data.global.footer
  } catch {
    // during first-run before tinacms build, silently fall back to defaults
  }

  return (
    <html lang="en">
      <body>
        <Nav nav={nav} />
        <main>{children}</main>
        <Footer footer={footer} />
      </body>
    </html>
  )
}
