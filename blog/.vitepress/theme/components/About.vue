<template>
    <!-- 关于页面 -->
    <div class="about">
        <div class="desc">
            <p>这是一个非常素雅的技术型分享博客，基于 vitepress 开发。</p>

            <p>主要整理分享个人学习笔记，生活记录，教程分享等。</p>

            <p>所有作品版权归原作者所有。</p>
            <p>本站不对作品的完整性、可用性和时效性负责。</p>
        </div>
        <div class="list">
            <h4 class="h4">-- 信息 --</h4>
            <ul class="ul">
                <li class="li"><label class="label">博主</label><span>鱼梦江湖</span></li>
                <li class="li"><label class="label">程序</label><span>Vitepress</span></li>
                <li class="li"><label class="label">图标</label><span>remixicon</span></li>
                <li class="li"><label class="label">音乐</label><span>来源网络</span></li>
                <li class="li"><label class="label">图片</label><span>根据作品体验生成</span></li>
                <li class="li"><label class="label">主题</label><span>随缘</span></li>
                <li class="li"><label class="label">内容</label><span>个人学习笔记，生活记录，教程分享等</span></li>
            </ul>
        </div>
    </div>
</template>

<script lang="js" setup>

</script>

<style scoped>
.about {
    background-color: var(--vp-c-bg-alt);
    border-radius: 8px;
    padding: 40px;
    font-size: 14px;
    text-align: center;

    .list {
        font-size: 12px;
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        align-self: center;
        justify-content: center;

        .h4 {
            margin: 10px;
            font-size: 12px;
        }

        .ul {
            display: flex;
            flex-direction: column;
            padding: 0;
            margin: 0 auto;

            .li {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                .label {
                    margin-right: 8px;
                }
            }
        }
    }
}</style>
