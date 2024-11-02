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
        speed: Math.random() * 2 + 1 // Slower speed
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
        drop.y += drop.speed; // Move raindrop down
        // Reset raindrop to the top once it falls off the screen
        if (drop.y > rainCanvas.height) {
            drop.y = -drop.length; // Reset to just above the top
            drop.x = Math.random() * rainCanvas.width; // Random horizontal position
        }
    }
}

// Draw rain at a slower interval
setInterval(drawRain, 33); // About 30 frames per second

// Custom cursor movement
document.addEventListener('mousemove', (e) => {
    customCursor.style.transform = `translate(${e.clientX - 12.5}px, ${e.clientY - 12.5}px)`; // Center the cursor
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    rainCanvas.width = window.innerWidth;
    rainCanvas.height = window.innerHeight;
});

// Audio management
const audioModal = document.getElementById('audioModal');
const audio = document.getElementById('backgroundAudio');
const trackName = document.getElementById('trackName');
const trackArtist = document.getElementById('trackArtist');
const trackDuration = document.getElementById('trackDuration');
const albumCover = document.getElementById('albumCover');

const tracks = [
    { name: "Watch the Party Die", artist: "Kendrick Lamar", albumCover: "watchthepartydie.jpg", duration: 506, file: "watch_the_party_die.mp3" },
    { name: "Moonlight", artist: "XXXTentacion", albumCover: "Moonlight.jpg", duration: 215, file: "Moonlight.mp3" }
];

let currentTrackIndex = 0;

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.file;
    trackName.textContent = track.name;
    trackArtist.textContent = track.artist;
    albumCover.src = track.albumCover;
    trackDuration.textContent = `0:00 / ${Math.floor(track.duration / 60)}:${String(track.duration % 60).padStart(2, '0')}`;
}

function updateDuration() {
    const currentTime = Math.floor(audio.currentTime);
    trackDuration.textContent = `${Math.floor(currentTime / 60)}:${String(currentTime % 60).padStart(2, '0')} / ${Math.floor(tracks[currentTrackIndex].duration / 60)}:${String(tracks[currentTrackIndex].duration % 60).padStart(2, '0')}`;
}

// Handle audio playback
audioModal.addEventListener('click', () => {
    loadTrack(currentTrackIndex);
    audio.play().then(() => {
        audioModal.style.display = 'none'; // Hide modal if audio starts
    }).catch(error => {
        console.error('Audio playback failed:', error);
    });
});

// Update duration periodically
audio.addEventListener('timeupdate', updateDuration);

// Play/Pause functionality
const playPauseButton = document.getElementById('playPause');
playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = '⏸️'; // Change to pause icon
    } else {
        audio.pause();
        playPauseButton.textContent = '▶️'; // Change to play icon
    }
});

// Skip track
document.getElementById('nextTrack').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length; // Loop back to first track
    loadTrack(currentTrackIndex);
    audio.play();
});

// Previous track
document.getElementById('prevTrack').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length; // Loop to last track
    loadTrack(currentTrackIndex);
    audio.play();
});

// Show the modal on page load
window.addEventListener('load', () => {
    audioModal.style.display = 'flex'; // Show modal
});

// Redirect with fade-out effect
document.getElementById('middleButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of the anchor
    const targetUrl = this.href; // Get the URL to redirect to

    // Add the fade-out class to the content
    document.querySelector('.content').classList.add('fade-out');

    // Wait for the transition to complete before redirecting
    setTimeout(() => {
        window.location.href = targetUrl; // Redirect
    }, 500); // Match the CSS transition duration
});
