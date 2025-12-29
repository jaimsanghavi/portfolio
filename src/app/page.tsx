'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/base/badges/badges';
import { Button } from '@/components/base/buttons/button';
import { 
  Card, 
  ThemeToggle, 
  Modal, 
  ExpandableList,
  FadeIn,
  FadeInLeft,
  FadeInRight,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  HoverScale,
  MobileDrawer,
} from '@/components';
import { ArrowUpRight, ArrowRight, Star01, Menu01 } from '@untitledui/icons';
import { 
  SparklesIcon, 
  CpuChipIcon, 
  RocketLaunchIcon,
  LightBulbIcon,
  ChartBarIcon,
  UsersIcon,
  PaintBrushIcon,
  Cog6ToothIcon,
  BriefcaseIcon,
  MagnifyingGlassIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { motion } from 'motion/react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '/photography', label: 'Photography', external: true },
  { href: '#contact', label: 'Contact' },
];

const projects = [
  {
    title: "Gen AI-Powered NLP Analytics Platform",
    description: "Led development of AI-driven NLP feature that automated data analysis for process optimization, reducing user time-to-analysis by 60% across 50+ enterprises.",
    impact: "60% faster insights, 50+ enterprises",
    tags: ["Gen AI", "NLP", "Process Optimization", "Enterprise SaaS"],
    status: "Launched",
    year: "2024"
  },
  {
    title: "AI Task Mining & Process Discovery Tool",
    description: "Owned end-to-end product lifecycle for AI-driven process optimization platform. Delivered custom Kibana dashboards reducing POC turnaround by 85%.",
    impact: "$20M+ ARR, 500+ users",
    tags: ["AI/ML", "Task Mining", "Kibana", "Process Discovery"],
    status: "Launched",
    year: "2023"
  },
  {
    title: "Intelligent RPA Automation Suite",
    description: "Designed and deployed 7 RPA/Python automations for medical manufacturing, achieving $250K+ annual savings and 90% reduction in manual errors.",
    impact: "$250K+ savings, 90% error reduction",
    tags: ["RPA", "Python", "Manufacturing", "Process Automation"],
    status: "Launched",
    year: "2021"
  }
];

