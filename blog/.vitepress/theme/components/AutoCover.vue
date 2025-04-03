<template>
  <canvas ref="canvasRef" :width="width" :height="height"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 800
  },
  height: {
    type: Number,
    default: 400
  },
  title: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const canvasRef = ref(null)

// 绘制封面
const drawCover = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  
  // 柔和的背景色列表
  const bgColors = [
    '#f6f8fa', // 浅灰白
    '#f0f4f8', // 浅蓝灰
    '#f5f5f0', // 米白
    '#f8f4f0', // 暖米色
    '#f0f8f4', // 浅青白
  ]
  
  // 温和的图形颜色
  const shapeColors = [
    'rgba(145, 167, 255, 0.8)', // 柔和的蓝色
    'rgba(148, 211, 204, 0.8)', // 柔和的青色
    'rgba(255, 208, 147, 0.8)', // 柔和的橙色
    'rgba(248, 185, 185, 0.8)', // 柔和的粉色
    'rgba(181, 230, 181, 0.8)', // 柔和的绿色
    'rgba(213, 184, 255, 0.8)'  // 柔和的紫色
  ]

  // 随机选择背景色
  ctx.fillStyle = bgColors[Math.floor(Math.random() * bgColors.length)]
  ctx.fillRect(0, 0, props.width, props.height)

  // 绘制随机图形
  const drawRandomShapes = () => {
    // 2-4个图形
    const shapesCount = Math.floor(Math.random() * 3) + 2

    // 定义中心区域范围（画布中心的60%区域）
    const centerX = props.width / 2
    const centerY = props.height / 2
    const rangeX = props.width * 0.3  // 中心区域宽度的一半
    const rangeY = props.height * 0.3 // 中心区域高度的一半

    // 预定义位置，确保图形分布均匀
    const positions = [
      { x: centerX - rangeX * 0.8, y: centerY - rangeY * 0.8 }, // 左上
      { x: centerX + rangeX * 0.8, y: centerY - rangeY * 0.8 }, // 右上
      { x: centerX - rangeX * 0.8, y: centerY + rangeY * 0.8 }, // 左下
      { x: centerX + rangeX * 0.8, y: centerY + rangeY * 0.8 }  // 右下
    ]

    // 随机打乱位置数组
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]]
    }

    for (let i = 0; i < shapesCount; i++) {
      // 在预定义位置的基础上添加一些随机偏移
      const basePosition = positions[i]
      const randomOffset = 40 // 随机偏移量
      const x = basePosition.x + (Math.random() - 0.5) * randomOffset
      const y = basePosition.y + (Math.random() - 0.5) * randomOffset
      
      const size = Math.random() * 140 + 100 // 100-240px
      const color = shapeColors[Math.floor(Math.random() * shapeColors.length)]
      const shape = Math.floor(Math.random() * 4) // 0-3，代表不同的图形
      const borderRadius = size * 0.08 // 圆角大小为图形大小的8%

      ctx.fillStyle = color
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.lineJoin = 'round'

      switch (shape) {
        case 0: // 圆形
          ctx.beginPath()
          ctx.arc(x, y, size / 2, 0, Math.PI * 2)
          ctx.fill()
          break
        case 1: // 圆角矩形
          ctx.beginPath()
          ctx.roundRect(x - size / 2, y - size / 2, size, size, borderRadius)
          ctx.fill()
          break
        case 2: // 圆角三角形
          {
            const height = size * Math.sqrt(3) / 2
            ctx.beginPath()
            ctx.moveTo(x, y - height / 2)
            ctx.lineTo(x - size / 2, y + height / 2)
            ctx.arcTo(x - size / 2 + borderRadius, y + height / 2,
                     x, y + height / 2,
                     borderRadius)
            ctx.arcTo(x + size / 2 - borderRadius, y + height / 2,
                     x + size / 2, y + height / 2,
                     borderRadius)
            ctx.lineTo(x + size / 2, y + height / 2)
            ctx.lineTo(x, y - height / 2)
            ctx.fill()
          }
          break
        case 3: // 圆角菱形
          {
            const points = [
              [x, y - size / 2],
              [x + size / 2, y],
              [x, y + size / 2],
              [x - size / 2, y]
            ]
            ctx.beginPath()
            ctx.moveTo(points[0][0], points[0][1])
            for (let i = 0; i < points.length; i++) {
              const next = points[(i + 1) % points.length]
              const current = points[i]
              ctx.lineTo(
                current[0] + (next[0] - current[0]) * 0.2,
                current[1] + (next[1] - current[1]) * 0.2
              )
              ctx.quadraticCurveTo(
                next[0],
                next[1],
                next[0] + (points[(i + 2) % points.length][0] - next[0]) * 0.2,
                next[1] + (points[(i + 2) % points.length][1] - next[1]) * 0.2
              )
            }
            ctx.closePath()
            ctx.fill()
          }
          break
      }
    }
  }

  // 绘制图形
  drawRandomShapes()

  // 添加浅色半透明遮罩，使文字更易读
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
  ctx.fillRect(0, 0, props.width, props.height)
  
  // 绘制分类标签
  if (props.categories && props.categories.length > 0) {
    const category = props.categories[0]
    ctx.font = '500 25px "PingFang SC", "Microsoft YaHei", sans-serif'
    const textWidth = ctx.measureText(category).width
    const padding = 20
    const tagWidth = textWidth + padding * 2
    const tagHeight = 36
    
    // 绘制标签背景
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.beginPath()
    ctx.roundRect(
      props.width / 2 - tagWidth / 2,
      props.height / 2 - 80,
      tagWidth,
      tagHeight,
      18
    )
    ctx.fill()
    
    // 绘制标签文字
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(category, props.width / 2, props.height / 2 - 60)
  }
  
  // 绘制标题
  ctx.font = '500 56px "PingFang SC", "Microsoft YaHei", sans-serif'
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // 文字换行处理
  const words = props.title.split('')
  let line = ''
  let lines = []
  const maxWidth = props.width * 0.8
  
  for (let word of words) {
    const testLine = line + word
    const metrics = ctx.measureText(testLine)
    if (metrics.width > maxWidth) {
      lines.push(line)
      line = word
    } else {
      line = testLine
    }
  }
  lines.push(line)
  
  // 绘制文字阴影
  ctx.shadowColor = 'rgba(0, 0, 0, 0.15)'
  ctx.shadowBlur = 8
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 2
  
  // 绘制多行文字
  lines.forEach((line, index) => {
    ctx.fillText(line, props.width / 2, props.height / 2 + (index - (lines.length - 1) / 2) * 65)
  })
  
  // 重置阴影
  ctx.shadowColor = 'transparent'
}

// 调整颜色透明度
const adjustColor = (color, opacity) => {
  // 将hex转换为rgb
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// 监听属性变化，重新绘制
watch([() => props.title, () => props.categories], () => {
  drawCover()
})

// 组件挂载时绘制
onMounted(() => {
  drawCover()
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 8px;
}
</style> 