// vitepress官方建议的获取文章方法。本身具有缓存机制
import { createContentLoader } from 'vitepress'

// 声明数据变量
export const data = []

// 默认导出文章加载器
export default createContentLoader('posts/**/*.md', {
  excerpt: true,
  transform(rawData) {
    return rawData.map(({ url, frontmatter }) => {
      // 从url中提取年月信息
      const dateMatch = url.match(/posts\/(\d{4})\/(\d{2})/)
      const year = dateMatch ? dateMatch[1] : new Date(frontmatter.date).getFullYear().toString()
      const month = dateMatch ? dateMatch[2] : (new Date(frontmatter.date).getMonth() + 1).toString().padStart(2, '0')
      
      // 设置文章的基本信息
      frontmatter.year = year
      frontmatter.month = month
      frontmatter.readTime = 0
      
      // 处理URL路径
      const relativePath = url.replace(/\/index\.md$/, '').replace(/\.md$/, '')
      
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


