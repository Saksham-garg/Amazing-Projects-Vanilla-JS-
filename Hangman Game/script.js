const hangmanBodyParts = document.querySelectorAll('.figure-part')
const wrongLetter = document.getElementById('wrong-letters')
const wordEl = document.getElementById('word')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const playBtn = document.getElementById('play-button')
const finalMessage = document.getElementById('final-message')
const figureParts = document.querySelectorAll('.figure-part')

//Event Listener

const wordsList = ["hello","giraffe","programming","respite",'hubris']

let correctLetters = []
let wrongLetters = []
let selectedWord = wordsList[Math.floor(Math.random()* (wordsList.length))]

//Show hidden Word
function displayLetter(){
    wordEl.innerHTML=
    `
    ${selectedWord.split('').map(letter =>{
        return `<span class='letter'>
        ${correctLetters.includes(letter)? letter : ''}
        </span>   
        `
    }).join('')}
    `

    const innerWord = correctLetters.join('').replace(/\n/g,'')
    if(innerWord === selectedWord){
        finalMessage.innerText = "Congratulations, You Won the Game!"
        popup.style.display = 'block'
    }
}

function showNotification(){
    notification.classList.add('show')
    setTimeout(() => {
            notification.classList.remove('show')
    }, 2000);
} 

function updateWrongLetters(){
    wrongLetter.innerHTML= `
        ${wrongLetters.length !== 0? '<p>Wrong Letters</p>':'' }
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `

    figureParts.forEach((figurePart,index) =>{
        const errors = wrongLetters.length
        if(index < errors ){
            figurePart.style.display = 'block'
        }else{
            figurePart.style.display = 'none'
        }
    })

    if( wrongLetters.length === figureParts.length){
        finalMessage.innerText = "Unfortunately, You Lost the Game!"
        popup.style.display = 'block'
    }
}

window.addEventListener('keydown',(e)=>{
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;


        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayLetter()
            }else{
                showNotification()
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLetters()
            }
            else{
                showNotification()
            }
        }  
    }
})

playBtn.addEventListener('click',()=>{
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord = wordsList[Math.floor(Math.random()* (wordsList.length))]
    displayLetter()

    updateWrongLetters()
    popup.style.display = 'none'

})

displayLetter();