const rulesBtn = document.getElementById('rules-btn')
const closeBtn = document.getElementById('close-btn')
const rules = document.getElementById('rules')

rulesBtn.addEventListener('click',()=>{
    rules.classList.add('show')
})

rules.addEventListener('click',()=>{
    rules.classList.remove('show')
})