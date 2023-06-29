const cardsContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBTn = document.getElementById('next')
const currentEL = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardBtn = document.getElementById('add-card')
const addContainer = document.getElementById('add-container')

showBtn.addEventListener('click',()=>{
    addContainer.classList.add('show')
})
hideBtn.addEventListener('click',()=>{
    addContainer.classList.remove('show')
})