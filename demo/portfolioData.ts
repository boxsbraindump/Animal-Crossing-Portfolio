import type { CardColor } from '../src/components/Card';
import type { IconName } from '../src/components/Icon';

export type ProjectStatus = 'Academic prototype' | 'Client website' | 'Redesign concept';

export interface Project {
    key: string;
    title: string;
    shortTitle: string;
    status: ProjectStatus;
    category: string;
    timeframe: string;
    role: string;
    tools: string[];
    tags: string[];
    color: CardColor;
    icon: IconName;
    summary: string;
    challenge: string;
    approach: string[];
    evidence: string[];
    outcome: string;
    nextSteps: string[];
    prototypeUrl?: string;
    media?: {
        src: string;
        alt: string;
        caption: string;
        kind: 'hero' | 'screen' | 'research' | 'persona' | 'process' | 'prototype';
    }[];
    caseStudy?: {
        why: string[];
        problem: string;
        huntStatement: string;
        methods: {
            title: string;
            details: string;
        }[];
        surveyFindings: string[];
        interviewFindings: string[];
        opportunities: string[];
        personaSummary: string;
        designProcess: {
            title: string;
            details: string;
        }[];
        usabilityTest: {
            where: string;
            when: string;
            participants: string;
            description: string[];
            feedback: string[];
        };
    };
}

export interface VibeProject {
    key: string;
    title: string;
    type: string;
    status: string;
    summary: string;
    whatIDesigned: string[];
    whatIBuilt: string[];
    tools: string[];
    color: CardColor;
    icon: IconName;
    embedPath?: string;
    sourceUrl?: string;
    metrics?: {
        value: string;
        label: string;
    }[];
    proofNote?: string;
}

export interface StudioStat {
    value: string;
    label: string;
    detail: string;
}

export interface MethodCard {
    title: string;
    description: string;
    tools: string[];
    icon: IconName;
    color: CardColor;
}

