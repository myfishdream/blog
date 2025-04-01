// vitepress官方建议的获取文章方法。本身具有缓存机制
import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*/*/*/index.md', {
  excerpt: true, 
  transform(rawData) {
    return rawData.map(({ url, frontmatter }) => {
      // 从url中提取年月信息
      const [_, year, month] = url.match(/posts\/(\d{4})\/(\d{2})\//) || []
      frontmatter.year = year
      frontmatter.month = month
      frontmatter.readTime = 0
      
      // 移除index.md，只保留目录路径
      const relativePath = url.replace(/\/index\.md$/, '')
      
      return {
        frontmatter,
        relativePath,
      }
    })
    .sort((a, b) => {
      return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
    })
  }
})


