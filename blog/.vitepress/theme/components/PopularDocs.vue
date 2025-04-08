<template>
    <!-- 最热文档排行榜 -->
    <div class="wrap">
        <div class="links">
            <div class="title">
                <svg t="1743601871885" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10196" width="256" height="256"><path d="M410.882359 26.903266c-15.700967 50.217495-58.451969 140.455389-174.715923 260.132596-200.57132 206.715177-227.152033 539.72074 81.02211 703.471586 25.300743 13.439686 46.42025 5.162546 62.291879-11.4344 52.478775-54.782722 75.262244-135.164846 68.435737-241.061042-1.919955-29.183319 11.093074-36.777809 36.86314-16.810274 73.086295 56.57468 120.786515 143.740646 120.786515 237.43446 0 31.871256 12.757036 48.724196 42.495008 42.964331 196.518081-38.100444 436.000493-319.864536 177.915849-732.441577-15.444973-20.99151-38.271107-20.99151-37.887116 7.850484 0.426657 35.412507-3.626582 70.739683-12.117051 105.128213-5.845197 23.892776-28.330006 23.55145-33.620549 0-32.169916-143.313989-121.597163-265.12448-268.324405-365.644801-39.593743-27.092701-53.972074-18.772895-63.145194 10.453089z" fill="#F4420A" p-id="10197"></path></svg>
                <span>热门文章</span>
            </div>
            <div class="hot-list">
                <div v-if="hotArticles.length > 0" v-for="(article, index) in hotArticles" :key="index" class="hot-item" @click="navigateTo(article.url)">
                    <div class="rank" :class="{'top3': index < 3}">{{ index + 1 }}</div>
                    <div class="content">
                        <div class="article-title">{{ article.title }}</div>
                        <div class="article-meta">
                            <span class="date">{{ article.date }}</span>
                        </div>
                    </div>
                </div>
                <div v-else class="no-data">
                    <span>暂无热门文章</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="js" setup>
import { useRouter } from 'vitepress'

const router = useRouter()

// 手动设置热门文章列表
const hotArticles = [
    // {
    //     title: 'WebSocket',
    //     url: '/2025/03/WebSocket/',
    //     date: '2025-03-23'
    // },
    // {
    //     title: '正则表达式',
    //     url: '/2025/03/Regular/',
    //     date: '2025-03-11'
    // },
    // {
    //     title: 'Cursor基础使用',
    //     url: '/2025/03/Cursor/',
    //     date: '2025-02-02'
    // },
    // {
    //     title: 'Demo1',
    //     url: '/2025/04/Demo1/',
    //     date: '2025-04-02'
    // },
    // {
    //     title: 'Demo2',
    //     url: '/demo2',
    //     date: '2025-04-02'
    // },
    // {
    //     title: 'Demo3',
    //     url: '/demo3',
    //     date: '2025-04-02'
    // },
    // {
    //     title: 'Demo4',
    //     url: '/demo4',
    //     date: '2025-04-02'
    // }
]

// 页面跳转
const navigateTo = (url) => {
    router.go('/posts'+url)
}
</script>

<style scoped>  
.wrap {
    width: 100%;
    margin-top: 16px;
}

.links {
    background-color: var(--vp-c-bg-alt);
    border-radius: 8px;
    border: .5px solid var(--vp-c-gray-soft);
    padding: 12px 16px;
    width: 100%;
    position: relative;
}

.title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    color: var(--vp-c-text-1);
    font-size: 15px;
    font-weight: 600;
}

.icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    opacity: 0.9;
}

.hot-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.hot-item {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
}

.hot-item:hover .article-title {
    color: var(--vp-c-brand);
}

.rank {
    width: 18px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    flex-shrink: 0;
    color: var(--vp-c-text-2);
    background-color: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
}

.top3 {
    color: #fff;
    border: none;
}

.hot-item:nth-child(1) .rank {
    background-color: #ff4757;
}

.hot-item:nth-child(2) .rank {
    background-color: #2ed573;
}

.hot-item:nth-child(3) .rank {
    background-color: #1e90ff;
}

.content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.article-title {
    font-size: 14px;
    color: var(--vp-c-text-1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.2s;
}

.article-meta {
    font-size: 12px;
    color: var(--vp-c-text-2);
}

.date {
    display: flex;
    align-items: center;
    opacity: 0.9;
}

@media (max-width: 768px) {
    .content {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
    
    .article-meta {
        width: 100%;
    }
}

.no-data {
    text-align: center;
    color: var(--vp-c-text-2);
}
</style>
