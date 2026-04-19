'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/base/buttons/button';
import { 
  ThemeToggle, 
  MobileDrawer,
} from '@/components';
import { ArrowUpRight, ArrowRight, Menu01 } from '@untitledui/icons';
import { 
  ArrowDownIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  CpuChipIcon,
  LightBulbIcon,
  CheckBadgeIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

// ============================================================================
// NARRATIVE PORTFOLIO V3 - ENHANCED STORYTELLING
// ============================================================================

const navLinks = [
  { href: '#story', label: 'Story' },
  { href: '#craft', label: 'Craft' },
  { href: '#impact', label: 'Impact' },
  { href: '/photography', label: 'Photography', external: true },
  { href: '#connect', label: 'Connect' },
];

// Updated story data based on Resume.md
const stories = [
  {
    chapter: "01",
    title: "Designing for 4 Million",
    subtitle: "Cloud-Native SaMD Transformation",
    hook: "Medical-grade applications under FDA scrutiny. 270+ centers that can't afford downtime.",
    narrative: "At Deloitte Studios, I lead BA/BXD for 5 SaMD applications serving 4M+ users. My BRDs pass GxP review on the first try. I also built an AI agent that drafts 60% of our design documents, which my team actually uses.",
    transformation: "30% faster compliance cycles",
    year: "2025",
    color: "teal",
    stats: [
      { label: "Users impacted", value: "4M+" },
      { label: "Centers served", value: "270+" },
      { label: "Sprint completion", value: "90%+" },
    ]
  },
  {
    chapter: "02", 
    title: "The Language of Data",
    subtitle: "Gen AI-Powered NLP Analytics",
    hook: "50+ enterprises sitting on process data they couldn't analyze fast enough to act on.",
    narrative: "I led 7 people to ship a Gen AI NLP feature that cut analysis time from weeks to hours. The real proof: enterprises started making decisions they'd been putting off for months.",
    transformation: "60% faster time-to-insight",
    year: "2024",
    color: "violet",
    stats: [
      { label: "Enterprise clients", value: "50+" },
      { label: "ARR influenced", value: "$20M+" },
      { label: "On-time delivery", value: "98%" },
    ]
  },
  {
    chapter: "03",
    title: "The $250K Question",
    subtitle: "Intelligent Automation Suite",
    hook: "A medical manufacturing floor where one mistake could mean a recall. Too many processes were still manual.",
    narrative: "Fresh out of university, I deployed 7 RPA and Python automations that saved $250K a year. I also built a VBA tool that replaced 5 separate systems with one dashboard. Quality incidents dropped 80%. The prototype became a real product.",
    transformation: "90% error reduction",
    year: "2021",
    color: "amber",
    stats: [
      { label: "Annual savings", value: "$250K+" },
      { label: "Error reduction", value: "90%" },
      { label: "Quality improvement", value: "80%" },
    ]
  }
];

// Craft skills based on Resume.md
const craftAreas = [
  {
    icon: DocumentTextIcon,
    title: "Requirements to Reality",
    skills: ["BRD/FRD Documentation", "Epics & User Stories", "Acceptance Criteria", "Gap Analysis"],
    description: "I write specs that engineers can actually build from and stakeholders can sign off on.",
    color: "teal"
  },
  {
    icon: UserGroupIcon,
    title: "Stakeholder Orchestration", 
    skills: ["Cross-functional Leadership", "GxP Compliance", "UAT Coordination", "Change Control"],
    description: "I get 15+ people across architecture, dev, and validation to agree on what we're building. It's harder than it sounds.",
    color: "violet"
  },
  {
    icon: ChartBarIcon,
    title: "Data-Driven Decisions",
    skills: ["A/B Testing", "Product Analytics", "RICE Prioritization", "Customer Interviews"],
    description: "50+ customer interviews. 400+ backlog items triaged. I don't guess when I can measure.",
    color: "amber"
  },
  {
    icon: CpuChipIcon,
    title: "AI-First Thinking",
    skills: ["Gen AI Integration", "NLP Features", "Process Mining", "Automation Design"],
    description: "I build AI tools that people actually use, not demos that collect dust.",
    color: "emerald"
  }
];

// Toolkit data - tools and technologies
const toolkitCategories = [
  {
    name: "AI-Powered Development",
    tools: ["v0", "Lovable", "Claude Code", "Cursor", "VS Code", "GitHub Copilot"],
    color: "teal"
  },
  {
    name: "Design & Prototyping",
    tools: ["Figma", "Figma Make", "Framer", "FigJam", "Canva"],
    color: "violet"
  },
  {
    name: "Product & Project",
    tools: ["Jira", "Atlassian Intelligence / Rovo"],
    color: "amber"
  },
  {
    name: "Documentation & Knowledge",
    tools: ["Notion", "Confluence", "GitHub", "Coda"],
    color: "emerald"
  },
  {
    name: "Analytics & Data",
    tools: ["Power BI", "SQL", "Tableau"],
    color: "sky"
  },
  {
    name: "Communication",
    tools: ["Microsoft Teams", "Zoom", "Google Meet"],
    color: "rose"
  }
];

// Animated section wrapper — GSAP handles animation externally
function StorySection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section
      id={id}
      className={`gsap-section gsap-hidden snap-section ${className}`}
    >
      {children}
    </section>
  );
}

