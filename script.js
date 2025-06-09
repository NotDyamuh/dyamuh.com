const customCursor = document.getElementById('customCursor');
const rainCanvas = document.getElementById('rainCanvas');
const ctx = rainCanvas.getContext('2d');
rainCanvas.width = window.innerWidth;
rainCanvas.height = window.innerHeight;
let raindrops = [];

// Create raindrops
for (let i = 0; i < 100; i++) {
    raindrops.push({
        x: Math.random() * rainCanvas.width,
        y: Math.random() * rainCanvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1
    });
}

function drawRain() {
    ctx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    for (let drop of raindrops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
        drop.y += drop.speed;
        if (drop.y > rainCanvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * rainCanvas.width;
        }
    }
}

setInterval(drawRain, 33);

document.addEventListener('mousemove', (e) => {
    customCursor.style.transform = `translate(${e.clientX - 12.5}px, ${e.clientY - 12.5}px)`;
});

window.addEventListener('resize', () => {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
});

const audio = document.getElementById('backgroundAudio');
const playButton = document.getElementById('playButton');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const songTitle = document.getElementById('songTitle');
const artist = document.getElementById('artist');
const volumeSlider = document.getElementById('volumeSlider');
const audioModal = document.getElementById('audioModal');

let isPlaying = true;

const playlist = [
    { title: "As We Speak", artist: "by Yeat ft. Drake", src: "aws.mp3" },
    { title: "Never Quit", artist: "by Yeat", src: "nq.mp3" },
    // { title: "Song 3", artist: "Artist 3", src: "song3.mp3" },
];

let currentSongIndex = 0;

function playSong(index) {
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;

    const song = playlist[index];
    audio.src = song.src;
    audio.load();
    audio.play().then(() => {
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
        updateSongInfo(song.title, song.artist);
        currentSongIndex = index;
    }).catch(error => {
        console.error("Error playing song:", error);
        isPlaying = false;
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    });
}

playButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

prevButton.addEventListener('click', () => {
    playSong(currentSongIndex - 1);
});

nextButton.addEventListener('click', () => {
    playSong(currentSongIndex + 1);
});

function updateSongInfo(title, artistName) {
    songTitle.textContent = title;
    artist.textContent = artistName;
}

window.addEventListener('load', () => {
    playSong(currentSongIndex);
    if (!audio.paused) {
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    }
    audioModal.style.display = 'flex';
});

audioModal.addEventListener('click', () => {
    audio.play().then(() => {
        audioModal.style.display = 'none';
        playButton.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
    }).catch(error => {
        console.error('Audio playback failed:', error);
        isPlaying = false;
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    });
});

document.getElementById('middleButton').addEventListener('click', function(event) {
    event.preventDefault();
    const targetUrl = this.href;
    document.querySelector('.content').classList.add('fade-out');
    setTimeout(() => {
        window.location.href = targetUrl;
    }, 500);
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});
