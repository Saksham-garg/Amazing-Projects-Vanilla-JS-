const toggleBtn = document.getElementById('toggle')
const textBox = document.getElementById('text-box')
const voiceSelect = document.getElementById('voices')
const readBtn = document.getElementById('read')
const textArea = document.getElementById('text')
const closeBtn = document.getElementById('close')
const main = document.getElementById('main')

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

let message = new SpeechSynthesisUtterance()

function createBox(item){
   const box = document.createElement('div')
   box.classList.add('box')
   box.innerHTML = `
        <img src="${item.image}" alt="${item.text}">
        <p class='info'>${item.text}</p>
   `
   
   box.addEventListener('click',()=>{
       setTextMessage(`${item.text}`)
       speakText()
       
       box.classList.add('active')
      setTimeout(() => {
           box.classList.remove('active')
        }, 800);
    })
    main.appendChild(box)
}

data.forEach((item)=>createBox(item))

toggleBtn.addEventListener('click',()=>{
    textBox.classList.add('show')
})

closeBtn.addEventListener('click',()=>{
    textBox.classList.remove('show')
})

let voices = []
function getVoice(){
    voices = speechSynthesis.getVoices()
    voices.forEach((voice)=>{
        const option = document.createElement('option')
        option.value = voice.name
        option.innerText = `${voice.name} ${voice.lang}`
        voiceSelect.appendChild(option)
    })
}

function setTextMessage(text){
    message.text = text;
}

function speakText(){
    speechSynthesis.speak(message)
}

function setVoice(e){
    message.voice = voices.find(voice => voice.name === e.target.value)
}

voiceSelect.addEventListener('change',(e)=>setVoice(e))

speechSynthesis.addEventListener('voiceschanged',getVoice)

readBtn.addEventListener('click',()=>{
    setTextMessage(textArea.value)
    speakText()
})

getVoice();
