/** Styleguide demos — live Dyvenia copy; `docs` describes each type for neutral bands. */
export default {
  docs: {
    hero: {
      title: 'hero',
      body: 'Page opener with media, title, subtitle, and CTA. Theme drives surface + text contrast and the default CTA; accent overrides the button color.'
    },
    text: {
      title: 'text',
      body: 'Prose block — single column or split (content_left / content_right). Theme paints a full-bleed band; width sets the inner measure (content / feature / full).'
    },
    highlight: {
      title: 'highlight',
      body: 'Full-bleed callout. Defaults to theme teal. Supports title or title1/title2, plus optional subtitle and content.'
    },
    list: {
      title: 'list',
      body: 'Structured items. Variants: definition (default), checklist, stack. Theme bands the full width; width controls the inner column.'
    },
    process: {
      title: 'process',
      body: 'Numbered delivery timeline with optional SVG decoration. Uses title1/title2 or a single title.'
    },
    feature: {
      title: 'feature',
      body: 'Text + media split. media_side: left or right. CTA uses theme default accent unless overridden.'
    },
    accordion: {
      title: 'accordion',
      body: 'FAQ / expandable details with optional intro and CTA. Expand/collapse controls are included. Theme and width follow the shared shell.'
    },
    cta: {
      title: 'cta',
      body: 'Closing or mid-page band (page-header pattern) with image treatment, title, subtitle, and button. Defaults to theme gray-dark.'
    }
  },
  hero: {
    type: 'hero',
    theme: 'gray-dark',
    align: 'left',
    height: 'tall',
    background: 'teal-800',
    title: 'Enterprise Data Platform',
    subtitle:
      'A connected foundation for pipelines, systems, and metrics — engineered for reliability, governance, and scale.',
    button_text: 'Schedule a discovery call',
    button_target: 'https://meetings-eu1.hubspot.com/alessio-civitillo/book-a-call',
    image: './src/assets/images/backgrounds/sfondi-dyvenia26.jpg'
  },
  text: {
    type: 'text',
    width: 'feature',
    align: 'left',
    title: 'One platform. Clear lineage. Trusted outcomes.',
    content_left:
      'We design and build the data platform your business actually runs on — aligned to your systems, processes, and decision needs.',
    content_right:
      '- Architectural design across ERP, CRM, and operational systems\n- Pipelines and transformations with clear, traceable logic\n- Governance, observability, and reliability from day one'
  },
  highlight: {
    type: 'highlight',
    theme: 'teal',
    align: 'left',
    title: 'Stop stitching tools together. Start running a platform.',
    subtitle:
      'We align business and technology around the decisions you need to make, then engineer the platform to support them.'
  },
  list: {
    type: 'list',
    variant: 'definition',
    width: 'feature',
    title: 'What you get',
    items: [
      {
        title: 'Integrated architecture',
        content: 'Systems, pipelines, and models designed as one consistent structure.'
      },
      {
        title: 'Operational reliability',
        content: 'Observability and clear ownership so issues are detected and fixed quickly.'
      },
      {
        title: 'A foundation that scales',
        content: 'Growth without breaking consistency or reinventing integrations.'
      }
    ]
  },
  process: {
    type: 'process',
    align: 'center',
    title1: 'How we',
    title2: 'deliver',
    decoration: 'brand/medusa-organic',
    items: [
      {
        title: 'Assess & align',
        content: 'Map systems, constraints, and decision flows before writing code.'
      },
      {
        title: 'Design the foundation',
        content: 'Define architecture, ownership, and data contracts that scale.'
      },
      {
        title: 'Build & harden',
        content: 'Implement pipelines, observability, and governance with production standards.'
      },
      {
        title: 'Operate & evolve',
        content: 'Hand over a platform your teams can trust and extend.'
      }
    ]
  },
  feature: {
    type: 'feature',
    width: 'feature',
    media_side: 'right',
    title: 'Metrics that travel with the platform',
    content:
      'We embed standardized definitions into your data models so every downstream tool inherits the same logic.',
    button_text: 'Talk to us',
    button_target: 'https://meetings-eu1.hubspot.com/alessio-civitillo/book-a-call',
    image: './src/assets/images/backgrounds/jellyfish-hr.jpg'
  },
  accordion: {
    type: 'accordion',
    width: 'feature',
    title: 'Common questions',
    intro: 'Practical answers about how we approach enterprise data platforms.',
    button_text: 'Book a call',
    button_target: 'https://meetings-eu1.hubspot.com/alessio-civitillo/book-a-call',
    items: [
      {
        title: 'Do you replace our existing stack?',
        content:
          'Not by default. We design around what you already have and modernize where it creates leverage.'
      },
      {
        title: 'How do you handle governance?',
        content:
          'Governance is built into models, pipelines, and ownership — not bolted on later as documentation.'
      }
    ]
  },
  cta: {
    type: 'cta',
    theme: 'gray-dark',
    align: 'left',
    title: 'Ready to strengthen your data platform?',
    subtitle:
      'Tell us where your systems and decisions are misaligned. We’ll help you design a platform that connects them.',
    button_text: 'Schedule a discovery call',
    button_target: 'https://meetings-eu1.hubspot.com/alessio-civitillo/book-a-call',
    image: './src/assets/images/backgrounds/sfondi-dyvenia04.jpg'
  }
};
