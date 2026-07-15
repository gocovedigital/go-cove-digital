'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useTina } from 'tinacms/dist/react'
import { tinaField } from 'tinacms/dist/react'
import { RichText } from '@/lib/richtext'
import type { WorkQuery, WorkQueryVariables } from '@/tina/__generated__/types'

interface Props {
  data: WorkQuery
  variables: WorkQueryVariables
  query: string
}

export default function WorkClient(props: Props) {
  const { data } = useTina(props)
  const d = data.work

  // ── Scroll reveal + sidebar active ────────────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))

    const navItems = document.querySelectorAll<HTMLAnchorElement>('.sidebar-nav-item')
    const sectionEls = document.querySelectorAll<HTMLElement>('[data-section-id]')
    const scrollObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navItems.forEach((n) => n.classList.remove('active'))
            const active = document.querySelector<HTMLAnchorElement>(`.sidebar-nav-item[href="#${e.target.getAttribute('data-section-id')}"]`)
            active?.classList.add('active')
          }
        })
      },
      { threshold: 0.5 }
    )
    sectionEls.forEach((s) => scrollObs.observe(s))

    return () => { obs.disconnect(); scrollObs.disconnect() }
  }, [])

  const sections = d.sections ?? []

  return (
    <>
      {/* ── HERO ── */}
      <section className="case-hero">
        <div className="hero-orb" />
        <div className="case-hero-inner">
          <Link href="/" className="back-link fade-up">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Home
          </Link>

          <div className="case-meta fade-up">
            {d.metaPills?.map((pill, i) => (
              <span key={i} className={`meta-pill${pill?.highlight ? ' highlight' : ''}`} data-tina-field={tinaField(pill, 'label')}>
                {pill?.label}
              </span>
            ))}
          </div>

          <h1 className="fade-up-d1">
            <span data-tina-field={tinaField(d, 'title')}>{d.title}</span>{' '}
            <span data-tina-field={tinaField(d, 'titleMuted')}>{d.titleMuted}</span>
          </h1>
          <p className="lead fade-up-d2" data-tina-field={tinaField(d, 'lead')}>{d.lead}</p>

          <div className="hero-image fade-up-d2">
            <div className="brand-mock">
              <div className="brand-mock-name">{d.title} {d.titleMuted}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="overview-strip">
        <div className="overview-inner reveal" data-tina-field={tinaField(d, 'overview')}>
          {d.overview?.map((cell, i) => (
            <div key={i} className="overview-cell">
              <span className="overview-cell-label" data-tina-field={tinaField(cell, 'label')}>{cell?.label}</span>
              <span className="overview-cell-value" data-tina-field={tinaField(cell, 'value')}>{cell?.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="case-body">
        <div className="case-body-inner">
          <nav className="case-sidebar reveal">
            {sections.map((sec, i) => (
              <a key={i} href={`#section-${i}`} className={`sidebar-nav-item${i === 0 ? ' active' : ''}`}>
                {sec?.navLabel}
              </a>
            ))}
          </nav>

          <div className="case-content">
            {sections.map((sec, i) => (
              <div
                key={i}
                className="content-block reveal"
                data-section-id={`section-${i}`}
                id={`section-${i}`}
              >
                <span className="section-label" data-tina-field={tinaField(sec, 'sectionLabel')}>{sec?.sectionLabel}</span>
                <h2 data-tina-field={tinaField(sec, 'heading')}>{sec?.heading}</h2>

                {sec?.paragraphs?.map((para, j) => (
                  <p key={j} data-tina-field={tinaField(sec, 'paragraphs')}>
                    <RichText text={para ?? ''} />
                  </p>
                ))}

                {/* Before / After */}
                {(sec?.beforeItems?.length || sec?.afterItems?.length) ? (
                  <div className="before-after">
                    {sec?.beforeItems?.length ? (
                      <div className="ba-card before">
                        <div className="ba-label">Before</div>
                        <div className="ba-content">
                          {sec.beforeItems.map((item, k) => (
                            <div key={k} className="ba-item" data-tina-field={tinaField(sec, 'beforeItems')}>{item}</div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {sec?.afterItems?.length ? (
                      <div className="ba-card after">
                        <div className="ba-label">After</div>
                        <div className="ba-content">
                          {sec.afterItems.map((item, k) => (
                            <div key={k} className="ba-item" data-tina-field={tinaField(sec, 'afterItems')}>{item}</div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* Deliverables */}
                {sec?.deliverables?.length ? (
                  <div className="deliverables" data-tina-field={tinaField(sec, 'deliverables')}>
                    {sec.deliverables.map((item, k) => (
                      <div key={k} className="deliverable-item">{item}</div>
                    ))}
                  </div>
                ) : null}

                {/* Callout */}
                {sec?.callout?.label ? (
                  <div className={`callout ${sec.callout.type ?? 'solution'}`} data-tina-field={tinaField(sec, 'callout')}>
                    <span className="callout-label">{sec.callout.label}</span>
                    <p>{sec.callout.body}</p>
                  </div>
                ) : null}

                {/* Pull quote */}
                {sec?.pullQuote?.text ? (
                  <blockquote className="case-pull-quote" data-tina-field={tinaField(sec, 'pullQuote')}>
                    {sec.pullQuote.text}
                    {sec.pullQuote.attribution && (
                      <div className="case-pull-quote-attr">{sec.pullQuote.attribution}</div>
                    )}
                  </blockquote>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="case-cta">
        <div className="reveal">
          <span
            className="section-label"
            style={{ display: 'block', textAlign: 'center' }}
            data-tina-field={tinaField(d.cta, 'sectionLabel')}
          >
            {d.cta?.sectionLabel}
          </span>
          <h2>
            <span data-tina-field={tinaField(d.cta, 'heading')}>{d.cta?.heading}</span>
            <br />
            <span className="gradient-text" data-tina-field={tinaField(d.cta, 'headingGradient')}>{d.cta?.headingGradient}</span>
          </h2>
          <p data-tina-field={tinaField(d.cta, 'sub')}>{d.cta?.sub}</p>
          <div className="cta-row">
            <Link href="/#contact" className="btn-primary">Start a Project</Link>
            <Link href="/#services" className="btn-ghost">See Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
