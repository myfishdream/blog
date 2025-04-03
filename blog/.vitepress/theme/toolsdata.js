
const badge = {
  new: 'NEW',
  hot: 'HOT',
  beta: 'BETA',
  default: 'DEFAULT'
}
const badgeType = {
  new: 'new',
  hot: 'hot',
  beta: 'beta',
  default: 'default'
}

export const toolsdata = [
  {
    title: '最近访问',
    items: [
      {
        title: 'Quick Reference',
        desc: '为开发人员分享快速参考备忘清单(速查表)',
        link: 'https://wangchujiang.com/reference/',
        linktxt: 'wangchujiang.com/reference',
      },
      {
        title: '前端进阶',
        desc: '木易杨前端进阶',
        link: 'https://muyiy.cn/',
        linktxt: 'muyiy.cn',
      }
    ]
  },
  {
    title: '设计',
    items: [
      {
        icon: 'https://uiverse.io/static/images/uiverse-logo.svg',
        title: 'uiverse',
        desc: '一个免费的UI设计工具，提供多种UI设计模板，可以帮助设计师快速创建出美观的UI设计',
        link: 'https://uiverse.io/',
        linktxt: 'uiverse.io',
        badge: badge.hot,
        badgeType: badgeType.hot
      },
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hl1ksv896vj2040040gld.jpg',
        title: 'fococlipping',
        desc: '去除图片背景，透明背景',
        link: 'https://www.fococlipping.com/clip',
        linktxt: 'fococlipping.com',
        badge: badge.hot,
        badgeType: badgeType.hot
      },
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hl1kwegq4xj2040040gls.jpg',
        title: 'iconscout',
        desc: 'lottie动画转多种格式',
        link: 'https://iconscout.com/converter/lottie-to-gif',
        linktxt: 'iconscout.com',
      },
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hl1kzxqb8uj2040040weh.jpg',
        title: 'lottiefiles',
        desc: '免费lottie动画图标制作',
        link: 'https://lottiefiles.com/featured',
        linktxt: 'lottiefiles.com',
      },
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hl1l9rs87mj20400403yq.jpg',
        title: 'remix',
        desc: '好看又全的图标',
        link: 'https://remixicon.com/',
        linktxt: 'remixicon.com',
      },
      {
        title: 'excalidraw',
        desc: '在线手绘风流程图绘制',
        link: 'https://excalidraw.com/',
        linktxt: 'excalidraw.com',
      },
      {
        title: 'Carbon',
        desc: '代码图片生成',
        link: 'https://carbon.now.sh',
        linktxt: 'carbon.now.sh',
      },
      {
        title: 'Simple Icons',
        desc: '流行品牌的 3270 SVG 图标',
        link: 'https://simpleicons.org/',
        linktxt: 'simpleicons.org',
      },
      {
        title: '在线图标制作',
        desc: '一个直观的应用程序图标生成器，可让您自定义颜色、边框、阴影等',
        link: 'https://zhangyu1818.github.io/appicon-forge/',
        linktxt: 'appicon-forge',
      },
      {
        title: 'Raphael AI',
        desc: '世界首个免费无限制AI图像生成器',
        link: 'https://raphael.app/zh',
        linktxt: 'raphael.app',
      },
      {
        title: 'Reactbits',
        desc: '为创意开发人员精心挑选的动画组件集合',
        link: 'https://www.reactbits.dev/',
        linktxt: 'reactbits.dev',
      },
      {
        title: 'FREEP!K',
        desc: '免费素材网站，包含原始格式',
        link: 'https://www.freepik.com',
        linktxt: 'freepik.com',
      }
    ],
  },
  {
    title: '工具',
    items: [
      {
        title: '开发者武器库',
        desc: '涵盖多种工具',
        link: 'https://devtool.tech/',
        linktxt: 'devtool.tech',
      },
      {
        title: 'Video Compressor',
        desc: '压缩视频90%且不影响肉眼质量',
        link: 'https://tools.rotato.app/compress',
        linktxt: 'tools.rotato.app',
      },
      {
        title: '文叔叔',
        desc: '在线快速分享文件',
        link: 'https://www.wenshushu.cn/',
        linktxt: 'wenshushu.cn',
      },
      {
        title: '在线工具',
        desc: '在线代码压缩,二维码生成...',
        link: 'https://tool.lu/',
        linktxt: 'tool.lu',
      },
      {
        title: '在线代办清单',
        desc: '所有代办事项存储在本地',
        link: 'https://ricocc.com/todo/',
        linktxt: 'ricocc.com',
        badge: 'Github项目',
        badgeType: 'default'
      },
      {
        title: '路过图床',
        desc: '免费图床',
        link: 'https://imgse.com/',
        linktxt: 'imgse.com',
        badge: 'BETA',
        badgeType: 'beta'
      },
      {
        title: '蓝奏云',
        desc: '来这里，下载不限速度，不限流量，不限次数，免登录下载！',
        link: 'https://pc.woozooo.com/',
        linktxt: 'woozooo.com',
        badge: 'HOT',
        badgeType: 'hot'
      },
      {
        title: '极简插件',
        desc: '浏览器插件网站',
        link: 'https://chrome.zzzmh.cn/',
        linktxt: 'zzzmh.cn',
      },
      {
        title: 'UomgAPI',
        desc: '稳定、快速、免费的 API 接口服务',
        link: 'https://api.uomg.com/',
        linktxt: 'api.uomg.com',
      }
    ],
  },
  {
    title: '开发',
    items: [
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hl1ld9d136j2040040aa2.jpg',
        title: 'wordpress',
        desc: 'Wordpress Dashicons',
        link: 'https://developer.wordpress.org/resource/dashicons/',
        linktxt: 'wordpress.org',
      },
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hl1nmmgepyj2040040glq.jpg',
        title: 'vitepress',
        desc: 'VitePress开发文档',
        link: 'https://vitepress.dev/',
        linktxt: 'vitepress.dev',
      },
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hl1nmmg8vtj20400400ss.jpg',
        title: '图鸟组件库',
        desc: 'uniapp组件图鸟开发文档',
        link: 'https://vue3.tuniaokj.com/zh-CN/',
        linktxt: 'tuniaokj.com',
      },
      {
        title: 'MDN Web Docs',
        desc: '由 Mozilla 维护的开发者文档平台',
        link: 'https://developer.mozilla.org/zh-CN/',
        linktxt: 'developer.mozilla.org',
      },
      {
        title: '菜鸟教程',
        desc: '学的不仅是技术，更是梦想！',
        link: 'https://www.runoob.com/',
        linktxt: 'runoob.com',
      },
      {
        title: 'ES6 教程',
        desc: '《ECMAScript 6 教程》是一本开源的 JavaScript 语言教程',
        link: 'https://wangdoc.com/es6/',
        linktxt: 'wangdoc.com',
      },
      {
        title: 'JavaScript 教程',
        desc: '本教程全面介绍 JavaScript 核心语法',
        link: 'https://wangdoc.com/javascript/',
        linktxt: 'wangdoc.com',
      },
      {
        title: 'TypeScript 教程',
        desc: 'TypeScript 开源教程，介绍基本概念和用法',
        link: 'https://wangdoc.com/typescript/',
        linktxt: 'wangdoc.com',
      },
      {
        title: 'Lodash',
        desc: 'Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库',
        link: 'https://www.lodashjs.com/',
        linktxt: 'lodashjs.com',
      },
      {
        title: '课程笔记',
        desc: '尚硅谷系列课程笔记',
        link: 'https://www.yuque.com/tianyu-coder/openshare/ccpa0mz1pq213lhw',
        linktxt: 'yuque.com',
        badge: 'NEW',
        badgeType: 'new'
      },
      {
        title: 'Github搜索',
        desc: '所有成功都始于模板',
        link: 'https://github.com/search',
        linktxt: 'github.com',
      },
      {
        title: 'Github探索',
        desc: '兴趣推荐+每日热门',
        link: 'https://github.com/explore',
        linktxt: 'github.com',
        badge: 'HOT',
        badgeType: 'hot'
      }
    ],
  },
  {
    title: '大厂AI',
    items: [
      {
        title: 'DeepSeek',
        desc: '深度求索大模型对话工具',
        link: 'https://deepseek.com/',
        linktxt: 'deepseek.com',
      },
      {
        title: 'MINIMAX',
        desc: 'MINIMAX大模型对话工具',
        link: 'https://chat.minimaxi.com/',
        linktxt: 'chat.minimaxi.com',
      },
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hlp0rf7oz9j202s02s0sq.jpg',
        title: '文心一言',
        desc: '百度文心大模型对话工具',
        link: 'https://yiyan.baidu.com/',
        linktxt: 'yiyan.baidu.com',
      },
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hlp0vzegabj202s02swej.jpg',
        title: 'Sparkdesk',
        desc: '讯飞星火认知大模型对话工具',
        link: 'https://xinghuo.xfyun.cn/desk',
        linktxt: 'xinghuo.xfyun.cn',
      },
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hlp0v16ojsj202s02s0ss.jpg',
        title: '通义千问',
        desc: '阿里人工智能大模型对话工具',
        link: 'https://tongyi.aliyun.com/qianwen/',
        linktxt: 'tongyi.aliyun.com',
      },
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hlp0ursgp0j202i02iaa1.jpg',
        title: '混元助手',
        desc: '腾讯出品AI对话助手',
        link: 'https://hunyuan.tencent.com/bot/chat',
        linktxt: 'hunyuan.tencent.com',
      },
      {
        icon: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hlp0ujc888j202s02smx8.jpg',
        title: '豆包',
        desc: '抖音出品AI对话助手',
        link: 'https://www.doubao.com/',
        linktxt: 'doubao.com',
      },
      {
        title: '通义灵码',
        desc: '通义灵码是阿里云推出的智能编程助手，支持多种编程语言，包括Java、Python、C++等',
        link: 'https://lingma.aliyun.com/',
        linktxt: 'lingma.aliyun.com',
      }
    ],
  },
]
