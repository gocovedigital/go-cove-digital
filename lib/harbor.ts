const HARBOR_URL  = process.env.HARBOR_URL!
const HARBOR_SITE = process.env.HARBOR_SITE!
const HARBOR_API_KEY = process.env.HARBOR_API_KEY!

export interface HarborContent {
  site: { slug: string; name: string }
  preview: boolean
  generatedAt: string
  content: Record<string, any>
}

export async function getContent(opts: { preview?: boolean } = {}): Promise<HarborContent> {
  const url = new URL(`${HARBOR_URL}/api/v1/content/${HARBOR_SITE}`)
  if (opts.preview && process.env.HARBOR_PREVIEW_TOKEN) {
    url.searchParams.set('preview', process.env.HARBOR_PREVIEW_TOKEN)
  }
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${HARBOR_API_KEY}` },
    next: { revalidate: opts.preview ? 0 : 60 },
  })
  if (!res.ok) throw new Error(`Harbor fetch failed: ${res.status}`)
  return res.json()
}
