'use client'

import { useState } from 'react'

const EFFECTIVE_DATE = 'July 14, 2026'
const COMPANY = 'Cove Digital'
const EMAIL = 'hello@gocovedigital.com'
const SITE = 'gocovedigital.com'

export default function LegalPage() {
  const [tab, setTab] = useState<'tos' | 'privacy'>('tos')

  return (
    <>
      <div className="legal-page">
        <div className="legal-header">
          <h1 className="legal-h1">Legal</h1>
          <div className="legal-tabs">
            <button
              className={`legal-tab${tab === 'tos' ? ' active' : ''}`}
              onClick={() => setTab('tos')}
            >
              Terms of Service
            </button>
            <button
              className={`legal-tab${tab === 'privacy' ? ' active' : ''}`}
              onClick={() => setTab('privacy')}
            >
              Privacy Policy
            </button>
          </div>
        </div>

        <div className="legal-body">
          {tab === 'tos' ? <TermsOfService /> : <PrivacyPolicy />}
        </div>
      </div>

      <style>{`
        .legal-page {
          max-width: 800px; margin: 0 auto; padding: 120px 40px 100px;
        }
        .legal-header { margin-bottom: 56px; }
        .legal-h1 {
          font-family: var(--font-serif); font-size: clamp(36px, 5vw, 56px);
          font-weight: 700; letter-spacing: -0.02em; color: var(--ink);
          margin-bottom: 32px;
        }
        .legal-tabs {
          display: flex; gap: 0; border: 1px solid var(--border);
          border-radius: 100px; width: fit-content; overflow: hidden;
          background: var(--bg-card);
        }
        .legal-tab {
          font-family: var(--font-display); font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          padding: 11px 28px; border: none; cursor: pointer;
          background: transparent; color: var(--muted); transition: all 0.2s;
        }
        .legal-tab.active {
          background: var(--ink); color: #fff; border-radius: 100px;
        }
        .legal-body { display: flex; flex-direction: column; gap: 40px; }
        .legal-section h2 {
          font-family: var(--font-display); font-size: 13px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.15em; color: var(--ink);
          margin-bottom: 12px;
        }
        .legal-section p, .legal-section li {
          font-size: 15px; color: var(--subdued); line-height: 1.85;
        }
        .legal-section ul { padding-left: 20px; display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
        .legal-effective {
          font-family: var(--font-display); font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.2em; color: var(--muted);
          margin-bottom: 40px; display: block;
        }
        .legal-section a { color: var(--blue); text-decoration: none; }
        .legal-section a:hover { text-decoration: underline; }
        @media (max-width: 640px) {
          .legal-page { padding: 100px 24px 80px; }
        }
      `}</style>
    </>
  )
}

