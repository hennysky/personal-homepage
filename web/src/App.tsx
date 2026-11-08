import { useState, useEffect, useMemo, useRef } from 'react';
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
  Terminal,
  Mail,
  Phone,
  MapPin,
  Globe,
  ChevronDown,
  Bot,
  Zap
} from 'lucide-react';
import { resumeData } from './data/resume';
import type { ProjectData } from './data/resume';
import AppV1 from './App.v1';
import { TactileShaderWave, type TactileShaderWaveHandle } from './components/widgets/TactileShaderWave';
import type { PaletteName, Direction } from 'glimm';

// ── AI 产品与人机协同的四层解构沙盘 (真实产品思考，拒绝套话) ──
const ARCHITECTURE_LAYERS = [
  {
    id: 'layer-1',
    number: '01',
    name: '业务内嵌而非浮窗对话',
    tag: '嵌入式 Agent (In-Context AI)',
    summary: '拒绝在右下角塞一个无聊的聊天框，让大模型在业务断点静默处理繁重卡点。',
    details: '真正产生价值的 AI，绝不该让用户面对空白输入框硬憋 Prompt。而是把大模型的分类、抽取与推理能力静默埋进表单校验、异常巡检与数据归因环节。用户还没开始提问，后台 Agent 已经将几十个维度排查完毕，直出归因结果。',
    metrics: ['无感静默嵌入', '零 Prompt 门槛', '分钟级异常捕获']
  },
  {
    id: 'layer-2',
    number: '02',
    name: '物理质感与人机反馈',
    tag: '触觉光学 (Tactile Physics)',
    summary: '模型生成延迟不可避免，用物理透镜形变与柔光漫射消除冰冷等待感。',
    details: 'AI 的等待时间极易引发失控感。正如 Dia 的微光晕与透镜冲击波，当呼出智能体时，界面给予克制、符合物理定律的空间扰动与微色散。有弹性的微交互让用户明确感知系统的‘思考呼吸’，把冰冷延迟转化为带有物理质感的情绪抚慰。',
    metrics: ['物理透镜空间扰动', 'RGB 通道轻微色散', '呼吸态触觉回馈']
  },
  {
    id: 'layer-3',
    number: '03',
    name: '决策降噪与信息密度',
    tag: '决策中枢 (19:5 黄金律)',
    summary: '砍掉所有假大空的 3D 飞线与无效渐变，让关键判断压缩在 3 秒以内。',
    details: '无论是 19:5 财务大屏还是运营面板，B 端产品的唯一及格线是“判断速度”。明文制定左 19:右 5 宽窄黄金切分，配合红绿阈值线，将次日人工追溯的滞后排查拉升至分钟级感知。业务看一眼就懂哪里出了问题，点两下就能完成处置。',
    metrics: ['19:5 宽屏黄金切分', '3秒极速判断', '零无效视觉噪音']
  },
  {
    id: 'layer-4',
    number: '04',
    name: '全栈动手跑通高保真',
    tag: '代码即原型 (Fullstack Maker)',
    summary: '图纸永远不等于建筑。亲自把交互动线、边界异常与前端代码完整跑通。',
    details: '静态原型图存在巨大的沟通损耗。熟练借助 Cursor 与 Claude 结对编程，亲自用 React、Vue3 与现代 TypeScript 将真实接口、极端异常分支与响应式动效写成生产级代码。交付给产研团队的方案永远不会走样变形。',
    metrics: ['零沟通磨合损耗', '极端边界完备覆盖', '所见即所得交付']
  }
];

// ── 真实的 AI 产品思考手记 (Field Notes & Questions) ──
const PHILOSOPHY_TABS = [
  {
    id: 'tab-1',
    label: '真 AI 原生',
    tabColor: 'border-l-blue-500',
    question: '什么样的 AI 产品落地才不是自嗨的玩具？',
    answer: '在页面右下角塞个悬浮对话框最容易，但用户用两句就会关掉。真正能持续产生价值的 AI，是把模型的推理能力“沉底”——去替运营清洗复杂明细、去帮财务预警异常波动、在用户输入时预测意图。让用户觉得“这系统突然变聪明、变顺手了”，而不是“我每天在跟机器尬聊”。'
  },
  {
    id: 'tab-2',
    label: '物理质感',
    tabColor: 'border-l-emerald-500',
    question: '为什么 AI 时代的交互更需要讲究界面的“物理质感”？',
    answer: '大模型的不确定性和网络延迟极易引发用户的失控与焦虑。好的交互应该像真实世界的物理器物：有微弱的透镜形变、弹簧阻尼回弹、柔和的光线漫射。正如上方的冲击波实验，给每一次生成赋予触觉般的质感，AI 产品才会有温度，脱离冷冰冰的套壳玩具感。'
  },
  {
    id: 'tab-3',
    label: 'B端降噪',
    tabColor: 'border-l-amber-500',
    question: '复杂的企业系统如何避免变成“人人抱怨但不得不用的烂摊子”？',
    answer: '永远不要凭空坐在办公室画线框图。去跟着一线业务员坐一天，看他们每天点得最烦躁的断点在哪、为什么要把数据导到 Excel 里去二次加工。把核心实体间的状态机梳理死，砍掉所有花里胡哨的 3D 飞线，界面只留关键决策数据，路径缩短一半，系统自然好用。'
  },
  {
    id: 'tab-4',
    label: '全栈闭环',
    tabColor: 'border-l-purple-500',
    question: '作为产品经理，为什么坚持自己写全栈生产代码？',
    answer: '原型是静态的愿望，代码是动态的现实。自己动手跑通接口与前端动效，不仅能瞬间摸清技术实现的边界与成本，更能消除传统产研“需求反复对齐、上线走样变形”的巨大鸿沟。懂代码的产品人，构思的每一个方案都自带可行性基因。'
  }
];

