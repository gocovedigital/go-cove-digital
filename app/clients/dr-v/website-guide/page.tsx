import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Editing Guide — Dr. Venarucci | Cove Digital',
  description: 'How to edit every part of your website without touching any code.',
}

const TOC = [
  { id: 's1',  num: '01', label: 'Global Settings' },
  { id: 's2',  num: '02', label: 'Home Page' },
  { id: 's3',  num: '03', label: 'About Page' },
  { id: 's4',  num: '04', label: 'Programs Page' },
  { id: 's5',  num: '05', label: 'FAQ Page' },
  { id: 's6',  num: '06', label: 'Resources Page' },
  { id: 's7',  num: '07', label: 'Blog' },
  { id: 's8',  num: '08', label: 'Video Library' },
  { id: 's9',  num: '09', label: 'Static Pages' },
  { id: 's10', num: '10', label: 'Common Tasks' },
]

function SectionHead({ id, num, title, sub }: { id: string; num: string; title: string; sub?: string }) {
  return (
    <div id={id} className="guide-section-head">
      <span className="guide-sec-num">{num}</span>
      <div>
        <h2 className="guide-h2">{title}</h2>
        {sub && <p className="guide-sec-sub">{sub}</p>}
      </div>
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return <div className="guide-note">{children}</div>
}

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="guide-steps">
      {items.map((item, i) => (
        <li key={i}>
          <span className="guide-step-num">{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </li>
      ))}
    </ol>
  )
}

function FieldTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="guide-table">
      <thead>
        <tr><th>Field</th><th>What it does</th></tr>
      </thead>
      <tbody>
        {rows.map(([field, desc], i) => (
          <tr key={i}>
            <td><code>{field}</code></td>
            <td>{desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="guide-h3">{children}</h3>
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="guide-p">{children}</p>
}

export default function DrVGuide() {
  return (
    <>
      <style>{`
        /* ── Guide layout ─────────────────────────────────── */
        .guide-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px 120px;
        }
        .guide-header {
          padding: 72px 0 56px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 0;
        }
        .guide-header-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--green);
          margin-bottom: 20px;
        }
        .guide-header-eyebrow::before {
          content: '';
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--green);
          flex-shrink: 0;
        }
        .guide-header h1 {
          font-size: clamp(36px, 5vw, 60px);
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 16px;
        }
        .guide-header h1 em {
          color: var(--subdued);
          font-style: normal;
          font-weight: 400;
        }
        .guide-header-meta {
          font-size: 15px;
          color: var(--subdued);
          line-height: 1.7;
          max-width: 560px;
          margin-top: 20px;
        }
        .guide-header-meta a {
          color: var(--green);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .guide-quick {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          margin: 40px 0 0;
        }
        .guide-quick-item {
          background: var(--bg-card);
          padding: 24px 28px;
        }
        .guide-quick-label {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--muted);
          margin-bottom: 6px;
        }
        .guide-quick-value {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
        }
        .guide-quick-value a {
          color: var(--green);
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* ── Two-column body ──────────────────────────────── */
        .guide-body {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 64px;
          align-items: start;
          padding-top: 56px;
        }
        @media (max-width: 860px) {
          .guide-body { grid-template-columns: 1fr; }
          .guide-sidebar { display: none; }
        }

        /* ── Sidebar TOC ──────────────────────────────────── */
        .guide-sidebar {
          position: sticky;
          top: 90px;
        }
        .guide-toc-label {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--muted);
          margin-bottom: 16px;
        }
        .guide-toc {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .guide-toc a {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 9px 12px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 13px;
          color: var(--subdued);
          transition: background 0.15s, color 0.15s;
        }
        .guide-toc a:hover { background: rgba(255,255,255,0.04); color: #fff; }
        .guide-toc-num {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 700;
          color: var(--muted);
          min-width: 20px;
        }

        /* ── Article content ──────────────────────────────── */
        .guide-content {
          display: flex;
          flex-direction: column;
          gap: 72px;
        }
        .guide-section { display: flex; flex-direction: column; gap: 32px; }
        .guide-section-head {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .guide-sec-num {
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          color: var(--green);
          letter-spacing: 0.1em;
          min-width: 28px;
          padding-top: 5px;
        }
        .guide-h2 {
          font-size: clamp(22px, 2.5vw, 30px);
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
        }
        .guide-sec-sub {
          font-size: 14px;
          color: var(--subdued);
          margin: 6px 0 0;
          line-height: 1.6;
        }
        .guide-h3 {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin: 0 0 12px;
          color: #fff;
        }
        .guide-p {
          font-size: 15px;
          color: var(--subdued);
          line-height: 1.75;
          margin: 0;
        }
        .guide-subsection {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-left: 20px;
          border-left: 2px solid var(--border);
        }
        .guide-subsection + .guide-subsection { margin-top: 8px; }

        /* ── Tables ───────────────────────────────────────── */
        .guide-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .guide-table th {
          font-family: var(--font-display);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--muted);
          text-align: left;
          padding: 10px 16px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid var(--border);
        }
        .guide-table td {
          padding: 12px 16px;
          color: var(--subdued);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: top;
          line-height: 1.6;
        }
        .guide-table tr:last-child td { border-bottom: none; }
        .guide-table code {
          font-size: 12px;
          font-family: 'SF Mono', 'Fira Code', monospace;
          background: rgba(28,231,131,0.08);
          color: var(--green);
          padding: 2px 7px;
          border-radius: 4px;
          white-space: nowrap;
        }
        .guide-table-wrap {
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
        }

        /* ── Note callouts ────────────────────────────────── */
        .guide-note {
          display: flex;
          gap: 14px;
          background: rgba(28,231,131,0.05);
          border: 1px solid rgba(28,231,131,0.18);
          border-radius: 10px;
          padding: 16px 20px;
          font-size: 14px;
          color: var(--subdued);
          line-height: 1.7;
        }
        .guide-note::before {
          content: '→';
          color: var(--green);
          font-size: 14px;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .guide-note strong { color: #fff; }
        .guide-note code {
          font-size: 12px;
          font-family: 'SF Mono', 'Fira Code', monospace;
          background: rgba(28,231,131,0.1);
          color: var(--green);
          padding: 1px 6px;
          border-radius: 4px;
        }
        .guide-note a { color: var(--green); text-decoration: underline; text-underline-offset: 3px; }

        /* ── Numbered steps ───────────────────────────────── */
        .guide-steps {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .guide-steps li {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 14px;
          color: var(--subdued);
          line-height: 1.65;
        }
        .guide-step-num {
          min-width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(28,231,131,0.1);
          border: 1px solid rgba(28,231,131,0.25);
          color: var(--green);
          font-family: var(--font-display);
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .guide-steps li strong { color: #fff; }
        .guide-steps li code {
          font-size: 12px;
          font-family: 'SF Mono', 'Fira Code', monospace;
          background: rgba(28,231,131,0.08);
          color: var(--green);
          padding: 1px 6px;
          border-radius: 4px;
        }
        .guide-steps li a { color: var(--green); text-decoration: underline; text-underline-offset: 3px; }

        /* ── Code block ───────────────────────────────────── */
        .guide-code {
          background: #0d0d0d;
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 20px 24px;
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 13px;
          color: #9ca3af;
          line-height: 1.8;
          white-space: pre;
          overflow-x: auto;
        }
        .guide-code .hl { color: var(--green); }

        /* ── Icon grid (icons list) ───────────────────────── */
        .guide-icon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 8px;
        }
        .guide-icon-item {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: var(--subdued);
        }
        .guide-icon-item code {
          display: block;
          font-family: 'SF Mono', 'Fira Code', monospace;
          font-size: 11px;
          color: var(--green);
          background: none;
          padding: 0;
          margin-bottom: 2px;
        }

        /* ── Divider ──────────────────────────────────────── */
        .guide-divider {
          border: none;
          border-top: 1px solid var(--border);
          margin: 0;
        }

        /* ── Task cards (common tasks) ────────────────────── */
        .guide-tasks {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .guide-task {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 28px 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .guide-task-title {
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.01em;
        }

        /* ── Troubleshooting ──────────────────────────────── */
        .guide-trouble {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .guide-trouble-item {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .guide-trouble-q {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
        }
        .guide-trouble-a {
          font-size: 14px;
          color: var(--subdued);
          line-height: 1.65;
        }
        .guide-trouble-a code {
          font-size: 12px;
          font-family: 'SF Mono', 'Fira Code', monospace;
          background: rgba(28,231,131,0.08);
          color: var(--green);
          padding: 1px 6px;
          border-radius: 4px;
        }
      `}</style>

      <div className="guide-wrap">

        {/* ── Header ── */}
        <header className="guide-header">
          <div className="guide-header-eyebrow">Client Guide · Cove Digital</div>
          <h1>Website Editing Guide<br /><em>Dr. Venarucci — Functional Medicine &amp; Longevity Coaching</em></h1>
          <p className="guide-header-meta">
            Everything you need to edit your website — text, photos, blog posts, pricing, FAQs, videos, and more — without touching any code. Your editor lives at{' '}
            <a href="https://drvenarucci.com/admin" target="_blank" rel="noopener noreferrer">drvenarucci.com/admin</a>.
          </p>
          <div className="guide-quick">
            <div className="guide-quick-item">
              <div className="guide-quick-label">Your Editor URL</div>
              <div className="guide-quick-value"><a href="https://drvenarucci.com/admin" target="_blank" rel="noopener noreferrer">drvenarucci.com/admin</a></div>
            </div>
            <div className="guide-quick-item">
              <div className="guide-quick-label">Login Account</div>
              <div className="guide-quick-value"><a href="https://app.tina.io" target="_blank" rel="noopener noreferrer">app.tina.io</a></div>
            </div>
            <div className="guide-quick-item">
              <div className="guide-quick-label">Live After Save</div>
              <div className="guide-quick-value">~2 minutes</div>
            </div>
          </div>
        </header>

        {/* ── Body ── */}
        <div className="guide-body">

          {/* Sidebar TOC */}
          <aside className="guide-sidebar">
            <div className="guide-toc-label">Sections</div>
            <ul className="guide-toc">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>
                    <span className="guide-toc-num">{item.num}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li><a href="#troubleshooting"><span className="guide-toc-num">—</span>Troubleshooting</a></li>
            </ul>
          </aside>

          {/* Article */}
          <article className="guide-content">

            {/* ── 01 Global Settings ── */}
            <section className="guide-section">
              <SectionHead id="s1" num="01" title="Global Settings" sub="Controls your logo, phone, email, social links, and navigation. Changes here affect every page." />

              <div className="guide-subsection">
                <H3>Logo</H3>
                <P>The logo fields store a URL pointing to your logo image. To change a logo: upload the new image to your CDN, copy its URL, paste it into the field, and save.</P>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Logo URL', 'The full-color horizontal logo shown in the top navigation bar'],
                    ['Footer Logo URL', 'The white logomark shown in the dark footer'],
                  ]} />
                </div>
                <Note>Current logo files are stored at <code>https://cdn.bscholl.xyz/scm/clients/drvenarucci/logos/</code></Note>
              </div>

              <div className="guide-subsection">
                <H3>Phone, Email & Address</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Phone', 'Appears in the nav bar and footer — format: (570) 226-4119'],
                    ['Email', 'Appears in the footer contact section'],
                    ['Address', 'Short location note — e.g. "By appointment & telehealth"'],
                  ]} />
                </div>
                <Note>The <strong>BOOK A CALL</strong> button routes to <code>/contact</code>, not the phone number directly.</Note>
              </div>

              <div className="guide-subsection">
                <H3>Social Media Links</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Instagram', 'Full URL — e.g. https://www.instagram.com/drvenarucci'],
                    ['Facebook URL', 'Full URL — e.g. https://www.facebook.com/drvenarucci'],
                  ]} />
                </div>
              </div>

              <div className="guide-subsection">
                <H3>Navigation Menu</H3>
                <P>The Nav Links list controls what appears in the top menu bar. Each item has a <strong style={{color:'#fff'}}>Label</strong> (the visible text) and a <strong style={{color:'#fff'}}>URL</strong> (where it goes).</P>
                <Note><strong>Do not change the URLs</strong> (<code>/about</code>, <code>/programs</code>, etc.) unless the corresponding page has also been renamed in the code. Only the Labels are safe to freely edit.</Note>
              </div>
            </section>

            {/* ── 02 Home Page ── */}
            <section className="guide-section">
              <SectionHead id="s2" num="02" title="Home Page" sub="Built from five content blocks — Hero, Credentials Strip, Method, Programs, and CTA." />

              <div className="guide-subsection">
                <H3>Hero Block</H3>
                <P>The first thing visitors see — the large section at the top with your photo.</P>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Headline', 'The large text. Use Enter to split onto two lines.'],
                    ['Subheadline', 'The paragraph below the headline'],
                    ['Primary CTA Label', 'Button text — currently BOOK A FREE CALL'],
                    ['Primary CTA URL', 'Where the button goes — currently /contact'],
                    ['Background Image', 'URL of the photo shown on the right side'],
                  ]} />
                </div>
                <Note>To change the hero photo: upload a portrait-orientation image to your image host, copy the URL, and paste it into Background Image.</Note>
              </div>

              <div className="guide-subsection">
                <H3>Credentials Strip</H3>
                <P>The bar beneath the hero that lists your credentials. Each item has one field: <strong style={{color:'#fff'}}>Label</strong> — the text that appears (e.g. "Functional Medicine Trained").</P>
              </div>

              <div className="guide-subsection">
                <H3>Method Block</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Eyebrow', 'The italic heading above the wheel'],
                    ['Intro', 'The paragraph beneath the heading'],
                    ['Systems', 'The 8 body systems shown around the center wheel (keep at exactly 8)'],
                  ]} />
                </div>
                <Note>The first 4 systems appear on the <strong>left</strong> side of the wheel; the next 4 on the <strong>right</strong>. Keep the list at 8 items.</Note>
              </div>

              <div className="guide-subsection">
                <H3>Programs Block</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Program 1/2 Name', 'Card heading'],
                    ['Program 1/2 Tagline', 'Short description under the heading'],
                    ['Program 1/2 Body', 'Bullet points — put each one on its own line'],
                    ['Program 1/2 CTA Label', 'Button text'],
                    ['Program 1/2 CTA URL', 'Where the button links — use /contact for the booking page'],
                    ['CTA Badge', 'Bold heading inside the discovery call banner'],
                    ['CTA Body', 'The smaller paragraph text in the banner'],
                    ['CTA Phone', 'Phone number shown on the banner button'],
                  ]} />
                </div>
              </div>

              <div className="guide-subsection">
                <H3>CTA Block</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Headline', 'Large text — e.g. READY TO TAKE ACTION?'],
                    ['Description', 'Paragraph below the headline'],
                    ['Button Label', 'Button text'],
                    ['Button URL', 'Use /contact for the booking page, or tel:5702264119 to dial directly'],
                  ]} />
                </div>
              </div>
            </section>

            {/* ── 03 About Page ── */}
            <section className="guide-section">
              <SectionHead id="s3" num="03" title="About Page" />

              <div className="guide-subsection">
                <H3>Hero Section</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Hero Headline', 'Large heading in the dark top banner'],
                    ['Hero Subheadline', 'Paragraph beneath the heading'],
                  ]} />
                </div>
                <Note>The photo in the hero is fixed to the professional headshot. Contact your developer to change it.</Note>
              </div>

              <div className="guide-subsection">
                <H3>Bio Text</H3>
                <P>The main body text in the "A different kind of doctor" section. Write in plain paragraphs — press Enter twice between paragraphs.</P>
              </div>

              <div className="guide-subsection">
                <H3>Education & Training</H3>
                <P>A list of your degrees, certifications, and training. Each item has one field: <strong style={{color:'#fff'}}>Credential</strong>.</P>
              </div>

              <div className="guide-subsection">
                <H3>Memberships & Affiliations</H3>
                <P>Same structure as credentials. Each item has one field: <strong style={{color:'#fff'}}>Membership</strong>.</P>
              </div>

              <div className="guide-subsection">
                <H3>Practice Values</H3>
                <P>The six value cards. Each card has an Icon, Title, and Body. Use the exact icon name from the list below.</P>
                <div className="guide-icon-grid">
                  {[
                    ['MagnifyingGlass','Magnifying glass'],
                    ['Dna','DNA helix'],
                    ['ChartBar','Bar chart'],
                    ['Hourglass','Hourglass'],
                    ['Handshake','Handshake'],
                    ['BookOpenText','Open book'],
                    ['Heart','Heart'],
                    ['ShieldCheck','Shield + checkmark'],
                    ['Brain','Brain'],
                    ['Leaf','Leaf'],
                    ['Lightning','Lightning bolt'],
                    ['Star','Star'],
                  ].map(([name, desc]) => (
                    <div key={name} className="guide-icon-item">
                      <code>{name}</code>
                      {desc}
                    </div>
                  ))}
                </div>
                <Note>For best layout, keep the number of values at <strong>6</strong> (three rows of two on desktop).</Note>
              </div>

              <div className="guide-subsection">
                <H3>Approach Steps</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Step Number', 'The number shown in the circle (e.g. 1)'],
                    ['Title', 'The step heading'],
                    ['Body', 'The description paragraph'],
                  ]} />
                </div>
              </div>

              <div className="guide-subsection">
                <H3>Stats</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Value', 'The big number or text — e.g. 500+'],
                    ['Label', 'The small text below — e.g. Patients Served'],
                  ]} />
                </div>
              </div>

              <div className="guide-subsection">
                <H3>Closing Quote</H3>
                <P>The italic quote attributed to Dr. Venarucci. Write it without quotation marks — they are added automatically.</P>
              </div>
            </section>

            {/* ── 04 Programs Page ── */}
            <section className="guide-section">
              <SectionHead id="s4" num="04" title="Programs Page" />

              <div className="guide-subsection">
                <H3>Page Header</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Hero Headline', 'Large heading at the top'],
                    ['Hero Subheadline', 'Paragraph below the heading'],
                  ]} />
                </div>
              </div>

              <div className="guide-subsection">
                <H3>Programs (1 & 2)</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Name', 'Program title — e.g. Functional Medicine Journey'],
                    ['Price', 'The price — e.g. $300'],
                    ['Price Note', 'Any note below the price — e.g. Includes portal access'],
                    ['Includes', 'List of what\'s included — each item on its own line'],
                  ]} />
                </div>
                <Note>The <strong>Get Started</strong> button on each program card links to <code>/contact</code>.</Note>
              </div>

              <div className="guide-subsection">
                <H3>Comparison Table</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Feature', 'What\'s being compared — e.g. Advanced Lab Testing'],
                    ['Program 1', 'Type ✓ for yes, — for no, or a short note'],
                    ['Program 2', 'Same'],
                  ]} />
                </div>
              </div>

              <div className="guide-subsection">
                <H3>Bottom CTA</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['CTA Headline', 'Heading at the bottom of the page'],
                    ['CTA Subtext', 'Short paragraph'],
                    ['CTA Phone', 'Phone number shown in the discovery call banner'],
                  ]} />
                </div>
              </div>
            </section>

            {/* ── 05 FAQ ── */}
            <section className="guide-section">
              <SectionHead id="s5" num="05" title="FAQ Page" />

              <div className="guide-subsection">
                <H3>Page Header</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Hero Headline', 'Large heading'],
                    ['Hero Subheadline', 'Short intro paragraph'],
                  ]} />
                </div>
              </div>

              <div className="guide-subsection">
                <H3>FAQ Items</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Question', 'The question as it appears in the accordion'],
                    ['Answer', 'The answer that expands when clicked'],
                    ['Category', 'Groups questions — e.g. Getting Started, Pricing, Testing'],
                  ]} />
                </div>
                <Note>Questions with the same <strong>Category</strong> label are grouped together on the page. Capitalization must match exactly.</Note>
              </div>

              <div className="guide-subsection">
                <H3>Contact Prompt</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Contact Prompt', 'Heading text — e.g. Still have questions?'],
                    ['Contact CTA Label', 'Button text'],
                    ['Contact CTA URL', 'Where the button goes — leave blank to default to /contact'],
                  ]} />
                </div>
              </div>
            </section>

            {/* ── 06 Resources ── */}
            <section className="guide-section">
              <SectionHead id="s6" num="06" title="Resources Page" />

              <div className="guide-subsection">
                <H3>Free Guides</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Tag', 'Small label at the top of the card — e.g. Hormone Health'],
                    ['Title', 'Guide title'],
                    ['Description', 'Short description'],
                    ['Link Label', 'Button text — e.g. DOWNLOAD PDF'],
                    ['Link URL', 'URL to the PDF or download'],
                  ]} />
                </div>
                <Note>Leave <strong>Link URL</strong> blank if the guide isn't ready yet — it will show a "Placeholder" state instead.</Note>
              </div>

              <div className="guide-subsection">
                <H3>Featured Blog Posts</H3>
                <P>Pin specific blog posts to appear on the Resources page. Each item has one field: <strong style={{color:'#fff'}}>Slug</strong> — the last part of the post URL. For a post at <code>/blog/gut-brain-axis</code>, the slug is <code>gut-brain-axis</code>. The title, excerpt, and cover image are pulled automatically.</P>
              </div>

              <div className="guide-subsection">
                <H3>Lab Partners</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Name', 'Lab name'],
                    ['Logo URL', 'URL to the lab\'s logo image'],
                    ['Description', 'Short description of what they do'],
                    ['Website URL', 'URL to the lab\'s website'],
                  ]} />
                </div>
              </div>
            </section>

            {/* ── 07 Blog ── */}
            <section className="guide-section">
              <SectionHead id="s7" num="07" title="Blog" sub="Posts appear at /blog. Each post gets its own page at /blog/your-post-title." />

              <div className="guide-subsection">
                <H3>Creating a New Post</H3>
                <Steps items={[
                  'In the sidebar, click <strong>Blog</strong>',
                  'Click <strong>Create new</strong> (or the + button)',
                  'Name the file using lowercase letters and hyphens only — e.g. <code>hormones-and-weight-gain</code>',
                  'Fill in the post fields (see below)',
                  'When ready, set <strong>Draft</strong> to <code>false</code>, then click Save',
                ]} />
                <Note>If <strong>Draft</strong> is <code>true</code>, the post won't appear on the live site. Use drafts to write before you're ready to publish.</Note>
              </div>

              <div className="guide-subsection">
                <H3>Post Fields</H3>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Title', 'The post title shown on cards and at the top of the article'],
                    ['Date', 'Publication date — format: YYYY-MM-DD (e.g. 2026-08-01)'],
                    ['Author', 'Displayed beneath the title'],
                    ['Excerpt', 'A 1–2 sentence summary shown on blog listing cards'],
                    ['Cover Image', 'URL of the banner photo. Leave blank for a gradient placeholder.'],
                    ['Featured', 'Set to true to pin this post at the top of the listing. Only one post should be featured at a time.'],
                    ['Draft', 'true = hidden from live site. false = published.'],
                    ['Tags', 'One or more topic tags for filtering'],
                  ]} />
                </div>
              </div>

              <div className="guide-subsection">
                <H3>Writing the Post Body</H3>
                <P>The body uses simple Markdown formatting:</P>
                <div className="guide-table-wrap">
                  <table className="guide-table">
                    <thead><tr><th>What you want</th><th>How to write it</th></tr></thead>
                    <tbody>
                      <tr><td>Section heading</td><td><code>## </code> followed by the heading text</td></tr>
                      <tr><td>Bold text</td><td><code>**double asterisks**</code></td></tr>
                      <tr><td>Italic text</td><td><code>*single asterisks*</code></td></tr>
                      <tr><td>Horizontal divider</td><td><code>---</code> on its own line</td></tr>
                      <tr><td>New paragraph</td><td>Leave a blank line between paragraphs</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="guide-code">{`## Why the Gut Matters

Most patients don't realize that **90% of serotonin** is produced in the gut — not the brain.

## What We Do About It

When symptoms overlap with mood issues, we start with *comprehensive stool testing*.`}</div>
                <Note>Use <code>##</code> (two hashes) for headings. Using <code>#</code> (one hash) creates an H1, which conflicts with the post title already at the top of the page.</Note>
              </div>

              <div className="guide-subsection">
                <H3>Tags</H3>
                <P>Tags appear as filter chips on the blog listing page. Use consistent names across posts — the text must match exactly (including capitalization) for the filter to group them correctly.</P>
                <Note>Examples: <code>Functional Medicine</code> · <code>Gut Health</code> · <code>Hormones</code> · <code>Longevity</code></Note>
              </div>

              <div className="guide-subsection">
                <H3>Automatic Features</H3>
                <P>The site handles two things automatically — you don't need to enter them manually:</P>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Read Time', 'Calculated and displayed as a "X min read" badge based on word count'],
                    ['Related Posts', 'Up to 3 related posts shown at the bottom of each article, matched by shared tags'],
                  ]} />
                </div>
              </div>
            </section>

            {/* ── 08 Video Library ── */}
            <section className="guide-section">
              <SectionHead id="s8" num="08" title="Video Library" sub="A password-protected patient resource. Videos are organized into sections." />

              <div className="guide-subsection">
                <H3>Password</H3>
                <P>Change the <strong style={{color:'#fff'}}>Password</strong> field to update the access password for patients. The new password takes effect after the site rebuilds (~2 minutes).</P>
              </div>

              <div className="guide-subsection">
                <H3>Video Sections & Videos</H3>
                <P>Videos are organized into sections (e.g. Foundations, Hormones, Gut Health). Each section has a <strong style={{color:'#fff'}}>Section Title</strong> and a list of videos.</P>
                <div className="guide-table-wrap">
                  <FieldTable rows={[
                    ['Title', 'The video title shown on the card'],
                    ['YouTube ID', 'Just the ID from the YouTube URL — see below'],
                    ['Tag', 'Category tag — usually matches the section name'],
                    ['Description', 'One or two sentences about the video'],
                    ['Duration', 'How long the video is — e.g. 14 min'],
                    ['Date', 'When it was published — e.g. June 2025'],
                  ]} />
                </div>
              </div>

              <div className="guide-subsection">
                <H3>How to Find a YouTube ID</H3>
                <P>A YouTube URL looks like this:</P>
                <div className="guide-code">{`https://www.youtube.com/watch?v=`}<span className="hl">dQw4w9WgXcQ</span>{`
                                               ↑ This part is the ID`}</div>
                <P>For a shortened URL like <code style={{fontFamily:'monospace',fontSize:13,background:'rgba(28,231,131,0.08)',color:'#1ce783',padding:'1px 6px',borderRadius:4}}>https://youtu.be/dQw4w9WgXcQ</code>, the ID is everything after <code style={{fontFamily:'monospace',fontSize:13,background:'rgba(28,231,131,0.08)',color:'#1ce783',padding:'1px 6px',borderRadius:4}}>youtu.be/</code>. Paste only the ID — not the full URL.</P>
                <Note>If the YouTube ID is left blank, the video card shows a "Video coming soon" placeholder — which is fine until the recording is ready.</Note>
              </div>
            </section>

            {/* ── 09 Static Pages ── */}
            <section className="guide-section">
              <SectionHead id="s9" num="09" title="Static Pages" sub="These pages are not editable through TinaCMS. Contact your developer to change them." />
              <div className="guide-table-wrap">
                <table className="guide-table">
                  <thead><tr><th>Page</th><th>URL</th><th>What it is</th></tr></thead>
                  <tbody>
                    <tr>
                      <td><strong style={{color:'#fff'}}>Contact & Book a Call</strong></td>
                      <td><code>/contact</code></td>
                      <td>Phone, email, location, and the inline booking calendar. Calendar is managed through your cal.com account — changes reflect automatically.</td>
                    </tr>
                    <tr>
                      <td><strong style={{color:'#fff'}}>Page Not Found (404)</strong></td>
                      <td>Auto-shown for broken links</td>
                      <td>Dark navy layout with the office photo</td>
                    </tr>
                    <tr>
                      <td><strong style={{color:'#fff'}}>Privacy Policy</strong></td>
                      <td><code>/privacy</code></td>
                      <td>15-section policy covering HIPAA notice, cookies, GDPR/CCPA rights, and named third-party services</td>
                    </tr>
                    <tr>
                      <td><strong style={{color:'#fff'}}>Terms of Service</strong></td>
                      <td><code>/tos</code></td>
                      <td>20-section terms including medical disclaimer, no physician-patient relationship, video library access terms, and Pennsylvania governing law</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Note>To update your booking calendar (available times, duration, questions): log in to <a href="https://app.cal.com" target="_blank" rel="noopener noreferrer">app.cal.com</a> → Event Types → Discovery Call. Changes take effect immediately with no site rebuild needed.</Note>
            </section>

            {/* ── 10 Common Tasks ── */}
            <section className="guide-section">
              <SectionHead id="s10" num="10" title="Common Tasks" sub="Step-by-step instructions for the most frequent edits." />
              <div className="guide-tasks">

                <div className="guide-task">
                  <div className="guide-task-title">Publish a New Blog Post</div>
                  <Steps items={[
                    'Go to <strong>Blog</strong> in the sidebar',
                    'Click <strong>Create new</strong>',
                    'Name the file using lowercase letters and hyphens — e.g. <code>hormone-testing-explained</code>',
                    'Fill in Title, Date, Author, Excerpt, Tags, and the post body',
                    'Set <strong>Draft</strong> to <code>false</code>',
                    'Click Save — the post appears on <code>/blog</code> after ~2 minutes',
                  ]} />
                </div>

                <div className="guide-task">
                  <div className="guide-task-title">Feature a Blog Post at the Top of the Listing</div>
                  <Steps items={[
                    'Go to <strong>Blog</strong>',
                    'Open the post you want to feature',
                    'Set <strong>Featured</strong> to <code>true</code>',
                    'Open any previously featured post and set its <strong>Featured</strong> to <code>false</code>',
                    'Click Save on both',
                  ]} />
                </div>

                <div className="guide-task">
                  <div className="guide-task-title">Update Your Phone Number Everywhere</div>
                  <Steps items={[
                    'Go to <strong>Global Settings</strong>',
                    'Change the <strong>Phone</strong> field',
                    'Click Save',
                  ]} />
                  <Note>The phone in the nav bar and footer updates automatically. BOOK A CALL buttons link to <code>/contact</code> and don't need updating.</Note>
                </div>

                <div className="guide-task">
                  <div className="guide-task-title">Change the Booking Calendar</div>
                  <P>The calendar on <code style={{fontFamily:'monospace',fontSize:13,background:'rgba(28,231,131,0.08)',color:'#1ce783',padding:'1px 6px',borderRadius:4}}>/contact</code> is powered by cal.com. To change available times, add buffer, update questions, or change meeting duration:</P>
                  <Steps items={[
                    'Log in at <a href="https://app.cal.com" target="_blank" rel="noopener noreferrer">app.cal.com</a>',
                    'Go to <strong>Event Types</strong> → <strong>Discovery Call</strong>',
                    'Make your changes and save',
                  ]} />
                  <Note>No website rebuild needed — the embed reflects cal.com changes in real time.</Note>
                </div>

                <div className="guide-task">
                  <div className="guide-task-title">Add a New FAQ Question</div>
                  <Steps items={[
                    'Go to <strong>Pages</strong> → <strong>FAQ</strong>',
                    'Scroll to the <strong>FAQ Items</strong> list',
                    'Click <strong>Add Item</strong>',
                    'Fill in the <strong>Question</strong>, <strong>Answer</strong>, and <strong>Category</strong>',
                    'Click Save',
                  ]} />
                </div>

                <div className="guide-task">
                  <div className="guide-task-title">Add a New Video</div>
                  <Steps items={[
                    'Go to <strong>Video Library</strong>',
                    'Find the section you want to add it to (or create a new section)',
                    'Click <strong>Add Item</strong> inside that section',
                    'Fill in Title, YouTube ID, Description, Duration, and Date',
                    'Click Save',
                  ]} />
                </div>

                <div className="guide-task">
                  <div className="guide-task-title">Change Pricing</div>
                  <Steps items={[
                    'Go to <strong>Pages</strong> → <strong>Programs</strong>',
                    'Find the Program 1 or Program 2 fields',
                    'Update the <strong>Price</strong> field',
                    'Click Save',
                  ]} />
                </div>

                <div className="guide-task">
                  <div className="guide-task-title">Update Social Media Links</div>
                  <Steps items={[
                    'Go to <strong>Global Settings</strong>',
                    'Update the <strong>Instagram</strong> or <strong>Facebook URL</strong> field with the full URL to your profile',
                    'Click Save',
                  ]} />
                </div>

              </div>
            </section>

            {/* ── Troubleshooting ── */}
            <section className="guide-section">
              <SectionHead id="troubleshooting" num="—" title="Troubleshooting" />
              <div className="guide-trouble">
                {[
                  {
                    q: 'Changes not showing on the live site?',
                    a: 'Wait 2 minutes after saving and do a hard refresh: hold Shift and click the browser refresh button, or press Cmd+Shift+R on Mac / Ctrl+Shift+R on Windows.',
                  },
                  {
                    q: 'I accidentally deleted something.',
                    a: 'TinaCMS saves every change to GitHub, which keeps a full history. Contact your developer to restore a previous version.',
                  },
                  {
                    q: 'The preview looks different from the live site.',
                    a: 'The preview in TinaCMS is a live preview — it should match exactly. If something looks off, save your changes and check the live site after the 2-minute rebuild.',
                  },
                  {
                    q: "I can't log in to /admin.",
                    a: 'Make sure you\'re using the email and password from your app.tina.io account. If you forgot it, use the "Forgot password" link on the TinaCMS login page.',
                  },
                  {
                    q: "A blog post I saved isn't showing up.",
                    a: 'Check that the Draft field is set to false. Also confirm the Date is not in the future — posts dated in the future won\'t appear until that date.',
                  },
                  {
                    q: "A field I need isn't listed here.",
                    a: 'Contact your developer. New editable fields can be added to TinaCMS without rebuilding the whole site.',
                  },
                ].map((item, i) => (
                  <div key={i} className="guide-trouble-item">
                    <div className="guide-trouble-q">{item.q}</div>
                    <div className="guide-trouble-a" dangerouslySetInnerHTML={{ __html: item.a }} />
                  </div>
                ))}
              </div>
            </section>

            {/* Footer note */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>
                Built &amp; maintained by{' '}
                <a href="/" style={{ color: 'var(--green)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                  Cove Digital
                </a>
              </span>
              <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}>
                Last updated July 2026
              </span>
            </div>

          </article>
        </div>
      </div>
    </>
  )
}