function TermsOfService() {
  return (
    <>
      <span className="legal-effective">Effective {EFFECTIVE_DATE}</span>

      <div className="legal-section">
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using the {COMPANY} website at <a href={`https://${SITE}`}>{SITE}</a> or engaging {COMPANY} for services, you agree to be bound by these Terms of Service. If you do not agree, please do not use this site or engage our services.
        </p>
      </div>

      <div className="legal-section">
        <h2>2. Services</h2>
        <p>
          {COMPANY} provides brand strategy, commercial photography, video production, and web design services to businesses. Specific deliverables, timelines, and pricing are outlined in individual project proposals and contracts, which govern each engagement.
        </p>
      </div>

      <div className="legal-section">
        <h2>3. Payments & Fees</h2>
        <ul>
          <li>A deposit (typically 50%) is due before project work begins. The remaining balance is due upon delivery of final files or launch, unless otherwise agreed in writing.</li>
          <li>Invoices unpaid after 14 days of the due date may incur a 1.5% monthly late fee.</li>
          <li>Deposits are non-refundable once project work has commenced, unless {COMPANY} cancels the engagement.</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>4. Intellectual Property</h2>
        <p>
          Upon receipt of full payment, {COMPANY} transfers ownership of final, approved deliverables to the client. {COMPANY} retains the right to display completed work in its portfolio and marketing materials unless a written confidentiality agreement is in place.
        </p>
        <p style={{ marginTop: '12px' }}>
          Working files, source files, unused concepts, and raw photography files remain the property of {COMPANY} unless explicitly included in the project agreement.
        </p>
      </div>

      <div className="legal-section">
        <h2>5. Client Responsibilities</h2>
        <ul>
          <li>Provide accurate business information, brand assets, and feedback in a timely manner.</li>
          <li>Ensure you have the legal right to use any content (logos, images, copy) provided to {COMPANY} for use in your project.</li>
          <li>Review and approve deliverables within the timeframes specified in your project agreement.</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>6. Revisions</h2>
        <p>
          Revision rounds are specified per-project in your proposal. Requests beyond the agreed revision scope will be quoted and billed at {COMPANY}'s standard hourly rate.
        </p>
      </div>

      <div className="legal-section">
        <h2>7. Limitation of Liability</h2>
        <p>
          {COMPANY}'s total liability for any claim related to a project shall not exceed the total fees paid for that project. {COMPANY} is not liable for indirect, incidental, or consequential damages, including lost profits or business interruption.
        </p>
      </div>

      <div className="legal-section">
        <h2>8. Governing Law</h2>
        <p>
          These terms are governed by the laws of the Commonwealth of Pennsylvania. Disputes shall be resolved in the courts of Wayne County, PA.
        </p>
      </div>

      <div className="legal-section">
        <h2>9. Changes to Terms</h2>
        <p>
          {COMPANY} may update these terms at any time. Continued use of the site or services after changes constitutes acceptance of the revised terms.
        </p>
      </div>

      <div className="legal-section">
        <h2>10. Contact</h2>
        <p>
          Questions about these terms? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </div>
    </>
  )
}

function PrivacyPolicy() {
  return (
    <>
      <span className="legal-effective">Effective {EFFECTIVE_DATE}</span>

      <div className="legal-section">
        <h2>1. Information We Collect</h2>
        <p>When you use this site or submit an inquiry, we may collect:</p>
        <ul>
          <li><strong>Contact information</strong> — name, email address, business name</li>
          <li><strong>Project details</strong> — information you provide in inquiry forms</li>
          <li><strong>Usage data</strong> — pages visited, time on site, browser type (via analytics, if enabled)</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To respond to your inquiry and communicate about your project</li>
          <li>To deliver services you've contracted with us</li>
          <li>To send occasional updates or follow-ups (you can opt out at any time)</li>
          <li>To improve the site and our services</li>
        </ul>
      </div>

      <div className="legal-section">
        <h2>3. Information Sharing</h2>
        <p>
          {COMPANY} does not sell, rent, or share your personal information with third parties for marketing purposes. We may share information with service providers who assist in running our business (e.g., email platforms, project management tools), under strict confidentiality obligations.
        </p>
      </div>

      <div className="legal-section">
        <h2>4. Data Retention</h2>
        <p>
          We retain your information for as long as necessary to fulfill the purpose for which it was collected, or as required by law. Client project files are retained for a minimum of three years following project completion.
        </p>
      </div>

      <div className="legal-section">
        <h2>5. Cookies</h2>
        <p>
          This site may use cookies for basic functionality and analytics. No advertising or tracking cookies are used. You can disable cookies in your browser settings; this may affect some site functionality.
        </p>
      </div>

      <div className="legal-section">
        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request access to the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Opt out of any marketing communications at any time</li>
        </ul>
        <p style={{ marginTop: '12px' }}>To exercise these rights, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
      </div>

      <div className="legal-section">
        <h2>7. Security</h2>
        <p>
          We take reasonable precautions to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      </div>

      <div className="legal-section">
        <h2>8. Children's Privacy</h2>
        <p>
          This site is not directed at children under 13. We do not knowingly collect personal information from children.
        </p>
      </div>

      <div className="legal-section">
        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The effective date at the top reflects the most recent revision.
        </p>
      </div>

      <div className="legal-section">
        <h2>10. Contact</h2>
        <p>
          Questions about your privacy? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      </div>
    </>
  )
}
