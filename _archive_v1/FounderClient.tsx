'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useTina } from 'tinacms/dist/react'
import { tinaField } from 'tinacms/dist/react'
import { RichText } from '@/lib/richtext'
import type { FounderQuery, FounderQueryVariables } from '@/tina/__generated__/types'

interface Props {
  data: FounderQuery
  variables: FounderQueryVariables
  query: string
}

export default function FounderClient(props: Props) {
  const { data } = useTina(props)
  const d = data.founder

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="hero-orb" />
        <div className="hero-layout">
          <div className="hero-text">
            <span className="eyebrow fade-up" data-tina-field={tinaField(d, 'eyebrow')}>{d.eyebrow}</span>
            <h1 className="fade-up-d1">
              <span data-tina-field={tinaField(d, 'heroTitle')}>{d.heroTitle}</span>
              <br />
              <em data-tina-field={tinaField(d, 'heroTitleMuted')}>{d.heroTitleMuted}</em>
            </h1>
            <p className="hero-sub fade-up-d2" data-tina-field={tinaField(d, 'heroSub')}>{d.heroSub}</p>
            <div className="hero-ctas-founder fade-up-d3">
              <Link href={d.primaryCtaHref ?? '/#contact'} className="btn-primary" data-tina-field={tinaField(d, 'primaryCtaLabel')}>
                {d.primaryCtaLabel}
              </Link>
              <Link href={d.ghostCtaHref ?? '/#services'} className="btn-ghost" data-tina-field={tinaField(d, 'ghostCtaLabel')}>
                {d.ghostCtaLabel}
              </Link>
            </div>
          </div>

          <div className="photo-box fade-up-d2" data-tina-field={tinaField(d, 'founderPhoto')}>
            {d.founderPhoto ? (
              <img src={d.founderPhoto} alt={d.founderName ?? 'Founder'} />
            ) : (
              <div className="photo-placeholder">
                <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <p>Your photo here</p>
              </div>
            )}
            <div className="photo-name">
              <strong data-tina-field={tinaField(d, 'founderName')}>{d.founderName}</strong>
              <span data-tina-field={tinaField(d, 'founderTitle')}>{d.founderTitle}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="body-copy">
        <div className="body-copy-inner">
          <div className="sidebar reveal">
            <span className="sidebar-label" data-tina-field={tinaField(d, 'sidebarLabel')}>{d.sidebarLabel}</span>
            <div className="sidebar-tags">
              {d.sidebarTags?.map((tag, i) => (
                <span key={i} className="sidebar-tag" data-tina-field={tinaField(d, 'sidebarTags')}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="prose" data-tina-field={tinaField(d, 'content')}>
            {d.content?.map((block, i) => {
              if (!block) return null
              if (block.__typename === 'FounderContentParagraph') {
                return (
                  <p key={i} className="reveal" data-tina-field={tinaField(block, 'text')}>
                    <RichText text={block.text ?? ''} />
                  </p>
                )
              }
              if (block.__typename === 'FounderContentPullQuote') {
                return (
                  <blockquote key={i} className="pull-quote reveal d1" data-tina-field={tinaField(block, 'text')}>
                    {block.text}
                  </blockquote>
                )
              }
              return null
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="reveal">
          <p
            style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#1ce783', marginBottom: '16px' }}
            data-tina-field={tinaField(d.cta, 'label')}
          >
            {d.cta?.label}
          </p>
          <h2>
            <span data-tina-field={tinaField(d.cta, 'heading')}>{d.cta?.heading}</span>
            <br />
            <span className="gradient-text" data-tina-field={tinaField(d.cta, 'headingGradient')}>{d.cta?.headingGradient}</span>
          </h2>
          <p data-tina-field={tinaField(d.cta, 'sub')}>{d.cta?.sub}</p>
          <div className="cta-row">
            <Link href={d.cta?.primaryCtaHref ?? '/#contact'} className="btn-primary" data-tina-field={tinaField(d.cta, 'primaryCtaLabel')}>
              {d.cta?.primaryCtaLabel}
            </Link>
            <Link href={d.cta?.ghostCtaHref ?? '/#services'} className="btn-ghost" data-tina-field={tinaField(d.cta, 'ghostCtaLabel')}>
              {d.cta?.ghostCtaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
