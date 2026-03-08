import * as animation from './animation.js'
const watchVideoButton = document.getElementById("watchVidButton")
const decs = document.querySelector(".decs")
const heading = document.querySelector(".heading")
;(async ()=>{
    await animation.playFadeIn(heading, "block", 1, 1)
    await animation.playFadeIn(decs, "block", 1, 2.5)
    await animation.playFadeIn(watchVideoButton, "block", 1, 4)
})();