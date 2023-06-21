const days = document.getElementById('days')
const hours = document.getElementById('hours')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const year = document.getElementById('year')
const loading = document.getElementById('loading')
const countdown = document.getElementById('countdown')


const currentYear = new Date().getFullYear()
const newYearTime = new Date(`Januaury 01 ${currentYear+1} 00:00:00`)

function updateTime(){
    const currentTime = new Date()
    const diff = newYearTime - currentTime;
    const d = Math.floor(diff/1000/60/60/24)
    const h = Math.floor(diff/1000/60/60) % 24
    const m = Math.floor(diff/1000/60) % 60
    const s = Math.floor(diff/1000) % 60
    
    days.innerHTML = d > 10? d : '0' + d
    hours.innerHTML = h > 10? h : '0' + h
    minutes.innerHTML = m > 10? m : '0' + m
    seconds.innerHTML = s > 10? s : '0' + s
}

setTimeout(() => {
    loading.remove()
    countdown.style.display = 'flex'
}, 1000);

function thisYear(){
    year.innerText = `${currentYear +1 }`
}
thisYear()
setInterval(updateTime,1000)