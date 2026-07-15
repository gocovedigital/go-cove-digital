import { getContent } from '@/lib/harbor'
import HomeClient from '@/components/HomeClient'

// Fallback content — shown until Harbor "home" section is populated
const FALLBACK = {
  hero: {
    line1: 'Your business is great.',
    line2Prefix: 'Your brand looks',
    cyclingWords: ['outdated.', 'invisible.', 'forgettable.', 'behind.'],
    sub: 'We rebuild the brands and marketing presence of local businesses that do great work but look stuck in the past — so your image finally matches your quality.',
    primaryCtaLabel: 'Start a Project',
    primaryCtaHref: '/inquire',
    ghostCtaLabel: 'Our Services',
    ghostCtaHref: '/services',
  },
  problem: {
    heading: 'Your customers Google you before they call.',
    body: "A logo from 2009, a website that looks like a template, and no consistent visual identity tell potential customers one thing: this business hasn't kept up. In today's market, perception is everything — and an outdated brand costs you real jobs, every week.",
  },
  services: {
    sectionLabel: 'Capabilities',
    heading: 'We fix the leaks in your brand.',
    ctaLabel: 'Request an audit →',
    ctaHref: '/inquire',
    cards: [
      { number: '01', title: 'Brand Strategy & Identity', description: 'A consistent, modern brand identity changes how customers see you before you ever speak to them.', bullets: ['Visual Positioning & Logo Systems', 'Brand Messaging & Voice', 'Social Content & Asset Batching', 'Event & Promotional Branding'] },
      { number: '02', title: 'Commercial Photography & Video', description: 'Real shots of your business, your team, and your work — imagery that gives your marketing something worth showing off.', bullets: ['Commercial & Action Photography', 'Cinematic Brand Video', 'Professional Real Estate Media'] },
      { number: '03', title: 'Web & Digital Presence', description: 'Clean, fast websites that present your business the way it deserves — consistent with your brand and easy to find.', bullets: ['Brand-Consistent Web Design', 'Local Search Optimization', 'Harbor CMS Integration'] },
    ],
  },
  process: {
    title: 'How We Work',
    steps: [
      { title: '1. The Audit', body: "We look at your current brand, marketing, and digital presence — and give you an honest picture of where you're losing customers and why." },
      { title: '2. The Build', body: 'We execute — new brand identity, fresh marketing assets, and supporting photography or web work. No 8-week timelines, no mystery.' },
      { title: '3. The Launch', body: 'You go to market looking like the business you actually are — with a brand and presence that reflects the quality of your real work.' },
    ],
  },
  contact: {
    heading: 'Ready to command attention?',
    intro: 'Stop settling for "good enough." Send us your project details and we\'ll respond within 24 hours.',
    serviceOptions: ['Brand Strategy & Identity', 'Commercial Photography / Video', 'Web & Digital Presence', 'Full Brand & Marketing Overhaul'],
    submitLabel: 'Submit Inquiry',
  },
}

export default async function HomePage() {
  let home = FALLBACK
  try {
    const { content } = await getContent()
    const h = content['home']
    if (h) {
      home = {
        hero: {
          line1:             h.hero_line1           ?? FALLBACK.hero.line1,
          line2Prefix:       h.hero_line2_prefix    ?? FALLBACK.hero.line2Prefix,
          cyclingWords:      h.hero_cycling_words   ?? FALLBACK.hero.cyclingWords,
          sub:               h.hero_sub             ?? FALLBACK.hero.sub,
          primaryCtaLabel:   h.hero_primary_cta_label ?? FALLBACK.hero.primaryCtaLabel,
          primaryCtaHref:    h.hero_primary_cta_href  ?? FALLBACK.hero.primaryCtaHref,
          ghostCtaLabel:     h.hero_ghost_cta_label   ?? FALLBACK.hero.ghostCtaLabel,
          ghostCtaHref:      h.hero_ghost_cta_href    ?? FALLBACK.hero.ghostCtaHref,
        },
        problem: {
          heading: h.problem_heading ?? FALLBACK.problem.heading,
          body:    h.problem_body    ?? FALLBACK.problem.body,
        },
        services: {
          sectionLabel: h.services_section_label ?? FALLBACK.services.sectionLabel,
          heading:      h.services_heading       ?? FALLBACK.services.heading,
          ctaLabel:     h.services_cta_label     ?? FALLBACK.services.ctaLabel,
          ctaHref:      h.services_cta_href      ?? FALLBACK.services.ctaHref,
          cards:        h.services_cards         ?? FALLBACK.services.cards,
        },
        process: {
          title: h.process_title ?? FALLBACK.process.title,
          steps: h.process_steps ?? FALLBACK.process.steps,
        },
        contact: {
          heading:        h.contact_heading         ?? FALLBACK.contact.heading,
          intro:          h.contact_intro           ?? FALLBACK.contact.intro,
          serviceOptions: h.contact_service_options ?? FALLBACK.contact.serviceOptions,
          submitLabel:    h.contact_submit_label    ?? FALLBACK.contact.submitLabel,
        },
      }
    }
  } catch {
    // use fallback
  }

  return <HomeClient home={home} />
}
