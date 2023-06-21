const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const word = document.getElementById('word')
const timeEl = document.getElementById('time')
const scoreText = document.getElementById('score')
const resultContainer = document.getElementById('result-container')
const difficultySelect = document.getElementById('difficulty')
const settingsForm = document.getElementById('settings-form')
const textInput = document.getElementById('text')

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',    
    'admit',
    'drag',
    'loving'
]

let score = 0;
let time = 10;
let difficulty = localStorage.getItem('difficulty') !==null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = difficulty;

const timeInterval = setInterval(updateTime, 1000)

function getRandomWords(){
    return words[Math.floor(Math.random()* words.length)]
}

function addWordToDOM(){
    word.innerText = getRandomWords()
}

function updateScore(){
    score++;
    scoreText.innerHTML = score;
}

function updateTime(){
    time--;
    timeEl.innerText = time +'s';
    if(time <= 0){
        clearInterval(timeInterval)
        endGame()
    }
}

function endGame(){
    resultContainer.innerHTML= `
        <h1>Time ran out </h1>
        <p>Your final Score is : ${score} </p>
        <button onclick=location.reload()>Reload</button>
    `
    resultContainer.style.display = 'flex'
}

//Focus on text on start
textInput.focus()

addWordToDOM()

// EVENT LISTENER
textInput.addEventListener('input',(e)=>{
    if(e.target.value === word.innerText){
        addWordToDOM();
        updateScore();

        if(difficulty == 'hard'){
            time+=2
        }else if(difficulty == 'medium'){
            time+=3
        }else{
            time+=5
        }
        updateTime()
        e.target.value = ''
    }
})


settingsBtn.addEventListener('click',()=>{
    console.log("fdkl")
    if(settings.classList.contains('show')){
        settings.classList.remove('show')
    }else{
        settings.classList.add('show')
    }
})

difficultySelect.addEventListener('change',(e)=>{
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty)
})