export const projects: Project[] = [
    {
        key: 'nekopaw',
        title: 'NekoPaw App Prototype',
        shortTitle: 'NekoPaw',
        status: 'Academic prototype',
        category: 'Mobile app UX case study',
        timeframe: 'School project',
        role: 'UX research, IA, wireframes, prototype, usability testing',
        tools: ['Figma', 'Survey', 'Interview', 'Usability testing', 'AI-assisted frontend notes'],
        tags: ['Research', 'Mobile app', '20+ participants', 'Prototype'],
        color: 'app-pink',
        icon: 'icon-chat',
        summary:
            'A comprehensive mobile app prototype for cat owners and potential cat owners, combining learning resources, community support, vet tools, health records, and personalized cat-care guidance.',
        challenge:
            'Cat owners and potential adopters often search across fragmented websites, outdated adoption information, unreliable product reviews, and scattered health-care resources. NekoPaw explores one app that helps users learn, manage, and connect around cat care.',
        approach: [
            'Conducted formative research through online surveys and interviews with cat owners and people interested in adopting cats.',
            'Synthesized research into two personas representing existing cat owners and potential cat owners, then defined key feature opportunities.',
            'Created sketches, sitemap, user flows, low-fidelity wireframes, and a high-fidelity interactive prototype.',
            'Tested the v1 prototype at the UW Bothell Discovery Hall capstone exhibition with 20+ participants and documented bugs, friction points, and feature feedback.',
        ],
        evidence: [
            'Project duration: January - June 2023',
            'Role: UI/UX Designer and researcher',
            'Tools: Figma, Photoshop, Illustrator, ProtoPie, After Effects',
            'Survey plan: at least 15 participants, focused on current or potential cat owners',
            'Interview plan: 6 participants, in person or remote',
            '20+ usability test participants during the capstone exhibition',
        ],
        outcome:
            'The final prototype brought together care records, feeding recommendations, learning content, community sharing, vet support, and leaderboard-style product discovery into a more guided cat-care experience.',
        nextSteps: [
            'Trigger the Add a New Cat flow during account creation or first sign-in.',
            'Fix broken buttons discovered during usability testing.',
            'Expand leaderboard categories beyond cat food.',
            'Shorten the tutorial and add a skip option.',
            'Link community avatars to user profile pages.',
        ],
        prototypeUrl:
            'https://cloud.protopie.io/p/41ad1cc94a53d1cba0e274d4?bgColor=%23F5F5F5&cursorType=touch&enableHotspotHints=true&mockup=true&playSpeed=1&playerAppPopup=true&scaleToFit=true&ui=true',
        media: [
            {
                src: new URL('./img/nekopaw/logo.png', import.meta.url).href,
                alt: 'NekoPaw logo',
                caption: 'NekoPaw brand mark',
                kind: 'hero',
            },
            {
                src: new URL('./img/nekopaw/prototype.png', import.meta.url).href,
                alt: 'NekoPaw final prototype screens',
                caption: 'Final prototype screen overview',
                kind: 'prototype',
            },
            {
                src: new URL('./img/nekopaw/screen-vet.png', import.meta.url).href,
                alt: 'Connect with vet screen',
                caption: 'Vet support and self-diagnosis entry points',
                kind: 'screen',
            },
            {
                src: new URL('./img/nekopaw/screen-home.png', import.meta.url).href,
                alt: 'NekoPaw home screen',
                caption: 'Login and onboarding direction',
                kind: 'screen',
            },
            {
                src: new URL('./img/nekopaw/screen-learning.png', import.meta.url).href,
                alt: 'Learning article screen',
                caption: 'Learning content for new cat owners',
                kind: 'screen',
            },
            {
                src: new URL('./img/nekopaw/screen-profile.png', import.meta.url).href,
                alt: 'Cat profile screen',
                caption: 'Personalized cat profile and care information',
                kind: 'screen',
            },
            {
                src: new URL('./img/nekopaw/survey-advice.png', import.meta.url).href,
                alt: 'Survey advice responses',
                caption: 'Survey responses about advice and desired support',
                kind: 'research',
            },
            {
                src: new URL('./img/nekopaw/survey-features.png', import.meta.url).href,
                alt: 'Survey feature responses',
                caption: 'Survey responses about desired app features',
                kind: 'research',
            },
            {
                src: new URL('./img/nekopaw/persona-potential-cat-owner.png', import.meta.url).href,
                alt: 'Potential cat owner persona',
                caption: 'Persona: potential cat owner',
                kind: 'persona',
            },
            {
                src: new URL('./img/nekopaw/persona-cat-owner.png', import.meta.url).href,
                alt: 'Cat owner persona',
                caption: 'Persona: existing cat owner',
                kind: 'persona',
            },
            {
                src: new URL('./img/nekopaw/sketch-ziyu.png', import.meta.url).href,
                alt: 'Ziyu feature sketches',
                caption: 'Early feature sketches by Ziyu',
                kind: 'process',
            },
            {
                src: new URL('./img/nekopaw/sitemap.png', import.meta.url).href,
                alt: 'NekoPaw sitemap',
                caption: 'Sitemap',
                kind: 'process',
            },
            {
                src: new URL('./img/nekopaw/user-flow.png', import.meta.url).href,
                alt: 'NekoPaw user flow',
                caption: 'User flow',
                kind: 'process',
            },
            {
                src: new URL('./img/nekopaw/wireframes-1.png', import.meta.url).href,
                alt: 'NekoPaw low fidelity wireframes',
                caption: 'Low-fidelity wireframes',
                kind: 'process',
            },
            {
                src: new URL('./img/nekopaw/wireframes-2.png', import.meta.url).href,
                alt: 'Additional NekoPaw wireframes',
                caption: 'Additional wireframe exploration',
                kind: 'process',
            },
            {
                src: new URL('./img/nekopaw/promo-video-preview.jpg', import.meta.url).href,
                alt: 'NekoPaw promotional video preview',
                caption: 'Promotional video preview',
                kind: 'prototype',
            },
        ],
        caseStudy: {
            why: [
                'NekoPaw helps people learn about cats before adopting one, reducing frustration and misunderstandings.',
                'It builds a community where cat owners and potential cat owners can exchange information, share experiences, solve problems, and make friends.',
                'It gives cat owners a place to track medical records, feeding schedules, appointments, grooming reminders, and other care information.',
                'With NekoPaw, cat owners can access necessary information and tools in one convenient place.',
            ],
            problem:
                "Surveys and interviews showed that there was not a mobile app or platform that helped cat owners and potential cat owners solve cat-related issues in one place. People were frustrated by many scattered problems and did not know where to start looking for solutions.",
            huntStatement:
                'From the research, we expected to understand cat owners and cat-care businesses needs and concerns in order to design an app that can support people through the adoption process and help businesses take care of cats more easily and efficiently.',
            methods: [
                {
                    title: 'Survey',
                    details:
                        'The team planned to survey at least 15 participants, with 5 participants per person. Participants were current cat owners or people interested in becoming cat owners. The survey mixed open-ended and closed-ended questions.',
                },
                {
                    title: 'Interview',
                    details:
                        'The team aimed to recruit 6 interview participants, with 2 participants per person. Interviews were conducted in person or remotely to gather deeper information about the user group and their opinions on the design idea.',
                },
            ],
            surveyFindings: [
                'Participants cared most about adoption and health care.',
                'People wanted advice for new cat or pet owners.',
                'Desired features included illness information, tips for keeping cats happy and healthy, and cat furniture or supply recommendations.',
                'Survey suggestions pointed toward learning content, adoption support, and practical care guidance.',
            ],
            interviewFindings: [
                'Participants tended to research before adopting a cat and often visited multiple adoption places.',
                'Participants used websites to search for cats first, but wanted to adopt quickly once they found a desired cat because adoption can be competitive.',
                'Online adoption felt slower than in-person adoption because adoption center websites often had outdated availability information.',
                'One participant struggled to find reliable and honest reviews about cat food and supplies because of fake reviews and ads.',
                'Most participants were interested in a platform connecting cat owners to share information, tips, tricks, and health-related experiences.',
            ],
            opportunities: [
                'Community feature for sharing cat-related information, tips, and tricks.',
                'Learning feature for exploring knowledge about cats.',
                'Leaderboard to help users find desirable cat food and toys.',
                'Records for clinic visit history, schedules, and appointments.',
                'Personalized feeding instructions and health records.',
            ],
            personaSummary:
                'The majority of participants were between 16 and 35 years old, so two personas were created: one existing cat owner and one potential cat owner.',
            designProcess: [
                {
                    title: 'Sketches',
                    details:
                        'After analyzing the data, the team identified four exciting feature areas: Learning, Vet, Community, and User Pages for cat health and appointment tracking. Each team member focused on different features and produced sketches.',
                },
                {
                    title: 'Sitemap and User Flow',
                    details:
                        'The team developed a sitemap and user flow to understand the product structure and the relationships between user actions.',
                },
                {
                    title: 'Low-Fidelity Wireframes',
                    details:
                        'The team created low-fidelity wireframes to outline layout, placement of key elements, and interactions before moving into higher-fidelity prototyping.',
                },
            ],
            usabilityTest: {
                where: 'UW Bothell Discovery Hall',
                when: 'June 10, 2023',
                participants: '20+',
                description: [
                    'The v1 prototype was tested during the capstone exhibition, allowing a larger number of people to participate.',
                    'The expanded participant pool helped the team gather extensive feedback and identify bugs requiring immediate attention.',
                    'The insights from the exhibition became a foundation for refining the product toward a smoother experience.',
                ],
                feedback: [
                    'The Add a New Cat page should appear when users create an account or sign in.',
                    'Some buttons were not working.',
                    'The leaderboard should include categories beyond cat food.',
                    'The tutorial was too long and should include a skip button.',
                    "The community page should link to a user's page when clicking on the avatar.",
                ],
            },
        },
    },
    {
        key: 'lake-hills',
        title: 'Lake Hills Acupuncture Website Design',
        shortTitle: 'Lake Hills',
        status: 'Client website',
        category: 'Healthcare and wellness website',
        timeframe: 'Client project',
        role: 'Website design, content structure, responsive UI direction',
        tools: ['Figma', 'Responsive web', 'Frontend prototype', 'Content planning'],
        tags: ['Client work', 'Healthcare', 'Responsive web', 'Trust building'],
        color: 'app-green',
        icon: 'icon-design',
        summary:
            'A client-facing website design for an acupuncture practice, focused on trust, service clarity, and an approachable path from browsing to booking.',
        challenge:
            'The site needed to feel calm and credible while helping visitors quickly understand services, practitioner background, location, and next steps.',
        approach: [
            'Defined the primary visitor questions and organized content around service clarity.',
            'Designed a calm visual direction suitable for a healthcare and wellness audience.',
            'Prioritized mobile readability, clear contact paths, and confidence-building sections.',
            'Prepared the structure so research artifacts, persona, and sitemap can be added later.',
        ],
        evidence: [
            'Real client context',
            'Service-focused information architecture',
            'Responsive website direction',
            'Healthcare trust and clarity goals',
        ],
        outcome:
            'The current design gives the practice a warmer, clearer web presence and a stronger foundation for future content strategy and conversion improvements.',
        nextSteps: [
            'Add sitemap and service-page structure.',
            'Document client goals and constraints.',
            'Add final screen captures once visual assets are ready.',
        ],
    },
    {
        key: 'watc-camp',
        title: 'WATC Camp Website Redesign',
        shortTitle: 'WATC Camp',
        status: 'Redesign concept',
        category: 'Website redesign',
        timeframe: 'Portfolio project',
        role: 'UX audit, information architecture, responsive UI redesign',
        tools: ['Figma', 'UX audit', 'Responsive design', 'Frontend prototype'],
        tags: ['Website redesign', 'Information architecture', 'Responsive UI'],
        color: 'app-blue',
        icon: 'icon-map',
        summary:
            'A website redesign concept for a camp experience, focused on making program information easier to scan, compare, and act on.',
        challenge:
            'Camp websites often contain many audiences and details at once. This redesign explores how to make schedules, program benefits, and calls to action easier to navigate.',
        approach: [
            'Audited page hierarchy and common visitor tasks.',
            'Reworked information architecture around discovery, trust, and registration intent.',
            'Designed responsive layouts that support quick scanning on desktop and mobile.',
            'Prepared a visual system that can scale across program cards, FAQs, and location details.',
        ],
        evidence: [
            'UX audit direction',
            'Navigation and content hierarchy improvements',
            'Responsive UI patterns',
            'Clearer conversion path',
        ],
        outcome:
            'The redesign frames the camp offering more clearly and creates a more guided path for parents, students, or organizers exploring the program.',
        nextSteps: [
            'Add old/new screen comparison.',
            'Add sitemap and prioritized user tasks.',
            'Prototype registration and FAQ flows.',
        ],
    },
];