// Large quote component
function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="relative py-8 md:py-16">
      <div className="pullquote-mark absolute left-0 top-0 text-[60px] sm:text-[100px] md:text-[140px] font-serif text-stone-200 dark:text-slate-800 leading-none select-none -translate-y-4 gsap-hidden" aria-hidden>
        &ldquo;
      </div>
      <p className="pullquote-text relative z-10 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 dark:text-slate-200 leading-snug md:leading-relaxed max-w-4xl gsap-hidden">
        {children}
      </p>
    </blockquote>
  );
}

// Enhanced Story card component — GSAP batch-animates these
function StoryCard({ story }: { story: typeof stories[0] }) {
  const colorClasses = {
    teal: "from-teal-500/10 to-teal-600/5 border-teal-200/50 dark:border-teal-800/50",
    violet: "from-violet-500/10 to-violet-600/5 border-violet-200/50 dark:border-violet-800/50",
    amber: "from-amber-500/10 to-amber-600/5 border-amber-200/50 dark:border-amber-800/50",
  };
  
  const accentClasses = {
    teal: "text-teal-600 dark:text-teal-400",
    violet: "text-violet-600 dark:text-violet-400",
    amber: "text-amber-600 dark:text-amber-400",
  };

  const bgAccent = {
    teal: "bg-teal-500",
    violet: "bg-violet-500", 
    amber: "bg-amber-500",
  };

  return (
    <article
      className={`story-card-item gsap-hidden relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl md:rounded-3xl bg-linear-to-br ${colorClasses[story.color as keyof typeof colorClasses]} border backdrop-blur-sm hover:scale-[1.02] hover:shadow-xl transition-all duration-300`}
    >
      {/* Chapter badge */}
      <div className="flex items-center justify-between mb-6">
        <span className={`inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest ${accentClasses[story.color as keyof typeof accentClasses]}`}>
          <span className={`w-2 h-2 rounded-full ${bgAccent[story.color as keyof typeof bgAccent]}`} />
          CHAPTER {story.chapter}
        </span>
        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-500 font-mono">
          {story.year}
        </span>
      </div>
      
      {/* Title */}
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
        {story.title}
      </h3>
      <p className={`text-base sm:text-lg mb-4 sm:mb-6 ${accentClasses[story.color as keyof typeof accentClasses]}`}>
        {story.subtitle}
      </p>
      
      {/* Hook */}
      <p className="text-lg sm:text-xl md:text-2xl font-light text-slate-700 dark:text-slate-300 mb-4 sm:mb-6 italic leading-relaxed">
        {story.hook}
      </p>
      
      {/* Narrative */}
      <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6 sm:mb-8">
        {story.narrative}
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
        {story.stats.map((stat, i) => (
          <div key={i} className="text-center p-2 sm:p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
            <div className={`text-lg sm:text-xl md:text-2xl font-bold ${accentClasses[story.color as keyof typeof accentClasses]}`}>
              {stat.value}
            </div>
            <div className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      
      {/* Transformation callout */}
      <div className={`flex items-center gap-3 pt-4 sm:pt-6 border-t border-stone-200/50 dark:border-slate-700/50`}>
        <CheckBadgeIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${accentClasses[story.color as keyof typeof accentClasses]}`} />
        <div>
          <span className="block text-xs text-slate-500 dark:text-slate-500 uppercase tracking-wider">Key Transformation</span>
          <span className={`text-lg sm:text-xl md:text-2xl font-bold ${accentClasses[story.color as keyof typeof accentClasses]}`}>
            {story.transformation}
          </span>
        </div>
      </div>
    </article>
  );
}

// Craft card component — GSAP batch-animates these
function CraftCard({ area }: { area: typeof craftAreas[0] }) {
  const colorClasses = {
    teal: "group-hover:bg-teal-500 group-hover:text-white",
    violet: "group-hover:bg-violet-500 group-hover:text-white",
    amber: "group-hover:bg-amber-500 group-hover:text-white",
    emerald: "group-hover:bg-emerald-500 group-hover:text-white",
  };

  const iconBg = {
    teal: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
    violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
    amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  };

  const tagColor = {
    teal: "bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300",
    violet: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
    amber: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
    emerald: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
  };

  const Icon = area.icon;

  return (
    <div
      className="craft-card-item gsap-hidden group relative p-5 sm:p-6 md:p-8 bg-white dark:bg-slate-800/50 rounded-xl sm:rounded-2xl border border-stone-200 dark:border-slate-700 hover:border-transparent hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Icon */}
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300 ${iconBg[area.color as keyof typeof iconBg]} ${colorClasses[area.color as keyof typeof colorClasses]}`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3">
        {area.title}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-5 leading-relaxed">
        {area.description}
      </p>

      {/* Skills tags */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {area.skills.map((skill, i) => (
          <span 
            key={i} 
            className={`text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-full ${tagColor[area.color as keyof typeof tagColor]}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function StoryPortfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  // ====== GSAP ANIMATIONS ======
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      // Desktop & tablet
      isDesktop: "(min-width: 768px)",
      // Mobile
      isMobile: "(max-width: 767px)",
      // Respect reduced motion
      reducedMotion: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const { reducedMotion, isMobile } = context.conditions!;

      // If user prefers reduced motion, just reveal everything instantly
      if (reducedMotion) {
        gsap.set(".gsap-hidden, .gsap-hero-hidden", { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // --- HERO ENTRANCE TIMELINE ---
      const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      heroTl
        .to(".hero-nav", { y: 0, opacity: 1, duration: 0.5 })
        .to(".hero-photo", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.4)" }, "<0.1")
        .to(".hero-orbit-1", { opacity: 1, duration: 0.4 }, "<0.3")
        .to(".hero-orbit-2", { opacity: 1, duration: 0.4 }, "<0.1")
        .to(".hero-title", { opacity: 1, y: 0, duration: 0.6 }, "<0.1")
        .to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(".hero-stat", { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, "-=0.2")
        .to(".hero-scroll-cta", { opacity: 1, y: 0, duration: 0.5 }, "-=0.1");

      // Orbit ring continuous rotation
      gsap.to(".hero-orbit-1", { rotation: 360, duration: 30, repeat: -1, ease: "none" });
      gsap.to(".hero-orbit-2", { rotation: -360, duration: 45, repeat: -1, ease: "none" });

      // --- HERO PARALLAX ON SCROLL ---
      gsap.to(".hero-content", {
        y: isMobile ? 60 : 120,
        opacity: 0,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // --- SECTION REVEALS ---
      gsap.utils.toArray<HTMLElement>(".gsap-section").forEach((section) => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // --- STORY ORIGIN: paragraph stagger ---
      gsap.to(".origin-paragraph", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".origin-paragraphs",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // --- TIMELINE LINE DRAW ---
      gsap.to(".timeline-draw-line", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 80%",
          end: "bottom 60%",
          scrub: 0.5,
        },
      });

      // --- TIMELINE ENTRIES ---
      gsap.utils.toArray<HTMLElement>(".timeline-entry").forEach((entry, i) => {
        const direction = i % 2 === 0 ? -30 : 30;
        gsap.fromTo(entry,
          { opacity: 0, x: isMobile ? 0 : direction, y: isMobile ? 20 : 0 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // --- STORY CARDS BATCH ---
      // Set initial state immediately to prevent flash
      gsap.set(".story-card-item", { opacity: 0, y: 50, scale: 0.96 });
      ScrollTrigger.batch(".story-card-item", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: "power2.out", overwrite: true
          });
        },
        start: "top 85%",
        once: true,
      });

      // --- CRAFT CARDS BATCH ---
      // Set initial state immediately to prevent flash
      gsap.set(".craft-card-item", { opacity: 0, y: 30, rotationX: isMobile ? 0 : 8 });
      ScrollTrigger.batch(".craft-card-item", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1, y: 0, rotationX: 0, duration: 0.6, stagger: 0.12, ease: "power2.out", overwrite: true
          });
        },
        start: "top 85%",
        once: true,
      });

      // --- TOOLKIT CARDS BATCH ---
      // Set initial state immediately to prevent flash
      gsap.set(".toolkit-card", { opacity: 0, y: 20, scale: 0.95 });
      ScrollTrigger.batch(".toolkit-card", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", overwrite: true
          });
        },
        start: "top 85%",
        once: true,
      });

      // --- AWARDS BAR ---
      gsap.to(".awards-bar", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".awards-bar",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // --- PULLQUOTE ---
      const pullquoteSection = document.querySelector(".pullquote-section");
      if (pullquoteSection) {
        const pqTl = gsap.timeline({
          scrollTrigger: {
            trigger: pullquoteSection,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
        pqTl
          .to(".pullquote-mark", { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" })
          .to(".pullquote-text", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4");
      }

      // --- CTA BUTTONS ---
      gsap.to(".cta-button", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-buttons",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="min-h-screen bg-stone-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      
      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />

      {/* Navigation */}
      <nav 
        className={`hero-nav fixed top-0 w-full z-50 transition-all duration-300 opacity-0 -translate-y-4 ${
          scrolled 
            ? 'bg-stone-50/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-stone-200/50 dark:border-slate-800/50 shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          <a 
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="group hover:text-teal-600 dark:hover:text-teal-400 transition-colors hover:scale-[1.02] active:scale-[0.98] inline-block"
          >
            <span className="text-base sm:text-lg font-medium tracking-wide uppercase">Jai Sanghavi</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="/Jai_Sanghavi_Product_Manager_Resume.pdf"
              download
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all group relative"
              title="Download resume"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Resume
              </span>
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button 
              color="secondary" 
              size="sm" 
              onClick={() => setMobileMenuOpen(true)} 
              className="w-10 h-10 p-0 touch-manipulation"
            >
              <Menu01 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* =========== THE HOOK - Enhanced Hero =========== */}
      <section className="hero-section snap-section relative min-h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-teal-50/50 via-transparent to-transparent dark:from-teal-950/20 dark:via-transparent pointer-events-none" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-teal-200/30 dark:bg-teal-800/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-[10%] w-72 h-72 bg-violet-200/30 dark:bg-violet-800/20 rounded-full blur-3xl animate-float-delayed" />
        </div>

        <div className="hero-content relative z-10 max-w-5xl mx-auto text-center">
          {/* Enhanced Profile Photo - Cinematic Style */}
          <div className="hero-photo gsap-hero-hidden mb-8 sm:mb-10 scale-90">
            <div className="relative inline-block group">
              {/* Outer glow effect */}
              <div className="absolute -inset-4 sm:-inset-6 bg-linear-to-r from-teal-500/20 via-violet-500/20 to-amber-500/20 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

              {/* Decorative orbit rings */}
              <div className="hero-orbit-1 absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-slate-400/50 dark:border-slate-500/50 opacity-0" />
              <div className="hero-orbit-2 absolute -inset-6 sm:-inset-8 rounded-full border border-dotted border-slate-300/40 dark:border-slate-600/40 opacity-0" />

              {/* Main image container with gradient border */}
              <div className="relative">
                <div className="absolute -inset-0.75 rounded-full bg-linear-to-br from-teal-400 via-violet-500 to-amber-400 opacity-80" />
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-stone-50 dark:bg-slate-950 p-0.75">
                  <div className="w-full h-full rounded-full overflow-hidden bg-stone-100 dark:bg-slate-900">
                    <Image
                      src="/Jai_Profile.jpeg"
                      alt="Jai M Sanghavi"
                      fill
                      className="object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700"
                      priority
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Hook */}
          <h1 className="hero-title gsap-hero-hidden text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6 px-2">
            I turn{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-teal-600 via-violet-600 to-teal-600 dark:from-teal-400 dark:via-violet-400 dark:to-teal-400 bg-size-[200%_auto] animate-gradient">
                chaos into clarity
              </span>
            </span>
          </h1>

          <p className="hero-subtitle gsap-hero-hidden text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Product Manager building enterprise AI and healthcare software for{' '}
            <span className="font-semibold text-slate-900 dark:text-white">4M+ users</span>.
            {' '}Six years of shipping products that work.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10">
            {[
              { value: '6+', label: 'Years' },
              { value: '50+', label: 'Enterprises' },
              { value: '$20M+', label: 'ARR Influenced' },
            ].map((stat, i) => (
              <div key={i} className="hero-stat gsap-hero-hidden text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Enhanced Scroll indicator */}
          <div className="hero-scroll-cta gsap-hero-hidden mt-12 sm:mt-16">
            <a
              href="#story"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#story');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="group inline-flex flex-col items-center text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 touch-manipulation"
            >
              <span className="text-xs sm:text-sm mb-3 tracking-wide uppercase opacity-70 group-hover:opacity-100 transition-opacity">Discover my journey</span>
              <div className="relative">
                <div className="absolute inset-0 rounded-full border-2 border-teal-500/30 animate-pulse-glow" />
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-teal-500 dark:group-hover:border-teal-400 flex items-center justify-center transition-colors duration-300 animate-bounce-subtle">
                  <ArrowDownIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* =========== THE ORIGIN =========== */}
      <StorySection id="story" className="py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <span className="block text-xs sm:text-sm font-mono text-teal-600 dark:text-teal-400 tracking-widest mb-4 sm:mb-6">
            THE BEGINNING
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 sm:mb-12 leading-tight">
            From automating tasks to<br />
            <span className="text-slate-400 dark:text-slate-500">orchestrating outcomes</span>
          </h2>
          
          <div className="origin-paragraphs space-y-4 sm:space-y-6">
            <p className="origin-paragraph gsap-hidden text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
              I started in medical manufacturing. FDA audits. Processes where one wrong click could trigger a recall worth more than my salary.
            </p>
            
            <p className="origin-paragraph gsap-hidden text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
              Watching people fight with software that should have helped them, I started asking: 
              <strong className="text-slate-900 dark:text-white"> why is this so hard?</strong> Most of the time, it didn't have to be.
            </p>
            
            <p className="origin-paragraph gsap-hidden text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
              Now I'm at Deloitte Studios, working on SaMD apps for 4M+ users across 270+ centers. I built an AI agent that writes 60% of our design docs. Still asking the same question, though.
            </p>
          </div>
          
          {/* Journey timeline */}
          <div className="timeline-container mt-12 sm:mt-16 relative">
            {/* Timeline line - positioned to align with dots */}
            <div className="timeline-draw-line origin-top scale-y-0 absolute left-2.75 sm:left-3.75 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-linear-to-b from-teal-500 via-violet-500 to-amber-500" />
            
            <div className="space-y-8 sm:space-y-12 md:space-y-16">
              {/* Deloitte */}
              <div className="timeline-entry relative pl-10 sm:pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-start">
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white" />
                </div>
                <div className="md:text-right md:pr-12">
                  <span className="text-xs sm:text-sm text-teal-600 dark:text-teal-400 font-mono">Mar 2025 — Present</span>
                  <h3 className="text-lg sm:text-xl font-bold mt-1">Deloitte Studios</h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                    BA/BXD Lead for SaMD transformation • 4M+ users • 270+ centers • GxP compliance • AI document agent
                  </p>
                </div>
                <div className="hidden md:block" />
              </div>
              
              {/* Edgeverve */}
              <div className="timeline-entry relative pl-10 sm:pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-start">
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-violet-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white" />
                </div>
                <div className="hidden md:block" />
                <div className="md:pl-12">
                  <span className="text-xs sm:text-sm text-violet-600 dark:text-violet-400 font-mono">Jan 2022 — Mar 2025</span>
                  <h3 className="text-lg sm:text-xl font-bold mt-1">Edgeverve (Infosys)</h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                    Product Manager • Gen AI NLP feature • $20M+ ARR • 50+ enterprises • Gartner & Forrester demos
                  </p>
                </div>
              </div>
              
              {/* TCS */}
              <div className="timeline-entry relative pl-10 sm:pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 items-start">
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white" />
                </div>
                <div className="md:text-right md:pr-12">
                  <span className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-mono">Jun 2019 — Jan 2022</span>
                  <h3 className="text-lg sm:text-xl font-bold mt-1">Tata Consultancy Services</h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                    Process Lead • $250K+ saved • Innovation Spark Award (top 5% of 450K) • FDA-compliant frameworks
                  </p>
                </div>
                <div className="hidden md:block" />
              </div>
            </div>
          </div>
        </div>
      </StorySection>

      {/* =========== THE CRAFT - Revamped =========== */}
      <StorySection id="craft" className="py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-stone-100 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="block text-xs sm:text-sm font-mono text-violet-600 dark:text-violet-400 tracking-widest mb-4 sm:mb-6">
              THE CRAFT
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
              How I create impact
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From requirements gathering to shipped features—the skills I bring to every product.
            </p>
          </div>
          
          {/* Craft cards grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {craftAreas.map((area) => (
              <CraftCard key={area.title} area={area} />
            ))}
          </div>

          {/* Tools & Certifications bar */}
          <div className="awards-bar gsap-hidden mt-10 sm:mt-12 md:mt-16 p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-800/50 rounded-xl sm:rounded-2xl border border-stone-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 md:gap-8">
              <div className="shrink-0">
                <LightBulbIcon className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">Awards & Recognition</h4>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                  <span className="font-medium text-slate-800 dark:text-slate-200">Indian Patent Awardee</span> (Sewage System) • 
                  <span className="font-medium text-slate-800 dark:text-slate-200"> Innovation Spark Award</span> at TCS (top 5% of 450K) • 
                  <span className="font-medium text-slate-800 dark:text-slate-200"> Applause Award</span> at Deloitte for delivery excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </StorySection>

      {/* =========== THE TOOLKIT =========== */}
      <StorySection className="py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="block text-xs sm:text-sm font-mono text-emerald-600 dark:text-emerald-400 tracking-widest mb-4 sm:mb-6">
              THE TOOLKIT
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
              Tools of the trade
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The technologies I use daily to build, analyze, and ship products.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {toolkitCategories.map((category) => {
              const colorClasses = {
                teal: "border-teal-200 dark:border-teal-800/50 bg-teal-50/50 dark:bg-teal-950/20",
                violet: "border-violet-200 dark:border-violet-800/50 bg-violet-50/50 dark:bg-violet-950/20",
                amber: "border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/20",
                emerald: "border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-950/20",
                sky: "border-sky-200 dark:border-sky-800/50 bg-sky-50/50 dark:bg-sky-950/20",
                rose: "border-rose-200 dark:border-rose-800/50 bg-rose-50/50 dark:bg-rose-950/20",
              };
              const titleClasses = {
                teal: "text-teal-700 dark:text-teal-400",
                violet: "text-violet-700 dark:text-violet-400",
                amber: "text-amber-700 dark:text-amber-400",
                emerald: "text-emerald-700 dark:text-emerald-400",
                sky: "text-sky-700 dark:text-sky-400",
                rose: "text-rose-700 dark:text-rose-400",
              };
              const iconBg = {
                teal: "bg-teal-500",
                violet: "bg-violet-500",
                amber: "bg-amber-500",
                emerald: "bg-emerald-500",
                sky: "bg-sky-500",
                rose: "bg-rose-500",
              };
              return (
                <div 
                  key={category.name}
                  className={`toolkit-card gsap-hidden p-5 sm:p-6 rounded-xl border ${colorClasses[category.color as keyof typeof colorClasses]} hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-2 h-2 rounded-full ${iconBg[category.color as keyof typeof iconBg]}`} />
                    <h3 className={`font-semibold text-sm ${titleClasses[category.color as keyof typeof titleClasses]}`}>
                      {category.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool) => (
                      <span 
                        key={tool}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Credentials row */}
          <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">
              <CheckBadgeIcon className="w-5 h-5 text-teal-500" />
              <span className="font-medium text-slate-800 dark:text-slate-200">CSPO® Certified</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">
              <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
              <span className="font-medium text-slate-800 dark:text-slate-200">B.Tech, REVA University</span>
            </div>
          </div>

          {/* Patent highlight card */}
          <a 
            href="/1717591849226.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 sm:mt-10 block max-w-2xl mx-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800/50 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider">Indian Patent</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Granted 2024</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  Sewage Blockage Detecting & Removing System
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Automated IoT solution for municipal infrastructure—detecting blockages before they cause overflow.
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 group-hover:gap-2.5 transition-all">
                  View patent certificate
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </a>
        </div>
      </StorySection>

      {/* =========== THE IMPACT (Stories) =========== */}
      <StorySection id="impact" className="py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <span className="block text-xs sm:text-sm font-mono text-amber-600 dark:text-amber-400 tracking-widest mb-4 sm:mb-6">
            THE IMPACT
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
            Stories of transformation
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mb-10 sm:mb-12 md:mb-16">
            Every project is a story of before and after. Here are three that shaped how I think about product.
          </p>
          
          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {stories.map((story) => (
              <StoryCard key={story.chapter} story={story} />
            ))}
          </div>
        </div>
      </StorySection>

      {/* =========== THE HUMAN =========== */}
      <StorySection className="py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-stone-100 dark:bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <span className="block text-xs sm:text-sm font-mono text-teal-600 dark:text-teal-400 tracking-widest mb-4 sm:mb-6">
            THE HUMAN
          </span>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 sm:mb-8 leading-tight">
            Beyond the screen
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed">
            When I'm not thinking about user flows, I'm out with a camera. 
            Photography taught me to notice things I'd otherwise walk past.
          </p>
          
          <Link 
            href="/photography"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:scale-105 active:scale-95 transition-transform touch-manipulation text-sm sm:text-base"
          >
            View my photography
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          
          <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-slate-500 dark:text-slate-500">
            @xposure_trifecta on Instagram
          </div>
        </div>
      </StorySection>

      {/* =========== THE INVITATION =========== */}
      <StorySection id="connect" className="pullquote-section py-16 sm:py-20 md:py-28 lg:py-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <PullQuote>
            Good products solve problems. Great products make you forget there was a problem.
          </PullQuote>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 sm:mb-10 md:mb-12 max-w-lg mx-auto">
            Whether you're building something new or reimagining something old, I'd love to hear about it.
          </p>
          
          <div className="cta-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a 
              href="mailto:jaimsanghavi@gmail.com"
              className="cta-button gsap-hidden inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:scale-105 active:scale-95 transition-transform touch-manipulation text-sm sm:text-base"
            >
              Start a conversation
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="https://www.linkedin.com/in/jaimsanghavi"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button gsap-hidden inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-medium hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all touch-manipulation text-sm sm:text-base"
            >
              Connect on LinkedIn
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          
          <a 
            href="/Jai_Sanghavi_Product_Manager_Resume.pdf"
            download
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            or just grab my resume
          </a>
        </div>
      </StorySection>

      {/* Footer */}
      <footer className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Social links row */}
          <div className="flex justify-center gap-6 mb-8">
            <a 
              href="https://www.linkedin.com/in/jaimsanghavi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com/xposure_trifecta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:text-white transition-all duration-300 hover:scale-110"
              title="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="mailto:jaimsanghavi@gmail.com"
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-500 dark:hover:text-white transition-all duration-300 hover:scale-110"
              title="Email"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>

          {/* Footer content */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-500">
            <span>© {new Date().getFullYear()} Jai M Sanghavi • CSPO® Certified Product Manager</span>
            <div className="flex items-center gap-4">
              <Link href="/photography" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Photography</Link>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span>Built with Next.js + Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StoryPortfolio;
