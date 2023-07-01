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
const clearBtn = document.getElementById('clear')

showBtn.addEventListener('click',()=>{
    addContainer.classList.add('show')
})
hideBtn.addEventListener('click',()=>{
    addContainer.classList.remove('show')
})

//keep track of current card
let currentActiveCard = 0  

//Store DOM cards
const cardsEl = []

//Get Cards from localStorage 
const cardData = getCardsFromLocal()

//Store Card Data
// const cardData = [
//     {
//         question :'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question :'What is a variable?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question :'Example of a Case Sensitive Variable?',
//         answer: 'thisIsAVariable'
//     },

// ]

function getCardsFromLocal(){
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null? [] : cards
}


function createCard(card,index){
    const cardEl = document.createElement('div')
    cardEl.classList.add('card')
    if(index === 0){
        cardEl.classList.add('active')
    }
    cardEl.innerHTML = `
        <div class="inner-card" >
            <div class="inner-card-front">
                <p>${card.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${card.answer}</p>
            </div>
        </div>
    `
    cardEl.addEventListener('click',()=> cardEl.classList.toggle('show-answer'))
    cardsEl.push(cardEl)
    cardsContainer.appendChild(cardEl)

    updateCurrentText();
}

function updateCurrentText(){
    currentEL.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

function createCards(){
    cardData.forEach((card,index)=> createCard(card,index))
}

function setCardsToLocal(card){
    localStorage.setItem('cards',JSON.stringify(card))
    window.location.reload()
}

createCards()

nextBTn.addEventListener('click',()=>{
    cardsEl[currentActiveCard].className = 'card left'

    currentActiveCard++;
    if(currentActiveCard > cardsEl.length -1){
        currentActiveCard = cardsEl.length - 1
    }

    cardsEl[currentActiveCard].className = 'card active'
    updateCurrentText()
})


prevBtn.addEventListener('click',()=>{
    cardsEl[currentActiveCard].className = 'card right'

    currentActiveCard--;
    if(currentActiveCard < 0){
        currentActiveCard = 0
    }

    cardsEl[currentActiveCard].className = 'card active'
    updateCurrentText()
})

addCardBtn.addEventListener('click',()=>{
    if(questionEl.value.trim() == ''|| answerEl.value.trim() === ''){
        alert("The text area cannot be empty")
    }   
    else{
        const newCard = {question : questionEl.value, answer: answerEl.value}

        createCard(newCard)

        questionEl.value = ''
        answerEl.value = ''
        addContainer.classList.remove('show')

        cardData.push(newCard)
        setCardsToLocal(cardData)
    }
})

//Clear Cards Button
clearBtn.addEventListener('click',()=>{
    localStorage.clear()
    cardsContainer.innerHTML = ''
    window.location.reload()
})