//订阅配置文件
import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'

const baseUrl = `https://blog.yumeng.icu`

export async function genFeed(config) {
  const feed = new Feed({
    title: '鱼梦',
    description: '前端技术分享博客',
    id: baseUrl,
    link: baseUrl,
    language: 'zh',
    image: `${baseUrl}/logo.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright:
      'Copyright © 2023-'+ new Date().getFullYear() + '鱼梦'
  })

  const posts = await createContentLoader('posts/*/*/*/index.md', {
    excerpt: true,
    render: true
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date) -
      +new Date(a.frontmatter.date)
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    // 移除index.html后缀
    const cleanUrl = url.replace(/\/index\.html$/, '')
    
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${cleanUrl}`,
      link: `${baseUrl}${cleanUrl}`,
      description: excerpt,
      content: `<img src="${frontmatter.cover}" alt="" /><p><h3><a href="${baseUrl}${cleanUrl}">文章涉及下载地址访问原站：鱼梦</a></h3></p>` + html + `<p><h3 style="color:#3451b2"><a href="${baseUrl}${cleanUrl}">文章涉及下载地址访问原站：鱼梦</a></h3></p>`,
      image: frontmatter.cover,
      date: frontmatter.date
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}
