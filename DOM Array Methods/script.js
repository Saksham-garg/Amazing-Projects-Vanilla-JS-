const mainID = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleMoneyBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []



async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api')
    let data = await res.json();
    data = data.results[0]
    const user ={
        "name": `${data.name.first} ${data.name.last}`,
        "money": Math.floor(Math.random()*1000000)     
    }
    addData(user)
}

function addData(user){
    data.push(user)

    updateDOM()
}

function updateDOM(usersData = data){
    mainID.innerHTML ="<h2><strong>Person</strong> Wealth</h2>"
    usersData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`
        main.appendChild(element)
    })
}

function formatMoney(money){
    return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


function doubleMoney(){
    data = data.map(item => {
        return {
            "name" : item.name,
            "money" : item.money * 2
        }
    })
    updateDOM()
}


function sortByRichest(){
    data.sort((a,b) => b.money - a.money)
    updateDOM()
}

function showMillionaires(){
    data = data.filter(item =>{
        return item.money > 1000000
    })
    updateDOM()
}

function totalWealth(){
    const total = document.createElement('div')
    const totalMoney = data.reduce((acc,user)=> (acc += user.money),0)
    
    total.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(totalMoney)}</strong></h3>`
    if(!mainID.querySelector('h3')){
        mainID.appendChild(total)
    }
    }

addUserBtn.addEventListener('click',getRandomUser)
doubleMoneyBtn.addEventListener('click',doubleMoney)
sortBtn.addEventListener('click',sortByRichest)
showMillionairesBtn.addEventListener('click',showMillionaires)
calculateWealthBtn.addEventListener('click',totalWealth)
