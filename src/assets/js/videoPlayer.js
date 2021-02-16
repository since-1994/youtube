const videoContainer = document.querySelector("#jsVideoContainer");
const videoPlayer = document.querySelector("#jsVideoContainer video");
const playBtn = document.querySelector("#jsPlayBtn");
const volumeTrigger = document.querySelector('#jsVideoContainer .volume input');
const volume = document.querySelector('#jsVideoContainer .volume');
const volumeIcon = document.querySelector('#jsVolumeIcon');
const timeline = document.querySelector('#jsVideoContainer .timeline');
const totalTime = document.querySelector('#jsTotalTime');
const currentTime = document.querySelector('#jsCurrentTime');
const fullscreen = document.querySelector('#jsFullscreen');

function handlePlay(){
    if(videoPlayer.paused){
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }else{
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function init(){
    playBtn.addEventListener('click', handlePlay);
    volume.addEventListener('mouseover', () => {
        timeline.classList.add('active');
    });
    volume.addEventListener('mouseleave', () => {
        timeline.classList.remove('active');
    });

    volumeTrigger.addEventListener('input', handleVolume);
    videoPlayer.volume = 0.5;
    videoPlayer.addEventListener('loadedmetadata', setTotalTime );
    videoPlayer.addEventListener('ended', handleEnd);
    fullscreen.addEventListener('click', goFullscreen);
    volumeIcon.addEventListener('click', handelVoluemClick);
}
function handleVolume(){
    const value = (this.value-this.min)/(this.max-this.min)*100;
    console.log(value);
    videoPlayer.volume = value/100;
    if(videoPlayer.volume === 0){
        volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
    else if(videoPlayer.volume <= 0.3){
        volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
    }else{
        volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    this.style.background = 'linear-gradient(to right, white 0%, white ' + value + '%, rgba(173, 167, 167, 0.6) ' + value + '%, rgba(173, 167, 167, 0.6) 100%)'
}
function handelVoluemClick(){
    if(videoPlayer.muted){
        videoPlayer.muted = false;
        volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
        console.log(videoPlayer.volume);
        volumeTrigger.value = videoPlayer.volume*100;
        if(videoPlayer.volume === 0){
            volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
        else if(videoPlayer.volume <= 0.3){
            volumeIcon.innerHTML = '<i class="fas fa-volume-down"></i>';
        }else{
            volumeIcon.innerHTML = '<i class="fas fa-volume-up"></i>';
        }    
        volumeTrigger.style.background ='linear-gradient(to right, white 0%, white ' + volumeTrigger.value + '%, rgba(173, 167, 167, 0.6) ' + volumeTrigger.value + '%, rgba(173, 167, 167, 0.6) 100%)';
    }else{
        videoPlayer.muted = true;
        volumeIcon.innerHTML = '<i class="fas fa-volume-mute"></i>';
        //muted를 했어도 videoPlayer는 volume값을 저장하고 있다.
        volumeTrigger.value = 0;
        volumeTrigger.style.background = 'rgba(173, 167, 167, 0.6)';
    }
}

function goFullscreen(){
    videoContainer.webkitRequestFullscreen();
    videoPlayer.classList.add('active');
    fullscreen.innerHTML = '<i class="fas fa-compress"></i>'
    fullscreen.removeEventListener('click', goFullscreen);
    fullscreen.addEventListener('click', exitFullscreen);
}

function exitFullscreen(){
    document.webkitExitFullscreen();
    videoPlayer.classList.remove('active');
    fullscreen.innerHTML = '<i class="fas fa-expand"></i>'
    fullscreen.removeEventListener('click', exitFullscreen);
    fullscreen.addEventListener('click', goFullscreen);
}

function handleEnd(){
    playBtn.innerHTML = '<i class="fas fa-redo"></i>';
    const videoId = window.location.href.split('/videos/')[1];
    fetch(`http://localhost:4000/api/${videoId}/view`, {
        method: 'POST'
    });
}

function setTotalTime(){
    const totalTimeString = formatDate(videoPlayer.duration);
    console.log(totalTimeString);
    totalTime.innerHTML = totalTimeString;
    setInterval(()=>{
        currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
    }, 1000);
}

const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
 
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (totalSeconds < 10) {
     totalSeconds = `0${totalSeconds}`;
    }	
    return `${hours}:${minutes}:${totalSeconds}`;
  };

if(videoContainer){
    init();
}