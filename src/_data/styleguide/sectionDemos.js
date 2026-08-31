/** Styleguide demos — live Dyvenia copy; `docs` describes each type for neutral bands. */
export default {
  keys: [
    'hero',
    'text',
    'statement',
    'list',
    'process',
    'feature',
    'accordion',
    'cta',
    'posts',
    'team',
    'form',
    'services',
    'tabs',
    'cases',
    'gallery'
  ],
  docs: {
    hero: {
      title: 'hero',
      body: ''
    },
    text: {
      title: 'text',
      body: ''
    },
    statement: {
      title: 'statement',
      body: ''
    },
    list: {
      title: 'list',
      body: ''
    },
    process: {
      title: 'process',
      body: ''
    },
    feature: {
      title: 'feature',
      body: ''
    },
    accordion: {
      title: 'accordion',
      body: ''
    },
    cta: {
      title: 'cta',
      body: ''
    },
    posts: {
      title: 'posts',
      body: ''
    },
    team: {
      title: 'team',
      body: ''
    },
    form: {
      title: 'form',
      body: ''
    },
    services: {
      title: 'services',
      body: ''
    },
    tabs: {
      title: 'tabs',
      body: ''
    },
    cases: {
      title: 'cases',
      body: ''
    },
    gallery: {
      title: 'gallery',
      body: ''
    }
  },
  hero: {
    type: 'hero',
    appearance: {
      theme: 'background-default',
      align: 'left',
      height: 'tall',
      background: 'teal-800'
    },
    title: '_Reliable_ data platforms. _Trusted_ metrics. AI that actually _works_.',
    subtitle:
      'A connected foundation for pipelines, systems, and metrics — engineered for reliability, governance, and scale.',
    button_text: 'Schedule a discovery call',
    button_target: 'https://meetings-eu1.hubspot.com/alessio-civitillo/book-a-call',
    image: './src/assets/images/backgrounds/sfondi-dyvenia26.jpg'
  },
  text: {
    type: 'text',
    appearance: {
      align: 'left',
      width: 'feature',
      theme: 'background-accent'
    },
    title: 'One platform. **Clear lineage.** Trusted outcomes.',
    content:
      'Full width content. We design and build the data platform your business actually runs on — aligned to your systems, processes, and decision needs.',
    content_left:
      'We design and build the data platform your business actually runs on — aligned to your systems, processes, and decision needs.',
    content_right:
      '- Architectural design across ERP, CRM, and operational systems\n- Pipelines and transformations with **clear, traceable logic**\n- Governance, observability, and reliability from day one',
    decoration: 'brand/stack'
  },
  statement: {
    type: 'statement',
    appearance: {
      theme: 'teal',
      align: 'center',
      body_size: 'small'
    },
    eyebrow: 'The Goal?',
    title:
      'Establish a single, trusted view of the business, where decisions, data, and outcomes are aligned.',
    subtitle:
      'We replace fragmented architectures and conflicting logic with a connected data foundation that keeps systems, metrics, and decisions aligned.',
    decoration: 'brand/waves'
  },
  list: {
    type: 'list',
    appearance: {
      theme: 'gray-dark',
      width: 'feature',
      variant: 'stack',
      checks: true,
      bordered: true
    },
    title: 'What working with us feels like',
    content:
      'We build for teams that want to spend more time delivering and less time managing platform friction.',
    items: [
      {
        title: 'Production-grade foundations',
        content: 'Instead of duct-taped workflows.'
      },
      {
        title: 'Operational patterns that stick',
        content: 'CI/CD, observability, and deployment habits that reduce risk.'
      },
      {
        title: 'Reusable project structure',
        content: 'Templates and ownership models your teams can extend.'
      },
      {
        title: 'Fewer incidents',
        content: 'Clearer ownership and more predictable operations.'
      }
    ]
  },
  process: {
    type: 'process',
    title1: 'How we',
    title2: 'deliver',
    decoration: 'brand/medusa-organic',
    appearance: {
      decoration_accent: 'teal'
    },
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
    appearance: {
      width: 'feature',
      media_side: 'bottom'
    },
    title: 'Metrics that travel with the platform',
    content:
      'We embed standardized definitions into your data models so every downstream tool inherits the same logic.',
    button_text: 'Talk to us',
    button_target: 'https://meetings-eu1.hubspot.com/alessio-civitillo/book-a-call',
    image: './src/assets/images/backgrounds/jellyfish-hr.jpg',
    image_alt: 'Jellyfish in deep water',
    caption: 'Platform metrics stay consistent across every tool in the stack.'
  },
  accordion: {
    type: 'accordion',
    appearance: {
      width: 'feature'
    },
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
    appearance: {
      theme: 'gray-dark',
      align: 'left',
      background: 'teal-800',
      divider_top: 'divider/soft',
      divider: 'divider/soft'
    },
    title: 'Ready to strengthen your data platform?',
    subtitle:
      'Tell us where your systems and decisions are misaligned. We’ll help you design a platform that connects them.',
    button_text: 'Schedule a discovery call',
    button_target: 'https://meetings-eu1.hubspot.com/alessio-civitillo/book-a-call',
    image: './src/assets/images/backgrounds/sfondi-dyvenia04.jpg'
  },
  posts: {
    type: 'posts',
    appearance: {
      theme: 'background-default',
      width: 'feature',
      card_layout: 'grid'
    },
    title: 'Our Insights',
    intro: 'Selected Articles. Check our blog for more.',
    count: 3
  },
  team: {
    type: 'team',
    appearance: {
      theme: 'background-default',
      filter: 'show_on_about',
      header_layout: 'thirds'
    },
    title: 'Who We Are',
    content: 'We’re not just data engineers or consultants. We’ve sat on **both sides**.'
  },
  form: {
    type: 'form',
    appearance: {
      theme: 'background-accent',
      width: 'content'
    },
    title: 'Stay in the loop',
    intro: 'Subscribe for insights on data platforms, metrics, and AI that ships.'
  },
  services: {
    type: 'services',
    appearance: {
      theme: 'navy'
    },
    title: 'How We Deliver Results',
    image: './src/assets/images/backgrounds/sfondi-dyvenia26.jpg',
    decoration: 'brand/arrows',
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
        description: 'We make your numbers consistent, defined, and trusted across the organization.'
      }
    ]
  },
  tabs: {
    type: 'tabs',
    appearance: {
      theme: 'background-default',
      width: 'feature'
    },
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
            content: 'We evaluate your existing metrics, identify gaps, and define the desired outcome.',
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
    appearance: {
      theme: 'background-default',
      width: 'feature',
      card_layout: 'grid'
    },
    title: 'Case Studies',
    intro: 'Selected client work. More coming soon.',
    count: 3
  },
  gallery: {
    type: 'gallery',
    appearance: {
      theme: 'background-default',
      width: 'feature'
    },
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
