const msgEl = document.getElementById('msg')
const randomNumber = getRandomNumber();

function getRandomNumber(){
    return Math.floor(Math.random()*100) + 1 ;
}

console.log("Number ;" , randomNumber)
function speechRecognition(e){

    const msg = e.results[0][0].transcript
    console.log(msg)
    writeMessage(msg)
    checkNumber(msg)
}


function writeMessage(msg){
    msgEl.innerHTML = `
    <div>You Said</div>
    <span class="box">${msg}</span>
    `
}

function checkNumber(msg){
    const num = +msg;

    if(Number.isNaN(num)){
        msgEl.innerHTML += '<div>Not a valid Number</div>'
        return;
    }

    if( num > 100 || num < 1){
        msgEl.innerHTML += `<div>Number must be between 1 - 100</div>`
        return;
    }

    if( num === randomNumber){
        document.body.innerHTML = `
            <h2>Congrats You have guessed the right number!<br><br>It was ${num}</h2>
            <button class="play-again" id="play-again" >Play Again</button>
        `
        return;
    }
    else if(num < randomNumber){
        msgEl.innerHTML += `
            <div>GO HIGHER</div>
        `
    }
    else{
        msgEl.innerHTML +=`
            <div>GO LOWER</div>
        `
    }
}

window.SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new window.SpeechRecognition()

recognition.start()

recognition.addEventListener('result',(e)=>{
    speechRecognition(e)
})

recognition.addEventListener('end',()=>{recognition.start()})

document.body.addEventListener('click',(e)=>{
    if(e.target.id == 'play-again'){
        window.location.reload();
    }
})