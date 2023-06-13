const videoPlayer = document.getElementById('video');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const progressBtn = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');


function toggleVideoStatus(){
    if(videoPlayer.paused){
        videoPlayer.play()
    }else{
        videoPlayer.pause()
    }
}

function togglePlayButton(){
    if(videoPlayer.paused){
        playBtn.innerHTML= '<i class="fa fa-play fa-2px"></i>'
    }else{
        playBtn.innerHTML= '<i class="fa fa-pause fa-2x"></i>'

    }
} 

function stopVideo(){
    videoPlayer.currentTime = 0;
    videoPlayer.pause()
}

function updateProgress(){
    progressBtn.value = (videoPlayer.currentTime / videoPlayer.duration) * 100;

    // Get minutes
    let min = Math.floor(videoPlayer.currentTime  / 60)
    if( min < 10){
        min = "0"+ String(min)
    }

    let secs = Math.floor(videoPlayer.currentTime % 60) 
    if( secs < 10){
        secs = "0" + String(secs)
    }
    timestamp.innerHTML = `${min}:${secs}`
}
function setVideoProgress(){
    videoPlayer.currentTime = (+progressBtn.value/videoPlayer.duration)*100
}

//Event Listener
videoPlayer.addEventListener('click',toggleVideoStatus)
videoPlayer.addEventListener('play',togglePlayButton)
videoPlayer.addEventListener('pause',togglePlayButton)
videoPlayer.addEventListener('timeupdate',updateProgress)
stopBtn.addEventListener('click',stopVideo)
progressBtn.addEventListener('change',setVideoProgress)
playBtn.addEventListener('click',toggleVideoStatus)
