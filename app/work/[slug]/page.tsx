import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getContent } from '@/lib/harbor'
import WorkClient from '@/components/WorkClient'

// Local JSON fallbacks — used until Harbor "work" list is populated
import ridgeline from '@/content/work/ridgeline-tavern.json'
import eaa from '@/content/work/eaa-chapter-283.json'
import summit from '@/content/work/summit-ridge-contracting.json'

const LOCAL_WORK: Record<string, any> = {
  'ridgeline-tavern':       { ...ridgeline,  slug: 'ridgeline-tavern' },
  'eaa-chapter-283':        { ...eaa,        slug: 'eaa-chapter-283' },
  'summit-ridge-contracting': { ...summit,   slug: 'summit-ridge-contracting' },
}

async function getWork(): Promise<any[]> {
  try {
    const { content } = await getContent()
    const list: any[] = content['work'] ?? []
    if (list.length) return list
  } catch { /* fall through */ }
  return Object.values(LOCAL_WORK)
}

export async function generateStaticParams() {
  const entries = await getWork()
  return entries.map((e) => ({ slug: e.slug ?? '' }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const entries = await getWork()
  const entry = entries.find((e) => e.slug === params.slug)
  if (!entry) return {}
  return { title: `${entry.title ?? ''} ${entry.titleMuted ?? ''} — Case Study | Cove Digital`.trim() }
}

export default async function WorkPage({ params }: { params: { slug: string } }) {
  const entries = await getWork()
  const entry = entries.find((e) => e.slug === params.slug)
  if (!entry) notFound()
  return <WorkClient work={entry} />
}
