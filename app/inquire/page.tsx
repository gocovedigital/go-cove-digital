'use client'

import { useState } from 'react'
import Link from 'next/link'

const serviceOptions = [
  'Brand Strategy & Identity',
  'Commercial Photography / Video',
  'Web & Digital Presence',
  'Full Brand & Marketing Overhaul',
  'Not sure yet — let\'s talk',
]

export default function InquirePage() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <div className="inquire-layout">
        {/* LEFT — info */}
        <div className="inquire-left">
          <div className="inquire-left-inner">
            <p className="inquire-eyebrow">Get in Touch</p>
            <h1 className="inquire-h1">Let's talk about your brand.</h1>
            <p className="inquire-sub">
              Fill out the form and we'll get back to you within 24 hours. No pitch, no pressure — just a straight conversation about what you need.
            </p>

            <div className="inquire-contact-block">
              <p className="inquire-contact-label">Email us directly</p>
              <a href="mailto:go@gocovedigital.com" className="inquire-email">go@gocovedigital.com</a>
            </div>

            <div className="inquire-contact-block">
              <p className="inquire-contact-label">Based in</p>
              <p className="inquire-contact-value">Pike County, PA</p>
            </div>

            <div className="inquire-contact-block">
              <p className="inquire-contact-label">Response time</p>
              <p className="inquire-contact-value">Within 24 hours</p>
            </div>

            <div className="inquire-links">
              <Link href="/services" className="inquire-link">View services &amp; pricing →</Link>
              <Link href="/team" className="inquire-link">Meet the team →</Link>
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="inquire-right">
          {sent ? (
            <div className="inquire-sent">
              <div className="inquire-sent-icon">✓</div>
              <h2>We got it.</h2>
              <p>Expect a reply at <strong>go@gocovedigital.com</strong> within 24 hours.</p>
              <Link href="/" className="btn btn-primary" style={{ marginTop: '32px' }}>Back to Home</Link>
            </div>
          ) : (
            <form className="inquire-form" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
              <div className="form-row">
                <div>
                  <label>Name</label>
                  <input type="text" placeholder="Jane Smith" required />
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" placeholder="jane@yourbusiness.com" required />
                </div>
              </div>
              <div>
                <label>Business Name</label>
                <input type="text" placeholder="Your Business LLC" />
              </div>
              <div>
                <label>Service</label>
                <select>
                  <option value="">Select what you're looking for...</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Budget Range</label>
                <select>
                  <option value="">Select a budget range...</option>
                  <option>Under $1,000</option>
                  <option>$1,000 – $2,500</option>
                  <option>$2,500 – $5,000</option>
                  <option>$5,000+</option>
                  <option>Not sure yet</option>
                </select>
              </div>
              <div>
                <label>Tell us about your project</label>
                <textarea rows={5} placeholder="What's your business, what's not working with your current brand, and what are you hoping to accomplish?" />
              </div>
              <button type="submit" className="btn-submit">Send Inquiry</button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .inquire-layout {
          display: grid; grid-template-columns: 1fr 1fr;
          min-height: 100vh; padding-top: 68px;
        }
        .inquire-left {
          background: var(--bg-dark); display: flex; align-items: center;
          padding: 80px 64px;
        }
        .inquire-left-inner { max-width: 420px; }
        .inquire-eyebrow {
          font-family: var(--font-display); font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.22em; color: var(--blue-lg);
          margin-bottom: 20px;
        }
        .inquire-h1 {
          font-family: var(--font-serif); font-size: clamp(36px, 4vw, 56px);
          font-weight: 700; line-height: 1.05; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 24px;
        }
        .inquire-sub {
          font-size: 15px; color: rgba(255,255,255,0.48); line-height: 1.8; margin-bottom: 56px;
        }
        .inquire-contact-block { margin-bottom: 28px; }
        .inquire-contact-label {
          font-family: var(--font-display); font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em;
          color: rgba(255,255,255,0.28); margin-bottom: 6px;
        }
        .inquire-email {
          font-size: 16px; font-weight: 600; color: var(--blue-lg);
          text-decoration: none; transition: color 0.15s;
        }
        .inquire-email:hover { color: #fff; }
        .inquire-contact-value { font-size: 15px; color: rgba(255,255,255,0.65); }
        .inquire-links {
          margin-top: 48px; display: flex; flex-direction: column; gap: 12px;
          border-top: 1px solid rgba(255,255,255,0.08); padding-top: 32px;
        }
        .inquire-link {
          font-family: var(--font-display); font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.35); text-decoration: none; transition: color 0.15s;
        }
        .inquire-link:hover { color: rgba(255,255,255,0.7); }
        .inquire-right {
          background: var(--bg); display: flex; align-items: center;
          padding: 80px 64px;
        }
        .inquire-form { width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 20px; }
        .inquire-sent {
          width: 100%; max-width: 480px; text-align: center;
          display: flex; flex-direction: column; align-items: center;
        }
        .inquire-sent-icon {
          width: 64px; height: 64px; border-radius: 50%;
          background: #16a34a; color: #fff; font-size: 28px;
          display: flex; align-items: center; justify-content: center; margin-bottom: 24px;
        }
        .inquire-sent h2 { font-size: 32px; margin-bottom: 12px; color: var(--ink); }
        .inquire-sent p { color: var(--subdued); font-size: 15px; line-height: 1.65; }
        @media (max-width: 860px) {
          .inquire-layout { grid-template-columns: 1fr; }
          .inquire-left { padding: 64px 32px; }
          .inquire-left-inner { max-width: 100%; }
          .inquire-right { padding: 64px 32px; }
        }
      `}</style>
    </>
  )
}
