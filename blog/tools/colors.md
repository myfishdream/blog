---
page: true
title: 色卡工具
description: 集合一些常用的色卡，点击即可复制
outline: 'deep'
---

<script setup>
  import Colorcard from '../.vitepress/theme/tools/Colorcard.vue' 
</script>

###### 色卡工具

这是一个简单的色卡工具，可以帮助你快速获取和复制颜色代码。

## 品牌色系

<Colorcard 
  :colors="[
    { name: '品牌主色', value: '#10b981' },
    { name: '品牌次色', value: '#3b82f6' },
    { name: '品牌强调', value: '#f59e0b' },
    { name: '品牌背景', value: 'rgba(16, 185, 129, 0.1)' },
    { name: '品牌边框', value: 'rgba(16, 185, 129, 0.2)' }
  ]"
/>

## 主题色系

<Colorcard 
  :colors="[
    { name: '主题蓝', value: '#3b82f6' },
    { name: '主题绿', value: '#10b981' },
    { name: '主题黄', value: '#f59e0b' },
    { name: '主题红', value: '#ef4444' },
    { name: '主题紫', value: '#8b5cf6' },
    { name: '主题橙', value: '#f97316' },
    { name: '主题青', value: '#06b6d4' },
    { name: '主题粉', value: '#ec4899' }
  ]"
/>

## 功能色系

<Colorcard 
  :colors="[
    { name: '成功', value: '#10b981' },
    { name: '警告', value: '#f59e0b' },
    { name: '错误', value: '#ef4444' },
    { name: '信息', value: '#3b82f6' }
  ]"
/>

## 中性色系

<Colorcard 
  :colors="[
    { name: '纯黑', value: '#000000' },
    { name: '深灰', value: '#1f2937' },
    { name: '中灰', value: '#4b5563' },
    { name: '浅灰', value: '#9ca3af' },
    { name: '更浅灰', value: '#d1d5db' },
    { name: '最浅灰', value: '#f3f4f6' },
    { name: '纯白', value: '#ffffff' }
  ]"
/>

