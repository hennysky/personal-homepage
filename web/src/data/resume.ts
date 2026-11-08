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
      content: "业务抓得极准，绝不在办公室凭空画图。能深入到采销一线梳理出最真实的异常卡点，还能把 AI 预警切切实实做进系统里。",
      tag: "业务敏锐度"
    },
    {
      name: "刘显龙",
      role: "全栈技术负责人",
      content: "极其少见‘懂业务、懂交互、还能自己跑代码’的全面型产品人。给出的方案逻辑滴水不漏，协作起来没有丝毫扯皮损耗。",
      tag: "全栈协同"
    },
    {
      name: "张总",
      role: "某科技公司 CEO / 邮政项目方",
      content: "善于将繁杂混乱的各方需求抽丝剥茧，转化成清晰顺畅的人机交互系统。多次主导复杂政企项目平稳落地，值得信赖。",
      tag: "系统架构力"
    },
    {
      name: "朱杰",
      role: "界面设计协同负责人",
      content: "对界面的动线细节和交互手感要求极高，排斥假大空的装饰，真正追求‘让人用得舒服、判断极快’的高级设计审美。",
      tag: "产品审美"
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
      title: "社区防疫负责人 / 志愿者",
      desc: "负责郑州中原区社区防疫物调配、志愿者人力排班及人员排查。获“疫情防控优秀志愿者”证书。",
      location: "郑州市 · 社区一线"
    }
  ],
  skills: [
    {
      category: "AI 与产品架构",
      items: ["AI Agent 业务内嵌", "人机交互设计 (Human-AI UX)", "复杂业务领域建模 (DDD)", "指标决策中枢", "全流程敏捷推进"]
    },
    {
      category: "全栈与工程实践",
      items: ["Cursor / Claude 结对编程", "React 19 / Vue 3 全代码", "Prompt 调优与工作流", "ECharts / Canvas 可视化", "SQL 数据深度下钻"]
    },
    {
      category: "核心探索方向",
      items: ["AI 原生应用落地", "决策级数据大屏与中台", "触觉与微交互设计", "业务自动化与减负"]
    }
  ],
  experience: [
    {
      period: "2026.01 - 至今",
      company: "郑州海一云商实业有限公司",
      role: "AI 数字化产品经理 / 架构设计",
      highlights: [
        "主导抖音电商运营决策全景大脑从 **0 到 1 架构规划**，将 AI 智能体推理深度嵌入一线运营卡点。",
        "践行“全栈产品人”理念，熟练运用 Cursor/Claude 亲自跑通关键交互动线与 **高保真代码落地**，大幅消除产研沟通损耗。",
        "建立分钟级智能预警与指标监控矩阵，将经营风险感知周期由传统的“次日人工追溯”直降跨越至“极速捕获”。"
      ]
    },
    {
      period: "2024.04 - 2025.09",
      company: "郑州汇浪网络科技有限公司",
      role: "软件产品经理 / 体验设计负责人",
      highlights: [
        "负责内部运营管理后台与业务中台的重构设计，理清底层业务逻辑，实现运营整体 **提效 40%**。",
        "建立标准化交互规范与组件设计体系，主导核心功能模块的高保真方案输出与跨团队敏捷推进。",
        "紧密协调研发与设计团队，保障多个系统级项目按期高质量交付上线。"
      ]
    },
    {
      period: "2023.07 - 2024.02",
      company: "河南中兴工程造价咨询有限公司",
      role: "产品经理 (数字化审计端)",
      highlights: [
        "参与郑州智慧城市数字化核查项目，负责城管、消防等子项的业务流向梳理与系统逻辑抽象。",
        "输出专业审计思维导图与工作底稿，累计审减金额近 **1000万元**，将核心方案对齐周期缩短 30% 以上。"
      ]
    },
    {
      period: "2020.09 - 2023.11",
      company: "河南塔姆网络科技有限公司",
      role: "产品经理",
      highlights: [
        "负责多端系统的交互动线设计与用户行为路径优化，持续推进敏捷迭代与数据指标复盘。",
        "深入一线调研用户真实诉求，完成了多个业务组件从 **0 到 1** 的立项与平稳运维。"
      ]
    },
    {
      period: "2019.09 - 2020.09",
      company: "河南汪特文化发展有限公司",
      role: "产品专员",
      highlights: [
        "主导内部资产管理 ERP 与调度工具的逻辑设计，实现库存实时监控与告警，降低协作损耗。",
        "优化业务录入全链路交互，有效减少线下物料损耗与人工统计错误率。"
      ]
    }
  ],
  projects: [
    {
      title: "AI 驱动的电商运营决策大脑",
      tag: "AI 原生应用 / 决策中枢",
      category: "desktop",
      shortDesc: "拒绝无意义的对话框。将大模型推理与分钟级异常监测无缝嵌入电商采销与直播复盘，一人成团全栈落地。",
      labels: {
        zh: ["AI 异常预警", "19:5 决策大屏", "Agent 流程嵌入", "全栈代码交付"],
        en: ["AI Smart Alert", "19:5 Dashboard", "Agent Workflow", "Full Stack Code"]
      },
      folder: "haiyi_douyin",
      scenes: [
        {
          title: "严格界定的 19:5 决策级大屏与复杂业务映射",
          description: "摒弃常规拼接组件带来的视觉散乱感。明文制定“左19 : 右5”黄金分割比例，统一降噪整合交易、流量结构与多维明细。首创针对海量主播/品牌的精细化选控器，让决策目光聚焦在核心异动上。",
          type: "desktop",
          images: [
            "/assets/projects/haiyi_douyin/douyin_dashboard.jpg",
            "/assets/projects/haiyi_douyin/douyin_ux_optimization.jpg"
          ]
        },
        {
          title: "长线目标驱动与分钟级智能预警枢纽",
          description: "全面淘汰业务侧“人工扒表格排查”的历史泥沼。重构月度日均目标排期体系，底层搭载红绿色报警阈值线，将经营风险感知时长由传统的“次日追溯”直降跨越至极速捕获。",
          type: "desktop",
          images: [
            "/assets/projects/haiyi_douyin/douyin_target_mgmt.jpg",
            "/assets/projects/haiyi_douyin/douyin_ai_chat.png"
          ]
        }
      ],
      details: {
        intro: "这是一个从业务深水区长出来的破局之作。它的核心在于一份逻辑极深的《产品架构与实施方案》。通过统筹业务逻辑并将 AI 结对工具作为研发搭档，我独立穿透了从高保真数据原型到交付最终 34 个生产级接口并直通投产发版的极限闭环。",
        contributions: [
          "**深度业务流重构**：直面多源复杂数据现状，将其清洗规一化并凝练萃取成贴近一线商业本源的标准业绩模型。",
          "**全栈产品人落地兑现**：撕掉‘只画线框图’的传统刻板标签，将业务痛点与高质量交互标准直接转化为全景大盘代码，沟通损耗清零。",
          "**高安防级别的鉴权拦截**：设计并落地了动态细颗粒访问控制网（RBAC），严格保障机密数据的隔离与安全。"
        ],
        results: [
          "**大幅节降开发预算**：以极客单兵作战范式跨越传统外包沟通周期，直接为公司节省数万元隐形成本。",
          "**全链路业务决策跃迁**：上线后彻底消除业务数据盲区，从总监调度到一线复盘，真正做到‘每一笔消耗波动皆可微距溯源’。"
        ]
      }
    },
    {
      title: "19:5 决策级数据监控大屏",
      tag: "复杂数据系统 / 视觉降噪",
      category: "desktop",
      shortDesc: "剔除所有假大空的 3D 飞线与无效渐变。以 19:5 黄金比例提炼核心指标，让异常判断压缩在 3 秒之内。",
      labels: {
        zh: ["19:5 黄金比例", "视觉降噪", "秒级判断", "多图联动"],
        en: ["19:5 Ratio", "Visual Denoise", "Sub-3s Decision", "Multi-Chart"]
      },
      folder: "dashboards",
      scenes: [
        {
          title: "全盘业务监控维度与降噪呈现",
          description: "通过多维度可视化图表，将营收流水、活跃度与运营效能等核心指标进行解耦呈现。摒弃无效视觉冗余，专注数据清晰可读性。",
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
        intro: "通过 PC 大屏与移动版双端数据可视化，探索复杂数据系统的极简排版与秒级判断交互。",
        contributions: [
          "**指标体系重构**：深度对齐管理层与一线诉求，梳理全盘指标链路，消除‘人找数据’的低效泥潭。",
          "**双端场景适配**：大屏端主攻多指标联动监控，移动端主导轻量核心数据推送。",
          "**阈值预警自动化**：建立多层级数据权限过滤模型，配套自动化红绿阈值预警机制。"
        ],
        results: [
          "覆盖管理层 80% 以上的核心业务决策场景。",
          "终结人工统计延迟，每日数据分析与决策耗时大幅缩短。"
        ]
      }
    },
    {
      title: "多端在线学习与考核系统",
      tag: "端到端体验 / 复杂交互动线",
      category: "desktop",
      shortDesc: "从防作弊状态机到动态题库配置，为政企多角色设计兼顾合规与易用性的跨终端交互体验。",
      labels: {
        zh: ["跨端适配", "状态机设计", "无障碍交互", "中台管理"],
        en: ["Multi-Platform", "State Machine", "Accessible UX", "Admin Hub"]
      },
      folder: "edu_platform",
      scenes: [
        {
          title: "学员端沉浸式学习与答题交互",
          description: "为数万名行业从业人员设计的极简学考体验，涵盖流式视频课程、即时选项高亮、本地防断网暂存与模拟考试。",
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
          title: "管理端控制台与动态题库排版",
          description: "为管理者提供的视窗中枢，支持企业信息审核、批量题库编辑、考试计划调度与多维培训报表统计。",
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
        intro: "覆盖政企多角色的在线安全培训与考试认证系统，将传统线下繁琐分散的流程升级为全链路线上化。",
        contributions: [
          "**需求翻译与合规平衡**：在严苛的政务合规标准与一线工人极简操作之间找到最佳平衡点。",
          "**全流程状态机规划**：梳理‘报名 -> 刷课 -> 模拟 -> 正式考试 -> 证书核发’的完整用户生命周期动线。",
          "**防作弊状态与异常兜底**：设计窗口失焦监听、意外断网即时本地恢复机制，保障答题体验可靠。"
        ],
        results: [
          "成功支撑全省数万名行业人员平稳参加线上培训与考核，零故障发生。",
          "严谨实用的功能设计获得多方认可，成为区域标准化培训抓手。"
        ]
      }
    },
    {
      title: "系统运行逻辑与流程拓扑核查",
      tag: "逻辑抽象 / 架构图元化",
      category: "desktop",
      shortDesc: "针对大型复杂项目的黑盒痛点，通过标准化拓扑思维导图将复杂业务逻辑降维呈现，协作成本骤降 40%。",
      labels: {
        zh: ["拓扑图元", "业务逻辑降维", "标准化工作底稿", "跨团队协同"],
        en: ["Topology Graph", "Logic Reduction", "Standard Working Paper", "Cross-team Sync"]
      },
      folder: "audit_project",
      scenes: [
        {
          title: "审计信息化逻辑抽象与图元化呈现",
          description: "为大型复杂项目设计的核查标准模版，通过思维导图将复杂数据链路与运行节点清晰解耦，显著提升跨部门共识效率。",
          type: "desktop",
          images: ["/assets/projects/audit_project/audit_process_logic.png"],
          isSensitive: false
        }
      ],
      details: {
        intro: "针对大型智慧城市项目子系统的上网运行情况进行全面核查与逻辑梳理，排查业务断点。",
        contributions: [
          "**标准化图元模板设计**：独立设计拓扑思维导图规范，统一核查标准与逻辑验证要点，消灭黑盒状态。",
          "**全链路数据穿透核查**：追踪多模块运行流程，排查不合理逻辑断点并输出具建设性的优化方案。",
          "**跨团队高效协同推进**：对接技术方、业务方与审计单位，统一术语与认知，大幅压缩沟通误差。"
        ],
        results: [
          "核心报告修改次数从平均 5 次压缩至 2 次，交付周期缩短 30%。",
          "产出 43 份高质量工作底稿（其中 35 份被官方直接采纳支撑决策）。"
        ]
      }
    }
  ]
};
