'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RichText } from '@/lib/richtext'

export default function WorkClient({ work }: { work: any }) {
  const d = work

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))

    const navItems = document.querySelectorAll<HTMLAnchorElement>('.sidebar-nav-item')
    const scrollObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navItems.forEach((n) => n.classList.remove('active'))
            const active = document.querySelector<HTMLAnchorElement>(`.sidebar-nav-item[href="#section-${e.target.getAttribute('data-idx')}"]`)
            active?.classList.add('active')
          }
        })
      },
      { threshold: 0.4 }
    )
    document.querySelectorAll<HTMLElement>('[data-idx]').forEach((s) => scrollObs.observe(s))

    return () => { obs.disconnect(); scrollObs.disconnect() }
  }, [])

  // Support both TinaCMS field names (camelCase) and Harbor field names (snake_case)
  const metaPills:  any[] = d.metaPills   ?? d.meta_pills   ?? []
  const overview:   any[] = d.overview    ?? []
  const sections:   any[] = d.sections    ?? []
  const cta:        any   = d.cta         ?? {}
  const titleMuted: string = d.titleMuted ?? d.title_muted ?? ''

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="case-hero">
          <Link href="/" className="back-link fade-up">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Home
          </Link>

          <div className="case-meta fade-up">
            {metaPills.map((pill: any, i: number) => (
              <span key={i} className={`meta-pill${pill?.highlight ? ' highlight' : ''}`}>
                {pill?.label}
              </span>
            ))}
          </div>

          <h1 className="fade-up-d1">
            <span>{d.title}</span>{' '}
            <span className="dim">{titleMuted}</span>
          </h1>
          <p className="case-lead fade-up-d2">{d.lead}</p>

          <div className="hero-band fade-up-d2">
            <div className="brand-ghost">{d.title} {titleMuted}</div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <div className="overview-strip reveal">
        {overview.map((cell: any, i: number) => (
          <div key={i} className="overview-cell">
            <span className="overview-cell-label">{cell?.label}</span>
            <span className="overview-cell-value">{cell?.value}</span>
          </div>
        ))}
      </div>

      {/* ── BODY ── */}
      <div className="case-body">
        <nav className="case-sidebar reveal">
          {sections.map((sec: any, i: number) => (
            <a key={i} href={`#section-${i}`} className={`sidebar-nav-item${i === 0 ? ' active' : ''}`}>
              {sec?.navLabel ?? sec?.nav_label}
            </a>
          ))}
        </nav>

        <div className="case-content">
          {sections.map((sec: any, i: number) => {
            const beforeItems:  string[] = sec?.beforeItems  ?? sec?.before_items  ?? []
            const afterItems:   string[] = sec?.afterItems   ?? sec?.after_items   ?? []
            const deliverables: string[] = sec?.deliverables ?? []
            const paragraphs:   string[] = sec?.paragraphs   ?? []
            const pullQuote:    any      = sec?.pullQuote    ?? sec?.pull_quote    ?? null
            const callout:      any      = sec?.callout      ?? null

            return (
              <div key={i} className="content-block reveal" id={`section-${i}`} data-idx={i}>
                <span className="label section-label">{sec?.sectionLabel ?? sec?.section_label}</span>
                <h2>{sec?.heading}</h2>

                {paragraphs.map((para: string, j: number) => (
                  <p key={j}><RichText text={para ?? ''} /></p>
                ))}

                {(beforeItems.length || afterItems.length) ? (
                  <div className="before-after">
                    {beforeItems.length ? (
                      <div className="ba-card before">
                        <div className="ba-label">Before</div>
                        <div className="ba-content">
                          {beforeItems.map((item: string, k: number) => <div key={k} className="ba-item">{item}</div>)}
                        </div>
                      </div>
                    ) : null}
                    {afterItems.length ? (
                      <div className="ba-card after">
                        <div className="ba-label">After</div>
                        <div className="ba-content">
                          {afterItems.map((item: string, k: number) => <div key={k} className="ba-item">{item}</div>)}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {deliverables.length ? (
                  <div className="deliverables">
                    {deliverables.map((item: string, k: number) => <div key={k} className="deliverable-item">{item}</div>)}
                  </div>
                ) : null}

                {callout?.label ? (
                  <div className={`callout ${callout.type ?? 'solution'}`}>
                    <span className="callout-label">{callout.label}</span>
                    <p>{callout.body}</p>
                  </div>
                ) : null}

                {pullQuote?.text ? (
                  <blockquote className="case-pull-quote">
                    {pullQuote.text}
                    {pullQuote.attribution && <div className="case-pull-quote-attr">{pullQuote.attribution}</div>}
                  </blockquote>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="case-cta">
        <div className="reveal">
          <span className="cta-eyebrow">{cta?.sectionLabel ?? cta?.section_label}</span>
          <h2>
            <span>{cta?.heading}</span>
            <br />
            <span>{cta?.headingGradient ?? cta?.heading_gradient}</span>
          </h2>
          <p>{cta?.sub}</p>
          <div className="case-cta-row">
            <Link href="/inquire" className="btn btn-dark">Start a Project</Link>
            <Link href="/services" className="btn btn-dark-outline">See Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