export const findProject = (key: string) => projects.find((project) => project.key === key);

export const vibeProjects: VibeProject[] = [
    {
        key: 'neuroscience-training',
        title: 'Neuroscience Training Lab',
        type: 'Playable cognitive training app',
        status: 'Embedded',
        color: 'purple',
        icon: 'icon-critterpedia',
        summary:
            'A playable neuroscience training game with Schulte Table, Stroop, N-Back, and pattern matching exercises. The strongest proof is simple: people played it and liked it.',
        metrics: [
            { value: '500+', label: 'likes' },
            { value: '500+', label: 'plays' },
        ],
        proofNote: 'A live, public-facing mini game with real engagement, embedded here so visitors can try it immediately.',
        whatIDesigned: [
            'A cognitive training experience that is easy to understand without setup.',
            'Four quick-play modes: Schulte, Stroop, N-Back, and pattern matching.',
        ],
        whatIBuilt: [
            'A standalone browser game that can run inside the portfolio.',
            'An iframe playground so visitors can play directly from the Vibe Coding page.',
        ],
        tools: ['Standalone HTML', 'React CDN', 'Tailwind CDN', 'Lucide', 'Iframe embed'],
        embedPath: 'neuroscience-training/index.html',
        sourceUrl: 'https://github.com/boxsbraindump/Neuroscience-Training',
    },
    {
        key: 'animal-island-portfolio',
        title: 'Animal Island Portfolio System',
        type: 'Live portfolio build',
        status: 'In progress',
        color: 'app-teal',
        icon: 'icon-diy',
        summary:
            'A playful portfolio interface rebuilt from a component demo into a working personal site with project routes, game-like navigation, responsive pages, and a Cloudflare-ready Vite build.',
        whatIDesigned: [
            'Portfolio information architecture around Home, Work, case studies, About, Contact, and experiments.',
            'A warmer game-inspired visual direction that still supports UX case study reading.',
            'Project page structure that separates academic prototype, client work, redesign, and AI-assisted frontend experiments.',
        ],
        whatIBuilt: [
            'Hash-based navigation with desktop and mobile menus.',
            'Reusable project data model and long-form case study rendering.',
            'Responsive layouts that reduce heavy boxed sections and keep the page scrollable.',
        ],
        tools: ['React', 'TypeScript', 'Vite', 'AI-assisted coding', 'Cloudflare Pages'],
    },
    {
        key: 'nekopaw-content-migration',
        title: 'NekoPaw Case Study Migration',
        type: 'Content system + case study page',
        status: 'Portfolio-ready draft',
        color: 'app-pink',
        icon: 'icon-chat',
        summary:
            'A Wix case study was translated into structured portfolio content, local visual assets, and a long-scroll case study page that highlights research, personas, wireframes, usability testing, and prototype screens.',
        whatIDesigned: [
            'A clearer narrative from research problem to design process to testing feedback.',
            'A case study rhythm that makes 20+ usability test participants visible as evidence.',
            'A more honest framing of NekoPaw as an academic prototype rather than a launched product.',
        ],
        whatIBuilt: [
            'Local image asset library for research, personas, wireframes, and prototype screens.',
            'Structured data fields for research methods, findings, opportunities, and next steps.',
            'A responsive media layout for both wide research images and phone-like app screens.',
        ],
        tools: ['React', 'TypeScript', 'Content design', 'Responsive UI', 'Prototype documentation'],
    },
    {
        key: 'portfolio-audio-hud',
        title: 'Custom Music Player HUD',
        type: 'Interactive micro-feature',
        status: 'Added',
        color: 'app-yellow',
        icon: 'icon-miles',
        summary:
            'A small fixed player for the Island Bossa track, designed as a playful layer that makes the portfolio feel more personal without blocking the main content.',
        whatIDesigned: [
            'A compact audio control that sits outside the main reading flow.',
            'A softer interface treatment that matches the portfolio mood.',
            'Browser-safe behavior that waits for user interaction before playing audio.',
        ],
        whatIBuilt: [
            'Local MP3 import through the Vite asset pipeline.',
            'Play/pause, progress, duration, and time display states.',
            'A reusable global player mounted across portfolio routes.',
        ],
        tools: ['React hooks', 'HTML audio', 'Vite assets', 'Micro-interaction design'],
    },
];

