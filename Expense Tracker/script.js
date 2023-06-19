const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyTransactions = [
//     {id: 1, text : "Flower" , amount : -30},
//     {id: 2, text : "Cash" , amount : +250},
//     {id: 4, text : "Book" , amount : -50},
//     {id: 3, text : "Salary" , amount : 200},
// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
function addTransactionToDOM(transaction){
    const li = document.createElement('li')
    
    const sign = transaction.amount < 0 ? "-" : "+"
    li.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

    li.innerHTML = 
    `
    ${transaction.text}
    <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})"><i class="fa fa-times"></i></button></li>
    `
    list.appendChild(li)
}

//update the balance

function showExpense(){
    let incomecount = 0;
    let expensecount = 0;
    transactions.forEach((trans)=>{
        trans.amount < 0 ? expensecount+=Math.abs(trans.amount) : incomecount += Math.abs(trans.amount)
    })
    if(transactions.length == 0){
        balance.innerText = `$${0}}`
        money_minus.innerText=`$${Math.abs(0)}`
        money_plus.innerText = `$${Math.abs(0)}`
    }
    balance.innerText = `$${(incomecount) - (expensecount)}`
    money_minus.innerText=`$${Math.abs(expensecount)}`
    money_plus.innerText = `$${Math.abs(incomecount)}`
}

// remove transaction by ID
function removeTransaction(transID){
    transactions = transactions.filter( transaction => transaction.id !== transID)
    if( transactions.length == 0){
        addTransactionToDOM(transactions)
    }
    updateLocalStorage()
    init();
}

function addTransaction(e){
    e.preventDefault();
    const transaction = {
        id : Math.floor(Math.random() * 10000000),
        text : text.value,
        amount : parseInt(amount.value)
    }
    transactions.push(transaction)
    addTransactionToDOM(transaction)
    showExpense()
    updateLocalStorage()

    text.value = ''
    amount.value = ''
}

function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions))
}

function init(){
    list.innerHTML = ''
    transactions.forEach(transaction => {addTransactionToDOM(transaction);
    showExpense();}
    )

}

init();

// Event Listener
form.addEventListener('submit',(e)=>addTransaction(e))
