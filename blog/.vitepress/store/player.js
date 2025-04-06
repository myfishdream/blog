//此播放器代码参考：https://juejin.cn/post/7172081641836249118
import { defineStore } from 'pinia';
import {getRandomInt} from '../theme/functions'
import { toast } from 'vue3-toastify';
export const usePlayerStore = defineStore({
    id: 'Player',
    state: () => ({
        audio: new Audio(),   // Audio实例
        loopType: 0, // 循环模式 0 列表循环 1 单曲循环 2随机播放
        playList: [], // 播放列表
        showPlayList: false, // 播放列表显隐
        id: 0,  // 当前歌曲id
        url: '',    // 歌曲url
        // songUrl: {} as SongUrl,
        song: {},
        isPlaying: false, // 是否播放中
        isPause: true, // 是否暂停
        isFold: false, // 是否靠边
        sliderInput: false, // 是否正在拖动进度条
        ended: false, // 是否播放结束
        muted: false, // 是否静音
        currentTime: 0, // 当前播放时间
        duration: 0, // 总播放时长
        currentLyric: null, // 解析后歌词数据
        playerShow: false, // 控制播放器显隐
    }),
    getters: {
        // 获取播放列表
        playlist: (state) => {
            return state.playList;
        },
        
        // 获取当前歌曲索引
        currentIndex: (state) => {
            return state.playList.findIndex((song) => song.id === state.id);
        },
        
        playListCount: (state) => { // 播放列表歌曲总数
            return state.playList.length;
        },
        thisIndex: (state) => { // 当前播放歌曲索引
            return state.playList.findIndex((song) => song.id === state.id);
        },
        nextSong(state) { // 切换下一首
            const { thisIndex, playListCount } = this;
            if (thisIndex === playListCount - 1) {  // 最后一首
                return state.playList[0];
            } else {    // 切换下一首
                const nextIndex = thisIndex + 1;
                return state.playList[nextIndex];
            }
        },
        prevSong(state) { // 返回上一首
            const { thisIndex } = this;
            if (thisIndex === 0) {  // 第一首
                return state.playList[state.playList.length - 1];
            } else {    // 返回上一首
                const prevIndex = thisIndex - 1;
                return state.playList[prevIndex];
            }
        }
    },
    actions: {
        foldPlayer() {
            this.isFold = !this.isFold
        },
        // 播放列表里面添加音乐
        pushPlayList(replace, ...list) {
            if (replace) {
                this.playList = list;
                return;
            }
            list.forEach((song) => {    // 筛除重复歌曲
                if (this.playList.filter((s) => s.id == song.id).length <= 0) {
                    this.playList.push(song);
                }
            })
        },
        // 删除播放列表中某歌曲
        deleteSong(id) {
            this.playList.splice(
                this.playList.findIndex((s) => s.id == id),
                1
            )
        },
        // 清空播放列表
        clearPlayList() {
            // this.songUrl = {} as SongUrl;
            this.url = '';
            this.id = 0;
            this.song = {};
            this.isPlaying = false;
            this.isPause = false;
            this.sliderInput = false;
            this.ended = false;
            this.muted = false;
            this.currentTime = 0;
            this.playList = [];
            this.showPlayList = false;
            const audio = this.audio;
            audio.pause();
            let transTimer = null
            if (transTimer) clearTimeout(transTimer)
            transTimer = setTimeout(() => {
                this.duration = 0;
            }, 500);
        },
        // 播放
        async play(index) {
            let song;
            if (typeof index === 'number') {
                // 如果传入的是索引，从播放列表获取对应歌曲
                if (index >= 0 && index < this.playList.length) {
                    song = this.playList[index];
                } else {
                    return;
                }
            } else if (typeof index === 'object') {
                // 如果传入的是歌曲对象
                song = index;
            } else {
                return;
            }
            
            if (song.id == this.id) return;
            this.ended = false;
            this.isPause = false;
            this.isPlaying = false;
            
            if (song.url) {
                const audio = this.audio;
                this.id = song.id;
                this.song = song;
                
                let transTimer = null
                if (transTimer) clearTimeout(transTimer)
                transTimer = setTimeout(() => {
                    audio.title = this.song.title;   // 歌名
                    audio.src = song.url;
                    audio.play();
                    this.isPlaying = true;
                    this.interval()
                    this.url = this.song.url;
                }, 500)
            } else {
                if (this.id) this.deleteSong(this.id);
                this.next();
            }
        },
        // 播放结束
        playEnd() {
            this.isPause = true;
            switch (this.loopType) {
                case 0:
                    this.next();
                    break;
                case 1:
                    this.rePlay();
                    break;
                case 2:
                    this.randomPlay();
                    break;
            }
        },
        // 重新播放
        rePlay() {
            let transTimer = null
            if (transTimer) clearTimeout(transTimer)
            transTimer = setTimeout(() => {
                this.currentTime = 0;
                this.ended = false;
                this.isPause = false;
                this.isPlaying = true;
                const audio = this.audio;
                audio.currentTime = 0;
                audio.play();
            }, 1500)
        },
        // 下一曲
        next() {
            if (this.loopType === 2) {
                this.randomPlay();
            } else {
                if (this.playList.length > 0) {
                    if (this.nextSong) {
                        this.play(this.nextSong);
                    } else {
                        toast("没有下一首", {
                            autoClose: 2000,
                            "type": "warning",
                            "hideProgressBar": true,
                        });
                    }
                } else {
                    toast("播放列表为空", {
                        autoClose: 2000,
                        "type": "warning",
                        "hideProgressBar": true,
                    });
                }
            }
        },
        // 上一曲
        prev() {
            if (this.playList.length > 0) {
                if (this.prevSong) {
                    this.play(this.prevSong);
                } else {
                    toast("没有上一首", {
                        autoClose: 2000,
                        "type": "warning",
                        "hideProgressBar": true,
                    });
                }
            } else {
                toast("播放列表为空", {
                    autoClose: 2000,
                    "type": "warning",
                    "hideProgressBar": true,
                });
            }
        },
        // 随机播放
        randomPlay() {
            if (this.playList.length > 0) {
                const randomIndex = getRandomInt(this.playList.length);
                this.play(this.playList[randomIndex]);
            } else {
                toast("播放列表为空", {
                    autoClose: 2000,
                    "type": "warning",
                    "hideProgressBar": true,
                });
            }
        },
        // 播放、暂停
        togglePlay() {
            if (!this.song.id) {
                if (this.playList.length > 0) {
                    this.randomPlay();
                } else {
                    toast("播放列表为空", {
                        autoClose: 2000,
                        "type": "warning",
                        "hideProgressBar": true,
                    });
                    return;
                }
            }
            this.isPlaying = !this.isPlaying;
            const audio = this.audio;
            if (!this.isPlaying) {
                audio.pause();
                this.isPause = true;
            } else {
                audio.play();
                this.isPause = false;
                // 确保播放器始终可见
                this.playerShow = true;
            }
        },
        setPlay() {
            if (!this.song.id) return;
            const audio = this.audio;
            this.isPlaying = true;
            audio.play();
            this.isPause = false;
        },
        setPause() {
            if (!this.song.id) return;
            const audio = this.audio;
            this.isPlaying = false;
            audio.pause();
            this.isPause = true;
        },
        // 切换循环类型
        toggleLoop() {
            if (this.loopType == 2) {
                this.loopType = 0;
            } else {
                this.loopType++;
            }
        },
        // 快进
        forward(val) {
            const audio = this.audio;
            if (audio && this.currentTime) {
                audio.currentTime = this.currentTime + val;
            }
        },
        // 后退
        backup(val) {
            const audio = this.audio;
            if (audio) {
                if (this.currentTime < 5) {
                    audio.currentTime = 0;
                } else {
                    audio.currentTime = this.currentTime - val;
                }
            }
        },
        // 修改播放时间
        onSliderChange(val) {
            const audio = this.audio;
            if (audio) {
                audio.currentTime = val;
            }
        },
        // 定时器
        interval() {
            if (this.isPlaying && !this.sliderInput) {
                const audio = this.audio;
                audio.addEventListener("timeupdate", () => {
                    this.currentTime = audio.currentTime;
                });
                audio.addEventListener('canplay', () => {
                    this.duration = audio.duration;
                });
                audio.addEventListener(
                    "ended",
                    () => {
                        this.next()
                    }
                );
            }
        },
        setPlayerShow(val) {
            this.playerShow = val;
            // 确保即使播放器显示，但是音频仍然保持暂停状态
            if (val && this.isPause) {
                const audio = this.audio;
                if (audio) {
                    audio.pause();
                }
            }
        }
    }
});
