'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface ServiceCard {
  number: string
  title: string
  description: string
  bullets: string[]
}

interface HomeData {
  hero: {
    line1: string
    line2Prefix: string
    cyclingWords: string[]
    sub: string
    primaryCtaLabel: string
    primaryCtaHref: string
    ghostCtaLabel: string
    ghostCtaHref: string
  }
  problem: { heading: string; body: string }
  services: {
    sectionLabel: string
    heading: string
    ctaLabel: string
    ctaHref: string
    cards: ServiceCard[]
  }
  process: { title: string; steps: { title: string; body: string }[] }
  contact: {
    heading: string
    intro: string
    serviceOptions: string[]
    submitLabel: string
  }
}

export default function HomeClient({ home }: { home: HomeData }) {
  const { hero, problem, services, process, contact } = home

  // Cycling words
  const words = hero.cyclingWords
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

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const [sent, setSent] = useState(false)

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-dark-section">
        <div className="hero">
          <h1 className="hero-headline fade-up">
            <span className="dim">{hero.line1}</span>
            <br />
            <span>{hero.line2Prefix}</span>
            <br />
            <span className="accent">
              <span className="cycle-word" ref={cycleRef}>{words[wordIdx]}</span>
            </span>
          </h1>
          <p className="hero-sub fade-up-d1">{hero.sub}</p>
          <div className="hero-ctas-inline fade-up-d2">
            <Link href={hero.primaryCtaHref} className="btn btn-primary">{hero.primaryCtaLabel}</Link>
            <Link href={hero.ghostCtaHref} className="btn btn-outline-light">{hero.ghostCtaLabel}</Link>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem">
        <div className="problem">
          <div className="problem-inner reveal">
            <div className="problem-num" aria-hidden>01</div>
            <div className="problem-content">
              <h2>{problem.heading}</h2>
              <p>{problem.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services">
        <div className="services">
          <div className="services-top reveal">
            <div>
              <div className="label" style={{ marginBottom: '8px' }}>{services.sectionLabel}</div>
              <h2>{services.heading}</h2>
            </div>
            <Link href={services.ctaHref}>{services.ctaLabel}</Link>
          </div>
          <div className="services-grid">
            {services.cards.map((card, i) => (
              <div key={i} className={`svc-card reveal d${i + 1}`}>
                <div className="svc-num">{card.number}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <ul>
                  {card.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
            <Link href={services.ctaHref} className="svc-card green-cta reveal" style={{ textDecoration: 'none' }}>
              <div className="svc-num">Ready?</div>
              <div className="cta-arrow">→</div>
              <h3 className="cta-heading">Request a brand audit</h3>
              <span className="cta-label">Start with a conversation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process">
        <div className="process">
          <div className="label process-label reveal">{process.title}</div>
          <div className="process-steps">
            {process.steps.map((step, i) => (
              <div key={i} className="process-step reveal">
                <div className="process-step-num" aria-hidden>{String(i + 1).padStart(2, '0')}</div>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTHORITY ── */}
      <section style={{ padding: '80px 0' }}>
        <div className="authority reveal">
          <span className="label">Why Cove Digital</span>
          <h3>
            <span>Straightforward.</span><br />
            <span>And I actually get this stuff.</span>
          </h3>
          <p>Cove Digital is run by Ben Scholl — a strategist, photographer, and marketer with a background in brand identity, an Adobe Digital Marketing certificate, and a photography and video business that&apos;s competed and won at the national level. I&apos;m not a big firm, and I won&apos;t pretend to be. What I am is someone who understands branding deeply, works directly with every client, and treats your project like it matters — because to me, it does.</p>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="contact">
          <div className="contact-inner">
            <div className="reveal">
              <h2>{contact.heading}</h2>
              <p className="contact-intro">{contact.intro}</p>
            </div>
            <form className="reveal d1" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <div className="form-row">
                <div><label>Name</label><input type="text" placeholder="Jane Smith" /></div>
                <div><label>Email</label><input type="email" placeholder="jane@yourbusiness.com" /></div>
              </div>
              <div>
                <label>Primary Goal</label>
                <select>
                  <option value="">Select your main need...</option>
                  {contact.serviceOptions.map((opt, i) => <option key={i}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label>Project Details</label>
                <textarea rows={4} placeholder="Tell us about your business, your timeline, and what's not working right now." />
              </div>
              <button type="submit" className={`btn-submit${sent ? ' sent' : ''}`} disabled={sent}>
                {sent ? "✓ Sent — We'll Be In Touch Within 24 Hours" : contact.submitLabel}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
