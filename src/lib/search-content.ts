import type { SearchLandingContent } from '@/components/seo/SearchLandingPage'
import { absoluteUrl } from './seo'

const veloRelated = [
  { label: 'For developers', href: '/for/developers' },
  { label: 'For hiring teams', href: '/for/hiring' },
  { label: 'For colleges', href: '/for/colleges' },
  { label: 'Project verification', href: '/use-cases/project-verification' },
]

export const veloProofOfWork: SearchLandingContent = {
  eyebrow: 'proof of work verification',
  title: 'Proof of work',
  accent: 'that survives AI.',
  description:
    'VELO turns project claims into defensible evidence by asking people to explain the work they say they built.',
  definitionTitle: 'What is proof-of-work verification?',
  definition:
    'Proof-of-work verification is the process of checking whether a person can defend a real project, explain their technical decisions, and show ownership of the work behind a credential, resume, or portfolio claim.',
  cta: { label: 'Verify a project', href: '/' },
  secondaryCta: { label: 'For hiring teams', href: '/for/hiring' },
  bestFor: [
    'Developers who want a signal stronger than a polished GitHub repo.',
    'Hiring teams screening project-heavy engineering candidates.',
    'Colleges preparing students for placements with verified evidence.',
  ],
  notFor: [
    'Multiple-choice aptitude testing.',
    'Whiteboard puzzles detached from real work.',
    'Credentials based only on attendance or completion.',
  ],
  comparison: {
    oldLabel: 'Traditional signal',
    newLabel: 'VELO verification',
    rows: [
      { label: 'Evidence', old: 'Resume bullets and project links.', new: 'A defensibility transcript tied to the claimed work.' },
      { label: 'AI resistance', old: 'Easy to generate and polish.', new: 'Hard to fake because questions adapt to weak answers.' },
      { label: 'Decision value', old: 'Requires a human interview to interpret.', new: 'Produces a structured verdict before the interview.' },
    ],
  },
  faqs: [
    {
      question: 'What does VELO verify?',
      answer:
        'VELO verifies whether someone can defend a project claim: what they built, why decisions were made, how the code works, and where the real ownership is visible.',
    },
    {
      question: 'Is VELO a coding test?',
      answer:
        'No. VELO does not replace a real project with a puzzle. It examines the project a person already claims as evidence.',
    },
  ],
  related: veloRelated,
  schemaId: `${absoluteUrl('velo', '/use-cases/proof-of-work-verification')}#faq`,
}

export const veloAiProofHiring: SearchLandingContent = {
  eyebrow: 'ai-proof hiring',
  title: 'Hire for ownership,',
  accent: 'not generated output.',
  description:
    'VELO helps hiring teams separate candidates who can defend their work from candidates who only present polished AI-assisted artifacts.',
  definitionTitle: 'What is AI-proof hiring?',
  definition:
    'AI-proof hiring is a hiring workflow that evaluates judgment, ownership, and defensibility instead of relying on artifacts that generative AI can produce or polish.',
  cta: { label: 'Start a pilot', href: 'mailto:hello@excentrix.tech?subject=VELO%20AI-proof%20hiring' },
  secondaryCta: { label: 'See proof-of-work verification', href: '/use-cases/proof-of-work-verification' },
  bestFor: [
    'Engineering teams reviewing project-heavy resumes.',
    'Recruiters who need a pre-interview technical signal.',
    'Startups trying to avoid false positives before onsite interviews.',
  ],
  notFor: [
    'Replacing all human technical interviews.',
    'Measuring memorized algorithms as the primary signal.',
    'Bulk resume keyword filtering.',
  ],
  comparison: {
    oldLabel: 'AI-era resume screen',
    newLabel: 'VELO screen',
    rows: [
      { label: 'Input', old: 'Resume, portfolio, and GitHub links.', new: 'A project claim plus adaptive interrogation.' },
      { label: 'Failure mode', old: 'Confident candidates with generated projects pass through.', new: 'Shallow ownership is exposed before interview time is spent.' },
      { label: 'Output', old: 'A subjective shortlist.', new: 'A defensibility verdict with transcript evidence.' },
    ],
  },
  faqs: [
    {
      question: 'How does VELO help with AI-generated resumes?',
      answer:
        'VELO does not try to detect AI text. It checks whether the candidate can explain and defend the underlying work.',
    },
    {
      question: 'When should a hiring team use VELO?',
      answer:
        'Use VELO before technical interviews when a candidate presents project work as proof of capability.',
    },
  ],
  related: veloRelated,
  schemaId: `${absoluteUrl('velo', '/use-cases/ai-proof-hiring')}#faq`,
}

