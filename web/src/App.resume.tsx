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

export default function App() {
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

  // Capability cards toggle state (like elaya.design's toggle)
  const [includeFullCode, setIncludeFullCode] = useState<boolean>(true);

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
      status: '接受新机会 · 随时可沟通',
      name: '尹启钧',
      role: '高阶产品架构师 / AI-Native Builder',
      headline: '以产品架构思维与 AI 原生能力，将复杂业务解构成极致体验与商业增长。',
      subtext:
        '5年+ 前端工程与全栈交付经验。主导大屏中台、数字孪生、全景看板与交互组件从 0 到 1 落地。',
      ctaPrimary: '预约沟通 / 联系我',
      ctaResume: '下载 PDF 完整简历',
      worksTitle: 'Selected Works',
      worksSubtitle: '从业务原点到工程落地 · 8 项代表性产品实战',
      filterAll: '全部项目 (8)',
      filterB2B: 'B端中台 / 复杂大屏',
      filterC2C: 'C端增长 / 社交娱乐',
      filterAI: 'AI 原生 / 商业智能',
      viewCase: '查看案例细节',
      capabilitiesTitle: 'Core Capabilities & Offerings',
      capabilitiesSubtitle: '系统架构能力与端到端交付模式',
      experienceTitle: 'Career Trajectory',
      experienceSubtitle: '扎根业务一线的产研进阶与实战战绩',
      testimonialsTitle: 'Peer Endorsements',
      testimonialsSubtitle: '来自业务总监、技术负责人与公司 CEO 的真实合作评价',
      educationTitle: 'Education & Credentials',
      dialogueTitle: '让我们一起创造卓越的产品',
      dialogueSub: '无论您需要梳理庞杂的 B 端业务系统，还是以 AI 原生能力快速验证增长飞轮，随时欢迎交流。',
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
      status: 'Available for new opportunities',
      name: 'Qijun Yin',
      role: 'Product Architect / AI-Native Builder',
      headline: 'Architecting complex business domains into intuitive experiences & compounding growth.',
      subtext:
        '5+ years architecting enterprise SaaS, 19:5 financial data dashboards, consumer viral flywheels, and AI-native products from zero to one.',
      ctaPrimary: 'Book a Call / Get in Touch',
      ctaResume: 'Download Resume (PDF)',
      worksTitle: 'Selected Works',
      worksSubtitle: 'From business origin to code delivery · 8 Flagship cases',
      filterAll: 'All Works (8)',
      filterB2B: 'Enterprise / Dashboards',
      filterC2C: 'Consumer / Growth',
      filterAI: 'AI-Native / BI',
      viewCase: 'View Case Study',
      capabilitiesTitle: 'Core Capabilities & Offerings',
      capabilitiesSubtitle: 'Architecture philosophy and full-lifecycle delivery models',
      experienceTitle: 'Career Trajectory',
      experienceSubtitle: 'Battle-tested milestones in product engineering',
      testimonialsTitle: 'Peer Endorsements',
      testimonialsSubtitle: 'Feedback from Operations Directors, Tech Leads, and CEOs',
      educationTitle: 'Education & Credentials',
      dialogueTitle: "Let's build something exceptional together",
      dialogueSub:
        'Whether you need to untangle complex enterprise workflows or build AI-native growth loops, let us connect.',
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
    haiyi_douyin: '/assets/projects/haiyi_douyin/douyin_dashboard.jpg',
    dashboards: '/assets/projects/dashboards/dash_finance.png',
    activity_system: '/assets/projects/activity_system/act_mgmt_dashboard.png',
    huanxiong_party: '/assets/projects/huanxiong_party/raccoon_mall.jpg',
    dili_voice: '/assets/projects/dili_voice/dili_room_chat.jpg',
    edu_platform: '/assets/projects/edu_platform/edu_admin_dashboard.png',
    aiwan_jiang: '/assets/projects/aiwan_jiang/aiwan_matching.png',
    acg_social: '/assets/projects/acg_social/acg_home_01.png',
    audit_project: '/assets/projects/audit_project/audit_process_logic.png',
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return resumeData.projects.filter(project => {
      if (projectFilter === 'all') return true;
      if (projectFilter === 'b2b') {
        return (
          project.folder === 'dashboards' ||
          project.folder === 'audit_project' ||
          project.folder === 'edu_platform'
        );
      }
      if (projectFilter === 'c2c') {
        return (
          project.folder === 'activity_system' ||
          project.folder === 'huanxiong_party' ||
          project.folder === 'dili_voice' ||
          project.folder === 'aiwan_jiang' ||
          project.folder === 'acg_social'
        );
      }
      if (projectFilter === 'ai') {
        return (
          project.folder === 'haiyi_douyin' ||
          project.tag.toLowerCase().includes('ai')
        );
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

                {/* Theme & Language Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
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
                
                {/* ── CARD A: Enterprise System Architecture (Clean Light Slate) ── */}
                <div className="rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] bg-surface p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 w-fit">
                        <Layers className="w-3.5 h-3.5" />
                        <span>B端中台 · 复杂系统架构</span>
                      </div>

                      {/* Interactive delivery toggle (like elaya.design) */}
                      <button
                        onClick={() => setIncludeFullCode(!includeFullCode)}
                        className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500 hover:text-heading cursor-pointer"
                        title="包含原型设计与全栈代码落地"
                      >
                        <span>端到端全代码交付</span>
                        <div className={`w-8 h-4 rounded-full transition-colors relative flex items-center p-0.5 ${includeFullCode ? 'bg-blue-600' : 'bg-neutral-300 dark:bg-neutral-700'}`}>
                          <div className={`w-3 h-3 rounded-full bg-white transition-transform ${includeFullCode ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                      </button>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-heading tracking-tight">
                        B 端企业数字化与复杂中台架构
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                        从业务原点拆解领域实体与数据动线，主导复杂供应链、WMS、ERP 与政企调度系统的高内聚低耦合落座。
                      </p>
                    </div>

                    <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col gap-2.5">
                      {[
                        '领域驱动设计 (DDD) 与高扩展业务实体建模',
                        '细粒度 RBAC 权限引擎、多租户隔离与审批流',
                        '19:5 级超宽数据大屏与极简排版响应式规范',
                        '全流程产研设计系统 (Design System) 统一规范',
                        ...(includeFullCode ? ['配套完整交互原型文档与前端工程落地 (React/Vue/TS)'] : []),
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
                      onClick={() => setProjectFilter('b2b')}
                      className="w-full h-10 px-4 rounded-full border border-black/[0.1] dark:border-white/[0.1] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-heading text-xs font-medium flex items-center justify-between transition-colors"
                    >
                      <span>筛选查看 B 端核心中台案例</span>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </button>
                  </div>
                </div>

                {/* ── CARD B: AI-Native & Product Growth (Dark Obsidian Accent) ── */}
                <div className="rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] bg-neutral-900 text-white dark:bg-[#151923] p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 border border-white/10 w-fit">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>AI 原生 · 商业增长飞轮</span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">10x 生产力跃升</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white tracking-tight">
                        AI-Native 原生产品与全栈落地
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 leading-relaxed">
                        深度融合 LLM Agent 工作流、行业知识库 RAG 与 C 端裂变机制，将架构与现代全代码打通，实现极速验证与商业变现。
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
                      {[
                        '智能体 (AI Agent) 业务流编排与私域 RAG 问答闭环',
                        'C 端裂变分销、社交破冰动线与用户全生命周期增长',
                        '现代前端与全栈工程交付 (React 19, TypeScript, Tailwind)',
                        '严格遵循顶级设计标准与无冗余 Anti-Slop 准则',
                        '实战级抖音运营数据大脑与分钟级智能风险拦截',
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
                      onClick={() => setProjectFilter('ai')}
                      className="w-full h-10 px-4 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-medium flex items-center justify-between transition-colors shadow-sm"
                    >
                      <span>探索 AI-Native 实践案例</span>
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

              <div className="pt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 relative z-10">
                <span>© {new Date().getFullYear()} 尹启钧 (Qijun Yin). All rights reserved.</span>
                <span className="font-mono">Geist Design System · Anti-Slop Verified</span>
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
