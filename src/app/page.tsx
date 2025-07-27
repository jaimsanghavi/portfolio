'use client';

import { useState } from 'react';
import { Badge } from '@/components/base/badges/badges';
import { Button } from '@/components/base/buttons/button';
import { Card, ThemeToggle } from '@/components';
import { ArrowUpRight, ArrowRight, Star01, Menu01, X } from '@untitledui/icons';
import { 
  SparklesIcon, 
  CpuChipIcon, 
  RocketLaunchIcon,
  LightBulbIcon,
  ChartBarIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

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
  { name: "AI/ML Solutions", level: "5+ Years", icon: CpuChipIcon },
  { name: "Agile & Scrum", level: "SAFe, Kanban, FDD", icon: ChartBarIcon },
  { name: "Data Analytics", level: "SQL, Python, Tableau", icon: ChartBarIcon },
  { name: "Enterprise SaaS", level: "50+ Clients", icon: UsersIcon },
  { name: "Go-to-Market", level: "Expert", icon: LightBulbIcon }
];

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 flex-shrink-0">
              <img 
                src="/Jai_ProfilePic.jpg" 
                alt="Jai M Sanghavi"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">Jai M Sanghavi</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#work" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Work
            </a>
            <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              About
            </a>
            <a href="/photography" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Photography
            </a>
            <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Contact
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              color="secondary"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 p-0"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu01 className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
            <div className="px-4 py-2 space-y-1">
              <a
                href="#work"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </a>
              <a
                href="#about"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/photography"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Photography
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6 flex-wrap gap-y-2">
                <Badge color="brand" size="sm">
                  <SparklesIcon className="w-3 h-3 mr-1" />
                  CSPO® Certified
                </Badge>
                <Badge color="gray" size="sm">
                  5+ Years Experience
                </Badge>
                <Badge color="success" size="sm">
                  AI/ML Expert
                </Badge>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Building{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  enterprise AI solutions
                </span>{' '}
                that drive measurable impact
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Certified Scrum Product Owner with 5+ years driving AI/ML product strategy for enterprise SaaS. 
                Launched features that increased user adoption by 50%+, reduced time-to-insight by 60%, 
                and delivered $20M+ in ARR across 500+ users.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  className="group w-full sm:w-auto min-w-[180px] px-6"
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <div className="flex items-center justify-center">
                    View My Work
                    <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </div>
                </Button>
                <Button 
                  color="secondary" 
                  size="lg" 
                  className="w-full sm:w-auto min-w-[180px] px-6"
                  onClick={() => alert('Resume download will be available soon. Please contact via email for now.')}
                >
                  <div className="flex items-center justify-center">
                    Download Resume
                    <ArrowUpRight className="w-4 h-4 ml-3 flex-shrink-0" />
                  </div>
                </Button>
              </div>
            </div>
            
            <div className="relative mt-12 lg:mt-0">
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Current Impact
                    </span>
                    <Star01 className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">$20M+</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Annual Recurring Revenue</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Enterprise Users</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Enterprise Clients</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">60%</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Faster Time-to-Insight</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements for visual interest - hidden on mobile */}
              <div className="hidden sm:flex absolute -top-6 -right-6 w-16 sm:w-20 h-16 sm:h-20 bg-blue-100 dark:bg-blue-900/20 rounded-2xl items-center justify-center border border-gray-200 dark:border-gray-700">
                <CpuChipIcon className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="hidden sm:flex absolute -bottom-4 -left-4 w-14 sm:w-16 h-14 sm:h-16 bg-purple-100 dark:bg-purple-900/20 rounded-xl items-center justify-center border border-gray-200 dark:border-gray-700">
                <SparklesIcon className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="work" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Key AI/ML products and enterprise solutions that delivered measurable business impact 
              and drove significant cost savings across multiple industries.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge 
                      color={project.status === 'Launched' ? 'success' : project.status === 'In Progress' ? 'warning' : 'gray'} 
                      size="sm"
                    >
                      {project.status}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {project.impact}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} color="gray" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Core Competencies
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Deep expertise in product management, AI/ML solutions, and agile methodologies 
              built through hands-on experience with enterprise SaaS platforms.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <skill.icon className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">{skill.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{skill.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Work Experience
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Professional journey spanning enterprise product management, AI/ML solutions, 
              and process optimization across leading technology companies.
            </p>
          </div>

          <div className="space-y-8">
            {/* Deloitte Studios (Current Role - Placeholder) */}
            <Card className="p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      Deloitte Studios (Deloitte USI)
                    </h3>
                    <Badge color="success" size="sm">Current</Badge>
                  </div>
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    [Position Title - To be updated]
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    [Role description and key responsibilities to be added]
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 lg:text-right">
                  [Start Date] – Present<br/>
                  [Location]
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Key Achievements:</h5>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    [Achievement 1 - To be added]
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    [Achievement 2 - To be added]
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    [Achievement 3 - To be added]
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge color="gray" size="sm">[Technology 1]</Badge>
                <Badge color="gray" size="sm">[Technology 2]</Badge>
                <Badge color="gray" size="sm">[Technology 3]</Badge>
              </div>
            </Card>

            {/* Deloitte Studios */}
            <Card className="p-6 sm:p-8 border-2 border-blue-200 dark:border-blue-800">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Deloitte Studios (Deloitte USI)
                  </h3>
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    Business Experience Designer (Product Manager)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Driving innovative business experiences and product strategy within Deloitte's cutting-edge design studio
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 lg:text-right">
                  March 2025 – Present<br/>
                  India
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Current Role:</h5>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    Leading business experience design initiatives to transform client engagement and product experiences
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    Collaborating with cross-functional teams to deliver innovative solutions that bridge design and business strategy
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    Applying product management expertise within Deloitte's design-thinking methodology framework
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge color="blue" size="sm">Business Experience Design</Badge>
                <Badge color="blue" size="sm">Product Strategy</Badge>
                <Badge color="blue" size="sm">Design Thinking</Badge>
                <Badge color="blue" size="sm">Client Experience</Badge>
              </div>
            </Card>

            {/* Edgeverve */}
            <Card className="p-6 sm:p-8">
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
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Key Achievements:</h5>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Designed and launched Gen AI-powered NLP feature that automated data analysis, reducing user time-to-analysis by 60%
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Managed 7-member cross-functional team to deliver 5 major features, including custom Kibana dashboards that reduced POC turnaround time by 85%
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Collaborated with 5 third-party partners to co-develop integrations, expanding product functionality
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Authored RFI/RFP responses that won 3 enterprise deals in BFSI and retail verticals, totaling $20M+ in ARR
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Presented product demos to Everest, Gartner, Forrester, and IDC analysts, contributing to leadership positioning in 4 industry reports
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Conducted A/B testing on UI/UX changes, improving user satisfaction scores by 40% and reducing onboarding time by 25%
                  </li>
                </ul>
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

            {/* TCS */}
            <Card className="p-6 sm:p-8">
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
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Key Achievements:</h5>
                <ul className="space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Designed and deployed 7 RPA/Python-based automations for medical manufacturing client, leading to $250K+ annual savings
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Built VBA-powered reporting tool that harmonized data from 5 systems, reducing product recall rates by 80%
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Won TCS's "Innovation Spark Award" (top 5% of 450K employees) for translating technical automation into client-ready product
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Authored reusable framework for FDA compliant reporting, cutting implementation time for subsequent clients by 40%
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Mentored team of 5, improving sprint velocity by 30% and leading to increased project success
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">•</span>
                    Led UAT for automation solutions, achieving 95% client satisfaction and securing 2-year contract extension
                  </li>
                </ul>
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
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
            About Me
          </h2>
          <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 sm:space-y-6">
            <p>
              I'm a Certified Scrum Product Owner (CSPO®) with 5+ years of experience driving AI/ML product strategy 
              for enterprise SaaS solutions. During my tenure at Edgeverve, I owned the end-to-end product lifecycle for AI-driven 
              process optimization tools used by 50+ enterprises, delivering features that increased user adoption by 50%+ 
              and reduced time-to-insight by 60%.
            </p>
            <p>
              My journey started at TCS where I designed RPA automations that delivered $250K+ in annual savings. 
                                  I&apos;ve been recognized with TCS&apos;s &quot;Innovation Spark Award&quot; (top 5% of 450K employees) and hold an Indian patent 
              for innovative engineering solutions. I specialize in translating complex technical capabilities into 
              market-ready products that deliver measurable ROI.
            </p>
            <p>
              <strong>Current Focus:</strong> Business Experience Designer (Product Manager) at Deloitte Studios (Deloitte USI) • India<br/>
              <strong>Contact:</strong> jaimsanghavi@gmail.com • +91 9535156876 • 
              <a href="https://www.linkedin.com/in/jaimsanghavi" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                LinkedIn Profile
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
            Let's Drive Innovation Together
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Open to discussing AI/ML product opportunities, enterprise SaaS innovations, 
            or collaboration on products that deliver measurable business impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-4 sm:space-y-0">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
            © 2025 Jai M Sanghavi. Built with Next.js, Tailwind CSS, and Untitled UI.
          </p>
        </div>
      </footer>
    </div>
  );
}
