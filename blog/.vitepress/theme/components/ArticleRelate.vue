<template>
  <!-- 文章内页底部的相关文章列表 -->
  <div class="articlerelate" v-if="posts.length">
    <h2 class="h2">相关推荐</h2>
    <div class="postlist"
      :class="{ grid: listview === 'grid', list: listview === 'list', hasaside: frontmatter.aside, hassidebar: frontmatter.sidebar||theme?.sidebar?.length }">
      <div class="list" v-for="(article, index) in posts.slice(0, 6)" :key="index">
        <ArticleList :article="processArticle(article)" />
      </div>
    </div>
  </div>
</template>
<script lang="js" setup>
import { computed, ref, toRefs, reactive } from 'vue'
import { useData, withBase } from 'vitepress'
import { useStorage } from '@vueuse/core'   
import { relatebyTags } from '../functions'
import { data as themeposts } from '../posts.data'

const { theme, page, frontmatter } = useData()
const listview = useStorage('listview', 'grid')   
const article = {
  frontmatter: page.value?.frontmatter,
  relativePath: page.value?.relativePath
}
const posts = computed(() => relatebyTags(themeposts, article))

// 处理文章数据，确保封面图片路径正确
const processArticle = (article) => {
  if (!article) return article
  
  const processed = { ...article }
  if (processed.frontmatter?.cover) {
    // 如果是相对路径（不以http或https开头）
    if (!/^https?:\/\//.test(processed.frontmatter.cover)) {
      // 如果以 ./ 开头，去掉 ./
      const coverPath = processed.frontmatter.cover.replace(/^\.\//, '')
      // 直接使用 withBase，因为路径中已经包含了 cover/
      processed.frontmatter = {
        ...processed.frontmatter,
        cover: withBase(`/${coverPath}`)
      }
    }
  }
  return processed
}
</script>

<style scoped>
.articlerelate {
  .h2 {
    font-size: 16px;
    margin: 48px 0 16px;
    border-top: 1px solid var(--vp-c-divider);
    padding-top: 24px;
    letter-spacing: -0.02em;
    line-height: 32px;
  }
}
</style>