export const profile = {
    name: 'Ziyu He',
    title: 'UI/UX Designer + Frontend Prototyper',
    tagline:
        'I design research-informed digital experiences and turn them into interactive, testable web prototypes with AI-assisted frontend workflows.',
    location: 'Based in the United States',
    focus: ['UX research', 'Interaction design', 'Responsive UI', 'AI-assisted frontend prototyping'],
};

export const studioStats: StudioStat[] = [
    {
        value: '3',
        label: 'main case studies',
        detail: 'Academic UX, client web, and redesign concept work.',
    },
    {
        value: '20+',
        label: 'test participants',
        detail: 'Capstone exhibition usability feedback for NekoPaw.',
    },
    {
        value: '4',
        label: 'core strengths',
        detail: 'Research, interaction design, responsive UI, and AI-assisted prototyping.',
    },
    {
        value: '1',
        label: 'live system',
        detail: 'A portfolio built as a working Vite interface, not just static screenshots.',
    },
];

export const methodCards: MethodCard[] = [
    {
        title: 'Research Compass',
        description:
            'Frame the audience, collect signals, and turn fuzzy questions into clearer product direction.',
        tools: ['Survey', 'Interview', 'Persona', 'Synthesis'],
        icon: 'icon-map',
        color: 'app-teal',
    },
    {
        title: 'Flow Workshop',
        description:
            'Sketch structure, compare routes, and reduce friction before visual polish takes over.',
        tools: ['Sitemap', 'User flow', 'Wireframe', 'IA'],
        icon: 'icon-design',
        color: 'app-yellow',
    },
    {
        title: 'Prototype Dock',
        description:
            'Build clickable artifacts that make design decisions easier to test, discuss, and revise.',
        tools: ['Figma', 'React', 'TypeScript', 'Vite'],
        icon: 'icon-diy',
        color: 'app-pink',
    },
    {
        title: 'Launch Checklist',
        description:
            'Package the story with responsive pages, clear labels, honest project context, and next steps.',
        tools: ['Case study', 'Responsive QA', 'Portfolio writing'],
        icon: 'icon-helicopter',
        color: 'app-green',
    },
];
