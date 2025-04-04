// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import Firework from './components/Firework.vue'
import Lantern from './components/Lantern.vue'
import NewLayout from './components/NewLayout.vue'
import Archives from './components/Archives.vue'
import About from './components/About.vue'
import Feed from './components/Feed.vue'
import Tags from './components/Tags.vue'
import ArticleMetadata from './components/ArticleMetadata.vue'
import ArticleBread from './components/ArticleBread.vue'
import ArticleLink from './components/ArticleLink.vue'
import ArticleRelate from './components/ArticleRelate.vue'
import ArticleCC from './components/ArticleCC.vue'
import ArticleList from './components/ArticleList.vue'
import ArticlePage from './components/ArticlePage.vue'
import Home from './components/Home.vue'
import Page from './components/Page.vue'
import PageNavi from './components/PageNavi.vue'
import PageASide from './components/PageASide.vue'
import PageCtrol from './components/PageCtrol.vue'
import PageGZH from './components/PageGZH.vue'
import PageSlider from './components/PageSlider.vue'
import ArticleCarousel from './components/ArticleCarousel.vue'
import Player from './components/Player.vue'
import Tools from './components/Tools.vue'
import PopularDocs from './components/PopularDocs.vue'
import Welcome from './components/Welcome.vue'
import { createPinia } from 'pinia'   // //使用状态管理库。用于音乐播放器的状态监听
import FloatingVue from 'floating-vue'  // //使用 tooltip库。用于hover提示、悬浮框等。教程见https://floating-vue.starpad.dev/
import 'floating-vue/dist/style.css'
import Vue3Toasity from 'vue3-toastify';  //使用 toast 库。用于弹框提示反馈等。教程见https://vue3-toastify.js-bridge.com/
import 'vue3-toastify/dist/index.css';
import Countdown from './components/Countdown.vue'
import demo from './components/demo.vue'

import './components/style.css'
import './components/snow.css'  //一个 css3雪花特效，用于暗黑模式下显示雪花

const pinia = createPinia()


import { h } from 'vue'
import './style.css'
import './customize.css'

export default {
  ...DefaultTheme,
  Layout: NewLayout,  //使用自定义布局组件
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('Firework', Firework) //烟花特效组件
    app.component('Lantern', Lantern) //灯笼组件
    app.component('Tags', Tags) //标签组件
    app.component('Archives', Archives) //归档组件
    app.component('About', About) //关于组件
    app.component('Feed', Feed) //动态组件
    app.component('Home', Home) //首页组件
    app.component('Page', Page) //页面组件
    app.component('ArticleMetadata', ArticleMetadata) //文章元数据组件
    app.component('ArticleBread', ArticleBread) //文章面包屑组件
    app.component('ArticleLink', ArticleLink) //文章链接组件
    app.component('ArticleRelate', ArticleRelate) //文章相关组件
    app.component('ArticleCC', ArticleCC) //文章评论组件
    app.component('ArticleCarousel', ArticleCarousel) //文章轮播组件
    app.component('PageASide', PageASide) //页面侧边栏组件
    app.component('PageNavi', PageNavi) //页面导航组件
    app.component('PageGZH', PageGZH) //公众号组件
    app.component('PageCtrol', PageCtrol) //页面控制组件
    app.component('PageSlider', PageSlider) //页面滑动组件
    app.component('ArticleList', ArticleList) //文章列表组件
    app.component('ArticlePage', ArticlePage) //文章页面组件
    app.component('Player', Player) //音乐播放器组件
    app.component('Tools', Tools) //工具组件
    app.component('PopularDocs', PopularDocs) //链接组件
    app.component('Welcome', Welcome) //欢迎组件
    app.component('demo', demo) //demo组件
    app.component('Countdown', Countdown) //倒计时组件
    app.use(pinia) //使用状态管理库
    app.use(FloatingVue, {
      // https://floating-vue.starpad.dev/guide/config 具体配置见官网
      themes: {
        'tooltip': {
          distance: 8, //tooltip距离
          delay: { show: 500, hide: 0 },
        },
      },
    })
    app.use(Vue3Toasity, {
      // https://vue3-toastify.js-bridge.com/ 具体配置见官网
      "theme": "colored", //toast主题 
      "closeOnClick": false, //点击关闭
      "transition": "slide",  //动画效果
      "position": "top-center",  //位置
      "hideProgressBar": false,  //不隐藏进度条
    }); //toast容器选项
  }
}
