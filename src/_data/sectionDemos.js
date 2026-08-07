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
    },
    posts: {
      title: 'posts',
      body: 'Latest insights cards from the posts collection. Options: count, layout (grid | masonry), optional title link.'
    },
    team: {
      title: 'team',
      body: 'People grid from team_members. filter defaults to show_on_about; header_layout thirds matches the home about band.'
    },
    form: {
      title: 'form',
      body: 'HubSpot newsletter band. Optional title/intro; form copy comes from site meta.'
    },
    services: {
      title: 'services',
      body: 'Full-bleed background image with stacked service rows (prefix + title + markdown). Home-specific layout.'
    },
    tabs: {
      title: 'tabs',
      body: 'Multi-stage tabbed process (stage nav + step panels with what / outcomes). Distinct from the process timeline.'
    },
    cases: {
      title: 'cases',
      body: 'Case-study card strip (same card shell as posts). Renders empty when the case studies collection has no entries.'
    },
    gallery: {
      title: 'gallery',
      body: 'Modal image grid. Items: image, alt, optional caption.'
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
  },
  posts: {
    type: 'posts',
    theme: 'white',
    width: 'feature',
    title: 'Our Insights',
    intro: 'Selected Articles. Check our blog for more.',
    count: 3,
    layout: 'grid'
  },
  team: {
    type: 'team',
    theme: 'white',
    width: 'feature',
    header_layout: 'thirds',
    filter: 'show_on_about',
    title: 'Who We Are',
    content:
      'We’re not just data engineers or consultants. We’ve sat on **both sides**.'
  },
  form: {
    type: 'form',
    theme: 'gray-light',
    width: 'content',
    title: 'Stay in the loop',
    intro: 'Subscribe for insights on data platforms, metrics, and AI that ships.'
  },
  services: {
    type: 'services',
    theme: 'navy',
    title: 'How We Deliver Results',
    image: './src/assets/images/backgrounds/sfondi-dyvenia26.jpg',
    items: [
      {
        prefix: 'Data Platform',
        title: 'Engineering',
        description:
          'We design and build the foundation your data actually runs on.\n\n- Architectural design aligned with your systems\n- Pipelines with clear, traceable logic'
      },
      {
        prefix: 'Metrics & Business',
        title: 'Logic',
        description:
          'We make your numbers consistent, defined, and trusted across the organization.'
      }
    ]
  },
  tabs: {
    type: 'tabs',
    theme: 'white',
    width: 'feature',
    title: 'Our Process',
    intro: 'A structured, two-stage process aligned to your business objectives.',
    title_what: 'What we do?',
    title_outcomes: 'Outcomes:',
    stages: [
      {
        label: 'Stage 1',
        name: 'Plan',
        steps: [
          {
            label: 'Step 1',
            title: 'Perform a Metrics Audit',
            content:
              'We evaluate your existing metrics, identify gaps, and define the desired outcome.',
            outcomes: '- Identification of metrics gaps\n- A functional MVP to demonstrate value'
          },
          {
            label: 'Step 2',
            title: 'Create a Roadmap',
            content: 'We translate the benchmark into a detailed roadmap.',
            outcomes: '- A comprehensive data marts roadmap\n- A resource plan for successful execution'
          }
        ]
      },
      {
        label: 'Stage 2',
        name: 'Execution',
        steps: [
          {
            label: 'Step 3',
            title: 'Release Metrics & Reports',
            content: 'Through iterative sprints, our analysts develop the agreed-upon metrics.',
            outcomes: '- Unified metrics\n- Standardized reports ready for use'
          },
          {
            label: 'Step 4',
            title: 'Operationalize and Support',
            content: 'We transition marts and reports to operations.',
            outcomes: '- Handover to operational teams\n- Continued technical and strategic support'
          }
        ]
      }
    ]
  },
  cases: {
    type: 'cases',
    theme: 'white',
    width: 'feature',
    title: 'Case Studies',
    intro: 'Selected client work. More coming soon.',
    count: 3,
    layout: 'grid'
  },
  gallery: {
    type: 'gallery',
    theme: 'white',
    width: 'feature',
    title: 'Gallery',
    intro: 'Click an image to open it.',
    items: [
      {
        image: './src/assets/images/backgrounds/sfondi-dyvenia04.jpg',
        alt: 'Abstract teal background',
        caption: 'Studio atmosphere'
      },
      {
        image: './src/assets/images/backgrounds/sfondi-dyvenia26.jpg',
        alt: 'Deep blue textured background'
      }
    ]
  }
};
