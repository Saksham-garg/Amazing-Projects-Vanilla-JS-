const draggable_list = document.getElementById('draggable-list')
const check_btn = document.getElementById('check')

const richestPeople = [
    'Elon Musk',
    'Bernard Arnault & family',
    'Jeff Bezos',
    'Larry Ellison',
    'Bill Gates',
    'Warren Buffett',
    'Berkshire Hathaway',
    'Steve Ballmer',
    'Larry Page',
    'Mark Zuckerberg'
]

let listItems = []

function injectList(){

    [...richestPeople].
    map( a => ({value : a, sort : Math.random()})).
    sort( (a,b) => a.sort - b.sort).
    map( a => a.value).
    forEach((person,index) => {

        const listItem = document.createElement('li');

        listItem.setAttribute('data-index',index)
        listItem.innerHTML = `
        <span class= "number" > ${index + 1} </span>
        <div class="draggable" draggable = "true" >
             <p class="person-name" > ${person} </p>
             <i class = "fas fa-grip-lines"> </i>
        </div>
        `
        listItems.push(listItem)

        draggable_list.appendChild(listItem)
    });

    addEventListeners();
}

injectList()
let dragStartIndex;
function dragOver(e){
    e.preventDefault();
    this.classList.add('over')
}

function dragEnter(){
    this.classList.add('over')
}

function dragStart(){
    dragStartIndex = +this.closest('li').getAttribute('data-index')
    console.log(dragStartIndex)
}

function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index')
    console.log(dragEndIndex)
    swapItems(dragStartIndex,dragEndIndex)

    this.classList.remove('over')
}

function swapItems(fromIndex,toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}


function dragLeave(){
    this.classList.remove('over')
}


function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable')
    const draggableList = document.querySelectorAll('.draggable-list li')

    draggables.forEach( draggable =>{
        draggable.addEventListener('dragstart',dragStart)
    })
    draggableList.forEach(item =>{
        item.addEventListener('dragover',dragOver)
        item.addEventListener('dragenter',dragEnter)
        item.addEventListener('dragleave',dragLeave)
        item.addEventListener('drop',dragDrop)
    })
}

function checkOrder(){
    listItems.forEach((list,index)=>{
        if(list.querySelector('.person-name').innerText === richestPeople[index]){
            list.classList.add('right')
        }else{
            list.classList.add('wrong')
        }
    })
}

check_btn.addEventListener('click',checkOrder)