// ── AI 产品人日常兵器库 ──
const TOOLBOX = [
  { name: 'Cursor & Claude Code', note: 'AI 结对敏捷构建 / 全栈落地', category: 'AI Native' },
  { name: 'Figma & 墨刀', note: '高保真原型 / 动效与交互规范', category: 'Design' },
  { name: 'Python & LangChain', note: 'Agent 工作流编排 / Prompt 调优', category: 'AI Native' },
  { name: 'React 19 / Vue 3', note: '生产级全代码交互 / 界面还原', category: 'Engineering' },
  { name: 'SQL & Tableau', note: '业务数据下钻 / 决策指标提炼', category: 'Data' },
  { name: 'ECharts & Canvas', note: '数据可视化 / 19:5 决策大屏', category: 'Visualization' },
  { name: 'TypeScript', note: '严格业务领域模型约束', category: 'Engineering' },
  { name: 'Docker & Git', note: '容器化部署与现代协作流程', category: 'Workflow' }
];

// Henan ICP Filing Number & Official MIIT Link
const ICP_NUMBER = '豫ICP备2026000001号-1';
const MIIT_URL = 'https://beian.miit.gov.cn/';

export default function App() {
  // Version state: '2.0' (Studio Atelier Website) or '1.0' (Classic Resume Edition)
  const [version, setVersion] = useState<'2.0' | '1.0'>(() => {
    const params = new URLSearchParams(window.location.search);
    const vParam = params.get('v');
    return vParam === '1' || vParam === '1.0' ? '1.0' : '2.0';
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

  // Human, opinionated copywriting for AI Product Manager
  const t = useMemo(() => {
    const zh = {
      nav: {
        works: '实战案例',
        blueprint: 'AI沙盘',
        principles: '产品手记',
        services: '探索方向',
        contact: '交流探讨',
      },
      status: 'AI 产品思考手记 · 持续探索中',
      name: '尹启钧',
      role: 'AI 产品经理 · 人机交互探索',
      headline: '做有温度、有物理质感，且能真正在业务中落地的 AI 产品。',
      subtext:
        '不喜欢只在右下角放一个聊天框就自称 AI 原生。我更关注大模型如何真正嵌入日常业务卡点、人机交互如何像物理世界一样有质感与反馈。既用产品思维拆解核心逻辑，也喜欢亲手用代码把想法跑通。',
      ctaPrimary: '交流探讨 / 微信沟通',
      ctaResume: '查看完整技术履历',
      worksTitle: 'Selected Case Studies',
      worksSubtitle: '从业务卡点到工程闭环 · 4 项核心落地案例',
      filterAll: '全部项目 (4)',
      filterAI: 'AI 原生 / 智能决策',
      filterScreen: '19:5 决策大屏',
      filterUX: '复杂交互 / 系统中台',
      blueprintTitle: 'AI Product & Interaction Sandbox',
      blueprintSubtitle: '复杂业务与 AI 原生交互的四层解构沙盘',
      principlesTitle: 'Index Cards & Field Notes',
      principlesSubtitle: '来自真实业务一线的产品思考与方法论索引',
      servicesTitle: 'Current Explorations',
      servicesSubtitle: '正在深度探索与实践的两大 AI 产品交互方向',
      toolboxTitle: 'Everyday Product Toolbox',
      toolboxSubtitle: '从业务思考直通生产级代码，我的日常兵器库',
      dialogueTitle: '欢迎探讨 AI 产品与人机交互',
      dialogueSub:
        '平时深入探索大模型 Agent 业务落地、触觉微交互与数字化决策中枢。欢迎同行随时交流探讨。',
      emailTitle: '电子邮箱',
      phoneTitle: '联系电话',
      locationTitle: '常驻地',
      locationValue: '中国 · 郑州 / 支持远程',
      modalClose: '关闭窗口',
      contributions: '产品架构与贡献',
      results: '关键业务指标',
    };

    const en = {
      nav: {
        works: 'Cases',
        blueprint: 'Sandbox',
        principles: 'Notes',
        services: 'Focus',
        contact: 'Connect',
      },
      status: 'AI Product Notes · In Active Exploration',
      name: 'Qijun Yin',
      role: 'AI Product Manager · Human-AI Interaction',
      headline: 'Building AI products with physical craft, intuitive UX, and real-world impact.',
      subtext:
        'Beyond superficial chat boxes: embedding LLM reasoning directly into business workflows, with tactile physical feedback and high-density clarity. Architecting systems and writing production code.',
      ctaPrimary: 'Get in Touch / WeChat',
      ctaResume: 'View Full Resume (V1)',
      worksTitle: 'Selected Case Studies',
      worksSubtitle: 'From business origin to code delivery · 4 Flagship cases',
      filterAll: 'All Works (4)',
      filterAI: 'AI-Native / BI',
      filterScreen: '19:5 Dashboards',
      filterUX: 'Complex Workflows',
      blueprintTitle: 'AI Product & Interaction Sandbox',
      blueprintSubtitle: 'Interactive 4-layer sandbox for modern AI software',
      principlesTitle: 'Index Cards & Field Notes',
      principlesSubtitle: 'Practical methodology and thoughts born in production',
      servicesTitle: 'Current Explorations',
      servicesSubtitle: 'Two primary focus areas in human-AI interaction',
      toolboxTitle: 'Everyday Product Toolbox',
      toolboxSubtitle: 'Bridging domain logic and production code',
      dialogueTitle: 'Let us connect and talk AI products',
      dialogueSub:
        'Always happy to exchange thoughts on AI Agent workflows, tactile micro-interactions, and decision systems.',
      emailTitle: 'Email',
      phoneTitle: 'Phone',
      locationTitle: 'Base Location',
      locationValue: 'Zhengzhou, China / Remote',
      modalClose: 'Close',
      contributions: 'Core Contributions',
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
                    onClick={() => handleSwitchVersion('1.0')}
                    className="h-8 px-2.5 rounded-full text-xs font-mono font-medium border border-black/[0.08] dark:border-white/[0.08] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1 text-heading"
                    title="切换至 1.0 经典履历版"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>1.0 履历</span>
                  </button>

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

                  <button
                    onClick={() => handleSwitchVersion('1.0')}
                    className="w-full h-11 px-5 rounded-full border border-black/[0.1] dark:border-white/[0.1] text-heading font-medium text-sm flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <span>{t.ctaResume}</span>
                    <Download className="w-4 h-4 text-neutral-400" />
                  </button>
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
                SECTION 3: FIELD NOTES & QUESTIONS (产品手记与实战思考)
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
                        探索像透镜波纹、弹性展开、阻尼回弹等具有真实物理反馈的 AI 交互动效，让生成式体验告别冰冷感。
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
                      <span>筛选查看复杂交互案例</span>
                      <ChevronRight className="w-4 h-4 text-neutral-400" />
                    </button>
                  </div>
                </div>

                {/* ── Focus Card B: Domain Agents & Decision Hubs ── */}
                <div className="rounded-[24px] border border-black/[0.08] dark:border-white/[0.08] bg-neutral-900 text-white dark:bg-[#151923] p-6 sm:p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group">
                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-200 border border-white/10 w-fit">
                        <Bot className="w-3.5 h-3.5 text-amber-400" />
                        <span>垂直 Agent · 决策中枢</span>
                      </div>
                      <span className="text-[11px] font-mono text-neutral-400">实战落地</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white tracking-tight">
                        业务 Agent 嵌入与 19:5 决策大屏
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 leading-relaxed">
                        将大模型逻辑深植在海量采销与投放数据流深处，实现分钟级异常捕获，让一线决策有钢铁般的数字底座。
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
                      {[
                        '电商运营海量数据多源清洗与标准化模型',
                        '红绿预警阈值算法群，风险感知由次日直降至极速',
                        '19:5 财务黄金分割比，彻底杜绝假大空 3D 冗余',
                        '全代码独立穿透，消除传统产研沟通损耗',
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
                      onClick={() => setProjectFilter('ai')}
                      className="w-full h-10 px-4 rounded-full bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-medium flex items-center justify-between transition-colors shadow-sm"
                    >
                      <span>探索 AI 智能体决策案例</span>
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
                  随时欢迎探讨 AI 产品设计、智能体落地与人机交互实践。
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
