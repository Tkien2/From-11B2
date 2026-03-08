import * as animation from './animation.js'
const watchButton = document.getElementById("watchVidButton")
let isClicked = false
watchButton.addEventListener("click",async ()=>{
    if(!isClicked){
        await animation.playFadeOut(watchButton, 1, 0, true)
        await animation.playFadeIn(document.querySelector(".videoList"), "flex", 1, 0)
        isClicked = true
    }
})