const skills = [
  { name: "Product Strategy", level: "CSPO® Certified", icon: RocketLaunchIcon },
  { name: "AI/ML Solutions", level: "6+ Years", icon: CpuChipIcon },
  { name: "Agile & Scrum", level: "SAFe, Kanban, FDD", icon: ChartBarIcon },
  { name: "Data Analytics", level: "SQL, Python, Tableau", icon: ChartBarIcon },
  { name: "Enterprise SaaS", level: "50+ Clients", icon: UsersIcon },
  { name: "Go-to-Market", level: "Expert", icon: LightBulbIcon }
];

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for nav background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={navLinks}
      />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 w-full backdrop-blur-lg border-b z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-gray-950/90 border-gray-200 dark:border-gray-800 shadow-sm' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <motion.a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-3 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="relative w-9 h-9 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              {/* Animated ring */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin-slow" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 rounded-full bg-white dark:bg-gray-950" />
              <Image 
                src="/Jai_Profile.jpeg" 
                alt="Jai M Sanghavi profile photo"
                fill
                sizes="36px"
                className="object-cover object-top relative z-10 rounded-full"
                priority
              />
            </motion.div>
            <span className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Jai M Sanghavi</span>
          </motion.a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              color="secondary"
              size="sm"
              onClick={() => setMobileMenuOpen(true)}
              className="w-9 h-9 p-0"
            >
              <Menu01 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <FadeInLeft className="text-center lg:text-left">
              <motion.div 
                className="flex items-center justify-center lg:justify-start space-x-2 mb-6 flex-wrap gap-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge color="brand" size="sm">
                  <SparklesIcon className="w-3 h-3 mr-1" />
                  CSPO® Certified
                </Badge>
                <Badge color="gray" size="sm">
                  6+ Years Experience
                </Badge>
                <Badge color="success" size="sm">
                  AI/ML‑focused PM
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Building{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  enterprise AI solutions
                </span>{' '}
                that drive measurable impact
              </motion.h1>
              
              <motion.div 
                className="mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  CSPO® Product Manager with <span className="font-semibold text-gray-900 dark:text-white">6+ years</span> in enterprise SaaS, 
                  bridging user research to strategy and turning strategy into shipped outcomes across <span className="font-semibold text-gray-900 dark:text-white">50+ customers</span>.
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Time-to-insight
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 ring-1 ring-purple-200 dark:ring-purple-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Activation & Adoption
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 ring-1 ring-green-200 dark:ring-green-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    RICE & Lean Experiments
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Crisp Acceptance Criteria
                  </span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button 
                  size="lg" 
                  className="group w-full sm:w-auto min-w-[180px] px-6"
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="flex items-center justify-center">
                    Learn About Me
                    <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </Button>
                {/* Download Resume button removed as requested */}
              </motion.div>
            </FadeInLeft>
            
            <FadeInRight delay={0.3}>
              <div className="relative mt-12 lg:mt-0">
                <HoverScale scale={1.02}>
                  <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-xl ring-1 ring-purple-500/10">
                    {/* subtle glow backdrop */}
                    <div aria-hidden className="pointer-events-none absolute -inset-8 opacity-60 blur-2xl bg-gradient-to-br from-blue-200/30 to-purple-300/20 dark:from-blue-500/10 dark:to-purple-600/10" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-white/5 text-gray-800 dark:text-gray-200 ring-1 ring-gray-200 dark:ring-white/10 backdrop-blur-sm">
                          <Star01 className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-semibold">Current Impact</span>
                        </span>
                      </div>
                      <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 gap-4 text-center">
                        <StaggerItem>
                          <div className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">$20M+</div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Annual Recurring Revenue</div>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">500+</div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Enterprise Users</div>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">50+</div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Enterprise Clients</div>
                        </StaggerItem>
                        <StaggerItem>
                          <div className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">60%</div>
                          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Faster Time-to-Insight</div>
                        </StaggerItem>
                      </StaggerContainer>
                    </div>
                  </div>
                </HoverScale>
                
                {/* Floating elements for visual interest - hidden on mobile */}
                <motion.div 
                  className="hidden sm:flex absolute -top-6 -right-6 w-16 sm:w-20 h-16 sm:h-20 bg-blue-100 dark:bg-blue-900/20 rounded-2xl items-center justify-center border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
                >
                  <CpuChipIcon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <motion.div 
                  className="hidden sm:flex absolute -bottom-4 -left-4 w-14 sm:w-16 h-14 sm:h-16 bg-purple-100 dark:bg-purple-900/20 rounded-xl items-center justify-center border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0, rotate: 10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.7, duration: 0.5, type: 'spring' }}
                >
                  <SparklesIcon className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600 dark:text-purple-400" />
                </motion.div>
              </div>
            </FadeInRight>
          </div>
        </div>
      </section>

      {/* About Section - concise with highlights */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How I Work
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience-first thinking meets data-driven execution - making complex AI/ML capabilities feel effortless.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <StaggerContainer staggerDelay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
              <StaggerItem className="h-full">
                <HoverScale className="h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 flex-shrink-0">
                      <MagnifyingGlassIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Discover</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">User interviews, jobs-to-be-done, and AI-assisted synthesis.</div>
                  </div>
                </HoverScale>
              </StaggerItem>
              <StaggerItem className="h-full">
                <HoverScale className="h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-3 flex-shrink-0">
                      <BeakerIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Validate</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Lean experiments, rapid prototypes, and RICE prioritization.</div>
                  </div>
                </HoverScale>
              </StaggerItem>
              <StaggerItem className="h-full">
                <HoverScale className="h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3 flex-shrink-0">
                      <RocketLaunchIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Ship</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Crisp acceptance criteria, sprint planning, eng partnership.</div>
                  </div>
                </HoverScale>
              </StaggerItem>
              <StaggerItem className="h-full">
                <HoverScale className="h-full">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-3 flex-shrink-0">
                      <ChartBarIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Measure</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Adoption metrics, A/B tests, and data-driven iterations.</div>
                  </div>
                </HoverScale>
              </StaggerItem>
            </StaggerContainer>
          </FadeIn>
        </div>
      </section>

      {/* Transition to Projects */}
      <section className="py-8 px-4 sm:px-6">
        <FadeIn className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Here's how I've applied these principles to deliver real impact across different industries and use cases
          </p>
        </FadeIn>
      </section>

      {/* Featured Projects */}
      <section id="work" className="py-12 sm:py-20 px-4 sm:px-6 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Product Case Studies
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Deep dives into products that transformed how enterprises work with AI/ML - from conception to measurable business impact
            </p>
          </FadeIn>
          
          <div className="space-y-12 sm:space-y-16">
            {projects.map((project, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <HoverScale scale={1.01}>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-shadow hover:shadow-lg">
                    <div className="grid lg:grid-cols-2 gap-8 items-start">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <Badge 
                            color={project.status === 'Launched' ? 'success' : project.status === 'In Progress' ? 'warning' : 'gray'} 
                            size="sm"
                          >
                            {project.status}
                          </Badge>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
                            <Button size="sm" color="secondary" onClick={() => setOpenProjectIndex(index)}>View case study</Button>
                          </div>
                        </div>
                        
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge color="success" size="sm">Impact: {project.impact}</Badge>
                        </div>
                        
                        <p className="text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                  
                  <div className="space-y-6">
                    {/* Skills Applied */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Skills Applied</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} color="blue" size="sm">
                            {tag}
                          </Badge>
                        ))}
                        {/* Add relevant skills based on project */}
                        {index === 0 && (
                          <>
                            <Badge color="gray" size="sm">RICE Framework</Badge>
                            <Badge color="gray" size="sm">User Research</Badge>
                            <Badge color="gray" size="sm">A/B Testing</Badge>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <Badge color="gray" size="sm">Product Strategy</Badge>
                            <Badge color="gray" size="sm">API Integrations</Badge>
                            <Badge color="gray" size="sm">Stakeholder Management</Badge>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <Badge color="gray" size="sm">Process Automation</Badge>
                            <Badge color="gray" size="sm">Lean Methodology</Badge>
                            <Badge color="gray" size="sm">Team Leadership</Badge>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Tools & Technologies */}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tools & Methodologies</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {index === 0 && (
                          <>
                            <div>• Figma for wireframing and user flows</div>
                            <div>• Jira for sprint planning and backlog management</div>
                            <div>• Mixpanel for user behavior analytics</div>
                            <div>• Scrum/Agile methodology</div>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <div>• Kibana for dashboard development</div>
                            <div>• Product metrics tracking in Tableau</div>
                            <div>• API documentation and testing</div>
                            <div>• Customer discovery interviews</div>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <div>• Python for automation scripting</div>
                            <div>• VBA for data harmonization</div>
                            <div>• Process mapping and optimization</div>
                            <div>• FDA compliance frameworks</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Case Study CTA moved to header for cleaner layout */}
                </div>
              </div>
            </HoverScale>
          </ScaleIn>
            ))}
            {/* Project Case Study Modal */}
            <Modal
              open={openProjectIndex !== null}
              onClose={() => setOpenProjectIndex(null)}
              size="lg"
              title={openProjectIndex !== null ? projects[openProjectIndex].title : undefined}
              footer={
                openProjectIndex !== null ? (
                  <div className="flex items-center justify-end gap-2">
                    <Button color="secondary" onClick={() => setOpenProjectIndex(null)}>Close</Button>
                    <Button onClick={() => setOpenProjectIndex(null)}>Got it</Button>
                  </div>
                ) : undefined
              }
            >
              {openProjectIndex !== null && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <Badge 
                      color={projects[openProjectIndex].status === 'Launched' ? 'success' : projects[openProjectIndex].status === 'In Progress' ? 'warning' : 'gray'} 
                      size="sm"
                    >
                      {projects[openProjectIndex].status}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{projects[openProjectIndex].year}</span>
                  </div>
                  <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                    {projects[openProjectIndex].description}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">My Role & Approach</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {openProjectIndex === 0 && "Led cross-functional team of 7 engineers and designers. Applied RICE prioritization framework to balance user needs with technical feasibility. Conducted 15+ user interviews to understand pain points in data analysis workflows."}
                        {openProjectIndex === 1 && "Owned end-to-end product strategy from MVP to enterprise scale. Collaborated with 5 third-party partners for integrations. Used A/B testing to optimize user onboarding, reducing time-to-value by 40%."}
                        {openProjectIndex === 2 && "Designed automation framework from ground up. Applied Lean principles to identify highest-impact processes. Mentored team of 5 on agile methodologies, improving sprint velocity by 30%."}
                      </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Impact & Results</h4>
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">{projects[openProjectIndex].impact}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Skills & Methods</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[openProjectIndex].tags.map((t, i) => (
                        <Badge key={i} color="blue" size="sm">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        </div>
      </section>

      {/* Transition to Experience */}
      <section className="py-8 px-4 sm:px-6">
        <FadeIn className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            These projects represent key milestones in my career journey across three dynamic organizations
          </p>
        </FadeIn>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Career Journey
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              6+ years from automation engineer to product strategist - bridging design, engineering, and business to ship impact.
            </p>
            {/* Resume CTA removed as requested */}
          </FadeIn>

      {/* Selected Outcomes strip */}
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StaggerItem>
              <HoverScale>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 h-full min-h-[88px] flex flex-col justify-center">
        <div className="flex items-center gap-2 text-gray-900 dark:text-white"><ChartBarIcon className="w-5 h-5 flex-shrink-0" /><span className="font-semibold">$20M+</span></div>
        <div className="text-xs text-gray-600 dark:text-gray-400">ARR influenced (FY22–FY25)</div>
                </div>
              </HoverScale>
            </StaggerItem>
            <StaggerItem>
              <HoverScale>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 h-full min-h-[88px] flex flex-col justify-center">
        <div className="flex items-center gap-2 text-gray-900 dark:text-white"><UsersIcon className="w-5 h-5 flex-shrink-0" /><span className="font-semibold">500+ MAUs</span></div>
        <div className="text-xs text-gray-600 dark:text-gray-400">Across 50+ enterprise clients</div>
                </div>
              </HoverScale>
            </StaggerItem>
            <StaggerItem>
              <HoverScale>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 h-full min-h-[88px] flex flex-col justify-center">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white"><CpuChipIcon className="w-5 h-5 flex-shrink-0" /><span className="font-semibold">GenAI NLP</span></div>
        <div className="text-xs text-gray-600 dark:text-gray-400">60% faster time‑to‑insight</div>
                </div>
              </HoverScale>
            </StaggerItem>
            <StaggerItem>
              <HoverScale>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 h-full min-h-[88px] flex flex-col justify-center">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white"><RocketLaunchIcon className="w-5 h-5 flex-shrink-0" /><span className="font-semibold">85% faster</span></div>
        <div className="text-xs text-gray-600 dark:text-gray-400">Dashboard POC turnaround</div>
                </div>
              </HoverScale>
            </StaggerItem>
          </StaggerContainer>

          <div className="space-y-8">
            {/* Deloitte Studios */
            /* Updated to reflect BXD responsibilities */}
            <FadeIn delay={0.1}>
              <HoverScale scale={1.01}>
                <Card className="p-6 sm:p-8 border-2 border-blue-200 dark:border-blue-800 transition-shadow hover:shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Deloitte Studios (Deloitte USI)
                  </h3>
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    Business Experience Designer (Product Manager)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Driving experience-first digital solutions at the intersection of design, engineering, and business.
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 lg:text-right">
                  March 2025 – Present<br/>
                  India
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Key Contributions:</h5>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">•</span>Led Cloud Native Transformation as Functional SME & BA/BXD Lead for 6 medical-grade SaMD applications, reimagining donor and staff experience for 4M+ users across 150+ centers.</li>
                  <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">•</span>Defined vision & roadmap for self-service Medical Kiosks to modernize vital screening (BP, Pulse, Weight), reducing staff overhead and wait times.</li>
                  <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">•</span>Enabled device connectivity and personalized plasma donations, improving cost efficiency and collection output.</li>
                  <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">•</span>Accelerated concept validation using AI-assisted rapid prototyping, reducing stakeholder alignment cycles.</li>
                  <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">•</span>Partnered with engineering and leadership on GenAI prototypes and process improvement initiatives, driving practical applicability.</li>
                  <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">•</span>Translated cross-functional needs across creative, design, engineering, and QA - owned handoffs and delivered quality outcomes.</li>
                  <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">•</span>Co-owned agile ceremonies from discovery to delivery; crafted user stories with clear acceptance criteria.</li>
                  <li className="flex items-start"><span className="text-blue-500 mr-3 mt-1">•</span>Led backlog grooming, sprint planning, and vision refinement with business and technology stakeholders.</li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge color="blue" size="sm">Business Experience Design</Badge>
                <Badge color="blue" size="sm">Product Strategy</Badge>
                <Badge color="blue" size="sm">Design Thinking</Badge>
                <Badge color="blue" size="sm">Client Experience</Badge>
                <Badge color="blue" size="sm">Agile Ceremonies</Badge>
                <Badge color="blue" size="sm">Backlog Management</Badge>
                <Badge color="blue" size="sm">User Research</Badge>
                <Badge color="blue" size="sm">ML/AI Collaboration</Badge>
              </div>

              {/* BXD workflow grid */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 h-full">
                  <div className="flex items-center gap-2 mb-3 text-gray-900 dark:text-white">
                    <PaintBrushIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="font-semibold">Design & Research</span>
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5 pl-7">
                    <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-blue-500">Discovery, interviews, synthesis</li>
                    <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-blue-500">Experience-first flows, prototypes</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 h-full">
                  <div className="flex items-center gap-2 mb-3 text-gray-900 dark:text-white">
                    <Cog6ToothIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />
                    <span className="font-semibold">Engineering Partnership</span>
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5 pl-7">
                    <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-purple-500">Refinement, acceptance criteria</li>
                    <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-purple-500">Feasibility, ML/AI opportunities</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 h-full">
                  <div className="flex items-center gap-2 mb-3 text-gray-900 dark:text-white">
                    <BriefcaseIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="font-semibold">Business Outcomes</span>
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5 pl-7">
                    <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-green-500">Prioritization, trade-offs, GTM</li>
                    <li className="relative before:content-['•'] before:absolute before:-left-4 before:text-green-500">Adoption, measurable impact</li>
                  </ul>
                </div>
              </div>
            </Card>
          </HoverScale>
        </FadeIn>

            {/* Edgeverve */}
            <FadeIn delay={0.2}>
              <HoverScale scale={1.01}>
                <Card className="p-6 sm:p-8 transition-shadow hover:shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Edgeverve Systems Ltd (Infosys)
                  </h3>
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    Product Manager (Senior Analyst)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Owned end-to-end product lifecycle for AI-driven process optimization and observability tools used by 50+ enterprises
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 lg:text-right">
                  Jan 2022 – March 2025<br/>
                  Bengaluru, India
                </div>
              </div>
              
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements</h5>
        <ExpandableList
                  maxItems={3}
                  moreLabel="Show more achievements"
                  lessLabel="Show fewer"
                  items={[
          <div className="flex items-start text-sm sm:text-base" key="e1"><span className="text-green-500 mr-3 mt-1">•</span>Launched GenAI‑powered NLP; 60% faster time‑to‑insight (median vs. baseline).</div>,
          <div className="flex items-start text-sm sm:text-base" key="e2"><span className="text-green-500 mr-3 mt-1">•</span>Led 7‑person squad; shipped 5 features incl. Kibana dashboards → 85% faster POC turnaround.</div>,
          <div className="flex items-start text-sm sm:text-base" key="e3"><span className="text-green-500 mr-3 mt-1">•</span>Co‑developed 5 partner integrations; expanded product surface and use cases.</div>,
          <div className="flex items-start text-sm sm:text-base" key="e4"><span className="text-green-500 mr-3 mt-1">•</span>Influenced $20M+ ARR via RFI/RFP authorship and deal support.</div>,
          <div className="flex items-start text-sm sm:text-base" key="e5"><span className="text-green-500 mr-3 mt-1">•</span>Owned product KPIs (activation, TTV); instrumented Mixpanel and delivered self‑serve dashboards.</div>,
          <div className="flex items-start text-sm sm:text-base" key="e6"><span className="text-green-500 mr-3 mt-1">•</span>Analyst demos (Everest, Gartner, Forrester, IDC) → leadership mentions in 4 reports.</div>,
          <div className="flex items-start text-sm sm:text-base" key="e7"><span className="text-green-500 mr-3 mt-1">•</span>A/B tested onboarding; ~40% higher activation and ~25% faster time‑to‑value.</div>,
                  ]}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge color="gray" size="sm">AI/ML</Badge>
                <Badge color="gray" size="sm">Gen AI</Badge>
                <Badge color="gray" size="sm">NLP</Badge>
                <Badge color="gray" size="sm">Kibana</Badge>
                <Badge color="gray" size="sm">Task Mining</Badge>
                <Badge color="gray" size="sm">Process Optimization</Badge>
                <Badge color="gray" size="sm">RICE Framework</Badge>
                <Badge color="gray" size="sm">A/B Testing</Badge>
              </div>
            </Card>
          </HoverScale>
        </FadeIn>

            {/* TCS */}
            <FadeIn delay={0.3}>
              <HoverScale scale={1.01}>
                <Card className="p-6 sm:p-8 transition-shadow hover:shadow-lg">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Tata Consultancy Services (TCS)
                  </h3>
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    Process Improvement Lead (System Engineer)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Led automation initiatives and process improvements for medical manufacturing clients, delivering significant cost savings
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 lg:text-right">
                  Jun 2019 – Jan 2022<br/>
                  Bengaluru, India
                </div>
              </div>
              
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Key Achievements</h5>
        <ExpandableList
                  maxItems={3}
                  moreLabel="Show more achievements"
                  lessLabel="Show fewer"
                  items={[
          <div className="flex items-start text-sm sm:text-base" key="t1"><span className="text-green-500 mr-3 mt-1">•</span>Deployed 7 RPA/Python automations → $250K+ annual savings for a medical manufacturing client.</div>,
          <div className="flex items-start text-sm sm:text-base" key="t2"><span className="text-green-500 mr-3 mt-1">•</span>VBA reporting tool across 5 systems → ~80% recall reduction and fewer defects.</div>,
          <div className="flex items-start text-sm sm:text-base" key="t3"><span className="text-green-500 mr-3 mt-1">•</span>Productized automation toolkit adopted across operations; standardized UAT lifted CSAT to 95% and enabled a 2‑year extension.</div>,
          <div className="flex items-start text-sm sm:text-base" key="t4"><span className="text-green-500 mr-3 mt-1">•</span>Reusable RPA framework → ~40% faster rollout lead times across product lines.</div>,
          <div className="flex items-start text-sm sm:text-base" key="t5"><span className="text-green-500 mr-3 mt-1">•</span>Innovation Spark Award (top 5% of 450K) for client‑ready automation.</div>,
          <div className="flex items-start text-sm sm:text-base" key="t6"><span className="text-green-500 mr-3 mt-1">•</span>Mentored 5; ~30% faster sprint velocity.</div>,
                  ]}
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge color="gray" size="sm">RPA</Badge>
                <Badge color="gray" size="sm">Python</Badge>
                <Badge color="gray" size="sm">VBA</Badge>
                <Badge color="gray" size="sm">Process Automation</Badge>
                <Badge color="gray" size="sm">FDA Compliance</Badge>
                <Badge color="gray" size="sm">Manufacturing</Badge>
                <Badge color="gray" size="sm">Team Leadership</Badge>
                <Badge color="gray" size="sm">UAT</Badge>
              </div>
            </Card>
          </HoverScale>
        </FadeIn>
          </div>
        </div>
      </section>

      {/* Photography Transition */}
      <section className="py-12 px-4 sm:px-6">
        <FadeIn className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Beyond Product Management
          </h2>
          <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              When I'm not building products, I find creativity and perspective through photography. 
              This passion for capturing moments and finding beauty in everyday experiences directly influences 
              how I approach product design - always looking for the story behind the user and the emotion in the interaction.
            </p>
            <p>
              Photography teaches patience, composition, and the importance of perspective - skills that translate 
              beautifully into product management. Just as a great photo tells a story in a single frame, 
              a great product solves a problem in the most elegant way possible.
            </p>
          </div>
          <motion.div 
            className="mt-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              color="secondary" 
              size="lg" 
              className="group"
              onClick={() => window.open('/photography', '_blank')}
            >
              <div className="flex items-center justify-center">
                View Photography Gallery
                <ArrowUpRight className="w-4 h-4 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
              </div>
            </Button>
          </motion.div>
        </FadeIn>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
        <FadeIn className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
            Let's Drive Innovation Together
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Open to discussing AI/ML product opportunities, enterprise SaaS innovations, 
            or collaboration on products that deliver measurable business impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button 
                size="lg" 
                className="w-full sm:w-auto min-w-[160px] px-6"
                onClick={() => window.open('mailto:jaimsanghavi@gmail.com?subject=Collaboration Opportunity&body=Hi Jai,%0D%0A%0D%0AI would like to discuss...', '_self')}
              >
                <div className="flex items-center justify-center">
                  Email Me
                  <ArrowRight className="w-4 h-4 ml-3 flex-shrink-0" />
                </div>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button 
                color="secondary" 
                size="lg" 
                className="w-full sm:w-auto min-w-[160px] px-6"
                onClick={() => window.open('https://www.linkedin.com/in/jaimsanghavi', '_blank')}
              >
                <div className="flex items-center justify-center">
                  LinkedIn
                  <ArrowUpRight className="w-4 h-4 ml-3 flex-shrink-0" />
                </div>
              </Button>
            </motion.div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="py-6 sm:py-8 px-4 sm:px-6 border-t border-gray-200 dark:border-gray-800"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
            © 2025 Jai M Sanghavi. Built with Next.js, Tailwind CSS, and Untitled UI.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
