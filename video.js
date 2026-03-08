import * as animation from './animation.js'

/**
 * id chính là tên vid
 */
const videoList = [
    {
        name: "Quang Anh",
        id: 1
    },
    {
        name: "Anh Dũng",
        id: 8
    },
    {
        name: "Hoàng Đăng",
        id: 10
    },
    {
        name: "Nhật Huy",
        id: 17
    },
    {
        name: "Quốc Khoa",
        id: 22
    },
    {
        name: "Trung Kiên",
        id: 24
    },
    {
        name: "Phạm Tâm",
        id: 37
    },
    {
        name: "Quang Việt",
        id: 47
    },
]
const nextVideoButton = document.getElementById("nextVideo")
const lastVideoButton = document.getElementById("lastVideo")
const videoElement = document.getElementById("video")
const currentVideoIndexElement = document.getElementById("videoIndex")
const maxVideoIndexElement = document.getElementById("maxVideoIndex")
let videoListIndex = 0
const maxVideoIndex = videoList.length - 1
maxVideoIndexElement.innerHTML = maxVideoIndex+1
currentVideoIndexElement.innerHTML = videoListIndex+1
const duration = 0.3
const delay = 0
const loading = document.getElementById("loading")
/**
 * 
 * @param {number} index index from videoList 0,1,2,... 
 */
function setVideoSize(){
    if(videoElement.offsetHeight>videoElement.offsetWidth){
        videoElement.style.maxHeight = "70vh"
        videoElement.style.maxWidth = "none"
        videoElement.style.marginTop = "auto"
    } else{
        videoElement.style.maxWidth = "calc(80vw - 40px)"
        videoElement.style.maxHeight = "none"
        videoElement.style.marginTop = "30px"
    }
}
async function jumpToVideo(index){
    if(videoListIndex>=maxVideoIndex){
        nextVideoButton.style.opacity = 0
        nextVideoButton.style.cursor = "default"
    } else if(videoListIndex<=0){
        lastVideoButton.style.opacity = 0
        lastVideoButton.style.cursor = "default"
    } else{
        lastVideoButton.style.opacity = 1
        lastVideoButton.style.cursor = "pointer"
        nextVideoButton.style.opacity = 1
        nextVideoButton.style.cursor = "pointer"
    }
    if(videoListIndex<=maxVideoIndex && videoListIndex>= 0){
        await FadeOut()
        videoElement.src = `video/${parseInt(videoList[index].id)}.mp4`
        videoListIndex = index
        loading.style.display = "block"
    }
    else{
        if(videoListIndex>maxVideoIndex){videoListIndex = maxVideoIndex}
        else if(videoListIndex<1){videoListIndex = 1}
    }
}
async function FadeOut(){
    await animation.playFadeOut(videoElement, duration, delay, true)
}
function updateIndexElement(){
    currentVideoIndexElement.innerHTML = videoListIndex + 1
}
async function FadeIn(){
    await animation.playFadeIn(videoElement, "block", duration, delay)
    setVideoSize()
    updateIndexElement()
    loading.style.display = "none"
}
videoElement.addEventListener("canplaythrough", async ()=>{
    await FadeIn()
})
videoElement.addEventListener("ended", async ()=>{
    videoListIndex++
    await jumpToVideo(videoListIndex)
})
nextVideoButton.addEventListener("click", async ()=>{
    videoListIndex++
    await jumpToVideo(videoListIndex)
})
lastVideoButton.addEventListener("click", async ()=>{
    videoListIndex--
    await jumpToVideo(videoListIndex)
})
// ======LIST==========
const videoListElement = document.getElementById("videoList")
function setVideoList(){
    for(let i = 0; i<videoList.length; i++){
        const li = document.createElement("li")
        li.id = `${videoList[i].id}`
        li.innerHTML = videoList[i].name
        li.addEventListener("click", ()=>{
            jumpToVideo(parseInt(i))
        })
        videoListElement.insertAdjacentElement("beforeend", li)
    }
}
setVideoList()
let isListOpened = false
const openVideoListIcon = document.getElementById("openVideoList")
openVideoListIcon.addEventListener("click", ()=>{
    isListOpened = !isListOpened
    if(isListOpened){
        videoListElement.style.display = "flex"
    }else{
        videoListElement.style.display = "none"
    }
})
//=======button===========
const watchButton = document.getElementById("watchVidButton")
let isClicked = false
watchButton.addEventListener("click",async ()=>{
    if(!isClicked){
        await animation.playFadeOut(watchButton, 1, 0, true)
        await animation.playFadeOut(document.querySelector(".top"), 1, 0, true)
        await animation.playFadeIn(document.querySelector(".videoList"), "flex", 1, 0)
        await jumpToVideo(0)
        isClicked = true
    }
})