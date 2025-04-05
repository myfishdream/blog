<template>
  <div class="color-card-container">
    <div class="color-grid">
      <div 
        v-for="(color, index) in colors" 
        :key="index"
        class="color-item"
        :style="{ backgroundColor: color.value }"
        @click="copyColor(color.value)"
      >
        <div class="color-info">
          <span class="color-name">{{ color.name || color.value }}</span>
          <span class="color-value">{{ color.value }}</span>
        </div>
      </div>
    </div>
    
    <div class="toast" v-if="showToast">
      <span>已复制: {{ copiedColor }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 定义props
const props = defineProps({
  // 颜色数组
  colors: {
    type: Array,
    required: true
  }
})

// 复制功能
const showToast = ref(false)
const copiedColor = ref('')

const copyColor = (color) => {
  // 复制到剪贴板
  navigator.clipboard.writeText(color)
    .then(() => {
      copiedColor.value = color
      showToast.value = true
      
      // 2秒后隐藏提示
      setTimeout(() => {
        showToast.value = false
      }, 2000)
    })
    .catch(err => {
      console.error('复制失败:', err)
    })
}
</script>

<style scoped>
.color-card-container {
  padding: 20px;
  max-width: 100%;
  margin: 0 auto;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.color-item {
  height: 100px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
}

.color-name {
  font-weight: bold;
  margin-bottom: 2px;
}

.color-value {
  font-family: monospace;
  font-size: 0.8rem;
  opacity: 0.9;
}

.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 1000;
  animation: fadeInOut 2s ease;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translate(-50%, 20px); }
  10% { opacity: 1; transform: translate(-50%, 0); }
  90% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -20px); }
}

@media (max-width: 640px) {
  .color-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  
  .color-item {
    height: 80px;
  }
}
</style>