export const veloProjectVerification: SearchLandingContent = {
  eyebrow: 'project verification',
  title: 'A repo is not proof.',
  accent: 'A defense is.',
  description:
    'VELO verifies project ownership by asking adaptive questions about implementation, tradeoffs, debugging, and design choices.',
  definitionTitle: 'What is project verification?',
  definition:
    'Project verification checks whether a person understands the project they claim, can explain the implementation, and can connect the work to concrete capability evidence.',
  cta: { label: 'Verify a project', href: '/' },
  secondaryCta: { label: 'For developers', href: '/for/developers' },
  bestFor: [
    'Portfolio projects used in applications.',
    'College capstone and placement projects.',
    'Hiring workflows where candidates submit GitHub repositories.',
  ],
  notFor: [
    'Checking only whether a repository exists.',
    'Static README scoring.',
    'Generic interview questions unrelated to the project.',
  ],
  comparison: {
    oldLabel: 'Static review',
    newLabel: 'Adaptive verification',
    rows: [
      { label: 'Scope', old: 'Looks at files and presentation.', new: 'Asks the builder to defend choices and behavior.' },
      { label: 'Depth', old: 'Stops at surface quality.', new: 'Probes deeper where answers are vague.' },
      { label: 'Result', old: 'Reviewer impression.', new: 'Structured proof-of-work credential.' },
    ],
  },
  faqs: [
    {
      question: 'Can VELO verify any GitHub project?',
      answer:
        'VELO is designed for projects where the person can state a clear claim about what they built and what capability it demonstrates.',
    },
    {
      question: 'Does VELO need repository access?',
      answer:
        'VELO works best when it can inspect the project context and then question the builder about the claimed implementation.',
    },
  ],
  related: veloRelated,
  schemaId: `${absoluteUrl('velo', '/use-cases/project-verification')}#faq`,
}

export function veloComparisonContent(
  competitor: 'coding-tests' | 'hackerrank' | 'codility',
): SearchLandingContent {
  const labels = {
    'coding-tests': 'coding tests',
    hackerrank: 'HackerRank',
    codility: 'Codility',
  }
  const label = labels[competitor]
  const path = `/compare/${competitor}`

  return {
    eyebrow: 'comparison',
    title: `VELO vs ${label}`,
    accent: 'real work over puzzles.',
    description:
      'Coding tests measure controlled problem solving. VELO measures whether someone can defend the real project evidence they use to claim capability.',
    definitionTitle: `How is VELO different from ${label}?`,
    definition:
      'VELO is not a puzzle platform. It is a proof-of-work verification layer that examines real project claims through adaptive questioning and produces evidence a hiring team can review.',
    cta: { label: 'Verify project evidence', href: '/use-cases/project-verification' },
    secondaryCta: { label: 'For hiring teams', href: '/for/hiring' },
    bestFor: [
      'Teams that care about project ownership and engineering judgment.',
      'Candidates who want to be evaluated on real work.',
      'Colleges that need placement-ready proof of student capability.',
    ],
    notFor: [
      'Replacing every algorithm or data-structure screen.',
      'High-volume aptitude filtering with no project evidence.',
      'Measuring speed on standardized puzzles as the main outcome.',
    ],
    comparison: {
      oldLabel: label,
      newLabel: 'VELO',
      rows: [
        { label: 'Primary signal', old: 'Performance on a standardized coding task.', new: 'Defensibility of real work the candidate claims.' },
        { label: 'Candidate experience', old: 'Solve a puzzle under time pressure.', new: 'Explain decisions in a project they know.' },
        { label: 'AI-era risk', old: 'Practice and generation can blur signal.', new: 'Adaptive follow-ups expose shallow ownership.' },
      ],
    },
    faqs: [
      {
        question: `Does VELO replace ${label}?`,
        answer:
          'VELO can replace or complement coding tests when project ownership and real-work evidence matter more than puzzle speed.',
      },
      {
        question: 'Why use real project verification?',
        answer:
          'Real project verification evaluates judgment, tradeoffs, and ownership in the context candidates already use to represent their ability.',
      },
    ],
    related: veloRelated,
    schemaId: `${absoluteUrl('velo', path)}#faq`,
  }
}

