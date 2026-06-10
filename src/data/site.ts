export const navLinks = [
  { href: "#story", label: "Story" },
  { href: "#craft", label: "Craft" },
  { href: "#impact", label: "Impact" },
  { href: "/photography", label: "Photography" },
  { href: "#connect", label: "Connect" },
];

export const heroStats: { end: number; prefix?: string; suffix: string; label: string }[] = [
  { end: 6, suffix: "+", label: "Years" },
  { end: 4, suffix: "M+", label: "Users served" },
  { end: 20, prefix: "$", suffix: "M+", label: "ARR influenced" },
];

export const originParagraphs = [
  "I started in medical manufacturing. FDA audits. Processes where one wrong click could trigger a recall worth more than my salary.",
  "Watching people fight with software that should have helped them, I started asking: why is this so hard? Most of the time, it didn't have to be.",
  "Now I'm at Deloitte Studios, working on SaMD apps for 4M+ users across 270+ centers. I built an AI agent that writes 60% of our design docs. Still asking the same question, though.",
];

export const timeline = [
  {
    period: "Mar 2025 — Present",
    company: "Deloitte Studios",
    summary: "BA/BXD Lead for SaMD transformation · 4M+ users · 270+ centers · GxP compliance · AI document agent",
  },
  {
    period: "Jan 2022 — Mar 2025",
    company: "Edgeverve (Infosys)",
    summary: "Product Manager · Gen AI NLP feature · $20M+ ARR · 50+ enterprises · Gartner & Forrester demos",
  },
  {
    period: "Jun 2019 — Jan 2022",
    company: "Tata Consultancy Services",
    summary: "Process Lead · $250K+ saved · Innovation Spark Award (top 5% of 450K) · FDA-compliant frameworks",
  },
];

export const craftAreas = [
  {
    index: "C.01",
    icon: "spec",
    title: "Requirements to Reality",
    description: "I write specs that engineers can actually build from and stakeholders can sign off on.",
    skills: ["BRD/FRD Documentation", "Epics & User Stories", "Acceptance Criteria", "Gap Analysis"],
  },
  {
    index: "C.02",
    icon: "people",
    title: "Stakeholder Orchestration",
    description: "I get 15+ people across architecture, dev, and validation to agree on what we're building. It's harder than it sounds.",
    skills: ["Cross-functional Leadership", "GxP Compliance", "UAT Coordination", "Change Control"],
  },
  {
    index: "C.03",
    icon: "chart",
    title: "Data-Driven Decisions",
    description: "50+ customer interviews. 400+ backlog items triaged. I don't guess when I can measure.",
    skills: ["A/B Testing", "Product Analytics", "RICE Prioritization", "Customer Interviews"],
  },
  {
    index: "C.04",
    icon: "chip",
    title: "AI-First Thinking",
    description: "I build AI tools that people actually use, not demos that collect dust.",
    skills: ["Gen AI Integration", "NLP Features", "Process Mining", "Automation Design"],
  },
] as const;

export const toolkit = [
  { category: "AI-powered development", tools: ["v0", "Lovable", "Claude Code", "Cursor", "VS Code", "GitHub Copilot"] },
  { category: "Design & prototyping", tools: ["Figma", "Figma Make", "Framer", "FigJam", "Canva"] },
  { category: "Product & project", tools: ["Jira", "Atlassian Intelligence / Rovo"] },
  { category: "Documentation & knowledge", tools: ["Notion", "Confluence", "GitHub", "Coda"] },
  { category: "Analytics & data", tools: ["Power BI", "SQL", "Tableau"] },
  { category: "Communication", tools: ["Microsoft Teams", "Zoom", "Google Meet"] },
];

export const stories = [
  {
    chapter: "01",
    year: "2025",
    title: "Designing for 4 Million",
    subtitle: "Cloud-Native SaMD Transformation",
    hook: "Medical-grade applications under FDA scrutiny. 270+ centers that can't afford downtime.",
    narrative:
      "At Deloitte Studios, I lead BA/BXD for 5 SaMD applications serving 4M+ users. My BRDs pass GxP review on the first try. I also built an AI agent that drafts 60% of our design documents, which my team actually uses.",
    metric: "4M+",
    metricLabel: "users impacted",
    transformation: "30% faster compliance cycles",
    stats: [
      { label: "Users impacted", value: "4M+" },
      { label: "Centers served", value: "270+" },
      { label: "Sprint completion", value: "90%+" },
    ],
  },
  {
    chapter: "02",
    year: "2024",
    title: "The Language of Data",
    subtitle: "Gen AI-Powered NLP Analytics",
    hook: "50+ enterprises sitting on process data they couldn't analyze fast enough to act on.",
    narrative:
      "I led 7 people to ship a Gen AI NLP feature that cut analysis time from weeks to hours. The real proof: enterprises started making decisions they'd been putting off for months.",
    metric: "$20M+",
    metricLabel: "ARR influenced",
    transformation: "60% faster time-to-insight",
    stats: [
      { label: "Enterprise clients", value: "50+" },
      { label: "ARR influenced", value: "$20M+" },
      { label: "On-time delivery", value: "98%" },
    ],
  },
  {
    chapter: "03",
    year: "2021",
    title: "The $250K Question",
    subtitle: "Intelligent Automation Suite",
    hook: "A medical manufacturing floor where one mistake could mean a recall. Too many processes were still manual.",
    narrative:
      "Fresh out of university, I deployed 7 RPA and Python automations that saved $250K a year. I also built a VBA tool that replaced 5 separate systems with one dashboard. Quality incidents dropped 80%. The prototype became a real product.",
    metric: "$250K+",
    metricLabel: "annual savings",
    transformation: "90% error reduction",
    stats: [
      { label: "Annual savings", value: "$250K+" },
      { label: "Error reduction", value: "90%" },
      { label: "Quality improvement", value: "80%" },
    ],
  },
];

export const contact = {
  email: "jaimsanghavi@gmail.com",
  linkedin: "https://www.linkedin.com/in/jaimsanghavi",
  instagram: "https://instagram.com/xposure_trifecta",
  instagramHandle: "@xposure_trifecta",
  resume: "/Jai_Sanghavi_Product_Manager_Resume.pdf",
  patentPdf: "/1717591849226.pdf",
};
