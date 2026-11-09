import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun,
  Moon,
  ArrowUpRight,
  Copy,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Terminal,
  Mail,
  Phone,
  MapPin,
  Globe,
  ChevronDown,
  Zap
} from 'lucide-react';
import { resumeData } from './data/resume';
import type { ProjectData } from './data/resume';
import AppV1 from './App.v1';
import { TactileShaderWave, type TactileShaderWaveHandle } from './components/widgets/TactileShaderWave';
import type { PaletteName, Direction } from 'glimm';

// ── 前端工程与人机协同的四层解构沙盘 (纯前端工程思考，严谨无冗余) ──
const ARCHITECTURE_LAYERS = [
  {
    id: 'layer-1',
    number: '01',
    name: '业务解耦而非浮窗拼凑',
    tag: '嵌入式交互 (Contextual UI)',
    summary: '拒绝在界面角落强塞突兀悬浮框，让逻辑在交互断点静默处理复杂分支。',
    details: '真正优秀的前端交互，绝不该让用户面对空白交互框无所适从。而是把状态分类、字段抽取与推演能力静默沉淀在表单校验、异常巡检与数据联动环节。用户操作流转过程中，前端组件已经完成边界排查，直出响应结果。',
    metrics: ['无感静默嵌入', '极简交互门槛', '毫秒级异常捕获']
  },
  {
    id: 'layer-2',
    number: '02',
    name: '物理质感与人机反馈',
    tag: '触觉光学 (Tactile Physics)',
    summary: '计算与网络延迟不可避免，用物理透镜形变与柔光漫射消除冰冷等待感。',
    details: '长耗时交互极易引发焦虑感。正如 WebGL 的微光晕与透镜冲击波，交互触发时，界面给予克制、符合物理光学规律的空间扰动与微色散。有弹性的微交互让系统明确具备‘呼吸感’，把冰冷等待转化为带有物理质感的情绪抚慰。',
    metrics: ['物理透镜空间扰动', 'RGB 通道轻微色散', '呼吸态触觉回馈']
  },
  {
    id: 'layer-3',
    number: '03',
    name: '信息降噪与可读性密度',
    tag: '排版中枢 (19:5 黄金律)',
    summary: '砍掉所有假大空的 3D 飞线与无效渐变，让关键信息获取压缩在 3 秒以内。',
    details: '无论是 19:5 超宽数据大屏还是控制面板，前端界面工程的及格线是“信息获取速度”。明文制定左 19:右 5 宽窄黄金切分，配合高对比度阈值线，将滞后排查拉升至毫秒级感知。视线看一眼就懂核心状态，操作极度直观。',
    metrics: ['19:5 宽屏黄金切分', '3秒极速判断', '零无效视觉噪音']
  },
  {
    id: 'layer-4',
    number: '04',
    name: '全栈动手跑通高保真',
    tag: '代码即原型 (Fullstack Maker)',
    summary: '静态设计永远不等于建筑。亲自把交互动线、状态边界与前端代码完整跑通。',
    details: '静态设计图存在巨大的还原鸿沟。熟练借助现代化工具辅助构建，亲自用 React、Vue3 与现代 TypeScript 将真实数据接口、极端异常分支与响应式动效写成生产级代码，交付高保真高一致性的前端体验。',
    metrics: ['零沟通磨合损耗', '极端边界完备覆盖', '所见即所得交付']
  }
];

// ── 真实的前端开发与交互思考手记 (Field Notes & Questions) ──
const PHILOSOPHY_TABS = [
  {
    id: 'tab-1',
    label: '组件架构',
    tabColor: 'border-l-blue-500',
    question: '什么样的前端组件封装才能真正兼顾复用与拓展？',
    answer: '不盲目追求过度抽象，把状态机与核心逻辑沉底，把 UI 视图与样式解耦。在输入校验与数据流转中做好容错，让系统在应对极端边界数据时依然保持优雅容错，而不是堆砌一次性代码。'
  },
  {
    id: 'tab-2',
    label: '物理质感',
    tabColor: 'border-l-emerald-500',
    question: '为什么 Web 交互更需要讲究界面的“物理质感”？',
    answer: '网络延迟与计算等待极易引发用户的失控与焦虑。好的交互应该像真实世界的物理器物：有微弱的透镜形变、弹簧阻尼回弹、柔和的光线漫射。正如 WebGL 冲击波实验，给微交互赋予触觉般的质感，界面脱离冷冰冰的套壳感。'
  },
  {
    id: 'tab-3',
    label: '界面降噪',
    tabColor: 'border-l-amber-500',
    question: '复杂的系统界面如何避免变成“信息冗余的视觉垃圾”？',
    answer: '永远不要凭空画图。去观察真实用户每天点得最繁琐的操作断点在哪。把核心状态机梳理清晰，砍掉所有花里胡哨的无效 3D 飞线，界面只留关键核心数据，操作路径缩短，系统自然好用。'
  },
  {
    id: 'tab-4',
    label: '代码闭环',
    tabColor: 'border-l-purple-500',
    question: '作为界面探索者，为什么坚持自己写生产级代码？',
    answer: '原型是静态的愿望，代码是动态的现实。自己动手跑通接口与前端动效，不仅能瞬间摸清技术实现的边界与性能成本，更能消除传统设计“需求反复对齐、上线走样变形”的鸿沟。懂代码构建，构思的每一个方案都自带可行性。'
  }
];

