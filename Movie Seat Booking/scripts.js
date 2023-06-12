const container = document.querySelector('.container')
const count = document.getElementById("count")
const total = document.getElementById("total")
const selectMovie = document.querySelector('#movie')
const allSeats = document.querySelectorAll('.row .seat:not(.occupied)')

populateUI();

function updateSelectedCount(){
   const selectedSeats = document.querySelectorAll('.row .seat.selected');

   const selectedIndex = [...selectedSeats].map(seat => [...allSeats].indexOf(seat))
   localStorage.setItem('selectedSeats',JSON.stringify(selectedIndex))
   count.innerText = selectedSeats.length;
   total.innerText = selectedSeats.length * selectMovie.value;
}

function setMovieData(selectedIndex,value){
    localStorage.setItem('selectedMoviePrice',value);
    localStorage.setItem('selectedMovieIndex',selectedIndex);
}

selectMovie.addEventListener('change',e=>{
    total.innerText = selectMovie.value;
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount()
})

function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if(selectedSeats !== null && selectedSeats.length !== 0){
        allSeats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex != null){
        selectMovie.selectedIndex = selectedMovieIndex;
    }
}

// EVENT LISTENER

container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

updateSelectedCount()