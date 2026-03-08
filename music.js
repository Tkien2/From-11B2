const musicList = [
    {
        name: "brianjcb - TISO",
        id: 1,
    },
    {
        name: "brianjcb - Pixels",
        id: 4,
    }
]
let currentIndex = 0
const nextTrack = document.getElementById("nextTrack")
const prevTrack = document.getElementById("previousTrack")
const pause = document.getElementById("pause")
const musicAudio = document.getElementById("musicAudio")
musicAudio.volume = 0.15
const progress = document.getElementById("progress")
const progressBar = document.getElementById("progressBar")
const musicName = document.getElementById("musicName")
const loop = document.getElementById("loop")
let isLoop = false
let isPaused = false
function playTrackByIndex(index){
    if(index > musicList.length - 1){
        musicAudio.src = `music/${musicList[0].id}.mp3`
        currentIndex = 0
    } else if(index < 0){
        musicAudio.src = `music/${musicList[musicList.length - 1].id}.mp3`
        currentIndex = musicList.length - 1
    }else{
        musicAudio.src = `music/${musicList[index].id}.mp3`
        currentIndex = index
    }
    musicName.innerHTML = musicList[currentIndex].name
}
musicAudio.addEventListener("ended", ()=>{
    if(isLoop){
        playTrackByIndex(currentIndex)
    } else{
        currentIndex++
        playTrackByIndex(currentIndex)
    }
})
musicAudio.addEventListener("timeupdate", ()=>{
    progress.style.width = `${(musicAudio.currentTime/musicAudio.duration)*100}%`
})
nextTrack.addEventListener("click", ()=>{
    playTrackByIndex(currentIndex+1)
})
prevTrack.addEventListener("click", ()=>{
    playTrackByIndex(currentIndex-1)
})
pause.addEventListener("click", ()=>{
    isPaused = !isPaused
    if(isPaused){
        musicAudio.pause()
        pause.innerHTML = "play_arrow"
    } else{
        musicAudio.play()
        pause.innerHTML = "pause"
    }
})
loop.addEventListener("click", ()=>{
    isLoop = !isLoop
    if(isLoop){
        loop.style.color = "var(--hoverColor)"
    } else{
        loop.style.color = "white"
    }
})
progressBar.addEventListener("click", (e)=>{
    const x = e.clientX
    const Element = progressBar.getBoundingClientRect()
    const xElement = Element.left
    const widthElement = Element.width
    const percent = (()=>{
        let pc = ((x-xElement)/widthElement)*100
        if(pc>100){
            return 100
        } else if(pc<0){
            return 0
        } else{ return pc}
    })();
    progress.style.width = `${percent}%`
    musicAudio.currentTime = (percent/100)*musicAudio.duration
})
playTrackByIndex(0)
// ===volume===
const volumeBar = document.getElementById("volumeBar")
const volumeValue = document.getElementById("volumeValue")
const volumeFactor = 0.5
function setVolumeByXClick(xEvent){
    const x = xEvent
    const Element = volumeBar.getBoundingClientRect()
    const xElement = Element.left
    const widthElement = Element.width
    const percent = (()=>{
        let pc = ((x-xElement)/widthElement)*100
        if(pc>100){
            return 100
        } else if(pc<0){
            return 0
        } else{ return pc}
    })();
    volumeValue.style.width = `${percent}%`
    musicAudio.volume = (percent/100)*volumeFactor
}
volumeBar.addEventListener("click", (e)=>{
    setVolumeByXClick(e.clientX)
})
let isDragging = false
volumeBar.addEventListener("pointerdown", ()=>{
    isDragging = true
})
document.addEventListener("pointermove", (e)=>{
    if(isDragging){
        setVolumeByXClick(e.clientX)
    }
})
document.addEventListener("pointerup", ()=>{
    isDragging = false
})
//===closeTL===
const closeTopLayer = document.getElementById("closeTopLayer")
const musicWrap = document.getElementById("musicWrap")
const volumeWrap = document.getElementById("volumeWrap")
let isTLClosed = false
closeTopLayer.addEventListener("click", ()=>{
    isTLClosed = !isTLClosed
    if(isTLClosed){
        musicWrap.style.transform = "translate(-50%, -100%)"
        volumeWrap.style.transform = "translate(-50%, 100%)"
        closeTopLayer.style.opacity = 0.3
    } else{
        musicWrap.style.transform = "translate(-50%, 0)"
        volumeWrap.style.transform = "translate(-50%, 0)"
        closeTopLayer.style.opacity = 1
    }
})