// ── 常用技术栈与日常开发兵器库 ──
const TOOLBOX = [
  { name: 'Cursor & Claude Code', note: 'AI 结对敏捷构建 / 全栈代码落地', category: 'Engineering' },
  { name: 'Figma & 墨刀', note: '高保真原型 / 动效与交互规范', category: 'Design' },
  { name: 'Python & 算法工具', note: '工作流脚本 / 数据自动化处理', category: 'Scripting' },
  { name: 'React 19 / Vue 3', note: '现代 Web 前端 / 生产级全代码交互', category: 'Engineering' },
  { name: 'SQL & 数据清洗', note: '数据模型构建 / 指标分析处理', category: 'Data' },
  { name: 'ECharts & Canvas', note: '数据可视化 / 19:5 宽屏排版', category: 'Visualization' },
  { name: 'TypeScript', note: '严格领域类型建模与代码约束', category: 'Engineering' },
  { name: 'Docker & Git', note: '容器化部署与现代协作流程', category: 'Workflow' }
];

// Henan ICP Filing Number & Official MIIT Link
const ICP_NUMBER = '豫ICP备2026000001号-1';
const MIIT_URL = 'https://beian.miit.gov.cn/';

export default function App() {
  // Version state: '2.0' (Studio Atelier Website) - 1.0 decoupled for ICP filing compliance
  const [version, setVersion] = useState<'2.0' | '1.0'>(() => {
    const params = new URLSearchParams(window.location.search);
    const vParam = params.get('v');
    return vParam === 'internal_v1' ? '1.0' : '2.0';
  });

  const handleSwitchVersion = (v: '1.0' | '2.0') => {
    setVersion(v);
    const url = new URL(window.location.href);
    if (v === '1.0') {
      url.searchParams.set('v', '1.0');
    } else {
      url.searchParams.delete('v');
    }
    window.history.replaceState({}, '', url.toString());
  };

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  // Selected project modal
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Active Blueprint Layer in interactive sandbox
  const [activeBlueprintLayer, setActiveBlueprintLayer] = useState<number>(0);

  // Expanded Philosophy Folder Tab
  const [expandedTabId, setExpandedTabId] = useState<string>('tab-1');

  // Contact modal state
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Category filter for projects
  const [projectFilter, setProjectFilter] = useState<'all' | 'ai' | 'screen' | 'ux'>('all');

  // Real-time CST clock
  const [currentTime, setCurrentTime] = useState<string>('');

  // Tactile Shader Wave ref
  const tactileWaveRef = useRef<TactileShaderWaveHandle>(null);

  const triggerTactileWave = (options?: {
    palette?: PaletteName;
    direction?: Direction;
    onMidpoint?: () => void;
  }) => {
    tactileWaveRef.current?.trigger({
      palette: options?.palette ?? 'prism',
      direction: options?.direction ?? 'ltr',
      sweepMs: 800,
      onMidpoint: options?.onMidpoint
    });
  };


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

  // Compliant, opinionated copywriting for Web Frontend & UI Interaction
  const t = useMemo(() => {
    const zh = {
      nav: {
        works: '组件实验',
        blueprint: '交互沙盘',
        principles: '技术手记',
        services: '探索方向',
        contact: '交流探讨',
      },
      status: 'Web 前端学习手记 · 持续记录中',
      name: '尹启钧',
      role: 'Web 前端工程爱好者 · 人机交互探索',
      headline: '做有温度、有物理质感，且易用顺手的前端交互体验。',
      subtext:
        '热衷于探索现代 Web 前端技术、微交互物理质感与数据可视化排版。既关注界面背后的工程架构与响应式细节，也喜欢亲手用代码把视觉交互完整跑通。',
      ctaPrimary: '交流探讨 / 微信沟通',
      ctaResume: '探索交互沙盘 (Sandbox)',
      worksTitle: 'Selected UI Experiments',
      worksSubtitle: '从交互动线到工程闭环 · 4 项核心前端组件案例',
      filterAll: '全部实验 (4)',
      filterAI: '前端组件 / 状态机',
      filterScreen: '19:5 宽屏排版',
      filterUX: '复杂交互 / 拓扑图元',
      blueprintTitle: 'Frontend & Interaction Sandbox',
      blueprintSubtitle: '现代 Web 工程与交互动效的四层解构沙盘',
      principlesTitle: 'Field Notes & Tech Log',
      principlesSubtitle: '来自日常前端开发与界面构建的技术手记与思考',
      servicesTitle: 'Current Explorations',
      servicesSubtitle: '正在深度探索与实践的两大 Web 前端交互方向',
      toolboxTitle: 'Everyday Tech Toolbox',
      toolboxSubtitle: '从交互思考直通生产级代码，我的日常开发工具',
      dialogueTitle: '欢迎交流前端技术与人机交互',
      dialogueSub:
        '平时深入探索 WebGL 物理动效、数据可视化与前端交互工程。欢迎随时交流探讨。',
      emailTitle: '电子邮箱',
      phoneTitle: '联系电话',
      locationTitle: '常驻地',
      locationValue: '中国 · 郑州 / 支持远程',
      modalClose: '关闭窗口',
      contributions: '工程架构与核心实现',
      results: '关键度量指标',
    };

    const en = {
      nav: {
        works: 'Experiments',
        blueprint: 'Sandbox',
        principles: 'Notes',
        services: 'Focus',
        contact: 'Connect',
      },
      status: 'Frontend Dev Notes · In Active Log',
      name: 'Qijun Yin',
      role: 'Web Frontend Developer · UX Interaction',
      headline: 'Crafting intuitive, tactile, and responsive Web experiences.',
      subtext:
        'Passionate about modern Web technologies, physics-based micro-interactions, and responsive layout engineering. Combining architectural clarity with clean production code.',
      ctaPrimary: 'Get in Touch / WeChat',
      ctaResume: 'Explore Sandbox',
      worksTitle: 'Selected UI Experiments',
      worksSubtitle: 'From visual dynamics to code delivery · 4 Core Cases',
      filterAll: 'All Works (4)',
      filterAI: 'Components / State',
      filterScreen: '19:5 Screen Layout',
      filterUX: 'Complex Interactions',
      blueprintTitle: 'Frontend & Interaction Sandbox',
      blueprintSubtitle: 'Interactive 4-layer sandbox for modern Web software',
      principlesTitle: 'Field Notes & Tech Log',
      principlesSubtitle: 'Practical methodology and engineering thoughts born in code',
      servicesTitle: 'Current Explorations',
      servicesSubtitle: 'Two primary focus areas in Web frontend UX',
      toolboxTitle: 'Everyday Tech Toolbox',
      toolboxSubtitle: 'Bridging domain logic and production code',
      dialogueTitle: 'Let us connect & talk Frontend UX',
      dialogueSub:
        'Always happy to exchange thoughts on WebGL shaders, tactile micro-interactions, and responsive UI systems.',
      emailTitle: 'Email',
      phoneTitle: 'Phone',
      locationTitle: 'Base Location',
      locationValue: 'Zhengzhou, China / Remote',
      modalClose: 'Close',
      contributions: 'Core Implementations',
      results: 'Measurable Outcomes',
    };

    return lang === 'zh' ? zh : en;
  }, [lang]);

  // Project showcase preview image map
  const projectShowcaseImages: Record<string, string> = {
    haiyi_douyin: '/assets/projects/haiyi_douyin/douyin_dashboard.jpg',
    dashboards: '/assets/projects/dashboards/dash_finance.png',
    edu_platform: '/assets/projects/edu_platform/edu_admin_dashboard.png',
    audit_project: '/assets/projects/audit_project/audit_process_logic.png',
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return resumeData.projects.filter(project => {
      if (projectFilter === 'all') return true;
      if (projectFilter === 'ai') {
        return project.folder === 'haiyi_douyin';
      }
      if (projectFilter === 'screen') {
        return project.folder === 'dashboards';
      }
      if (projectFilter === 'ux') {
        return project.folder === 'edu_platform' || project.folder === 'audit_project';
      }
      return true;
    });
  }, [projectFilter]);

  const currentLayer = ARCHITECTURE_LAYERS[activeBlueprintLayer];

  if (version === '1.0') {
    return <AppV1 onSwitchVersion={handleSwitchVersion} />;
  }

  return (
    <div className="min-h-screen text-body bg-bg antialiased selection:bg-blue-500/20 selection:text-heading">
      {/* Tactile WebGL Shader Wave Overlay */}
      <TactileShaderWave ref={tactileWaveRef} defaultPalette="prism" />

      {/* Ambient background glow */}
      <div className="ambient-glow" />

      {/* Main Container - Split Screen Layout (Elaya Style Anchor + Dynamic Right Stream) */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ════════════════════════════════════════════════════════════
              LEFT COLUMN: STICKY PROFILE & ATELIER ANCHOR (elaya.design)
             ════════════════════════════════════════════════════════════ */}
          <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8 z-30">
            <div className="rounded-[28px] border border-black/[0.08] dark:border-white/[0.08] bg-surface p-6 sm:p-7 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.35)] relative overflow-hidden transition-all duration-300">
              
              {/* Dot-grid graphic accent in corner */}
              <div className="dot-grid absolute bottom-0 right-0 w-44 h-44 opacity-25 dark:opacity-10 pointer-events-none rounded-br-[28px]" />

              {/* ── Top Bar: Navigation Links & Theme/Lang Controls ── */}
              <div className="flex items-center justify-between pb-6 border-b border-black/[0.06] dark:border-white/[0.06] relative z-10">
                <nav className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                  <a
                    href="#works"
                    className="px-2.5 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-heading hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {t.nav.works}
                  </a>
                  <a
                    href="#blueprint"
                    className="px-2.5 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-heading hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {t.nav.blueprint}
                  </a>
                  <a
                    href="#principles"
                    className="px-2.5 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-heading hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {t.nav.principles}
                  </a>
                  <a
                    href="#services"
                    className="px-2.5 py-1.5 rounded-full text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:text-heading hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {t.nav.services}
                  </a>
                </nav>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setLang(prev => (prev === 'zh' ? 'en' : 'zh'))}
                    className="h-8 px-2.5 rounded-full text-xs font-mono font-medium border border-black/[0.08] dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1 text-heading"
                    title="Toggle Language"
                  >
                    <Globe className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{lang === 'zh' ? 'EN' : '中'}</span>
                  </button>

                  <button
                    onClick={toggleTheme}
                    className="h-8 w-8 rounded-full border border-black/[0.08] dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center text-heading"
                    title="Toggle Theme"
                  >
                    {theme === 'light' ? (
                      <Moon className="w-3.5 h-3.5 text-neutral-600" />
                    ) : (
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* ── Body: Identity, Headline & Grounded Statement ── */}
              <div className="py-7 flex flex-col gap-5 relative z-10">
                {/* Available Status Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-black/[0.04] dark:border-white/[0.06] w-fit">
                  <span className="text-amber-500 font-bold text-xs animate-pulse">✴</span>
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
                    <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>

                {/* Grounded, Confident Headline (No Slop) */}
                <h2 className="text-xl sm:text-2xl lg:text-[23px] font-semibold text-heading tracking-tight leading-[1.3] text-balance">
                  {t.headline}
                </h2>

                {/* Honest Story Subtext */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                  {t.subtext}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5 pt-2">
                  <button
                    onClick={() => triggerTactileWave({ palette: 'prism', onMidpoint: () => setShowContactModal(true) })}
                    className="w-full h-11 px-5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium text-sm flex items-center justify-between hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-sm group"
                  >
                    <span>{t.ctaPrimary}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <a
                    href="#blueprint"
                    className="w-full h-11 px-5 rounded-full border border-black/[0.1] dark:border-white/[0.1] text-heading font-medium text-sm flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <span>{t.ctaResume}</span>
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  </a>
                </div>
              </div>

              {/* ── Footer: Contact Metadata & Live Monospace Clock ── */}
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

                  <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/90 px-2 py-0.5 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{currentTime || '10:48:00'}</span>
                    <span className="text-[10px] text-neutral-400 font-normal">CST</span>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* ════════════════════════════════════════════════════════════
              RIGHT COLUMN: INNOVATIVE ATELIER STREAM
             ════════════════════════════════════════════════════════════ */}
          <main className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10 lg:gap-14">
            
            {/* ──────────────────────────────────────────────────────────
                SECTION 1: SELECTED WORKS (Cinematic Visual Cards)
               ────────────────────────────────────────────────────────── */}
            <section id="works" className="flex flex-col gap-6 scroll-mt-8">
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
                    { id: 'ai', label: t.filterAI },
                    { id: 'screen', label: t.filterScreen },
                    { id: 'ux', label: t.filterUX },
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

              {/* 2-Column Responsive Card Grid */}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-900/85 dark:bg-black/85 text-white backdrop-blur-md border border-white/10 shadow-sm">
                          {project.tag}
                        </div>

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
                SECTION 2: ARCHITECTURE BLUEPRINT (Interactive Sandbox)
               ────────────────────────────────────────────────────────── */}
            <section id="blueprint" className="flex flex-col gap-6 scroll-mt-8">
              <div>
                <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Interactive Sandbox
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-heading mt-1">
                  {t.blueprintTitle}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {t.blueprintSubtitle}
                </p>
              </div>

              <div className="rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] bg-surface p-6 sm:p-7 flex flex-col gap-6 shadow-sm">
                
                {/* 4 Clickable Layer Selector Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ARCHITECTURE_LAYERS.map((layer, idx) => (
                    <button
                      key={layer.id}
                      onClick={() => setActiveBlueprintLayer(idx)}
                      className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between gap-2 ${
                        activeBlueprintLayer === idx
                          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-sm'
                          : 'bg-neutral-50 dark:bg-neutral-800/60 border-black/[0.04] dark:border-white/[0.06] text-neutral-600 dark:text-neutral-400 hover:text-heading hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold opacity-75">{layer.number}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10">
                          {layer.tag}
                        </span>
                      </div>
                      <span className="text-xs font-semibold tracking-tight line-clamp-1">
                        {layer.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Layer Deep Dive Console */}
                <div className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-850/80 border border-black/[0.06] dark:border-white/[0.06] flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                        LAYER_{currentLayer.number}
                      </span>
                      <span className="text-xs text-neutral-400">/</span>
                      <h3 className="font-semibold text-heading text-base">
                        {currentLayer.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                      {currentLayer.tag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {currentLayer.details}
                  </p>

                  <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3 flex-wrap">
                      {currentLayer.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>

                    {currentLayer.id === 'layer-2' && (
                      <button
                        onClick={() => triggerTactileWave({ palette: 'azure', direction: 'ltr' })}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <Zap className="w-3 h-3" />
                        <span>触发本层触觉冲击波 (Live Demo)</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────
                SECTION 3: FIELD NOTES & QUESTIONS (技术手记与实战思考)
               ────────────────────────────────────────────────────────── */}
            <section id="principles" className="flex flex-col gap-6 scroll-mt-8">
              <div>
                <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Field Notes
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-heading mt-1">
                  {t.principlesTitle}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {t.principlesSubtitle}
                </p>
              </div>

              {/* Stacked Index Cards (Physical Folder Design) */}
              <div className="flex flex-col gap-3">
                {PHILOSOPHY_TABS.map((tab) => {
                  const isExpanded = expandedTabId === tab.id;
                  return (
                    <div
                      key={tab.id}
                      onClick={() => setExpandedTabId(isExpanded ? '' : tab.id)}
                      className={`rounded-[20px] border border-black/[0.07] dark:border-white/[0.08] bg-surface p-5 sm:p-6 transition-all cursor-pointer shadow-sm border-l-4 ${tab.tabColor} ${
                        isExpanded ? 'shadow-md ring-1 ring-black/5 dark:ring-white/5' : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                            {tab.label}
                          </span>
                          <h4 className="font-semibold text-heading text-sm sm:text-base tracking-tight">
                            {tab.question}
                          </h4>
                        </div>
                        <div className="h-7 w-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-heading shrink-0">
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pt-4 mt-3 border-t border-black/[0.04] dark:border-white/[0.04]">
                              {tab.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────
                SECTION 4: CURRENT EXPLORATIONS (两大探索方向)
               ────────────────────────────────────────────────────────── */}
            <section id="services" className="flex flex-col gap-6 scroll-mt-8">
              <div>
                <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Roadmap & Focus
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-heading mt-1">
                  {t.servicesTitle}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {t.servicesSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* ── Focus Card A: Human-AI UX & Tactile Physics ── */}
                <div className="rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] bg-surface p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 w-fit">
                        <Zap className="w-3.5 h-3.5" />
                        <span>人机交互 · 触觉物理动效</span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">体验探索</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-heading tracking-tight">
                        意图预判与物理微交互设计
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 leading-relaxed">
                        探索像透镜波纹、弹性展开、阻尼回弹等具有真实物理反馈的前端交互动效，让界面体验告别冰冷生硬。
                      </p>
                    </div>

                    <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col gap-2.5">
                      {[
                        '自然语言输入框弹性形变与金属边缘渐变',
                        '空间透镜冲击波与 RGB 轻微色散通道分离',
                        '等待态呼吸反馈与抗焦虑微交互节奏',
                        '多端平滑适配，降级模式零多余算力消耗',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <button
                      onClick={() => setProjectFilter('ux')}
                      className="w-full h-10 px-4 rounded-full border border-black/[0.1] dark:border-white/[0.1] hover:bg-neutral-100 dark:hover:bg-neutral-800 text-heading text-xs font-medium flex items-center justify-between transition-colors"
                    >
                      <span>筛选查看交互动效案例</span>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </button>
                  </div>
                </div>

                {/* ── Focus Card B: Screen Layout & Data Flow ── */}
                <div className="rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] bg-neutral-900 text-white dark:bg-[#151923] p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 border border-white/10 w-fit">
                        <Terminal className="w-3.5 h-3.5 text-amber-400" />
                        <span>前端工程 · 宽屏排版实验室</span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">组件实践</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white tracking-tight">
                        宽屏响应式排版与全景数据看板
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 leading-relaxed">
                        基于现代 CSS Grid 与 Canvas 图元渲染，解决超大分辨率信息架构下的高密度排版与性能瓶颈。
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
                      {[
                        '高频流式数据流的前端缓冲与差异化渲染调度',
                        '红绿动态预警色彩体系，严格兼顾无障碍对比度',
                        '19:5 超宽响应式网格比例，彻底杜绝多余视觉噪音',
                        '组件解耦与轻量化封装，消除传统跨端排版断层',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 relative z-10">
                    <button
                      onClick={() => setProjectFilter('screen')}
                      className="w-full h-10 px-4 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-medium flex items-center justify-between transition-colors shadow-sm"
                    >
                      <span>筛选查看 19:5 宽屏排版案例</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────
                SECTION 5: EVERYDAY TOOLBOX
               ────────────────────────────────────────────────────────── */}
            <section className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Toolbox
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-heading mt-1">
                  {t.toolboxTitle}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {t.toolboxSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TOOLBOX.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-[18px] border border-black/[0.07] dark:border-white/[0.08] bg-surface p-4 flex flex-col justify-between gap-3 shadow-sm hover:border-black/20 dark:hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-neutral-400">
                        {item.category}
                      </span>
                      <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-heading tracking-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ──────────────────────────────────────────────────────────
                SECTION 6: LET'S TALK / FOOTER & HENAN ICP FILING
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
                  onClick={() => triggerTactileWave({ palette: 'prism', onMidpoint: () => setShowContactModal(true) })}
                  className="h-11 px-6 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-medium text-sm flex items-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>{t.ctaPrimary}</span>
                </button>

                <button
                  onClick={() => triggerTactileWave({ palette: 'spectrum', direction: 'ltr' })}
                  className="h-11 px-5 rounded-full border border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center gap-2 hover:bg-blue-100/60 dark:hover:bg-blue-900/30 transition-all shadow-sm"
                  title="触发全屏物理流光冲击波 (Shader Wave)"
                >
                  <Zap className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                  <span>全屏触觉冲击波 (Shader Wave)</span>
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
                    href={MIIT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-500 dark:text-neutral-400 hover:text-heading hover:underline transition-colors flex items-center gap-1 font-mono"
                  >
                    <span>{ICP_NUMBER}</span>
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
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 h-9 w-9 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center text-heading transition-colors"
                title={t.modalClose}
              >
                <X className="w-4 h-4" />
              </button>

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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex flex-col gap-2.5">
                  <h4 className="text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider">
                    {t.contributions}
                  </h4>
                  <div className="flex flex-col gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {activeProject.details.contributions.map((c, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{c.replace(/\*\*/g, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h4 className="text-xs font-mono font-medium text-neutral-400 uppercase tracking-wider">
                    {t.results}
                  </h4>
                  <div className="flex flex-col gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {activeProject.details.results.map((r, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{r.replace(/\*\*/g, '')}</span>
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
          IMAGE LIGHTBOX
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
          CONTACT MODAL
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
                  随时欢迎交流 Web 前端技术、人机交互与数据可视化实践。
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
