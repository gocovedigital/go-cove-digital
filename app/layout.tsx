import type { Metadata } from 'next'
import { Space_Grotesk, Playfair_Display } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getContent } from '@/lib/harbor'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '700'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Cove Digital | Strategic Branding & Digital Systems',
  description: 'Refined brand strategy and digital systems for businesses that mean business.',
  icons: { icon: '/icon.svg' },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let globalContent: any = null
  try {
    const { content } = await getContent()
    globalContent = content['global'] ?? null
  } catch {
    // Harbor unavailable — fall back to defaults in Nav/Footer
  }

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${playfairDisplay.variable}`}>
      <body>
        <Nav global={globalContent} />
        <main>{children}</main>
        <Footer global={globalContent} />
      </body>
    </html>
  )
}
