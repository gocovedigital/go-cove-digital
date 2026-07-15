'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useTina } from 'tinacms/dist/react'
import { tinaField } from 'tinacms/dist/react'
import { RichText } from '@/lib/richtext'
import type { FounderQuery, FounderQueryVariables } from '@/tina/__generated__/types'

interface Props { data: FounderQuery; variables: FounderQueryVariables; query: string }

export default function FounderClient(props: Props) {
  const { data } = useTina(props)
  const d = data.founder

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="founder-hero">
          <div className="founder-text">
            <span className="fdr-eyebrow fade-up" data-tina-field={tinaField(d, 'eyebrow')}>{d.eyebrow}</span>
            <h1 className="fade-up-d1">
              <span data-tina-field={tinaField(d, 'heroTitle')}>{d.heroTitle}</span>
              <br />
              <em data-tina-field={tinaField(d, 'heroTitleMuted')}>{d.heroTitleMuted}</em>
            </h1>
            <p className="fdr-sub fade-up-d2" data-tina-field={tinaField(d, 'heroSub')}>{d.heroSub}</p>
            <div className="fdr-ctas fade-up-d3">
              <Link href={d.primaryCtaHref ?? '/#contact'} className="btn btn-primary" data-tina-field={tinaField(d, 'primaryCtaLabel')}>
                {d.primaryCtaLabel}
              </Link>
              <Link href={d.ghostCtaHref ?? '/#services'} className="btn btn-outline" data-tina-field={tinaField(d, 'ghostCtaLabel')}>
                {d.ghostCtaLabel}
              </Link>
            </div>
          </div>

          <div className="founder-photo fade-up-d2" data-tina-field={tinaField(d, 'founderPhoto')}>
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
            <div className="founder-photo-name">
              <strong data-tina-field={tinaField(d, 'founderName')}>{d.founderName}</strong>
              <span data-tina-field={tinaField(d, 'founderTitle')}>{d.founderTitle}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="founder-body">
        <div className="founder-body-inner">
          <div className="founder-sidebar reveal">
            <span className="founder-sidebar-label" data-tina-field={tinaField(d, 'sidebarLabel')}>{d.sidebarLabel}</span>
            <div className="founder-tags">
              {d.sidebarTags?.map((tag, i) => (
                <span key={i} className="founder-tag" data-tina-field={tinaField(d, 'sidebarTags')}>{tag}</span>
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
      </div>

      {/* ── CTA (green section) ── */}
      <section className="fdr-cta">
        <div className="fdr-cta-inner reveal">
          <span className="cta-eyebrow" data-tina-field={tinaField(d.cta, 'label')}>{d.cta?.label}</span>
          <h2>
            <span data-tina-field={tinaField(d.cta, 'heading')}>{d.cta?.heading}</span>
            <br />
            <span data-tina-field={tinaField(d.cta, 'headingGradient')}>{d.cta?.headingGradient}</span>
          </h2>
          <p data-tina-field={tinaField(d.cta, 'sub')}>{d.cta?.sub}</p>
          <div className="fdr-cta-btns">
            <Link href={d.cta?.primaryCtaHref ?? '/#contact'} className="btn btn-dark" data-tina-field={tinaField(d.cta, 'primaryCtaLabel')}>
              {d.cta?.primaryCtaLabel}
            </Link>
            <Link href={d.cta?.ghostCtaHref ?? '/#services'} className="btn btn-dark-outline" data-tina-field={tinaField(d.cta, 'ghostCtaLabel')}>
              {d.cta?.ghostCtaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
