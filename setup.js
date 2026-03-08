async function wait(ms){
    return new Promise((resolve)=>{
        setTimeout(()=>{resolve()}, ms)
    })
}
function getRandomNum(min, max){
    return Math.random()*(max-min)+min
}
async function playBubble(n){
    let count = 0
    while(true){
        const bubble = document.createElement("div")
        const bubbleScale = getRandomNum(0.7,1.3)
        bubble.classList.add("bubble")
        bubble.style.left = `${Math.random()*(window.innerWidth - (bubble.offsetWidth*bubbleScale))}px`
        bubble.style.scale = `${bubbleScale}`
        bubble.animationDuration = `${getRandomNum(8,13)}s`
        bubble.classList.add(`bubbleColor${Math.round(getRandomNum(1,5))}`)
        document.getElementById("bubblesBackground").appendChild(bubble)
        if(count >= n){
            document.querySelector(".bubble").remove()
            count--
        }
        count++
        await wait(getRandomNum(200,1200))
    }
}
playBubble(15)