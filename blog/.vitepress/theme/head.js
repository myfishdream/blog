export const head = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['link', { rel: 'icon', href: '/logo.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/logo.png' }], 
  ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }],
  ['meta', { property: 'og:image', content: '/logo.png' }],
  ['meta', { name: 'referrer', content: 'no-referrer' }],
  [
    "link",
    { rel: "stylesheet", href: "/static/css/fancybox.css" },   //全局控制图片放大样式
  ],
  ["script", { src: "/static/js/fancybox.umd.js" }],  //全局控制图片放大交互
];