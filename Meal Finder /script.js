const submitBtn = document.getElementById('submit')
const randomBtn = document.getElementById('random')
const search = document.getElementById('search')
const resultHeading = document.getElementById('result-heading')
const mealEl = document.getElementById('meals')
const singleMeal = document.getElementById('single-meal')

function getElmentByMealID(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(res => res.json()).then(data =>{
        const meal = data.meals[0]
        addMealtoDOM(meal)
    })
}


function submitMeal(e){
    console.log("fmdfs")
    e.preventDefault();
    //Clear Single Meal 
    singleMeal.innerHTML = ''

    const term = search.value;
    if(term.trim()){
        console.log(term)
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`).then(res => res.json()).then(data => {
            console.log(data)
            resultHeading.innerHTML = `
            <h2> Search results for '${term}' </h2>
            `
        console.log(data)
        if(data.meals == null){
            resultHeading.innerHTML = `
        <p> Search meal not found. please try with some other meals</p>
        `
        }
        else{
            mealEl.innerHTML= data.meals.map(meal =>{
                return `
                <div class= "meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <div class="meal-info" data-mealid="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
                `
            }).join("")
            
        }
        })
        search.value=''
    }
    else{
        alert("Please Enter the search item")
    }
}

function addMealtoDOM(meal){
    const ingredients = []
    for(let i=1;i <=20 ;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }
        else{
            break;
        }
    }
  

    singleMeal.innerHTML=`
        <div class="single-meal">
            <h1>${meal.strMeal} </h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ingre => `<li>${ingre}</li>`).join('')}
                </ul>
            </div>

        </div>
    `
}
// Event Listener
submitBtn.addEventListener('submit',(e)=> submitMeal(e))

mealEl.addEventListener('click',(e)=>{
    console.log(e.composedPath())
    const mealInfo = e.composedPath().find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');
        }else{
            return false;
        }
    })

    console.log(mealInfo)
    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid')
        getElmentByMealID(mealID)
    }
})


randomBtn.addEventListener('click',(e)=>{
    mealEl.innerHTML = ''
    resultHeading.innerHTML=''
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json()).then(data =>{
        const datas = data.meals[0];
        addMealtoDOM(datas)
    })
})