const musicContainer=document.getElementById('audio_container');
const prevBtn=document.getElementById('prev_btn');
const playBtn=document.getElementById('play_btn');
const nextBtn=document.getElementById('next_btn');

const audio=document.getElementById('music');
const progressBar=document.getElementById('progress_bar');
const progress=document.getElementById('progress');
const title=document.getElementById('music_name');
const musicImg=document.getElementById('music_img');

const songs= ['Benom Guruhi - Daydi','Dadamning Soyasida 2',"Doxxim - So'ngi Kecha",'Doxxim','Izzat Shukurov - Amantu Billah','Jaloliddin Ahmadaliyev - Janonlar','Jaloliddin Ahmadaliyev - Men Edim',"Jaloliddin Ahmadaliyev - Sog'indim","Ko'zmunchog'im","Meni Yo'qlab",'Qolgan_bu_yurak','Sevmagan_Qizlar','Xamdam Sobirov - 20-mart']

let songIndex=0;

function loadSong(song){
    title.innerText=song;
    audio.src=`music/${song}.mp3`
}

loadSong(songs[songIndex]);

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause();
}

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++;

    if(songIndex>songs.length -1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
    
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click',()=>{
    const isPlyaing=musicContainer.classList.contains('play');
    if(isPlyaing){
        pauseSong();
    }else{
        playSong();
    }
})

prevBtn.addEventListener('click', prevSong)

nextBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',updateProgress)

progressBar.addEventListener('click',setProgress);

audio.addEventListener('ended',nextSong);

if("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("/serviceWorker.js")
    })
}



