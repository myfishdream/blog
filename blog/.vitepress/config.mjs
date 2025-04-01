//模板配置文件
import { defineConfig } from 'vitepress'
// import { genFeed } from './theme/genFeed'
import { head } from './theme/head';
// import { ThemeConfig } from './theme/types';    
import mdItCustomAttrs from 'markdown-it-custom-attrs'
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'

export default defineConfig({
    lang: 'zh-cn',
    markdown: {
        config: (md) => {
            // use more markdown-it plugins!
            md.use(mdItCustomAttrs, 'image', {
                'data-fancybox': "gallery"
            })
        }
    },
    // 字体单独配置
    title: '鱼梦江湖',
    base: '/',
    head,
    description: '技术学习笔记和心得体会，知识点总结。',
    ignoreDeadLinks: true,  
    themeConfig: {
        beecodeurl: 'https://www.appbeebee.com/', //这里是内页ArticleLink组件用到的跳转第三方网址，一般用不到，仅仅用于二次开发
        sidebar: [{}], //这里如果删掉，左侧栏的内容全部不显示。页面布局会变成通栏
        nav: [
            { text: '好玩的', link: 'https://blog.yumeng.icu' },
            { text: '好吃的', link: 'https://beebee.work/' }
        ],
        music: [ //音乐列表，音乐播放器参数在.vitepress/store/player.ts。封面和歌词不支持可自行按照文章教程修改
            // {
            //     "id": 1,
            //     "title": "陷落Falling",
            //     "author": "不知名选手Au / 马也_Crabbit",
            //     "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0Nzk=",
            //     "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/01.jpg",
            //     "lrc": ""
            // },
            // {
            //     "id": 2,
            //     "title": "一个人想着一个人 ",
            //     "author": "如懿",
            //     "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0ODA=",
            //     "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/02.jpg",
            //     "lrc": ""
            // },
            // {
            //     "id": 3,
            //     "title": "夜车（Cover 曾轶可）",
            //     "author": "姜铭杨",
            //     "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE0ODE=",
            //     "pic": "https://enshimama.oss-cn-shanghai.aliyuncs.com/smartgallery/music/03.jpg",
            //     "lrc": ""
            // },
            {
                "id": 4,
                "title": "迎春花 / 財神到 / 祝福你 (廣東)",
                "author": "邓丽君 / 林子祥 / 甄妮",
                "url": "https://res.wx.qq.com/voice/getvoice?mediaid=MzUzMDUzMjQyMl8xMDAwMDE4NTI=",
                "pic": "",  
                "lrc": ""
            }
        ],
        banner: [ //主页轮播，不需要就注释掉
            {
                link: '/posts/2024/01/freebie-chinese-font.html',
                image: 'https://s21.ax1x.com/2025/02/22/pEl3qMt.jpg',
                title: ''
            },
            {
                link: '/posts/2024/01/freebie-chinese-font.html',
                image: 'https://s21.ax1x.com/2025/02/22/pEl3qMt.jpg',
                title: ''
            }
        ],
        // search: {
        //     provider: 'local',
        //     options: {
        //         miniSearch: {
        //             /**
        //              * @type {Pick<import('minisearch').Options, 'extractField' | 'tokenize' | 'processTerm'>}
        //              */
        //             options: {
        //             },
        //             /**
        //              * @type {import('minisearch').SearchOptions}
        //              * @default
        //              * { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
        //              */
        //             searchOptions: {
        //               /* ... */
        //             }
        //           },

        //         locales: {
        //             root: {
        //                 translations: {
        //                     button: {
        //                         buttonText: '搜索文档',
        //                         buttonAriaLabel: '搜索文档'
        //                     },
        //                     modal: {
        //                         noResultsText: '无法找到相关结果',
        //                         resetButtonTitle: '清除查询条件',
        //                         footer: {
        //                             selectText: '选择',
        //                             navigateText: '切换',
        //                             closeText: '关闭'
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // },
        outlineTitle: '目录',

        socialLinks: [
            { icon: 'github', link: 'https://github.com/yumengjianghu' },
            {
                icon: {
                    svg: '<svg t="1740917079095" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10635" width="256" height="256"><path d="M998.4 352.256c-3.072-136.192-121.856-162.304-121.856-162.304s-92.672-0.512-212.992-1.536l87.552-84.48s13.824-17.408-9.728-36.864c-23.552-19.456-25.088-10.752-33.28-5.632-7.168 5.12-112.128 108.032-130.56 126.464-47.616 0-97.28-0.512-145.408-0.512h16.896S323.584 63.488 315.392 57.856s-9.216-13.824-33.28 5.632c-23.552 19.456-9.728 36.864-9.728 36.864l89.6 87.04c-97.28 0-181.248 0.512-220.16 2.048C15.872 225.792 25.6 352.256 25.6 352.256s1.536 271.36 0 408.576c13.824 137.216 119.296 159.232 119.296 159.232s41.984 1.024 73.216 1.024c3.072 8.704 5.632 51.712 53.76 51.712 47.616 0 53.76-51.712 53.76-51.712s350.72-1.536 379.904-1.536c1.536 14.848 8.704 54.272 56.832 53.76 47.616-1.024 51.2-56.832 51.2-56.832s16.384-1.536 65.024 0c113.664-20.992 120.32-154.112 120.32-154.112s-2.048-273.92-0.512-410.112z m-97.792 434.176c0 21.504-16.896 38.912-37.888 38.912h-691.2c-20.992 0-37.888-17.408-37.888-38.912V328.192c0-21.504 16.896-38.912 37.888-38.912h691.2c20.992 0 37.888 17.408 37.888 38.912v458.24z" fill="#515151" p-id="10636"></path><path d="M409.088 418.816l-203.264 38.912 17.408 76.288 201.216-38.912zM518.656 621.056c-49.664 106.496-94.208 26.112-94.208 26.112l-33.28 21.504s65.536 89.6 128 21.504c73.728 68.096 130.048-22.016 130.048-22.016l-30.208-19.456c0-0.512-52.736 75.776-100.352-27.648zM619.008 495.104l201.728 38.912 16.896-76.288-202.752-38.912z" fill="#515151" p-id="10637"></path></svg>'
                },
                link: 'https://space.bilibili.com/1162766914',
            }
        ],
        docFooter: {
            prev: '上一篇',
            next: '下一篇'
        },
        darkModeSwitchLabel: '暗黑切换',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        article: {
            cc: {
                author: '鱼梦江湖', //此信息将显示在文章底部和博主卡片中
                authorLink: 'https://blog.yumeng.icu',
                license: '署名-相同方式共享 4.0 国际 (CC BY-SA 4.0)',
                licenseLink: 'http://creativecommons.org/licenses/by-sa/4.0/'
            }
        },
        website: {
            copyadd: true, //用户复制页面内容时尾巴自动添加版权声明
            perpage: 12, //列表页每页显示数量
            homeBanner: true, //显示首页 banner,banner列表在上面 banner中配置
            bannerHeight: 300, //banner高度
            showWelcome: true, //是否显示首页底部右下角弹框，（调试时弹框不显示的话先关闭浏览器再运行，因为有可能开启了缓存）内容请在组件.vitepress/theme/components/Welcome.vue编写
            welcomeusestate: false, //底部弹框是否使用sessionStorage缓存(即不关闭页面仅显示一次)
            welcome: {
                autoClose: 6000, //多长时间自动关闭，false为不关闭
            },
            showSnow: true, //是否开启雪花。开启后仅在暗黑模式下显示
            showUserCard: false, //是否显示列表中的博主名片
            cardPosition: 3, //显示在第几个位置
            cardMusic: true, //是否显示播放音乐，音乐列表在上面 music中配置
            cardCoffee: true, //是否显示打赏咖啡，
            coffeeQrcode: 'https://image.baidu.com/search/down?url=https://fc.sinaimg.cn/large/6364aa43gy1hm0f859sm6j208c08cabm.jpg', //打赏咖啡二维码图片地址。如果是跳转网页地址需自行修改代码
            showLantern: true, //是否显示灯笼挂件
            lanternText: ['康'], //灯笼上的字,数组形式
            showFirework: true, //是否显示侧栏烟花特效
            fireworkTitle: '点击发射 | 许个愿把！', //烟花许愿标题
            fireworkWords: ['恭贺新禧', '万事如意', '新年快乐', '恭喜发财', '岁岁平安', '吉祥如意', '心想事成', '万事顺遂', '一帆风顺', '二龙腾飞', '三羊开泰', '四季平安', '五福临门', '六六大顺', '七星高照', '八方来财', '九九同心', '十全十美', '荣华富贵', '金玉满堂', '龙凤呈祥', '喜气洋洋', '鸿运当头', '财源广进', '笑口常开', '幸福安康', '日进斗金', '生意兴隆', '步步高升', '年年有余', '迎春接福', '喜气盈门', '花团锦簇', '前程似锦', '福满人间', '春回大地', '辞旧迎新', '万象更新', '吉祥如意', '万事大吉', '马到成功', '功成名就', '鱼跃龙门', '一飞冲天', '瑞气盈门', '福寿康宁', '时来运转', '鸿运高照', '三阳开泰', '否极泰来', '鸿运亨通', '一帆风顺', '出入平安', '顺风顺水', '龙凤呈祥', '花好月圆', '张灯结彩', '欢天喜地', '合家欢乐', '幸福美满', '和气致祥', '招财进宝', '开门大吉', '迎春接福', '福泽满门', '花开富贵', '竹报平安', '大吉大利', '恭喜发财'], //烟花许愿关键词
            showFooter: true, //是否显示全局底部信息
            icpRecordCode: '-',  //网站备案号
            publicSecurityRecordCode: '-', //公安备案号
            link: 'https://blog.yumeng.icu/'
        },
        logo: {
            light: '/logo.png',
            dark: '/logo.png'
        }
    },
    srcExclude: ['README.md'],
    vite: {
        server: {
            port: 5000,
            host: '0.0.0.0'
        },
        plugins: [pagefindPlugin({   //使用 pagefind搜索插件 https://www.npmjs.com/package/vitepress-plugin-pagefind
            customSearchQuery: chineseSearchOptimize,
            btnPlaceholder: '搜索文档',
            placeholder: '搜索文档',
            emptyText: '没有内容',
            heading: '共 {{searchResult}} 条结果'
        })]
    },
    // buildEnd: genFeed
})
