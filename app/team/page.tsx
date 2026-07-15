import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Team | Cove Digital',
  description: 'Meet the strategist behind Cove Digital — brand strategy, marketing, and photography for businesses ready to look the part.',
}

const content = [
  "I'm Ben Scholl — founder and chief strategist at Cove Digital. I built this agency because I kept running into the same problem: **businesses that were genuinely excellent at what they did, presenting themselves like they weren't.** Dated logos. Inconsistent visuals. No clear message. Great work hidden behind a brand that didn't reflect it.",
  "My background spans formal marketing education, an Adobe Digital Marketing certificate, and hands-on production experience — including a photography and video business that competed at the national level through FBLA, **winning in video production.** That combination is the foundation of how I work: strategy tells you what to say, and strong production gives you something worth saying it with.",
  "I handle brand strategy, identity, photography, and web work — all under one roof. **Brand strategy is where I live.** The rest exists because a strong brand needs execution to match, and I'd rather handle it myself than watch a generic template undo everything else we worked on.",
  "I'm based in Pike County, PA and work with businesses wherever the work takes me. Every project gets the same thing: a direct line to the person doing the thinking, honest timelines, and no handoffs to a junior team you never met.",
]

function renderParagraph(text: string) {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  )
}

export default function TeamPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="founder-hero">
          <div className="founder-text">
            <span className="fdr-eyebrow">Cove Digital</span>
            <h1>
              The<br />
              <em>Team.</em>
            </h1>
            <p className="fdr-sub">
              Strategist, marketer, and photographer — building brands for businesses that do great work and deserve to look like it.
            </p>
            <div className="fdr-ctas">
              <Link href="/inquire" className="btn btn-primary">Work Together</Link>
              <Link href="/services" className="btn btn-outline">See Services</Link>
            </div>
          </div>

          <div className="founder-photo">
            <div className="photo-placeholder">
              <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <p>Your photo here</p>
            </div>
            <div className="founder-photo-name">
              <strong>Ben Scholl</strong>
              <span>Founder &amp; Chief Strategist</span>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <div className="founder-body">
        <div className="founder-body-inner">
          <div className="founder-sidebar">
            <span className="founder-sidebar-label">Focus areas</span>
            <div className="founder-tags">
              {['Brand Strategy', 'Marketing', 'Photography & Video', 'Web & Digital'].map((tag) => (
                <span key={tag} className="founder-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="prose">
            {content.map((para, i) => (
              <p key={i}>{renderParagraph(para)}</p>
            ))}
            <blockquote className="pull-quote">
              &ldquo;Your brand is the first conversation you have with a customer — usually before you ever know they&rsquo;re listening.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="fdr-cta">
        <div className="fdr-cta-inner">
          <span className="cta-eyebrow">Let&rsquo;s talk</span>
          <h2>
            Ready to look like<br />
            <span>you mean it?</span>
          </h2>
          <p>Reach out and I&rsquo;ll get back to you within 24 hours — no pitch, just a conversation.</p>
          <div className="fdr-cta-btns">
            <Link href="/inquire" className="btn btn-dark">Start a Project</Link>
            <Link href="/services" className="btn btn-dark-outline">Explore Services</Link>
          </div>
        </div>
      </section>
    </>
  )
}