const horizonRelated = [
  { label: 'AI mentor', href: '/features/ai-mentor' },
  { label: 'Holistic grading', href: '/features/holistic-grading' },
  { label: 'For students', href: '/solutions/students' },
  { label: 'For institutions', href: '/solutions/institutions' },
]

export function horizonContent(
  page: 'students' | 'educators' | 'institutions' | 'adaptive-learning' | 'ai-grading',
): SearchLandingContent {
  const map = {
    students: {
      eyebrow: 'for students',
      title: 'An AI mentor',
      accent: 'that knows your path.',
      definitionTitle: 'What is Horizon for students?',
      definition:
        'Horizon gives students a personal AI mentor, an adaptive learning plan, and a verified skill portfolio that connects daily learning to career outcomes.',
    },
    educators: {
      eyebrow: 'for educators',
      title: 'Mentorship',
      accent: 'at educator scale.',
      definitionTitle: 'What is Horizon for educators?',
      definition:
        'Horizon helps educators scale personal mentorship by surfacing student gaps, generating adaptive plans, and turning learning activity into evidence.',
    },
    institutions: {
      eyebrow: 'for institutions',
      title: 'Personal mentorship,',
      accent: 'cohort scale.',
      definitionTitle: 'What is Horizon for institutions?',
      definition:
        'Horizon gives institutions cohort-level AI mentorship, learning intelligence, retention signals, and verifiable skill portfolios for students.',
    },
    'adaptive-learning': {
      eyebrow: 'adaptive learning',
      title: 'Daily plans',
      accent: 'that change with the learner.',
      definitionTitle: 'What is adaptive learning in Horizon?',
      definition:
        'Adaptive learning in Horizon means the learning plan changes based on goals, gaps, schedule, pace, memory, and evidence from every interaction.',
    },
    'ai-grading': {
      eyebrow: 'ai grading',
      title: 'Evaluation',
      accent: 'with evidence.',
      definitionTitle: 'What is AI grading in Horizon?',
      definition:
        'AI grading in Horizon evaluates understanding, growth, and verified artifacts over time rather than reducing a learner to a single exam score.',
    },
  }[page]

  const path = page === 'students' || page === 'educators' || page === 'institutions'
    ? `/solutions/${page}`
    : `/${page}`

  return {
    ...map,
    description:
      'Horizon combines mentorship, adaptive planning, continuous evaluation, and verified portfolios so learning becomes personal, measurable, and demonstrable.',
    cta: { label: 'Join the waitlist', href: '/#waitlist' },
    secondaryCta: { label: 'Explore AI mentor', href: '/features/ai-mentor' },
    bestFor: [
      'Students who need a clear next step, not another content library.',
      'Educators who want earlier signals about student gaps.',
      'Institutions that want measurable learning outcomes and proof of skill.',
    ],
    notFor: [
      'Static course catalogs with no personalization.',
      'One-time grading systems that ignore growth.',
      'Generic chatbots disconnected from learner history.',
    ],
    comparison: {
      oldLabel: 'Traditional learning platform',
      newLabel: 'Horizon',
      rows: [
        { label: 'Guidance', old: 'Content is available, but the next step is unclear.', new: 'The mentor recommends what to do next based on the learner model.' },
        { label: 'Evaluation', old: 'Grades are episodic and often disconnected from work.', new: 'Evidence accumulates through tasks, conversations, and artifacts.' },
        { label: 'Outcome', old: 'Completion is the signal.', new: 'Demonstrable capability is the signal.' },
      ],
    },
    faqs: [
      {
        question: 'What is Horizon?',
        answer:
          'Horizon is an AI mentorship and adaptive learning platform that builds a living model of each learner and turns it into daily guidance and verifiable skill evidence.',
      },
      {
        question: 'How is Horizon different from a course platform?',
        answer:
          'A course platform organizes content. Horizon organizes the learner: their goals, gaps, pace, evidence, and next best action.',
      },
    ],
    related: horizonRelated,
    schemaId: `${absoluteUrl('horizon', path)}#faq`,
  }
}

