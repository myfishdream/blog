<template>
	<!-- 音乐播放器。由PageAside点击播放显示在头部，可拖拽 -->
	 <!-- TODO: 上一首 下一首 播放 暂停  待完善！！！-->
	<div ref="el" class="player" :class="{ back: !isdrag, expanded: isExpanded }" :style="{
		background: 'var(--vp-c-bg-alt)',
		transform: 'translate(' + adjustedLeft + 'px,' + adjustedTop + 'px)',
		display: playerShow ? 'flex' : 'none'
	}" @mousedown="handleMouseDown">
		<div class="state repeatbg" :style="{
			transform: 'translateX(' + (currentLine) + '%)'
		}">
		</div>
		<div class="box">
			<div class="progress">
				<div class="playing" :class="{ on: !isPause }">
					<span class="playing__bar playing__bar1" />
					<span class="playing__bar playing__bar2" />
					<span class="playing__bar playing__bar3" />
				</div>

				<div class="name" @click="toggleExpand">
					{{ song.title || '无播放歌曲' }}
				</div>
				<div class="time" v-if="currentTime">
					{{ ' - ' + formatTime((duration - currentTime) * 1000, ('mm:ss')) }}
				</div>
			</div>

			<!-- <div class="controls" v-if="isExpanded">
				<div class="control-button" @click.stop="prev">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg">
						<path d="M8 12L14 6V18L8 12Z" fill="currentColor" />
					</svg>
				</div>
				<div class="control-button play-button" @click.stop="togglePlay">
					<svg v-if="isPause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg">
						<path d="M19.376 12.416L8.777 19.482C8.548 19.635 8.237 19.573 8.084 19.343C8.029 19.261 8 19.164 8 19.066V4.934C8 4.658 8.224 4.434 8.5 4.434C8.599 4.434 8.695 4.464 8.777 4.518L19.376 11.584C19.606 11.737 19.668 12.048 19.515 12.277C19.478 12.332 19.431 12.379 19.376 12.416Z" fill="currentColor" />
					</svg>
					<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg">
						<path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z" fill="currentColor" />
					</svg>
				</div>
				<div class="control-button" @click.stop="next">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg">
						<path d="M16 12L10 18V6L16 12Z" fill="currentColor" />
					</svg>
				</div>
			</div> -->

			<div class="btns-group">
				<!-- <div class="btns play-btn" @click.stop="togglePlay" v-if="!isExpanded">
					<svg v-if="isPause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg">
						<path d="M19.376 12.416L8.777 19.482C8.548 19.635 8.237 19.573 8.084 19.343C8.029 19.261 8 19.164 8 19.066V4.934C8 4.658 8.224 4.434 8.5 4.434C8.599 4.434 8.695 4.464 8.777 4.518L19.376 11.584C19.606 11.737 19.668 12.048 19.515 12.277C19.478 12.332 19.431 12.379 19.376 12.416Z" fill="currentColor" />
					</svg>
					<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg">
						<path d="M6 5H8V19H6V5ZM16 5H18V19H16V5Z" fill="currentColor" />
					</svg>
				</div> -->
				
					<!--  v-if="!isExpanded" -->
				<div class="btns close-btn" @click.stop="closePlayer">
					<svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path
							d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
							fill="currentColor"></path>
					</svg>
				</div>
			</div>
			
			<!-- <div class="expand-btn" @click.stop="toggleExpand">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg" v-if="!isExpanded">
					<path d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z" fill="currentColor" />
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg" v-else>
					<path d="M12 10.5865L16.9497 15.5362L15.5355 16.9504L12 13.4149L8.46447 16.9504L7.05025 15.5362L12 10.5865Z" fill="currentColor" />
				</svg>
			</div> -->
		</div>

		<!-- 播放列表 -->
		<div class="playlist" v-if="isExpanded">
			<div class="playlist-header">播放列表</div>
			<div class="progress-bar" @click="handleProgressBarClick">
				<div class="progress-current" :style="{ width: currentLine + '%' }"></div>
			</div>
			<div class="playlist-items">
				<div v-if="playlist && playlist.length > 0">
					<div v-for="(item, index) in playlist" :key="index" 
						class="playlist-item" 
						:class="{ active: index === currentIndex }"
						@click="playItem(index)">
						{{ item.title || '未知歌曲' }}
					</div>
				</div>
				<div v-else class="empty-playlist">
					播放列表为空
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="js" setup>
import { computed, toRefs, ref, unref, onMounted, onUnmounted, watch } from 'vue'
import { useElementBounding, useDraggable } from '@vueuse/core'
import { formatTime } from '../functions'
import { usePlayerStore } from '../../store/player';

