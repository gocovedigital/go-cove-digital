import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: process.env.GITHUB_BRANCH ?? process.env.VERCEL_GIT_COMMIT_REF ?? 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? '',
  token: process.env.TINA_TOKEN ?? '',

  build: { outputFolder: 'admin', publicFolder: 'public' },

  media: {
    tina: { mediaRoot: 'uploads', publicFolder: 'public' },
  },

  schema: {
    collections: [
      // ─── GLOBAL (nav + footer) ────────────────────────────────────────────
      {
        name: 'global',
        label: 'Global Settings',
        path: 'content/global',
        format: 'json',
        ui: { global: true },
        fields: [
          {
            name: 'nav',
            label: 'Navigation',
            type: 'object',
            fields: [
              {
                name: 'links',
                label: 'Nav Links',
                type: 'object',
                list: true,
                ui: { itemProps: (item) => ({ label: item.label }) },
                fields: [
                  { name: 'label', label: 'Label', type: 'string' },
                  { name: 'href',  label: 'URL',   type: 'string' },
                  { name: 'isCta', label: 'CTA Style', type: 'boolean' },
                ],
              },
            ],
          },
          {
            name: 'footer',
            label: 'Footer',
            type: 'object',
            fields: [
              { name: 'tags',      label: 'Tags',           type: 'string', list: true },
              { name: 'copyright', label: 'Copyright Text', type: 'string' },
            ],
          },
        ],
      },

      // ─── HOME PAGE ────────────────────────────────────────────────────────
      {
        name: 'home',
        label: 'Home Page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'home' },
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => '/',
        },
        fields: [
          {
            name: 'hero',
            label: 'Hero',
            type: 'object',
            fields: [
              { name: 'badge',          label: 'Badge Text',          type: 'string' },
              { name: 'line1',          label: 'Headline Line 1',     type: 'string' },
              { name: 'line2Prefix',    label: 'Headline Line 2 Prefix', type: 'string' },
              { name: 'cyclingWords',   label: 'Cycling Words',       type: 'string', list: true },
              { name: 'sub',            label: 'Subheadline',         type: 'string', ui: { component: 'textarea' } },
              { name: 'primaryCtaLabel', label: 'Primary CTA Label',  type: 'string' },
              { name: 'primaryCtaHref',  label: 'Primary CTA URL',    type: 'string' },
              { name: 'ghostCtaLabel',   label: 'Ghost CTA Label',    type: 'string' },
              { name: 'ghostCtaHref',    label: 'Ghost CTA URL',      type: 'string' },
            ],
          },
          {
            name: 'problem',
            label: 'Problem Section',
            type: 'object',
            fields: [
              { name: 'heading',      label: 'Heading',            type: 'string' },
              { name: 'headingMuted', label: 'Heading (muted part)', type: 'string' },
              { name: 'body',         label: 'Body Text',          type: 'string', ui: { component: 'textarea' } },
            ],
          },
          {
            name: 'services',
            label: 'Services Section',
            type: 'object',
            fields: [
              { name: 'sectionLabel', label: 'Section Label', type: 'string' },
              { name: 'heading',      label: 'Heading',       type: 'string' },
              { name: 'ctaLabel',     label: 'Link Label',    type: 'string' },
              { name: 'ctaHref',      label: 'Link URL',      type: 'string' },
              {
                name: 'cards',
                label: 'Service Cards',
                type: 'object',
                list: true,
                ui: { itemProps: (item) => ({ label: item.title }) },
                fields: [
                  { name: 'number',      label: 'Number',      type: 'string' },
                  { name: 'title',       label: 'Title',       type: 'string' },
                  { name: 'description', label: 'Description', type: 'string', ui: { component: 'textarea' } },
                  { name: 'featured',    label: 'Featured',    type: 'boolean' },
                  { name: 'bullets',     label: 'Bullet Items', type: 'string', list: true },
                ],
              },
            ],
          },
          {
            name: 'process',
            label: 'Process Section',
            type: 'object',
            fields: [
              { name: 'title', label: 'Title', type: 'string' },
              {
                name: 'steps',
                label: 'Steps',
                type: 'object',
                list: true,
                ui: { itemProps: (item) => ({ label: item.title }) },
                fields: [
                  { name: 'title', label: 'Title', type: 'string' },
                  { name: 'body',  label: 'Body',  type: 'string', ui: { component: 'textarea' } },
                ],
              },
            ],
          },
          {
            name: 'authority',
            label: 'Why SCM Section',
            type: 'object',
            fields: [
              { name: 'sectionLabel', label: 'Section Label', type: 'string' },
              { name: 'heading',      label: 'Heading',       type: 'string' },
              { name: 'body',         label: 'Body',          type: 'string', ui: { component: 'textarea' } },
            ],
          },
          {
            name: 'contact',
            label: 'Contact Section',
            type: 'object',
            fields: [
              { name: 'heading',        label: 'Heading',       type: 'string' },
              { name: 'intro',          label: 'Intro Text',    type: 'string', ui: { component: 'textarea' } },
              { name: 'serviceOptions', label: 'Service Dropdown Options', type: 'string', list: true },
              { name: 'submitLabel',    label: 'Submit Button Label', type: 'string' },
            ],
          },
        ],
      },

      // ─── FOUNDER PAGE ─────────────────────────────────────────────────────
      {
        name: 'founder',
        label: 'Founder Page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'founder' },
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => '/founder',
        },
        fields: [
          { name: 'eyebrow',       label: 'Eyebrow',        type: 'string' },
          { name: 'heroTitle',     label: 'Hero Title',     type: 'string' },
          { name: 'heroTitleMuted', label: 'Hero Title (muted)', type: 'string' },
          { name: 'heroSub',       label: 'Hero Subtext',   type: 'string', ui: { component: 'textarea' } },
          { name: 'primaryCtaLabel', label: 'Primary CTA Label', type: 'string' },
          { name: 'primaryCtaHref',  label: 'Primary CTA URL',   type: 'string' },
          { name: 'ghostCtaLabel',   label: 'Ghost CTA Label',   type: 'string' },
          { name: 'ghostCtaHref',    label: 'Ghost CTA URL',     type: 'string' },
          { name: 'founderName',   label: 'Founder Name',   type: 'string' },
          { name: 'founderTitle',  label: 'Founder Title',  type: 'string' },
          { name: 'founderPhoto',  label: 'Founder Photo',  type: 'image' },
          { name: 'sidebarLabel',  label: 'Sidebar Label',  type: 'string' },
          { name: 'sidebarTags',   label: 'Sidebar Tags',   type: 'string', list: true },
          {
            name: 'content',
            label: 'Body Content',
            type: 'object',
            list: true,
            templates: [
              {
                name: 'paragraph',
                label: 'Paragraph',
                fields: [
                  { name: 'text', label: 'Text (use **bold** for emphasis)', type: 'string', ui: { component: 'textarea' } },
                ],
              },
              {
                name: 'pullQuote',
                label: 'Pull Quote',
                fields: [
                  { name: 'text', label: 'Quote Text', type: 'string', ui: { component: 'textarea' } },
                ],
              },
            ],
          },
          {
            name: 'cta',
            label: 'CTA Section',
            type: 'object',
            fields: [
              { name: 'label',           label: 'Label',            type: 'string' },
              { name: 'heading',         label: 'Heading',          type: 'string' },
              { name: 'headingGradient', label: 'Heading (gradient part)', type: 'string' },
              { name: 'sub',             label: 'Subtext',          type: 'string', ui: { component: 'textarea' } },
              { name: 'primaryCtaLabel', label: 'Primary CTA Label', type: 'string' },
              { name: 'primaryCtaHref',  label: 'Primary CTA URL',   type: 'string' },
              { name: 'ghostCtaLabel',   label: 'Ghost CTA Label',   type: 'string' },
              { name: 'ghostCtaHref',    label: 'Ghost CTA URL',     type: 'string' },
            ],
          },
        ],
      },

      // ─── CASE STUDIES ─────────────────────────────────────────────────────
      {
        name: 'work',
        label: 'Case Studies',
        path: 'content/work',
        format: 'json',
        ui: {
          router: ({ document }) => `/work/${document._sys.filename}`,
        },
        fields: [
          { name: 'title',      label: 'Title',             type: 'string' },
          { name: 'titleMuted', label: 'Title (muted part)', type: 'string' },
          { name: 'lead',       label: 'Lead Text',         type: 'string', ui: { component: 'textarea' } },
          {
            name: 'metaPills',
            label: 'Meta Pills',
            type: 'object',
            list: true,
            ui: { itemProps: (item) => ({ label: item.label }) },
            fields: [
              { name: 'label',     label: 'Label',       type: 'string' },
              { name: 'highlight', label: 'Highlighted', type: 'boolean' },
            ],
          },
          {
            name: 'overview',
            label: 'Overview Strip',
            type: 'object',
            list: true,
            ui: { itemProps: (item) => ({ label: item.label }) },
            fields: [
              { name: 'label', label: 'Label', type: 'string' },
              { name: 'value', label: 'Value', type: 'string' },
            ],
          },
          {
            name: 'sections',
            label: 'Content Sections',
            type: 'object',
            list: true,
            ui: { itemProps: (item) => ({ label: item.navLabel }) },
            fields: [
              { name: 'sectionLabel', label: 'Section Label (e.g. 01 · Situation)', type: 'string' },
              { name: 'navLabel',     label: 'Sidebar Nav Label', type: 'string' },
              { name: 'heading',      label: 'Heading',           type: 'string' },
              {
                name: 'paragraphs',
                label: 'Paragraphs (use **text** for bold)',
                type: 'string',
                list: true,
                ui: { component: 'textarea' },
              },
              {
                name: 'callout',
                label: 'Callout Box',
                type: 'object',
                fields: [
                  { name: 'type',  label: 'Type', type: 'string', options: ['problem', 'solution'] },
                  { name: 'label', label: 'Label', type: 'string' },
                  { name: 'body',  label: 'Body',  type: 'string', ui: { component: 'textarea' } },
                ],
              },
              { name: 'beforeItems',  label: 'Before Items',  type: 'string', list: true },
              { name: 'afterItems',   label: 'After Items',   type: 'string', list: true },
              { name: 'deliverables', label: 'Deliverables',  type: 'string', list: true },
              {
                name: 'pullQuote',
                label: 'Pull Quote',
                type: 'object',
                fields: [
                  { name: 'text',        label: 'Quote',       type: 'string', ui: { component: 'textarea' } },
                  { name: 'attribution', label: 'Attribution', type: 'string' },
                ],
              },
            ],
          },
          {
            name: 'cta',
            label: 'CTA Section',
            type: 'object',
            fields: [
              { name: 'sectionLabel',    label: 'Section Label', type: 'string' },
              { name: 'heading',         label: 'Heading',       type: 'string' },
              { name: 'headingGradient', label: 'Gradient Part', type: 'string' },
              { name: 'sub',             label: 'Subtext',       type: 'string' },
            ],
          },
        ],
      },
    ],
  },
})
