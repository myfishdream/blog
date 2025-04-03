<template>
    <!-- 对页面布局做统筹管理 -->
    <Layout :class="{ home: frontmatter?.index }">
        <template #not-found>
            <!-- 页面不存在 -->
            <div class="page404">
                <PageASide type="page404" />

            </div>
        </template>
        <template #layout-top>
            <ClientOnly><!-- 在布局下方添加 -->

                <div class="snow" v-if="theme.website?.showSnow && isDark">
                    <div v-for="index in 80" :key="index" class="dot"></div>
                </div>
                <Lantern /> <!-- 灯笼组件 -->
            </ClientOnly>
        </template>
        <template #nav-bar-content-after>
            <!-- 在导航 social后添加 -->
        </template>
        <template #nav-screen-content-after>
            <!-- 在导航屏幕后添加 -->
        </template>
        <template #nav-bar-content-before>

            <!-- 在导航搜索框💰添加 -->
            <ClientOnly>
                <div v-if="!isPause" class=""
                    style="padding-left: 32px;position: relative;height:40px;margin-right:0px;">
                    <Player />
                </div>
            </ClientOnly>

        </template>
        <template #nav-bar-title-after>
            <!-- 在标题后添加 -->
             <!-- 读取config.mjs -->
           <span class="VPBadge warning strong mini">{{theme.version }}</span>
        </template>
        <template #sidebar-nav-before>
            <PageNavi />
            <!-- 烟花组件 -->
            <div class="fireworkwrap">
                <Firework></Firework>
            </div>
        </template>
        <template #doc-top>
            <ClientOnly>
                <!-- 轮播图组件 -->
                <!-- <PageSlider v-if="frontmatter?.index" :key="md5(page.relativePath)"></PageSlider> -->
            </ClientOnly>
        </template>
        <template #doc-before>
            <Home v-if="frontmatter?.index" /> <!-- 首页组件 -->
            <ArticleBread v-if="(frontmatter?.post)" :article="page" /> <!-- 文章面包屑组件 -->
            <ArticleMetadata v-if="(frontmatter?.post)" type="single" :article="page" :key="md5(page.relativePath)" />
            <!-- 文章元数据组件 -->
        </template>
        <template #aside-bottom>
            <ClientOnly>

                <!-- <ArticleLink v-if="(frontmatter?.post)" :key="md5(page.relativePath)" /> -->
                <PageASide v-if="(frontmatter.index)" /> <!-- 右侧页面侧边栏组件 -->
            </ClientOnly>
            <PageGZH />
            <PopularDocs v-if="(frontmatter.index)" />

        </template>
        <template #doc-footer-before>

            <ArticleCC v-if="(frontmatter?.post)" /> <!-- 文章版权组件 -->
            <ArticleRelate v-if="(frontmatter?.post)" :key="md5(page.relativePath)" /> <!-- 文章相关推荐组件 -->

        </template>
        <template #doc-bottom>
            <!-- 底部版权组件 -->
            <Copyright />
        </template>
    </Layout>
</template>
<script lang="js" setup>
import { computed, toRefs, onMounted, ref, nextTick, provide } from 'vue';
import { useData, useRouter } from 'vitepress';
import { usePlayerStore } from '../../store/player';
import md5 from 'blueimp-md5';
import DefaultTheme from 'vitepress/theme'
import Copyright from './Copyright.vue'
import Player from './Player.vue';

const { isPause } = toRefs(usePlayerStore());
const { page, theme, frontmatter, isDark } = useData();


const { Layout } = DefaultTheme

// 平滑切换主题
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 600,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
      fill: 'forwards',
      composite: 'replace'
    }
  )
})

</script>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none !important;
  mix-blend-mode: normal;
  pointer-events: none;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 9999;
}

.dark::view-transition-old(root) {
  z-index: 9999;
}

.dark::view-transition-new(root) {
  z-index: 1;
}

:root::view-transition-old(root) {
  animation: none !important;
}

:root::view-transition-new(root) {
  animation: none !important;
}

:root {
  view-transition-name: root;
}

.VPSwitchAppearance {
  /* width: 22px !important; */
}

.VPSwitchAppearance .check {
  /* transform: none !important; */
}
/* ------------------------------------------ */
.snowbanner {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    pointer-events: none;

    .img {
        width: 88%;
        height: fit-content;
        position: absolute;
        bottom: 0px;
        left: 50%;
        transform: translate(-50%);
    }
}

.snow {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 99999;
    pointer-events: none;

    .img {
        width: 88%;
        height: fit-content;
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translate(-50%);
    }
}

.page404 {
    width: 224px;
    margin: 50px auto;
}
</style>
