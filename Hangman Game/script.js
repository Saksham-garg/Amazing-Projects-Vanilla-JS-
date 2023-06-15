const hangmanBodyParts = document.querySelectorAll('.figure-part')

const wrongLetter = document.getElementsByClassName('wrong-letters')

const wordEl = document.getElementById('word')

const popup = document.getElementById('popup-container')

const notification = document.getElementById('notification-container')


const playBtn = document.getElementById('play-button')
//Event Listener

const finalMessage = document.getElementById('final-message')


const wordsList = ["hello","giraffe","Programming","respite",'hubris']

let correctLetters = ['s']
let wrongLetters = []

let selectedWord = wordsList[Math.floor(Math.random()* (wordsList.length))]
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
}

// window.document.addEventListener('input',()=>{

// })
displayLetter();