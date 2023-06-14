const currentElementOne = document.getElementById('currency-one')
const amountOne = document.getElementById('amount-one')
const currentElementTwo = document.getElementById('currency-two')
const amountTwo = document.getElementById('amount-two')
const swapBtn = document.getElementById('swap')
const rateEl = document.getElementById('rate')

function calculate(){
    const currencyOne = currentElementOne.value;
   fetch(`https://v6.exchangerate-api.com/v6/3418e9f19220a3ab6f7b128f/latest/${currencyOne}`)
    .then(res => res.json())
    .then(data => {
        const rate = data.conversion_rates[currentElementTwo.value]
        console.log(data)
    
        rateEl.innerText = `${amountOne.value} ${currentElementOne.value} = ${amountTwo.value} ${currentElementTwo.value}`;
        amountTwo.value = (amountOne.value * rate).toFixed(2);
    })
    
}


//EVENT LISTENER
currentElementOne.addEventListener('change',calculate)
currentElementTwo.addEventListener('change',calculate)
amountOne.addEventListener('input',calculate)
amountTwo.addEventListener('input',calculate)


swapBtn.addEventListener('click',()=>{
    const temp = currentElementOne.value;
    currentElementOne.value = currentElementTwo.value;
    currentElementTwo.value = temp;
    calculate()
})
calculate()