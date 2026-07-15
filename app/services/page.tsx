import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services & Pricing | Cove Digital',
  description: 'Brand strategy, commercial photography, and web design for businesses that are ready to look the part.',
}

const services = [
  {
    number: '01',
    title: 'Brand Strategy & Identity',
    from: '$1,200',
    tagline: 'Look like the business you actually are.',
    description:
      'Most local businesses have a brand that lags behind the quality of their actual work. We fix that — building a visual identity, messaging framework, and positioning that makes you unmistakable before you ever say a word.',
    includes: [
      { label: 'Brand Audit & Discovery', detail: 'In-depth review of your current brand, competitors, and market positioning.' },
      { label: 'Logo & Visual Identity System', detail: 'Primary logo, variations, color palette, and typography — built for real-world use.' },
      { label: 'Brand Messaging & Voice', detail: 'Tagline, elevator pitch, and messaging hierarchy that clearly says who you are.' },
      { label: 'Social Content Templates', detail: 'Branded Canva or Figma templates so you can post consistently without a designer on call.' },
      { label: 'Event & Promotional Materials', detail: 'Banners, flyers, signage — whatever your business actually needs.' },
    ],
    note: 'Pricing varies by scope. Logo-only projects start lower; full identity systems start at $1,200.',
    cta: 'Request Brand Strategy',
  },
  {
    number: '02',
    title: 'Commercial Photography & Video',
    from: '$650',
    tagline: 'Real images of real work.',
    description:
      "Stock photos don’t sell your business — real imagery does. We shoot commercial and action photography in-house, giving your marketing something authentic to work with: your space, your team, your craft.",
    includes: [
      { label: 'Commercial Product & Action Photography', detail: 'High-resolution images of your products, services, or team in action.' },
      { label: 'Cinematic Brand Video', detail: 'Short-form brand video (60–90 sec) for your website, social, or ads.' },
      { label: 'Professional Real Estate Media', detail: 'Photos and video tours for residential or commercial listings.' },
      { label: 'Edited Deliverables', detail: 'All files color-graded and delivered in web and print-ready formats.' },
      { label: 'Usage Rights Included', detail: 'Full commercial usage rights — no licensing headaches.' },
    ],
    note: 'Half-day shoots start at $650. Full-day and multi-location packages available. Video add-ons quoted separately.',
    cta: 'Request Photography',
  },
  {
    number: '03',
    title: 'Web & Digital Presence',
    from: '$2,400',
    tagline: 'A website that actually represents you.',
    description:
      'Your website is the first place most customers will judge your business. We build clean, fast, brand-consistent sites that look the part — and make it easy for local customers to find you, trust you, and reach out.',
    includes: [
      { label: 'Brand-Consistent Web Design', detail: 'Custom design built to match your brand identity — not a template with your colors dropped in.' },
      { label: 'Mobile-Optimized Development', detail: 'Built in Next.js — fast, accessible, and great on every screen size.' },
      { label: 'Content Management System', detail: 'Edit your own content without touching code via Harbor — our proprietary CMS built for simplicity. Included with an ongoing Harbor subscription.' },
      { label: 'Local SEO Setup', detail: 'Google Business Profile optimization, on-page SEO, and schema markup for local search.' },
    ],
    note: '3–5 page sites start at $2,400. E-commerce and larger sites quoted on scope.',
    cta: 'Request Web Design',
  },
  {
    number: '04',
    title: 'Full Brand & Marketing Overhaul',
    from: '$4,200',
    tagline: 'Everything, done right, at once.',
    description:
      'The bundled option for businesses ready to commit to a complete transformation — new brand identity, fresh photography, and a website that ties it all together. This is the fastest path from "we know our brand looks dated" to "we look like a real operation."',
    includes: [
      { label: 'Everything in Brand Strategy & Identity', detail: 'Full identity system from the ground up.' },
      { label: 'Commercial Photography Session', detail: 'Half-day shoot included.' },
      { label: 'Custom Website', detail: '5-page brand-consistent site with Harbor CMS access.' },
      { label: 'Launch Support', detail: '30 days of post-launch support and minor revisions.' },
      { label: 'Priority Scheduling', detail: 'Moved to the front of the queue.' },
    ],
    note: 'Bundle pricing starts at $4,200 — typically 20–30% less than booking each service separately.',
    cta: 'Request Full Overhaul',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="hero-dark-section">
        <div className="svc-page-hero">
          <p className="svc-page-eyebrow">What We Do</p>
          <h1 className="svc-page-h1">Services &amp; Pricing</h1>
          <p className="svc-page-sub">
            Straightforward work, honest pricing, real results — for businesses that are ready to look the part.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <div className="svc-page-body">
        {services.map((svc, i) => (
          <section key={i} className="svc-detail-section">
            <div className="svc-detail-inner">
              {/* Left */}
              <div className="svc-detail-left">
                <span className="svc-detail-num">{svc.number}</span>
                <h2 className="svc-detail-title">{svc.title}</h2>
                <p className="svc-detail-tagline">{svc.tagline}</p>
                <p className="svc-detail-desc">{svc.description}</p>
                <div className="svc-detail-price">
                  <span className="svc-detail-from">From</span>
                  <span className="svc-detail-amount">{svc.from}</span>
                </div>
                <p className="svc-detail-note">{svc.note}</p>
                <Link href={`/inquire?service=${encodeURIComponent(svc.title)}`} className="btn btn-primary">
                  {svc.cta}
                </Link>
              </div>

              {/* Right */}
              <div className="svc-detail-right">
                <p className="svc-detail-includes-label">What's included</p>
                <ul className="svc-detail-includes">
                  {svc.includes.map((item, j) => (
                    <li key={j} className="svc-include-item">
                      <strong>{item.label}</strong>
                      <span>{item.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA STRIP */}
      <section className="fdr-cta">
        <div className="fdr-cta-inner">
          <span className="cta-eyebrow">Get Started</span>
          <h2>Not sure which service you need?</h2>
          <p>Send us a message and we'll figure it out together. No pitch, no pressure — just a straight answer.</p>
          <div className="fdr-cta-btns">
            <Link href="/inquire" className="btn btn-dark">Start a Conversation</Link>
            <a href="mailto:go@gocovedigital.com" className="btn btn-dark-outline">go@gocovedigital.com</a>
          </div>
        </div>
      </section>

      <style>{`
        .svc-page-hero {
          max-width: 1280px; margin: 0 auto;
          padding: 68px 80px 100px;
          display: flex; flex-direction: column; justify-content: flex-end;
          min-height: 52vh;
        }
        .svc-page-eyebrow {
          font-family: var(--font-display); font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.22em; color: rgba(255,255,255,0.4);
          margin-bottom: 20px;
        }
        .svc-page-h1 {
          font-family: var(--font-serif); font-size: clamp(52px, 7vw, 96px);
          font-weight: 700; line-height: 0.97; letter-spacing: -0.03em;
          color: #fff; margin-bottom: 32px;
        }
        .svc-page-sub {
          font-size: 17px; color: rgba(255,255,255,0.48); line-height: 1.75; max-width: 520px;
        }
        .svc-page-body { max-width: 1280px; margin: 0 auto; padding: 0 80px; }
        .svc-detail-section {
          border-bottom: 1px solid var(--border); padding: 96px 0;
        }
        .svc-detail-section:last-child { border-bottom: none; }
        .svc-detail-inner {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
        }
        .svc-detail-num {
          font-family: var(--font-display); font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.25em; color: var(--blue);
          display: block; margin-bottom: 20px;
        }
        .svc-detail-title {
          font-family: var(--font-serif); font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 700; letter-spacing: -0.02em; line-height: 1.1;
          color: var(--ink); margin-bottom: 12px;
        }
        .svc-detail-tagline {
          font-family: var(--font-serif); font-style: italic;
          font-size: 17px; color: var(--subdued); margin-bottom: 24px;
        }
        .svc-detail-desc {
          font-size: 15px; color: var(--subdued); line-height: 1.85; margin-bottom: 40px;
        }
        .svc-detail-price {
          display: flex; align-items: baseline; gap: 10px; margin-bottom: 12px;
        }
        .svc-detail-from {
          font-family: var(--font-display); font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.15em; color: var(--muted);
        }
        .svc-detail-amount {
          font-family: var(--font-serif); font-size: 40px; font-weight: 700;
          color: var(--ink); letter-spacing: -0.02em;
        }
        .svc-detail-note {
          font-size: 13px; color: var(--muted); line-height: 1.65; margin-bottom: 32px;
        }
        .svc-detail-includes-label {
          font-family: var(--font-display); font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.22em; color: var(--muted);
          margin-bottom: 24px;
        }
        .svc-detail-includes { list-style: none; display: flex; flex-direction: column; gap: 0; }
        .svc-include-item {
          display: flex; flex-direction: column; gap: 4px;
          padding: 20px 0; border-bottom: 1px solid var(--border);
        }
        .svc-include-item:last-child { border-bottom: none; }
        .svc-include-item strong { font-size: 14px; font-weight: 700; color: var(--ink); }
        .svc-include-item span { font-size: 13px; color: var(--subdued); line-height: 1.6; }
        @media (max-width: 860px) {
          .svc-page-hero { padding: 68px 24px 72px; }
          .svc-page-body { padding: 0 24px; }
          .svc-detail-inner { grid-template-columns: 1fr; gap: 48px; }
          .svc-detail-section { padding: 64px 0; }
        }
      `}</style>
    </>
  )
}