const playerStore = usePlayerStore();
const { currentTime, duration, song, id, isPause, togglePlay, forward, backup, next, prev, playlist, currentIndex, playerShow } = toRefs(playerStore);

// 关闭播放器
const closePlayer = () => {
  playerStore.setPlayerShow(false);
  // 暂停播放
  if (!isPause.value) {
    playerStore.togglePlay();
  }
}

// 播放特定歌曲
const playItem = (index) => {
  playerStore.play(index);
}

// 处理进度条点击
const handleProgressBarClick = (e) => {
  if (!duration.value) return;
  
  const progressBar = e.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const percentage = offsetX / rect.width;
  const newTime = duration.value * percentage;
  
  playerStore.onSliderChange(newTime);
}

// 展开/收起播放器
const isExpanded = ref(false);
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
}

const currentLine = computed(() => {    // 实时监听当前进度条位置
	const val = duration.value / 100;    // 获取进度条单位长度
	const nowLine = (currentTime.value / val)
	return nowLine > 0 ? nowLine : 0;
})

const el = ref(null)
const adjustedLeft = ref(0)			// 播放器左侧位置
const adjustedTop = ref(0)			// 播放器顶部位置
const isDragging = ref(false)		// 是否正在拖拽
const startX = ref(0)			// 鼠标按下时的x坐标
const startY = ref(0)			// 鼠标按下时的y坐标

const handleMouseDown = (e) => {
	isDragging.value = true
	startX.value = e.clientX - adjustedLeft.value
	startY.value = e.clientY - adjustedTop.value
}

const handleMouseMove = (e) => {
	if (!isDragging.value) return
	adjustedLeft.value = e.clientX - startX.value
	adjustedTop.value = e.clientY - startY.value
}

const handleMouseUp = () => {
	isDragging.value = false
}

onMounted(() => {
	// 添加事件监听器
	window.addEventListener('mousemove', handleMouseMove);
	window.addEventListener('mouseup', handleMouseUp);
	
	// 检查播放列表
	// console.log('播放列表:', playlist.value);
})


onUnmounted(() => {
	window.removeEventListener('mousemove', handleMouseMove)
	window.removeEventListener('mouseup', handleMouseUp)
})

const isdrag = ref(true)
const reback = () => {
	adjustedLeft.value = 0
	adjustedTop.value = 0
}
</script>

<style scoped>
.player.back {
	/* transform: translate(0px, 0px); */
	transition: .3s;
}

.player:hover {
	color: var(--vp-c-text-1);
	border: 1px solid var(--vp-c-brand-1);
	transition: color .5s;
	transition: border-color .25s;
}

.player {
	height: 40px;
	width: 200px;
	border-radius: 8px;
	color: var(--vp-c-text-2);
	font-weight: 500;
	transition: color .5s, border-color .25s, height 0.3s ease;
	border: 1px solid transparent;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;

	/* position: fixed; */
	position: relative;
	z-index: 9999;
	overflow: hidden;
	left: 0px;
	top: 0px;
	cursor: move;
	user-select: none;
	touch-action: none;
	will-change: transform;
	transform: translate3d(0, 0, 0);
}

/* 展开状态 */

.player.expanded {
	height: 300px;
	width: 200px;
}

.state {
	width: 100%;
	height: 40px;
	position: absolute;
	left: auto;
	top: 0;
	right: 100%;
	transition: transform .3s;
	background-color: var(--vp-c-gutter);
	z-index: 1;
}

.box {
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 100%;
	height: 40px;
	justify-content: space-between;
}

.btns-group {
	display: flex;
	align-items: center;
}

