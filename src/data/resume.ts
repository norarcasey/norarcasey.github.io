// Single source of truth for the résumé. Dates are stored as structured
// "YYYY-MM" values (or null end = present) so durations and the total
// years-of-experience figure are computed at render time and never go stale.

export interface ResumeEntry {
  title: string;
  company: string;
  companyDescription?: string;
  /** Start as "YYYY-MM". Empty string marks a not-yet-filled-in entry. */
  start: string;
  /** End as "YYYY-MM", or null for an ongoing role ("Present"). */
  end: string | null;
  duties: string[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  /** Free text — no duration is computed from this. */
  graduationDate: string;
}

/** One layer of the stack, rendered both on the résumé and in the home-page matrix. */
export interface SkillGroup {
  /** Layer name, e.g. "Back end & APIs". */
  label: string;
  /** One-line statement of what I do at this layer. */
  blurb: string;
  skills: string[];
}

/** Headline used by the résumé header and the home-page hero. */
export const HEADLINE_TITLE = "Staff Full-Stack Engineer & Team Lead";

// Year I started working in React (Outreach), used for the React-specific
// figure in the summary. Career length is derived from the earliest entry.
export const REACT_EXPERIENCE_SINCE_YEAR = 2018;

// Most recent first.
export const experience: ResumeEntry[] = [
  {
    title: "Staff Software Engineer (Team Lead)",
    company: "Pulley",
    companyDescription: "Equity management platform for startups and investors",
    start: "2025-10",
    end: null,
    duties: [
      "Lead engineer across core equity-platform teams, owning architecture from the React client through the API and data model while continuing to ship complex features hands-on.",
      "Built guided tax tooling end to end that lets founders and employees file 83(b) elections: the multi-step client flow plus the endpoints, validation, and persistence behind it, replacing an error-prone manual process.",
      "Shipped an admin feature to surface and safely merge duplicate user accounts, designing the matching queries and a transactional merge that moves related records without orphaning data.",
      "Absorbed team-lead and management responsibilities delegated by my manager: ran team ceremonies and technical design, contributed performance input and led growth conversations for peers, and mentored engineers toward higher quality and seniority.",
      "Drove a code-quality initiative: introduced and enforced linting rules, and planned dedicated quality cycles across our core functionality.",
      "Migrated a complex Playwright end-to-end suite to TypeScript, rewrote its documentation, and fixed the custom test-user tool, making the CI suite faster to maintain and more reliable.",
      "Partnered closely with design in Figma to translate mockups into polished, faithful UI, building reusable component patterns in React and Tailwind CSS.",
    ],
  },
  {
    title: "Staff Software Engineer",
    company: "Copy.ai",
    companyDescription:
      "High-growth, AI-powered content platform for go-to-market teams",
    start: "2024-03",
    end: "2025-08",
    duties: [
      "Engineered a file upload and processing pipeline end to end: cloud storage uploads, a server-side step that runs documents through Gemini for analysis and content extraction, and the API that feeds the results into automated workflows.",
      "Built an AI-aware content editor for bulk or granular edits to generated content, wiring the client to the streaming model endpoints so prompt continuation stayed seamless across iterative AI workflows.",
      "Built an admin tool for AI credit allocation and usage tracking to manage costs across enterprise accounts, plus a CSV export system for the Tables and Workflows products that generates large exports server-side.",
      "Diagnosed and resolved rendering performance issues in the Tables product using the React DevTools Profiler, redesigning component architecture and state management to eliminate flickering and unnecessary re-renders.",
    ],
  },
  {
    title: "Staff Software Engineer",
    company: "Outreach",
    companyDescription:
      "Series D unicorn and industry leading sales engagement platform with 4.4B valuation",
    start: "2022-11",
    end: "2024-02",
    duties: [
      "Collaborated on a data visualization tool that generates an expected sales pipeline: designed the API contract consumed from the data science team's models and built the client rendering against it.",
      "Extended the automation workflow builder to enable tiered conditional statements and actions, working across the React client and the service that evaluates them, and acted as liaison between product, design, and backend.",
      "Managed team agile processes and worked with team members to ensure timely feedback and process adjustments to improve team productivity.",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "Outreach",
    companyDescription:
      "Series D unicorn and industry leading sales engagement platform with 4.4B valuation",
    start: "2018-08",
    end: "2022-11",
    duties: [
      "Led a team of engineers and liaison between product, design, management, and backend team to successfully complete a multi-quarter automation framework migration with feature enhancements.",
      "Authored a conditional logic syntax for the in-house if/then workflow engine, taking it from grammar design through the evaluation semantics the backend executes, using proofs of concept and design documentation to achieve consensus across teams.",
      "Developed and extended React component functionality across the organization, allowing other engineers to leverage shared work and reduce cost of implementation.",
      "Interviewed engineering candidates and contributed to hiring decisions, helping apply a consistent hiring bar for the team.",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "Getty Images",
    companyDescription:
      "Industry leading stock photography company with over 477 million assets",
    start: "2015-03",
    end: "2018-08",
    duties: [
      "Full-stack developer on a high-traffic e-commerce website: a mobile-first front end in JavaScript, CSS, and HTML over Ruby on Rails and C#/.NET services, working through controllers, service endpoints, and SQL-backed data access.",
      "Built a CMS, from the content model and its admin endpoints to the authoring UI, giving non-technical contributors an easy way to create engaging articles that showcase creative and editorial imagery.",
      "Improved committed revenue by empowering users to purchase a new line of products that bundles assets.",
      "Created a consumer/browse functionality for users to preview high quality imagery.",
      "Implemented social sign-on and registration, integrating the Facebook OAuth flow with the account services behind it.",
    ],
  },
  {
    title: "Web Developer",
    company: "Hipcricket",
    companyDescription: "Digital SMS marketing tools",
    start: "2014-02",
    end: "2015-03",
    duties: [
      "Front end and middle tier developer for an SMS platform and its client-facing administrative website, owning features from the views down through the C# service layer and data access, and managing updates and deployments using Agile and Test Driven Development.",
      "Lead developer for a cross-browser compliant, mobile-in-mind refactor and redesign of the client-facing administrative website, leveraging Foundation 4, ASP.NET MVC 5, jQuery 1.8, NHibernate 4.0, C#, HTML5, and CSS3.",
      "Maintained and updated the legacy Classic ASP website.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Getty Images",
    companyDescription:
      "Industry leading stock photography company with over 477 million assets",
    start: "2012-06",
    end: "2014-02",
    duties: [
      "Paired programming, Test Driven Development, Agile environment developing new features for service based websites across the client and service tiers.",
    ],
  },
  {
    title: "Web Developer",
    company: "Pop!",
    companyDescription: "Digital media advertising company",
    start: "2011-11",
    end: "2012-03",
    duties: [
      "Developed an e-commerce ticketing solution for the Royal Opera House in London utilizing ASP.NET MVC3, Razor views, C#, and jQuery.",
      "Developed the API for handling account requests for the website.",
      "Integrated WorldPay and QAS Experian for 3rd party applications to support acceptance of credit cards and address capture and verification respectively.",
    ],
  },
  {
    title: "Web Developer",
    company: "Microsoft",
    companyDescription:
      "Microsoft Corporation, leading developer of personal-computer software systems",
    start: "2011-04",
    end: "2011-08",
    duties: [
      "Customized features of a 3rd party .NET based social platform, Telligent Community Server, for the MSDN and TechNet blogs and wiki.",
      "Developed and implemented a recognition feature to submit activities and achievements as a way to track quality of contributions on the blogs and wiki.",
      "Provided general site maintenance and applied upgrade packages.",
    ],
  },
  {
    title: "UI SDE",
    company: "Microsoft",
    companyDescription:
      "Microsoft Corporation, leading developer of personal-computer software systems",
    start: "2011-01",
    end: "2011-03",
    duties: [
      "Developed new features for a performance counter website.",
      "Re-skinned and Updated Features for the administration user interface.",
      "Improved look and feel by applying CSS templates, Master Pages, and Web Design Best Practices.",
      "Created Administration User Interface for Team Foundation Server, to view and create Work Items in TFS.",
      "Created a User Interface for Workflow Tracking.",
    ],
  },
  {
    title: "Web Engineer III",
    company: "Ingeniux",
    companyDescription: "Content management software",
    start: "2009-03",
    end: "2011-01",
    duties: [
      "Developed and Integrated ASP, ASP.NET, and ASP.NET MVC web applications into a Content Management System and provide a pixel perfect display with desired functionality of specified website.",
      "Analyze web site specifications, implement non-table based HTML, CSS, and JavaScript files into an XML based Content Management System, and use XSL and XPath to style and transform the XML output.",
      "Tested, debugged, and wrote HTML to ensure XHTML strict 1.0 compliant and cross browser compatible for IE 6 and above, FireFox, Safari, and Chrome.",
      "Configured and Administered IIS 6 and 7, create and manage application pools, virtual directories, and install Custom Web Applications and Websites, deploying and maintaining the servers the sites ran on.",
    ],
  },
];

export const education: EducationEntry[] = [
  {
    school: "Georgia Institute of Technology",
    degree: "MS in Computer Science",
    graduationDate: "May 2024",
  },
  {
    school: "Northern Arizona University",
    degree: "BS Advertising and BA Philosophy",
    graduationDate: "2006",
  },
  {
    school: "Strategy Computers",
    degree: "Microsoft Certificate Program MCP, Web Development",
    graduationDate: "2008",
  },
];

/**
 * Skills grouped by layer of the stack rather than as one flat list, so the
 * breadth of full-stack work is readable at a glance. Ordered front to back:
 * client, services, data, delivery, then the practices that span all of them.
 */
export const skillGroups: SkillGroup[] = [
  {
    label: "Front end",
    blurb: "Components, state, styling, and accessibility.",
    skills: [
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "MUI",
      "State management",
      "Design systems & component libraries",
      "Figma",
      "Accessibility (WCAG 2.1 AA)",
      "Performance profiling",
    ],
  },
  {
    label: "Back end & APIs",
    blurb: "Endpoints, auth, integrations, and the contracts between them.",
    skills: [
      "Node.js",
      "GraphQL (Apollo)",
      "REST API design",
      "Ruby on Rails",
      "C# / .NET",
      "ASP.NET MVC",
      "Authentication & OAuth flows",
      "Background & batch processing",
      "AI API integration (Claude, Gemini)",
    ],
  },
  {
    label: "Data",
    blurb: "Schema design, migrations, and queries.",
    skills: [
      "PostgreSQL",
      "SQL",
      "Schema & migration design",
      "ActiveRecord",
      "NHibernate",
      "Supabase (Postgres + row-level security)",
      "Query performance",
      "Bulk import & export pipelines",
    ],
  },
  {
    label: "Infrastructure & delivery",
    blurb: "Build, deploy, and release automation.",
    skills: [
      "GitHub Actions CI/CD",
      "Vercel serverless functions",
      "Cloud deploys & secret handling",
      "Release gating",
      "Environment configuration",
      "GitHub Pages",
      "npm trusted publishing",
      "IIS administration",
    ],
  },
  {
    label: "Quality",
    blurb: "Automated tests and the CI gates that run them.",
    skills: [
      "Vitest",
      "Jest",
      "React Testing Library",
      "Playwright end-to-end",
      "axe accessibility gates",
      "Test Driven Development",
      "Code review & lint enforcement",
    ],
  },
  {
    label: "Leadership & practice",
    blurb: "Team lead, mentoring, and technical direction.",
    skills: [
      "Team lead",
      "Mentoring & growth conversations",
      "Hiring & interviewing",
      "Technical design documents",
      "Product & design partnership",
      "Agile facilitation",
      "AI-assisted development (Claude)",
    ],
  },
];

/** A shipped side project, listed on the résumé as full-stack evidence. */
export interface ProjectEntry {
  name: string;
  /** Bare host shown as the link label, e.g. "crucinora.com". */
  url: string;
  /** One line: what it is, then the stack it runs on. */
  description: string;
}

export const selectedProjects: ProjectEntry[] = [
  {
    name: "CruciNora",
    url: "https://crucinora.com",
    description:
      "AI-assisted crossword construction app. Framework-free TypeScript engine (backtracking solver) behind a React front end, Supabase magic-link auth and Postgres with row-level security, and a Vercel serverless function that proxies Claude so the API key never reaches the browser.",
  },
  {
    name: "Legends of Noragon",
    url: "https://www.legendsofnoragon.com",
    description:
      "Turn-based dungeon crawler with seeded procedural generation, built on a pure reducer engine so any run replays exactly and the whole game is testable headlessly.",
  },
  {
    name: "@norarcasey component library",
    url: "https://www.npmjs.com/org/norarcasey",
    description:
      "Six embeddable React game components published to npm from dual-mode Vite libraries, each gated by GitHub Actions (format, lint, types, unit tests) and released through npm trusted publishing.",
  },
  {
    name: "noracasey.com",
    url: "https://noracasey.com",
    description:
      "This site: React and TypeScript on Vite, deployed to GitHub Pages by a pipeline that blocks the deploy on formatting, lint, unit tests, and a Playwright plus axe accessibility scan.",
  },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatYearMonth(value: string): string {
  const [year, month] = value.split("-").map(Number);
  return `${MONTHS[month - 1]} ${year}`;
}

// Inclusive month count (LinkedIn convention): a role spanning Nov 2022 to
// Feb 2024 counts as 16 months / "1 yr 4 mos".
function inclusiveMonths(start: string, end: string | null): number {
  const [startYear, startMonth] = start.split("-").map(Number);
  let endYear: number;
  let endMonth: number;
  if (end) {
    [endYear, endMonth] = end.split("-").map(Number);
  } else {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1;
  }
  return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
}

function formatSpan(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  if (months > 0) parts.push(`${months} mo${months === 1 ? "" : "s"}`);
  return parts.join(" ") || "0 mos";
}

/** "Mar 2024 – Aug 2025 · 1 yr 6 mos", or "… – Present" for ongoing roles. */
export function formatEmploymentPeriod(entry: ResumeEntry): string {
  const endLabel = entry.end ? formatYearMonth(entry.end) : "Present";
  if (!entry.start) {
    return `TODO start date – ${endLabel}`;
  }
  const range = `${formatYearMonth(entry.start)} – ${endLabel}`;
  return `${range} · ${formatSpan(inclusiveMonths(entry.start, entry.end))}`;
}

/** Whole years since the earliest dated role, computed from today. */
export function getYearsOfExperience(): number {
  const startYears = experience
    .filter((entry) => entry.start)
    .map((entry) => Number(entry.start.split("-")[0]))
    .filter((year) => !Number.isNaN(year));
  const earliest = Math.min(...startYears);
  return new Date().getFullYear() - earliest;
}

/** Whole years working in React. */
export function getReactYearsOfExperience(): number {
  return new Date().getFullYear() - REACT_EXPERIENCE_SINCE_YEAR;
}
