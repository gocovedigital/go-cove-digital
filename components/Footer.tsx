export default function Footer({ global }: { global?: any }) {
  // Harbor fields: footer_tags (text list), footer_copyright (text)
  const tags: string[] = global?.footer_tags ?? ['Strategy', 'Design', 'Production']
  const copy: string   = global?.footer_copyright ?? '© 2026 Cove Digital'

  return (
    <footer>
      <div className="footer-brand">
        <img src="/cove-logo.svg" alt="Cove Digital" />
      </div>
      <div className="footer-tags">
        {tags.map((tag, i) => (
          <>
            {i > 0 && <div key={`sep-${i}`} className="footer-sep" />}
            <span key={tag}>{tag}</span>
          </>
        ))}
      </div>
      <div className="footer-right">
        <a href="/legal" className="footer-legal">Legal</a>
        <p className="footer-copy">{copy}</p>
      </div>
    </footer>
  )
}
