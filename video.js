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
        name: "Phạm Tâm",
        id: 37
    },
    {
        name: "Quang Việt",
        id: 3
    },
]
const nextVideoButton = document.getElementById("nextVideo")
const lastVideoButton = document.getElementById("lastVideo")
const videoElement = document.getElementById("video")
const currentVideoIndexElement = document.getElementById("videoIndex")
const maxVideoIndexElement = document.getElementById("maxVideoIndex")
let videoListIndex = 0
const maxVideoIndex = 2
maxVideoIndexElement.innerHTML = maxVideoIndex+1
currentVideoIndexElement.innerHTML = videoListIndex+1
const duration = 0.3
const delay = 0
/**
 * 
 * @param {number} index index from videoList 0,1,2,... 
 */
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
    }
    else{
        console.error("out of index: ", index)
        if(videoListIndex>maxVideoIndex){videoListIndex = maxVideoIndex}
        else if(videoListIndex<1){videoListIndex = 1}
    }
}
async function FadeOut(){
    await animation.playFadeOut(videoElement, duration, delay, false)
}
async function FadeIn(){
    await animation.playFadeIn(videoElement, "block", duration, delay)
}
videoElement.addEventListener("canplay", ()=>{
    FadeIn()
})
nextVideoButton.addEventListener("click", async ()=>{
    videoListIndex++
    await jumpToVideo(videoListIndex)
    currentVideoIndexElement.innerHTML = videoListIndex + 1
})
lastVideoButton.addEventListener("click", async ()=>{
    videoListIndex--
    await jumpToVideo(videoListIndex)
    currentVideoIndexElement.innerHTML = videoListIndex + 1
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