export interface Testimonial {
  name: string;
  role: string;
  avatar?: string;
  content: string;
  tag: string;
}

export interface Education {
  period: string;
  school: string;
  degree: string;
  major: string;
  type: string;
}

export interface Volunteer {
  period: string;
  title: string;
  desc: string;
  location: string;
}

export interface Contact {
  phone: string;
  email: string;
  location: string;
  wechat?: string;
  avatar: string;
}

export interface ProjectScene {
  title: string;
  description: string;
  type: 'mobile' | 'desktop';
  images: string[];
  isSensitive?: boolean;
}

export interface ProjectData {
  title: string;
  tag: string;
  category: 'mobile' | 'desktop';
  shortDesc: string;
  labels: {
    zh: string[];
    en: string[];
  };
  folder: string;
  scenes?: ProjectScene[];
  details: {
    intro: string;
    contributions: string[];
    results: string[];
  };
}

export interface ResumeData {
  experience: any[];
  projects: ProjectData[];
  testimonials: Testimonial[];
  education: Education[];
  volunteer: Volunteer[];
  contact: Contact;
  skills: {
    category: string;
    items: string[];
  }[];
}

export const resumeData: ResumeData = {
  contact: {
    phone: "150-9305-1996",
    email: "yinqijun@aliyun.com",
    location: "河南 · 郑州",
    avatar: "/assets/avatar.webp"
  },
  testimonials: [
    {
      name: "王扬",
      role: "业务运营总监",
      content: "业务逻辑抓得极准，绝不在办公室凭空画图。能深入到真实使用场景梳理出最真实的交互卡点，还能把状态预警切切实实做进系统里。",
      tag: "逻辑敏锐度"
    },
    {
      name: "刘显龙",
      role: "全栈技术负责人",
      content: "极其少见‘懂业务、懂交互、还能自己跑代码’的全面型技术探索者。给出的方案逻辑滴水不漏，协作起来没有丝毫扯皮损耗。",
      tag: "全栈协同"
    },
    {
      name: "张总",
      role: "某科技公司负责人 / 项目合作方",
      content: "善于将繁杂混乱的各方需求抽丝剥茧，转化成清晰顺畅的人机交互系统。多次主导复杂系统平稳落地，值得信赖。",
      tag: "系统架构力"
    },
    {
      name: "朱杰",
      role: "界面设计协同负责人",
      content: "对界面的动线细节和交互手感要求极高，排斥假大空的装饰，真正追求‘让人用得舒服、判断极快’的高级设计审美。",
      tag: "交互审美"
    }
  ],
  education: [
    {
      period: "2017.09 - 2019.06",
      school: "郑州轻工业学院",
      degree: "本科",
      major: "土木工程",
      type: "统招"
    },
    {
      period: "2015.09 - 2017.06",
      school: "河南工业大学",
      degree: "本科",
      major: "电脑艺术设计",
      type: "自考"
    },
    {
      period: "2014.09 - 2017.06",
      school: "河南理工大学万方科技学院",
      degree: "专科",
      major: "建筑工程技术",
      type: "统招"
    }
  ],
  volunteer: [
    {
      period: "2020.10 - 至今",
      title: "社区志愿服务 / 技术协助",
      desc: "负责社区物资调配协调与志愿者人力排班。获“志愿服务优秀工作者”表彰。",
      location: "郑州市 · 社区一线"
    }
  ],
  skills: [
    {
      category: "交互架构与状态机",
      items: ["Contextual UI 交互解耦", "人机交互设计 (Human-AI UX)", "复杂业务领域建模 (DDD)", "指标决策中枢", "全流程敏捷推进"]
    },
    {
      category: "全栈与工程实践",
      items: ["Cursor / Claude 结对编程", "React 19 / Vue 3 全代码", "TypeScript / Tailwind CSS", "ECharts / Canvas 可视化", "SQL 数据深度下钻"]
    },
    {
      category: "核心探索方向",
      items: ["现代 Web 前端工程", "19:5 响应式数据大屏", "触觉与微交互设计", "自动化流程与性能调优"]
    }
  ],
  experience: [
    {
      period: "2026.01 - 至今",
      company: "数字科技创新实验室",
      role: "Web 前端交互研发 / 架构探索",
      highlights: [
        "主导全景实时数据分析看板与决策中枢架构，探索将交互状态流与自动化推理深度融合。",
        "践行“全栈工程化”理念，熟练运用 Cursor/Claude 亲自跑通关键交互动线与 **高保真代码落地**，大幅消除产研沟通损耗。",
        "建立毫秒级数据动态监控与状态预警矩阵，将界面异常感知周期直降跨越至“极速捕获”。"
      ]
    },
    {
      period: "2024.04 - 2025.09",
      company: "郑州汇浪网络科技有限公司",
      role: "前端工程开发 / 体验设计",
      highlights: [
        "负责内部管理后台与中台系统的前端重构，理清底层交互逻辑，实现使用体验整体 **提效 40%**。",
        "建立标准化交互规范与组件设计体系，主导核心功能模块的高保真方案输出与跨团队敏捷推进。",
        "紧密协调研发与设计团队，保障多个系统级项目按期高质量交付上线。"
      ]
    },
    {
      period: "2023.07 - 2024.02",
      company: "郑州中兴工程数字化技术室",
      role: "前端开发工程师 (数据核验端)",
      highlights: [
        "参与智慧城市数字化核查项目，负责城管、消防等子项的前端交互流向梳理与系统逻辑抽象。",
        "输出前端流程拓扑图与组件模型，将核心方案对齐周期缩短 30% 以上。"
      ]
    },
    {
      period: "2020.09 - 2023.11",
      company: "河南塔姆网络科技有限公司",
      role: "前端交互开发",
      highlights: [
        "负责多端系统的交互动线设计与用户行为路径优化，持续推进敏捷迭代与数据指标复盘。",
        "深入一线调研用户真实诉求，完成了多个业务组件从 **0 到 1** 的立项与平稳运维。"
      ]
    },
    {
      period: "2019.09 - 2020.09",
      company: "河南汪特文化发展有限公司",
      role: "前端开发专员",
      highlights: [
        "主导内部资产管理 ERP 与调度工具的逻辑设计，实现库存实时监控与告警，降低协作损耗。",
        "优化业务录入全链路交互，有效减少线下物料损耗与人工统计错误率。"
      ]
    }
  ],
  projects: [
    {
      title: "全景数据可视化分析中台",
      tag: "前端数据流 / 状态机中枢",
      category: "desktop",
      shortDesc: "聚焦前端高频数据流渲染与状态管理。将多源图表与实时异常捕获封装为高内聚的组件中枢。",
      labels: {
        zh: ["前端状态机", "19:5 栅格布局", "数据流解耦", "组件化构建"],
        en: ["State Machine", "19:5 Grid Layout", "Data Decoupling", "Component Dev"]
      },
      folder: "haiyi_douyin",
      scenes: [
        {
          title: "19:5 宽屏排版与多图表联动渲染",
          description: "基于 CSS Grid 制定 19:5 黄金分割排版，统一整合多维数据流、折线图与柱状图联动，视线聚焦核心指标。",
          type: "desktop",
          images: [
            "/assets/projects/haiyi_douyin/douyin_dashboard.jpg",
            "/assets/projects/haiyi_douyin/douyin_ux_optimization.jpg"
          ]
        },
        {
          title: "异常捕获与自动化状态预警",
          description: "构建前端数据流预警阈值体系，通过红绿色状态标示实现毫秒级数据异动感知。",
          type: "desktop",
          images: [
            "/assets/projects/haiyi_douyin/douyin_target_mgmt.jpg",
            "/assets/projects/haiyi_douyin/douyin_ai_chat.png"
          ]
        }
      ],
      details: {
        intro: "探索复杂数据面板的前端架构，重点解决多图表联动时的数据重绘性能与组件解耦。",
        contributions: [
          "**多源数据流重构**：规范化前端数据清洗逻辑，提升组件渲染复用率与类型安全性。",
          "**组件化全栈构建**：基于现代 React 与 TypeScript，将高密度交互快速落地为模块化组件。",
          "**细颗粒度状态拦截**：设计动态状态机流转机制，保障异常分支在前端得到友好捕获与提示。"
        ],
        results: [
          "页面重绘与数据更新响应延迟压缩至 100ms 以内。",
          "组件模块化复用率提升 60% 以上，支持多端自适应渲染。"
        ]
      }
    },
    {
      title: "19:5 宽屏响应式排版实验室",
      tag: "复杂数据排版 / 视觉降噪",
      category: "desktop",
      shortDesc: "探索非标大屏的前端自适应排版。基于 CSS Grid 与绝对比例切分，在超宽比例下实现秒级可读性。",
      labels: {
        zh: ["19:5 黄金比例", "视觉降噪", "响应式排版", "Canvas 渲染"],
        en: ["19:5 Ratio", "Visual Denoise", "Responsive Layout", "Canvas Render"]
      },
      folder: "dashboards",
      scenes: [
        {
          title: "全屏监控维度与极简排版呈现",
          description: "通过多维度可视化图表，将活跃度与效能等核心指标进行解耦呈现。摒弃无效视觉冗余，专注数据清晰可读性。",
          type: "desktop",
          images: [
            "/assets/projects/dashboards/dash_overview.png",
            "/assets/projects/dashboards/dash_today_overview.png",
            "/assets/projects/dashboards/dash_finance.png",
            "/assets/projects/dashboards/dash_users.png",
            "/assets/projects/dashboards/dash_activity_stats.png",
            "/assets/projects/dashboards/dash_guild_ops.png"
          ]
        }
      ],
      details: {
        intro: "通过 PC 大屏与移动版双端数据可视化，探索复杂数据界面的极简排版与秒级判断交互。",
        contributions: [
          "**视觉层级重构**：梳理图表视觉层级，砍掉无效的视觉装饰，专注数据清晰度。",
          "**双端响应式适配**：大屏端主攻多指标联动监控，移动端主导轻量核心视图流转。",
          "**阈值预警自动化**：建立多层级数据过滤模型，配套自动化高亮预警机制。"
        ],
        results: [
          "数据信息密度与阅读速度提升显著。",
          "实现 100% 纯前端响应式自适应布局。"
        ]
      }
    },
    {
      title: "交互式在线测试与复杂表单组件",
      tag: "组件化交互 / 状态机设计",
      category: "desktop",
      shortDesc: "从防作弊状态机到动态题库配置，设计兼顾操作体验与容错机制的跨终端答题组件库。",
      labels: {
        zh: ["动态表单校验", "步骤条交互", "考试计时器", "组件化设计"],
        en: ["Form Validation", "Stepper UX", "Exam Timer", "Component Design"]
      },
      folder: "edu_platform",
      scenes: [
        {
          title: "沉浸式学习与答题交互动线",
          description: "极简学考体验组件，涵盖多媒体课程播放、即时选项高亮、本地防断网暂存与模拟考核。",
          type: "mobile",
          images: [
            "/assets/projects/edu_platform/edu_login.png",
            "/assets/projects/edu_platform/edu_home.png",
            "/assets/projects/edu_platform/edu_courses.png",
            "/assets/projects/edu_platform/edu_course_video.png",
            "/assets/projects/edu_platform/edu_course_video_02.png",
            "/assets/projects/edu_platform/edu_exam_detail.png",
            "/assets/projects/edu_platform/edu_learning_detail.png",
            "/assets/projects/edu_platform/edu_exam_review.png",
            "/assets/projects/edu_platform/edu_knowledge_list.png",
            "/assets/projects/edu_platform/edu_messages.png",
            "/assets/projects/edu_platform/edu_profile.png"
          ]
        },
        {
          title: "控制台视窗与动态表单排版",
          description: "控制台排版视窗，支持批量题库编辑、计划调度与多维数据统计图表。",
          type: "desktop",
          images: [
            "/assets/projects/edu_platform/edu_admin_dashboard.png",
            "/assets/projects/edu_platform/edu_admin_add_paper.png",
            "/assets/projects/edu_platform/edu_admin_add_question.png",
            "/assets/projects/edu_platform/edu_admin_paper_mgmt.png",
            "/assets/projects/edu_platform/edu_admin_question_bank.png",
            "/assets/projects/edu_platform/edu_enterprise_list.png",
            "/assets/projects/edu_platform/edu_enterprise_list_02.png",
            "/assets/projects/edu_platform/edu_training_plan.png"
          ]
        }
      ],
      details: {
        intro: "探索复杂多步骤表单与在线测试组件的前端工程实现，实现跨终端高度一致的交互体验。",
        contributions: [
          "**复杂表单状态校验**：设计动态规则校验器，支持步骤回溯与即时错误定位。",
          "**全流程状态机规划**：梳理“浏览 -> 练习 -> 模拟测试 -> 结果反馈”的完整生命周期动线。",
          "**异常容错与本地兜底**：设计窗口失焦监听、意外断网即时本地 LocalStorage 恢复机制，保障答题体验可靠。"
        ],
        results: [
          "跨平台与多终端组件适配覆盖率达 100%。",
          "意外中断与异常恢复成功率接近 100%。"
        ]
      }
    },
    {
      title: "系统运行逻辑与流程拓扑可视化",
      tag: "逻辑抽象 / 架构图元化",
      category: "desktop",
      shortDesc: "针对大型复杂工程的黑盒痛点，通过标准化拓扑节点将复杂系统逻辑降维呈现，协作成本显著降低。",
      labels: {
        zh: ["拓扑图元", "流程图渲染", "状态机可视化", "SVG/Canvas"],
        en: ["Topology Graph", "Flowchart Render", "State Machine", "SVG/Canvas"]
      },
      folder: "audit_project",
      scenes: [
        {
          title: "系统逻辑抽象与拓扑图元化呈现",
          description: "为复杂系统设计的流程可视化模版，通过思维拓扑图将复杂数据链路与运行节点清晰解耦。",
          type: "desktop",
          images: ["/assets/projects/audit_project/audit_process_logic.png"],
          isSensitive: false
        }
      ],
      details: {
        intro: "探索复杂系统流程图与拓扑结构的可视化渲染，将多层级业务逻辑转化为清晰直观的前端图元。",
        contributions: [
          "**标准化图元模板设计**：独立设计拓扑图元规范，统一各节点逻辑验证要点，消灭黑盒状态。",
          "**全链路状态穿透**：追踪多模块数据流转流程，排查逻辑断点并给出优化方案。",
          "**前端图元抽象工程**：基于 SVG 与 Canvas 打造流畅的节点拖拽与连线缩放体验。"
        ],
        results: [
          "复杂业务流程的阅读理解速度大幅加快。",
          "图元模型被多个前端系统工程直接复用。"
        ]
      }
    }
  ]
};
