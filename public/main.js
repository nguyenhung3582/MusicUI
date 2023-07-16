const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const PLAYER_STORAGE_KEY = "F8_PLAYER"
//import listSongs from './songs.js'
import { fetchData } from './songs.js'

const data = await fetchData();

const player = $('.player')
const cd = $(".cd")
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const app = {
    currentIndex: 0,
    isplaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: data.songs,
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${
                index === this.currentIndex ? "active" : ""
              }" data-index="${index}">
                <div class="thumb" 
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                  <h3 class="title">${song.name}</h3>
                   <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        })
        playlist.innerHTML = htmls.join("")
    },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function(){
        const _this = this
        const cdwidth = cd.offsetWidth
        
        //Xu ly CD quay / dung
        const cdThumpAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000, //10 seconds
            iterations: Infinity
        })
        cdThumpAnimate.pause()
        
        //Xu ly phong tu thu nho CD
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdwidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px': 0
            cd.style.opacity = newCdWidth / cdwidth
        }

        //Xu ly khi click play
        playBtn.onclick = function() {
            if (_this.isplaying){                
                audio.pause()
            }else{
                audio.play()                
            }
        }

        // Khi song được play
        audio.onplay = function() {
            _this.isplaying = true
            player.classList.add('playing')
            cdThumpAnimate.play()
        }

        // Khi song bị pause
        audio.onpause = function() {
            _this.isplaying = false
            player.classList.remove('playing')
            cdThumpAnimate.pause()
        }

        //Khi tien do bai hat thay doi
        audio.ontimeupdate = function() {
            if(audio.duration){
                const progressPercent = Math.floor
                    (audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }

        //Xu ly khi tua song
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        //khi next song
        nextBtn.onclick = function() {
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        //Khi prev song
        prevBtn.onclick = function() {
            if(_this.isRandom){          
                _this.playRandomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        //Xử lý bật / tắt random song
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        //Xử lý lặp lại một song
        repeatBtn.onclick = function(e) {
            _this.isRepeat = ! _this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        
        //Xử lý next/repeat song khi audio ended
        audio.onended = function() {
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        }
        //Lắng nghe click vào playlist
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            
            if (songNode) {
                _this.currentIndex = Number(songNode.dataset.index)
                _this.loadCurrentSong()
                _this.render()
                audio.play()
            }
            if(e.target.closest('.song.active .option')){     
            }
        }
    },
    scrollToActiveSong: function (){
        $(".song.active").scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    },
    loadCurrentSong: function (){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong: function (){
        this.currentIndex++
        if (this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function (){
        this.currentIndex--
        if (this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function(){
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function() {
        //Gán cấu hình vào config app
        this.loadConfig()

        //Dinh nghia cac thuoc tinh cho object
        this.defineProperties()

        //Lang nghe cac su kien
        this.handleEvents()

        //Tai xuong thong tin bai hat dau tien vao UI khi chay ung dung
        this.loadCurrentSong()

        //Render lai playlist
        this.render()

        repeatBtn.classList.toggle('active', this.isRepeat)
        randomBtn.classList.toggle('active', this.isRandom)
    }
}

app.start()