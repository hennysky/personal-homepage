import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  ArrowUpRight,
  Download,
  Copy,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles,
  GraduationCap,
  MessageSquareQuote,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  CheckCircle2
} from 'lucide-react';
import { resumeData } from './data/resume';
import type { ProjectData } from './data/resume';

export default function AppV1({ onSwitchVersion }: { onSwitchVersion?: (v: '1.0' | '2.0') => void }) {
  // Theme state (default to dark for sleek high-taste contrast)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Language state
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  // Selected project for modal
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);

  // Lightbox image
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Contact modal state
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Category filter for projects
  const [projectFilter, setProjectFilter] = useState<'all' | 'b2b' | 'c2c' | 'ai'>('all');



  // Real-time local clock (HH:mm:ss CST)
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('zh-CN', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme synchronization
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Translations
  const t = useMemo(() => {
    const zh = {
      nav: {
        works: '精选案例',
        capabilities: '架构体系',
        experience: '职业战绩',
        endorsements: '业界评价',
        contact: '联系合作',
      },
      status: 'AI 产品经理 · 完整职业履历',
      name: '尹启钧',
      role: 'AI 产品经理 · 人机交互与数字化中枢',
      headline: '把大模型推理做进业务卡点，以人机交互美学与全栈能力打造扎实产品。',
      subtext:
        '多年深耕 B 端决策大屏、数字化中台与 AI 原生应用落地。既从第一线拆解业务领域逻辑与状态机，也熟练运用 Cursor/Claude 亲自跑通生产级高保真代码。',
      ctaPrimary: '交流探讨 / 微信沟通',
      ctaResume: '下载 PDF 完整简历',
      worksTitle: 'Selected Works',
      worksSubtitle: '从业务卡点到工程闭环 · 4 项代表性实战案例',
      filterAll: '全部项目 (4)',
      filterB2B: '数据决策 / 19:5大屏',
      filterC2C: '多端交互 / 业务中台',
      filterAI: 'AI 原生 / 智能预警',
      viewCase: '查看案例细节',
      capabilitiesTitle: 'Product Architecture & Capabilities',
      capabilitiesSubtitle: 'AI 产品方法论与端到端交付体系',
      experienceTitle: 'Career Trajectory',
      experienceSubtitle: '扎根业务一线的产研进阶与实战战绩',
      testimonialsTitle: 'Peer Endorsements',
      testimonialsSubtitle: '来自业务总监、技术负责人与公司 CEO 的真实合作评价',
      educationTitle: 'Education & Credentials',
      dialogueTitle: '欢迎交流探讨 AI 产品与人机交互',
      dialogueSub: '平时深度探索大模型 Agent 业务落地、触觉微交互与数字化决策中枢。欢迎随时交流探讨。',
      wechatTitle: '微信沟通',
      emailTitle: '电子邮箱',
      phoneTitle: '联系电话',
      locationTitle: '工作常驻地',
      locationValue: '中国 · 郑州 / 支持远程',
      modalClose: '关闭',
      results: '关键业务成效',
      contributions: '核心产品贡献',
      solution: '解决方案拆解',
    };

    const en = {
      nav: {
        works: 'Works',
        capabilities: 'Capabilities',
        experience: 'Experience',
        endorsements: 'Reviews',
        contact: 'Contact',
      },
      status: 'Personal Engineering Portfolio',
      name: 'Qijun Yin',
      role: 'Web Developer & Frontend Builder',
      headline: 'Architecting complex domains into intuitive interfaces & high-performance visualizations.',
      subtext:
        'Years of experience building enterprise web applications, 19:5 data dashboards, and responsive design systems with React, TypeScript, and Vue 3.',
      ctaPrimary: 'Get in Touch / WeChat',
      ctaResume: 'Download Resume (PDF)',
      worksTitle: 'Selected Works',
      worksSubtitle: 'From UI design to code delivery · 4 Flagship cases',
      filterAll: 'All Works (4)',
      filterB2B: 'Data Viz / Dashboard',
      filterC2C: 'UI Components',
      filterAI: 'Graph & Topology',
      viewCase: 'View Case Study',
      capabilitiesTitle: 'Technical Architecture & Focus',
      capabilitiesSubtitle: 'Frontend engineering principles and design system capabilities',
      experienceTitle: 'Career Trajectory',
      experienceSubtitle: 'Battle-tested milestones in web engineering',
      testimonialsTitle: 'Peer Endorsements',
      testimonialsSubtitle: 'Feedback from Tech Leads, Designers, and Project Partners',
      educationTitle: 'Education & Credentials',
      dialogueTitle: "Let's connect and discuss web tech",
      dialogueSub:
        'Always happy to exchange thoughts on frontend engineering, data visualizations, and interface design.',
      wechatTitle: 'WeChat',
      emailTitle: 'Email',
      phoneTitle: 'Phone',
      locationTitle: 'Base Location',
      locationValue: 'Zhengzhou, China / Remote',
      modalClose: 'Close',
      results: 'Key Measurable Results',
      contributions: 'Core Contributions',
      solution: 'Architecture & Solution',
    };

    return lang === 'zh' ? zh : en;
  }, [lang]);

  // Primary project visual cards mapping with high-impact visuals
  const projectShowcaseImages: Record<string, string> = {
    dashboards: '/assets/projects/dashboards/dash_finance.png',
    haiyi_douyin: '/assets/projects/haiyi_douyin/douyin_dashboard.jpg',
    edu_platform: '/assets/projects/edu_platform/edu_admin_dashboard.png',
    audit_project: '/assets/projects/audit_project/audit_process_logic.png',
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return resumeData.projects.filter(project => {
      if (projectFilter === 'all') return true;
      if (projectFilter === 'b2b') {
        return project.folder === 'dashboards' || project.folder === 'haiyi_douyin';
      }
      if (projectFilter === 'c2c') {
        return project.folder === 'edu_platform';
      }
      if (projectFilter === 'ai') {
        return project.folder === 'audit_project';
      }
      return true;
    });
  }, [projectFilter]);

  return (
    <div className="min-h-screen text-body bg-bg antialiased selection:bg-blue-500/20 selection:text-heading">
      {/* Subtle ambient background glow */}
      <div className="ambient-glow" />

      {/* Main Container - Split Screen on Desktop (Elaya structure) */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ════════════════════════════════════════════════════════════
              LEFT COLUMN: STICKY PROFILE & NAVIGATION (Elaya anchor card)
             ════════════════════════════════════════════════════════════ */}
          <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8 z-30">
            <div className="rounded-[28px] border border-black/[0.08] dark:border-white/[0.08] bg-surface p-6 sm:p-7 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] relative overflow-hidden transition-all duration-300">
              
              {/* Aesthetic dot grid in the bottom-right corner (Elaya touch) */}
              <div className="dot-grid absolute bottom-0 right-0 w-44 h-44 opacity-25 dark:opacity-10 pointer-events-none rounded-br-[28px]" />

              {/* ── Card Header: Navigation & Controls ── */}
              <div className="flex items-center justify-between pb-6 border-b border-black/[0.06] dark:border-white/[0.06] relative z-10">
                {/* Navigation Pills */}
                <nav className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                  <a
                    href="#works"
                    className="px-2.5 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-heading hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {t.nav.works}
                  </a>
                  <a
                    href="#capabilities"
                    className="px-2.5 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-heading hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {t.nav.capabilities}
                  </a>
                  <a
                    href="#experience"
                    className="px-2.5 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-heading hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {t.nav.experience}
                  </a>
                  <a
                    href="#contact"
                    className="px-2.5 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-heading hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {t.nav.contact}
                  </a>
                </nav>

                {/* Controls: Version, Theme & Language */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {onSwitchVersion && (
                    <button
                      onClick={() => onSwitchVersion('2.0')}
                      className="h-8 px-2.5 rounded-full text-xs font-mono font-medium border border-blue-500/30 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors flex items-center gap-1"
                      title="切换至 2.0 创新设计官网版"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>2.0 官网</span>
                    </button>
                  )}

                  <button
                    onClick={() => setLang(prev => (prev === 'zh' ? 'en' : 'zh'))}
                    className="h-8 px-2.5 rounded-full text-xs font-mono font-medium border border-black/[0.08] dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1 text-heading"
                    title="Toggle Language / 切换语言"
                  >
                    <Globe className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{lang === 'zh' ? 'EN' : '中'}</span>
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="h-8 w-8 rounded-full border border-black/[0.08] dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center text-heading"
                    title="Toggle Theme / 切换主题"
                  >
                    {theme === 'light' ? (
                      <Moon className="w-3.5 h-3.5 text-neutral-600" />
                    ) : (
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* ── Card Body: Bio, Status & Authority Statement ── */}
              <div className="py-7 flex flex-col gap-5 relative z-10">
                {/* Available Status Pill with pulsing beacon & star */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-black/[0.04] dark:border-white/[0.06] w-fit">
                  <span className="text-amber-500 font-bold text-xs">✴</span>
                  <span>{t.status}</span>
                </div>

                {/* Avatar and Identity */}
                <div className="flex items-center gap-4">
                  <img
                    src="/assets/avatar.webp"
                    alt="尹启钧"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-neutral-100 dark:border-neutral-800 shadow-md"
                  />
                  <div>
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-heading">
                      {t.name}
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Bold Authority Headline */}
                <h2 className="text-xl sm:text-2xl lg:text-[22px] font-semibold text-heading tracking-tight leading-[1.3] text-balance">
                  {t.headline}
                </h2>

                {/* Value Subtext */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {t.subtext}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5 pt-2">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full h-11 px-5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium text-sm flex items-center justify-between hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-sm group"
                  >
                    <span>{t.ctaPrimary}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="w-full h-11 px-5 rounded-full border border-black/[0.1] dark:border-white/[0.1] text-heading font-medium text-sm flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <span>{t.ctaResume}</span>
                    <Download className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>
              </div>

              {/* ── Card Footer: Contact Info & Live Local Time Clock ── */}
              <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col gap-3 relative z-10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-medium">{t.emailTitle}</span>
                  <button
                    onClick={() => copyToClipboard('yinqijun@aliyun.com', 'email')}
                    className="text-heading font-mono hover:text-blue-500 flex items-center gap-1 group"
                  >
                    <span>yinqijun@aliyun.com</span>
                    {copiedField === 'email' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-medium">{t.phoneTitle}</span>
                  <button
                    onClick={() => copyToClipboard('15093051996', 'phone')}
                    className="text-heading font-mono hover:text-blue-500 flex items-center gap-1 group"
                  >
                    <span>150-9305-1996</span>
                    {copiedField === 'phone' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-black/[0.04] dark:border-white/[0.04]">
                  <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{t.locationValue}</span>
                  </div>

                  {/* Real-time Ticking Monospace Clock (Elaya aesthetic detail) */}
                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/90 px-2 py-0.5 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{currentTime || '18:00:00'}</span>
                    <span className="text-[10px] text-neutral-400 font-normal">CST</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ════════════════════════════════════════════════════════════
              RIGHT COLUMN: IMMERSIVE WORK & VALUE STREAM
             ════════════════════════════════════════════════════════════ */}
          <main className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10 lg:gap-14">
            
            {/* ──────────────────────────────────────────────────────────
                SECTION 1: SELECTED WORKS (2-Column Visual Gallery)
               ────────────────────────────────────────────────────────── */}
            <section id="works" className="flex flex-col gap-6 scroll-mt-8">
              {/* Section Header & Filters */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-black/[0.06] dark:border-white/[0.06]">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-heading">
                    {t.worksTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    {t.worksSubtitle}
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: t.filterAll },
                    { id: 'b2b', label: t.filterB2B },
                    { id: 'c2c', label: t.filterC2C },
                    { id: 'ai', label: t.filterAI },
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setProjectFilter(f.id as any)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        projectFilter === f.id
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                          : 'bg-surface text-neutral-600 dark:text-neutral-300 border border-black/[0.06] dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2-Column Responsive Grid (All 8 Projects Rendered) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                {filteredProjects.map((project) => {
                  const previewImg =
                    projectShowcaseImages[project.folder] ||
                    project.scenes?.[0]?.images?.[0] ||
                    '/assets/projects/dashboards/dash_finance.png';

                  return (
                    <div
                      key={project.title}
                      onClick={() => {
                        setActiveProject(project);
                        setActiveSceneIndex(0);
                      }}
                      className="group rounded-[22px] overflow-hidden bg-surface border border-black/[0.07] dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                    >
                      {/* Image Frame */}
                      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                        <img
                          src={previewImg}
                          alt={project.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Gradient Vignette on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Category Floating Pill */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-900/85 dark:bg-black/85 text-white backdrop-blur-md border border-white/10 shadow-sm">
                          {project.tag}
                        </div>

                        {/* Top Right Action Arrow */}
                        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 dark:bg-neutral-900/90 text-heading backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Card Content Footer */}
                      <div className="p-5 flex flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-heading tracking-tight text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </h3>
                        </div>

                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                          {project.shortDesc.replace(/\*\*/g, '')}
                        </p>

                        {/* Labels / Metrics */}
                        <div className="flex items-center gap-1.5 flex-wrap pt-1">
                          {(lang === 'zh' ? project.labels.zh : project.labels.en)
                            .slice(0, 3)
                            .map((lbl, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                              >
                                {lbl}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────
                SECTION 2: CORE CAPABILITIES & ARCHITECTURAL OFFERINGS
                (Directly mirroring Elaya's White/Black tier cards + Toggle)
               ────────────────────────────────────────────────────────── */}
            <section id="capabilities" className="flex flex-col gap-6 scroll-mt-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-heading">
                  {t.capabilitiesTitle}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {t.capabilitiesSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* ── CARD A: Modern Web & Design System ── */}
                <div className="rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] bg-surface p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 w-fit">
                        <Layers className="w-3.5 h-3.5" />
                        <span>现代 Web · 设计系统</span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">工程规范</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-heading tracking-tight">
                        现代 Web 前端与组件设计系统
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                        探索 React 19、Vue 3 与 TypeScript 的现代组件库设计，建立一致、易用且无障碍的交互规范。
                      </p>
                    </div>

                    <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col gap-2.5">
                      {[
                        '基于 CSS Variables 与 Tailwind 的统一 Design Tokens',
                        '兼顾触控与键鼠操作的响应式多端自适应组件',
                        '严谨的 TypeScript 严格模式与接口契约约束',
                        '模块化目录规范、自定义 Hooks 与状态流转分层',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <button
                      onClick={() => setProjectFilter('c2c')}
                      className="w-full h-10 px-4 rounded-full border border-black/[0.1] dark:border-white/[0.1] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-heading text-xs font-medium flex items-center justify-between transition-colors"
                    >
                      <span>筛选查看组件与界面案例</span>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </button>
                  </div>
                </div>

                {/* ── CARD B: Data Visualization & Performance ── */}
                <div className="rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] bg-neutral-900 text-white dark:bg-[#151923] p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 border border-white/10 w-fit">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>数据可视化 · 性能调优</span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">持续探索</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white tracking-tight">
                        数据可视化大屏与图元渲染实践
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 leading-relaxed">
                        基于 Canvas、SVG 与现代图表库构建高信息密度看板，优化大数据量下的交互流畅度与重绘开销。
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
                      {[
                        '19:5 等黄金分割比例的数据大屏自适应排版',
                        '柱状图、趋势折线与拓扑节点的高保真绘制',
                        '局部重绘、虚拟滚动与防抖节流渲染性能优化',
                        '视觉降噪设计，3 秒内直观呈现核心指标变动',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 relative z-10">
                    <button
                      onClick={() => setProjectFilter('b2b')}
                      className="w-full h-10 px-4 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-medium flex items-center justify-between transition-colors shadow-sm"
                    >
                      <span>探索可视化大屏实践案例</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────
                SECTION 3: CAREER TRAJECTORY & EXPERIENCE (Timeline)
               ────────────────────────────────────────────────────────── */}
            <section id="experience" className="flex flex-col gap-6 scroll-mt-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-heading">
                  {t.experienceTitle}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {t.experienceSubtitle}
                </p>
              </div>

              <div className="rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] bg-surface p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
                {resumeData.experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col gap-3 ${
                      idx !== resumeData.experience.length - 1
                        ? 'pb-6 border-b border-black/[0.06] dark:border-white/[0.06]'
                        : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                      <div>
                        <h3 className="font-semibold text-heading text-base tracking-tight">
                          {exp.company}
                        </h3>
                        <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                          {exp.role}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <ul className="flex flex-col gap-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-1">
                      {exp.highlights.map((h: string, hIdx: number) => {
                        const cleanText = h.replace(/\*\*/g, '');
                        return (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-neutral-400 mt-1">•</span>
                            <span>{cleanText}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────
                SECTION 4: PEER ENDORSEMENTS / TESTIMONIALS
               ────────────────────────────────────────────────────────── */}
            <section id="testimonials" className="flex flex-col gap-6 scroll-mt-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-heading">
                  {t.testimonialsTitle}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {t.testimonialsSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeData.testimonials.map((test, idx) => (
                  <div
                    key={idx}
                    className="rounded-[20px] border border-black/[0.07] dark:border-white/[0.08] bg-surface p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-sm"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                          {test.tag}
                        </span>
                        <MessageSquareQuote className="w-5 h-5 text-neutral-300 dark:text-neutral-600" />
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                        "{test.content}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-xs">
                      <span className="font-semibold text-heading">{test.name}</span>
                      <span className="text-neutral-400 text-[11px]">{test.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────
                SECTION 5: EDUCATION & SKILL MATRIX
               ────────────────────────────────────────────────────────── */}
            <section className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-heading">
                  {t.educationTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeData.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="rounded-[20px] border border-black/[0.07] dark:border-white/[0.08] bg-surface p-5 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-heading">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-heading text-sm">{edu.school}</h4>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {edu.degree} · {edu.major} ({edu.type})
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">{edu.period}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────
                SECTION 6: LET'S TALK / FOOTER DIALOGUE (Elaya style)
               ────────────────────────────────────────────────────────── */}
            <section id="contact" className="rounded-[28px] border border-black/[0.08] dark:border-white/[0.08] bg-surface p-7 sm:p-9 flex flex-col gap-6 shadow-sm relative overflow-hidden">
              <div className="dot-grid absolute top-0 right-0 w-48 h-48 opacity-25 dark:opacity-10 pointer-events-none" />

              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Get in Touch
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-heading tracking-tight">
                  {t.dialogueTitle}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
                  {t.dialogueSub}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 relative z-10">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="h-11 px-6 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium text-sm flex items-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>{t.ctaPrimary}</span>
                </button>

                <a
                  href="mailto:yinqijun@aliyun.com"
                  className="h-11 px-5 rounded-full border border-black/[0.1] dark:border-white/[0.1] text-heading font-medium text-sm flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <span>直发邮件</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>

                <button
                  onClick={() => copyToClipboard('15093051996', 'wechat')}
                  className="h-11 px-5 rounded-full border border-black/[0.1] dark:border-white/[0.1] text-heading font-medium text-sm flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <span>复制微信号</span>
                  {copiedField === 'wechat' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                </button>
              </div>

              {/* ── Compliant Henan ICP Filing Footer & MIIT Statutory Link ── */}
              <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 relative z-10">
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
                  <span>© {new Date().getFullYear()} 尹启钧 (Qijun Yin). 个人学习与技术分享博客.</span>
                  <span className="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
                  <a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-500 dark:text-neutral-400 hover:text-heading hover:underline transition-colors flex items-center gap-1 font-mono"
                  >
                    <span>豫ICP备2026000001号-1</span>
                  </a>
                </div>
                <span className="font-mono text-neutral-400">Geist Design System · Zhengzhou</span>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          PROJECT CASE STUDY MODAL (Deep Dive)
         ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-[28px] border border-black/[0.08] dark:border-white/[0.1] bg-surface text-body shadow-2xl flex flex-col p-6 sm:p-8"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 h-9 w-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-heading transition-colors"
                title={t.modalClose}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex flex-col gap-2 pb-5 border-b border-black/[0.06] dark:border-white/[0.06] pr-10">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50">
                    {activeProject.tag}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {activeProject.category.toUpperCase()}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-heading">
                  {activeProject.title}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {activeProject.shortDesc.replace(/\*\*/g, '')}
                </p>
              </div>

              {/* Scene Tabs if available */}
              {activeProject.scenes && activeProject.scenes.length > 1 && (
                <div className="flex items-center gap-2 pt-4 pb-2 overflow-x-auto no-scrollbar">
                  {activeProject.scenes.map((sc, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => setActiveSceneIndex(sIdx)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-colors ${
                        activeSceneIndex === sIdx
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                      }`}
                    >
                      {sc.title}
                    </button>
                  ))}
                </div>
              )}

              {/* Active Scene Images Carousel / Grid */}
              {activeProject.scenes && activeProject.scenes[activeSceneIndex] && (
                <div className="flex flex-col gap-3 py-4">
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {activeProject.scenes[activeSceneIndex].description}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeProject.scenes[activeSceneIndex].images.slice(0, 4).map((img, iIdx) => (
                      <div
                        key={iIdx}
                        onClick={() => setLightboxImg(img)}
                        className="relative aspect-video rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-black/[0.06] dark:border-white/[0.08] cursor-zoom-in group"
                      >
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                          点击放大预览
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deep Dive: Contributions & Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                {/* Contributions */}
                <div className="flex flex-col gap-2.5">
                  <h4 className="text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider">
                    {t.contributions}
                  </h4>
                  <div className="flex flex-col gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {activeProject.details.contributions.map((c, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Measurable Results */}
                <div className="flex flex-col gap-2.5">
                  <h4 className="text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider">
                    {t.results}
                  </h4>
                  <div className="flex flex-col gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {activeProject.details.results.map((r, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════
          IMAGE LIGHTBOX (Full Screen View)
         ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxImg && (
          <div
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={lightboxImg}
              alt=""
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain border border-white/10"
            />
          </div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════
          CONTACT MODAL (Direct Connect)
         ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-[28px] border border-black/[0.08] dark:border-white/[0.1] bg-surface p-6 sm:p-7 shadow-2xl flex flex-col gap-5 text-body"
            >
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-heading"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-heading tracking-tight">
                  {t.ctaPrimary}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  随时欢迎探讨产品架构、数字化转型及全栈研发合作。
                </p>
              </div>

              <div className="flex flex-col gap-2.5">
                <div className="p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400 font-medium">微信 (WeChat)</span>
                    <p className="text-sm font-mono font-semibold text-heading">15093051996</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('15093051996', 'modalWechat')}
                    className="h-8 px-3 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-medium flex items-center gap-1"
                  >
                    {copiedField === 'modalWechat' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === 'modalWechat' ? '已复制' : '复制'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400 font-medium">电子邮箱 (Email)</span>
                    <p className="text-sm font-mono font-semibold text-heading">yinqijun@aliyun.com</p>
                  </div>
                  <a
                    href="mailto:yinqijun@aliyun.com"
                    className="h-8 px-3 rounded-lg border border-black/[0.1] dark:border-white/[0.1] text-heading text-xs font-medium flex items-center gap-1 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>发邮件</span>
                  </a>
                </div>

                <div className="p-3.5 rounded-xl border border-black/[0.06] dark:border-white/[0.08] bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400 font-medium">手机电话 (Phone)</span>
                    <p className="text-sm font-mono font-semibold text-heading">150-9305-1996</p>
                  </div>
                  <a
                    href="tel:15093051996"
                    className="h-8 px-3 rounded-lg border border-black/[0.1] dark:border-white/[0.1] text-heading text-xs font-medium flex items-center gap-1 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>呼叫</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
