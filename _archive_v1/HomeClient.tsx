'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTina } from 'tinacms/dist/react'
import { tinaField } from 'tinacms/dist/react'
import type { HomeQuery, HomeQueryVariables } from '@/tina/__generated__/types'

interface Props {
  data: HomeQuery
  variables: HomeQueryVariables
  query: string
}

export default function HomeClient(props: Props) {
  const { data } = useTina(props)
  const d = data.home

  // ── Cycling words ──────────────────────────────────────────────────────────
  const words = d.hero?.cyclingWords ?? ['outdated.']
  const [wordIdx, setWordIdx] = useState(0)
  const cycleRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const id = setInterval(() => {
      setWordIdx((i) => (i + 1) % words.length)
      if (cycleRef.current) {
        cycleRef.current.style.animation = 'none'
        void cycleRef.current.offsetHeight
        cycleRef.current.style.animation = ''
      }
    }, 2400)
    return () => clearInterval(id)
  }, [words.length])

  // ── Scroll reveal ──────────────────────────────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  // ── Contact form ───────────────────────────────────────────────────────────
  const [sent, setSent] = useState(false)

  const hero     = d.hero
  const problem  = d.problem
  const services = d.services
  const process  = d.process
  const auth     = d.authority
  const contact  = d.contact

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-orb" />
        <div className="hero-badge" data-tina-field={tinaField(hero, 'badge')}>
          {hero?.badge}
        </div>
        <h1 className="hero-headline fade-up">
          <span className="line1" data-tina-field={tinaField(hero, 'line1')}>{hero?.line1}</span>
          <span className="line2">
            <span data-tina-field={tinaField(hero, 'line2Prefix')}>{hero?.line2Prefix}</span>{' '}
            <span className="cycle-wrap">
              <span className="cycle-word" ref={cycleRef} data-tina-field={tinaField(hero, 'cyclingWords')}>
                {words[wordIdx]}
              </span>
            </span>
          </span>
        </h1>
        <p className="hero-sub" data-tina-field={tinaField(hero, 'sub')}>{hero?.sub}</p>
        <div className="hero-ctas">
          <Link href={hero?.primaryCtaHref ?? '#contact'} className="btn-primary" data-tina-field={tinaField(hero, 'primaryCtaLabel')}>
            {hero?.primaryCtaLabel}
          </Link>
          <Link href={hero?.ghostCtaHref ?? '#services'} className="btn-ghost" data-tina-field={tinaField(hero, 'ghostCtaLabel')}>
            {hero?.ghostCtaLabel}
          </Link>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" className="problem">
        <div className="container-sm">
          <div className="reveal">
            <h2 data-tina-field={tinaField(problem, 'heading')}>
              {problem?.heading}
              <br />
              <span data-tina-field={tinaField(problem, 'headingMuted')}>{problem?.headingMuted}</span>
            </h2>
          </div>
          <div className="reveal d1">
            <p data-tina-field={tinaField(problem, 'body')}>{problem?.body}</p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="services">
        <div className="container">
          <div className="services-header reveal">
            <div>
              <p className="section-label" data-tina-field={tinaField(services, 'sectionLabel')}>{services?.sectionLabel}</p>
              <h3 data-tina-field={tinaField(services, 'heading')}>{services?.heading}</h3>
            </div>
            <Link href={services?.ctaHref ?? '#contact'} data-tina-field={tinaField(services, 'ctaLabel')}>
              {services?.ctaLabel}
            </Link>
          </div>
          <div className="cards">
            {services?.cards?.map((card, i) => (
              <div key={i} className={`card reveal d${i + 1}` + (card?.featured ? ' featured' : '')}>
                <div className="card-num" data-tina-field={tinaField(card, 'number')}>{card?.number}</div>
                <h3 data-tina-field={tinaField(card, 'title')}>{card?.title}</h3>
                <p data-tina-field={tinaField(card, 'description')}>{card?.description}</p>
                <ul>
                  {card?.bullets?.map((b, j) => (
                    <li key={j} data-tina-field={tinaField(card, 'bullets')}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="process">
        <div className="container">
          <p className="process-title" data-tina-field={tinaField(process, 'title')}>{process?.title}</p>
          <div className="process-grid">
            {process?.steps?.map((step, i) => (
              <div key={i} className={`process-step reveal d${i + 1}`}>
                <h4 data-tina-field={tinaField(step, 'title')}>{step?.title}</h4>
                <p data-tina-field={tinaField(step, 'body')}>{step?.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTHORITY ── */}
      <section className="authority">
        <div className="container-sm reveal">
          <p className="section-label" style={{ textAlign: 'center' }} data-tina-field={tinaField(auth, 'sectionLabel')}>
            {auth?.sectionLabel}
          </p>
          <h3 data-tina-field={tinaField(auth, 'heading')}>
            {auth?.heading?.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 ? <br /> : null}</span>
            ))}
          </h3>
          <p data-tina-field={tinaField(auth, 'body')}>{auth?.body}</p>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact">
        <div className="container-xs">
          <div className="reveal">
            <h2 data-tina-field={tinaField(contact, 'heading')}>{contact?.heading}</h2>
            <p className="contact-intro" data-tina-field={tinaField(contact, 'intro')}>{contact?.intro}</p>
          </div>
          <form
            className="reveal d1"
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
          >
            <div className="form-row">
              <div>
                <label>Name</label>
                <input type="text" placeholder="Jane Smith" />
              </div>
              <div>
                <label>Email</label>
                <input type="email" placeholder="jane@yourbusiness.com" />
              </div>
            </div>
            <div>
              <label>Primary Goal</label>
              <select>
                <option value="">Select your main need...</option>
                {contact?.serviceOptions?.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Project Details</label>
              <textarea rows={4} placeholder="Tell us about your business, your timeline, and what's not working right now." />
            </div>
            <button type="submit" className={`btn-submit${sent ? ' sent' : ''}`} disabled={sent}>
              {sent ? "✓ Sent — We'll Be In Touch Within 24 Hours" : (contact?.submitLabel ?? 'Submit Inquiry')}
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