export function excentrixContent(
  page: 'ai-education-infrastructure' | 'capability-infrastructure',
): SearchLandingContent {
  const isCapability = page === 'capability-infrastructure'

  return {
    eyebrow: isCapability ? 'capability infrastructure' : 'ai education infrastructure',
    title: isCapability ? 'Capability' : 'Education infrastructure',
    accent: isCapability ? 'made visible.' : 'for the AI era.',
    description:
      'Excentrix builds product infrastructure across learning, verification, presentation intelligence, and university operations.',
    definitionTitle: isCapability ? 'What is capability infrastructure?' : 'What is AI education infrastructure?',
    definition: isCapability
      ? 'Capability infrastructure is the layer that turns learning, projects, assessments, and work artifacts into evidence that people and institutions can trust.'
      : 'AI education infrastructure is software that uses AI to personalize learning, measure progress, verify skill evidence, and coordinate institutional workflows.',
    cta: { label: 'Talk to us', href: '/#pilot' },
    secondaryCta: { label: 'Explore products', href: '/#build' },
    bestFor: [
      'Institutions building measurable learning and placement systems.',
      'Hiring teams that need evidence beyond resumes.',
      'Education teams moving from content delivery to capability proof.',
    ],
    notFor: [
      'Generic AI wrappers without measurable outcomes.',
      'Credentialing that stops at course completion.',
      'Disconnected tools that create more operational drag.',
    ],
    comparison: {
      oldLabel: 'Old education software',
      newLabel: 'Excentrix system',
      rows: [
        { label: 'Signal', old: 'Attendance, completion, and self-reported claims.', new: 'Verified evidence of learning and work.' },
        { label: 'Workflow', old: 'Separate tools for learning, assessment, and reporting.', new: 'Connected products across mentorship, verification, and operations.' },
        { label: 'AI role', old: 'Generic chat and automation.', new: 'Capability modeling, adaptive guidance, and proof generation.' },
      ],
    },
    faqs: [
      {
        question: 'What does Excentrix build?',
        answer:
          'Excentrix builds VELO for proof-of-work verification, Horizon for AI mentorship, Flowstate for live presentation intelligence, and Colcord for university operations.',
      },
      {
        question: 'Who is Excentrix for?',
        answer:
          'Excentrix products serve students, educators, institutions, hiring teams, developers, and university operators.',
      },
    ],
    related: [
      { label: 'VELO', href: 'https://excentrix.tech' },
      { label: 'Horizon', href: 'https://horizon.excentrix.tech' },
      { label: 'Flowstate', href: 'https://flowstate.excentrix.tech' },
      { label: 'Colcord', href: 'https://colcord.excentrix.tech' },
    ],
    schemaId: `${absoluteUrl('excentrix', `/${page}`)}#faq`,
  }
}

