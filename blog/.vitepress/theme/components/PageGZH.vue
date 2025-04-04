<template>
  <!-- 倒计时 -->
  <div class="countdown-area">
    <div class="countdown-wrapper">
      <div class="title">
        <svg t="1743734597023" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4930" width="64" height="64"><path d="M931.7 63.87c20.6 0 37.32 16.57 37.47 37.17 0.12 20.4-16.32 37.05-36.72 37.17h-75.38v102.11c0 118.75-74.64 220.34-182.87 271.39 108.23 50.53 182.87 152.64 182.87 271.39v102.11h74.64c20.53 0 37.17 16.64 37.17 37.17s-16.64 37.17-37.17 37.17H110.5l-6.72-0.6c-20.25-3.1-34.16-22.03-31.06-42.28 2.84-18.58 19.14-32.1 37.93-31.47h75.24V783.11c0-118.75 74.57-220.34 182.87-271.39-108.3-50.53-182.87-152.64-182.87-271.39V138.21h-75.24c-20.53 0-37.17-16.64-37.17-37.17s16.64-37.17 37.17-37.17H931.7z m-149.29 74.34H260.3V239.8c0 88.45 55.76 169.81 141.59 210.71 25.98 13.66 40.83 37.47 40.83 61.21 0.75 27-15.62 51.53-40.83 61.21-85.31 40.9-141.59 122.26-141.52 210.71V886.2h41.57v-43.29c0-79.87 29.41-167.42 120.62-220.64l14.93-8.14c34.04-14.7 61.95-45.83 83.67-93.3 17.17 43.96 46.28 75.09 87.48 93.3 111.96 57.85 129.65 144.8 129.65 228.77v43.29h44.11V784.15c0-88.45-55.68-169.81-141.52-210.79-25.97-13.66-40.83-37.4-40.83-61.21 0-27.24 14.85-50.98 40.83-61.13 85.31-40.83 141.52-122.19 141.52-210.71v-102.1z m-51.87 149.58c0 48.52-59.71 102.86-115.39 125.92-33.29 13.81-64.64 39.78-93.97 77.93-27.77-38.14-58.22-64.12-91.14-77.92-59.49-24.93-110.39-74.86-110.39-125.92h410.89z" fill="#515151" p-id="4931"></path></svg>
        <span>今日倒计时</span>
      </div>
      <Countdown :until="nextDay"/>
      <div class="motto">✨累了就歇，醒了再走！</div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref, onMounted } from 'vue'

// 获取下一天的零点时间，格式：yyyy/MM/dd HH:mm
const getNextDay = () => {
  const now = new Date()
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const year = tomorrow.getFullYear()
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
  const day = String(tomorrow.getDate()).padStart(2, '0')
  return `${year}/${month}/${day} 00:00`
}

const nextDay = ref(getNextDay())

// 每天零点更新倒计时时间
onMounted(() => {   
  const updateNextDay = () => {
    nextDay.value = getNextDay()
  }

  // 计算到下一个零点的毫秒数
  const now = new Date()
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const timeToNextDay = tomorrow.getTime() - now.getTime()

  // 设置定时器，在下一个零点更新时间
  setTimeout(() => {
    updateNextDay()
    // 之后每24小时更新一次
    setInterval(updateNextDay, 24 * 60 * 60 * 1000)
  }, timeToNextDay)
})
</script>

<style scoped>
.countdown-area {
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
  background-color: var(--vp-c-bg-alt);
  border: .5px solid var(--vp-c-gray-soft);
}

.countdown-wrapper {
  text-align: center;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
  font-size: 15px;
  font-weight: 600;
}

.icon {
  width: 18px;
  height: 18px;
  margin-right: 6px;
  opacity: 0.9;
}

.motto {
  margin-top: 12px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  font-weight: 500;
  letter-spacing: 0.5px;
}
</style>