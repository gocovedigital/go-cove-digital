'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DEFAULT_LINKS = [
  { label: 'Services', href: '/services', isCta: false },
  { label: 'The Team', href: '/team',     isCta: false },
  { label: 'Inquire',  href: '/inquire',  isCta: true  },
]

export default function Nav({ global }: { global?: any }) {
  const pathname = usePathname()
  // Harbor field: nav_links → array of {label, href, is_cta}
  const raw: any[] = global?.nav_links ?? []
  const links = raw.length
    ? raw.map((l: any) => ({ label: l.label, href: l.href, isCta: l.is_cta ?? false }))
    : DEFAULT_LINKS

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <img src="https://pub-d747071e79ff40d6bd2f2b88b1e9a9b8.r2.dev/Cove-Digital-White.png" alt="Cove Digital" />
        </Link>
        <div className="nav-links">
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={[
                link.isCta ? 'cta nav-cta-btn' : '',
                !link.isCta && pathname === link.href ? 'active' : '',
              ].filter(Boolean).join(' ') || undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