export const flowstateCategory: SearchLandingContent = {
  eyebrow: 'presentation software for educators',
  title: 'Presentation software',
  accent: 'with live room intelligence.',
  description:
    'Flowstate helps educators and trainers write the deck, run the session, read audience signals, and control the room from any phone.',
  definitionTitle: 'What is Flowstate?',
  definition:
    'Flowstate is live presentation software for educators and trainers, combining HTML slide authoring, presenter view, phone remote control, audience reactions, questions, and session intelligence.',
  cta: { label: 'Request a pilot', href: '/#pilot' },
  secondaryCta: { label: 'See surfaces', href: '/#surfaces' },
  bestFor: [
    'Educators running live classes with audience questions.',
    'Training teams that need presenter control and session signal.',
    'Workshops where the room should shape the presentation in real time.',
  ],
  notFor: [
    'Static slide hosting with no audience interaction.',
    'Pure design tools that stop before the live room.',
    'Video-only webinar platforms with no deck intelligence.',
  ],
  comparison: {
    oldLabel: 'Static presentation tool',
    newLabel: 'Flowstate',
    rows: [
      { label: 'Authoring', old: 'Slides are created and exported.', new: 'Slides, notes, and live controls stay connected.' },
      { label: 'Room signal', old: 'Audience understanding is invisible.', new: 'Questions, confusion, and pace signals appear during the session.' },
      { label: 'Control', old: 'Presenter is tied to the laptop.', new: 'Presenter can control the session from any phone.' },
    ],
  },
  faqs: [
    {
      question: 'What is Flowstate used for?',
      answer:
        'Flowstate is used to build and run live classes, trainings, workshops, and presentations where the presenter needs audience signal and remote control.',
    },
    {
      question: 'Is Flowstate only for educators?',
      answer:
        'No. Flowstate is built for educators first, but it also fits trainers, workshop leaders, and teams running live learning sessions.',
    },
  ],
  related: [
    { label: 'Excentrix', href: 'https://all.excentrix.tech' },
    { label: 'Horizon', href: 'https://horizon.excentrix.tech' },
    { label: 'VELO', href: 'https://excentrix.tech' },
  ],
  schemaId: `${absoluteUrl('flowstate', '/presentation-software-for-educators')}#faq`,
}

export const colcordCategory: SearchLandingContent = {
  eyebrow: 'campus operating system',
  title: 'The operating system',
  accent: 'for university life.',
  description:
    'Colcord unifies academic records, communication, campus life, career services, identity, and institutional intelligence for universities in India.',
  definitionTitle: 'What is a campus operating system?',
  definition:
    'A campus operating system is a unified digital platform that connects the core workflows of a university across students, faculty, administration, alumni, and parents.',
  cta: { label: 'Request a pilot', href: '/#pilot' },
  secondaryCta: { label: 'Explore modules', href: '/#modules' },
  bestFor: [
    'Universities replacing disconnected academic and student systems.',
    'Administrators who need one view of campus operations.',
    'Institutions that want student lifecycle continuity from admission to alumni.',
  ],
  notFor: [
    'Single-purpose classroom tools.',
    'Standalone event or messaging apps.',
    'One-off portals that do not connect institutional data.',
  ],
  comparison: {
    oldLabel: 'Disconnected campus stack',
    newLabel: 'Colcord',
    rows: [
      { label: 'Student experience', old: 'Students juggle multiple portals.', new: 'Students work through one connected ecosystem.' },
      { label: 'Administration', old: 'Data lives across departments.', new: 'Institutional intelligence is unified.' },
      { label: 'Lifecycle', old: 'Academic, career, and alumni workflows split apart.', new: 'The student journey stays connected over time.' },
    ],
  },
  faqs: [
    {
      question: 'What does Colcord do?',
      answer:
        'Colcord unifies academic management, communication, campus life, career services, digital identity, and analytics for universities.',
    },
    {
      question: 'Who is Colcord built for?',
      answer:
        'Colcord is built for students, faculty, administrators, alumni, and parents inside university ecosystems.',
    },
  ],
  related: [
    { label: 'Excentrix', href: 'https://all.excentrix.tech' },
    { label: 'Horizon', href: 'https://horizon.excentrix.tech' },
    { label: 'Flowstate', href: 'https://flowstate.excentrix.tech' },
  ],
  schemaId: `${absoluteUrl('colcord', '/campus-operating-system')}#faq`,
}