.btns {
	width: 32px;
	height: 32px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	line-height: 1;
	cursor: pointer;
}

.play-btn {
	margin-right: 2px;
}

.close-btn {
	width: 24px;
	transform: translateX(-10px);
}

.btns .svg {
	width: 16px;
	object-fit: fill;
	fill: currentColor;
}

.progress {
	flex: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
}

.progress .name {
	opacity: 1;
	font-size: 13px;
	margin: 0 5px 0 -5px;
	max-width: 70px;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	word-wrap: break-word;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical !important;
	cursor: pointer;
}

.progress .time {
	opacity: .6;
	font-size: 12px;
	width: 50px;
}

.playing {
	width: 42px;
	height: 35px;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	box-sizing: border-box;
	transform: scale(.3);
	position: relative;
	overflow: hidden;
}

.playing__bar {
	position: absolute;
	display: inline-block;
	width: 5px;
	height: 100%;
	bottom: -110%;
	border-radius: 3px;
	background-color: var(--vp-c-text-2);
}

.playing.on .playing__bar {
	position: absolute;
	display: inline-block;
	width: 5px;
	height: 100%;
	bottom: -110%;
	border-radius: 3px;
	animation: up-and-down 1.3s ease infinite alternate;
	transform: translateZ(0);
	animation-fill-mode: forwards;
}

.playing__bar1 {
	left: 4px;
	transform: translateY(-85%);
}

.playing__bar2 {
	left: 20px;
	transform: translateY(-55%);
	animation-delay: -2.4s;
}

.playing.on .playing__bar2 {
	left: 20px;
	transform: translateY(-55%);
	animation-delay: -2.4s;
}

.playing__bar3 {
	left: 36px;
	transform: translateY(-100%);
	animation-delay: -3.7s;
}

.playing.on .playing__bar3 {
	left: 36px;
	transform: translateY(-100%);
	animation-delay: -3.7s;
}

/* 控制按钮 */
.controls {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px 0;
	width: 100%;
	background: var(--vp-c-bg-alt);
	margin-top: 5px;
	gap: 0px;
}

.control-button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	cursor: pointer;
	transition: all 0.2s;
}

.control-button:hover {
	color: var(--vp-c-brand-1);
}

.control-button .svg {
	width: 20px;
	height: 20px;
}

.play-button .svg {
	width: 22px;
	height: 22px;
}

/* 扩展按钮 */
.expand-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 20px;
	height: 40px;
	cursor: pointer;
}

.expand-btn .svg {
	width: 16px;
	height: 16px;
}

/* 播放列表 */
.playlist {
	width: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	margin-top: 5px;
}

.playlist-header {
	padding: 8px 12px;
	font-weight: 500;
	border-bottom: 1px solid var(--vp-c-gutter);
}

/* 进度条样式 */
.progress-bar {
	width: 100%;
	height: 4px;
	background-color: var(--vp-c-gutter);
	position: relative;
	cursor: pointer;
	margin: 8px 0;
}

.progress-current {
	height: 100%;
	background-color: var(--vp-c-brand-1);
	position: absolute;
	left: 0;
	top: 0;
}

.playlist-items {
	flex: 1;
	overflow-y: auto;
	scrollbar-width: thin;
}

.empty-playlist {
	padding: 20px;
	text-align: center;
	color: var(--vp-c-text-3);
	font-size: 14px;
}

.playlist-item {
	padding: 8px 12px;
	font-size: 12px;
	cursor: pointer;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	transition: all 0.2s;
}

.playlist-item:hover {
	background: var(--vp-c-gutter);
}

.playlist-item.active {
	color: var(--vp-c-brand-1);
	font-weight: 500;
}

@keyframes up-and-down {
	10% {
		transform: translateY(-30%);
	}

	30% {
		transform: translateY(-100%);
	}

	60% {
		transform: translateY(-50%);
	}

	80% {
		transform: translateY(-75%);
	}

	100% {
		transform: translateY(-20%);
	}
}

@media (max-width: 550px) {
	.player {
		position: fixed;
		left: auto;
		right: 32px;
		bottom: 32px;
		top: auto;
	}
}</style>