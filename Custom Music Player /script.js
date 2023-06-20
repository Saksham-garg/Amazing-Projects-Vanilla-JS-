const musicContainer = document.getElementById('music-container')

const audio = document.getElementById('audio')

const prev = document.getElementById('prev')

const next = document.getElementById('next')

const play = document.getElementById('play')

const progressContainer = document.getElementById('progress-container')

const progress = document.getElementById('progress')

const title = document.getElementById('title')

const cover = document.getElementById('cover')

const songs = ['Bhaj',"Lakshya","Shorveer"]

let songIndex = 2

loadSong(songs[songIndex])

function loadSong(song){
    title.innerText = song;
    audio.src = `./audios/${song}.mp3`
    cover.src= `./images/${song}.jpeg`
}

function playsong(){
    musicContainer.classList.add('play')
    play.querySelector('i.fas').classList.remove('fa-play')
    play.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pausesong(){
    musicContainer.classList.remove('play')
    play.querySelector('i.fas').classList.remove('fa-pause')
    play.querySelector('i.fas').classList.add('fa-play')
    audio.pause()
}

function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex =  songs.length - 1;
    }
    loadSong(songs[songIndex])
    playsong()
}

function nextSong(){
    songIndex++
    if( songIndex >= songs.length){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playsong()
}

function updateProgress(e){
    const {duration,currentTime} = e.srcElement;

    const progressWidth = (currentTime/duration)*100;
    progress.style.width = `${progressWidth}%`
}

function setProgress(e){
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    console.log(e.offsetX,width)
    const duration = audio.duration;
    audio.currentTime = parseFloat((clickX/width)* duration);

}
// PLay and Pause

play.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pausesong()
    }else{
        playsong()
    }
})

prev.addEventListener('click',prevSong)
next.addEventListener('click',nextSong)
audio.addEventListener('timeupdate',(e)=>updateProgress(e))
progressContainer.addEventListener('click',(e)=>setProgress(e))

audio.addEventListener('ended',nextSong)