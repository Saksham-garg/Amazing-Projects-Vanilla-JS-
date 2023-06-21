const container = document.getElementById('container')

const text = document.getElementById('text')

const totalTime = 7500;
const breatheTime = (totalTime/5) * 2;
const holdTime = (totalTime/5);

breatheAnimation()

function breatheAnimation(){
    text.innerText = "Breathe In!"
    container.className ='grow container'
    setTimeout(()=>{

        text.innerText = "Hold!"     

        setTimeout(()=>{
            text.innerText = "Breathe Out!"
            container.className ='shrink container'
        },holdTime)

    },breatheTime)
}

setInterval(breatheAnimation,totalTime)

