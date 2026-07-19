export default function Footer({ global }: { global?: any }) {
  // Harbor fields: footer_tags (list of {value}), footer_copyright (text)
  const rawTags: any[] = global?.footer_tags ?? []
  const tags: string[] = rawTags.length ? rawTags.map((t) => t?.value ?? t) : ['Strategy', 'Design', 'Production']
  const copy: string   = global?.footer_copyright ?? '© 2026 Cove Digital'

  return (
    <footer>
      <div className="footer-brand">
        <img src="https://pub-d747071e79ff40d6bd2f2b88b1e9a9b8.r2.dev/Cove-Digital-White.png" alt="Cove Digital" />
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
