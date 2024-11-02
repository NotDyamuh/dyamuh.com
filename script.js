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

// Handle audio playback
const audioModal = document.getElementById('audioModal');
const audio = document.getElementById('backgroundAudio');
const playPauseButton = document.getElementById('playPause');
let isPlaying = false;

const tracks = [
    { title: "Watch the Party Die", artist: "Kendrick Lamar", albumCover: "cover1.jpg", file: "watch_the_party_die.mp3" },
    { title: "Moonlight", artist: "XXXTentacion", albumCover: "cover2.jpg", file: "Moonlight.mp3" },
    { title: "Song Title 3", artist: "Artist 3", albumCover: "cover3.jpg", file: "track3.mp3" }
];
let currentTrackIndex = 0;

// Load the first track
function loadTrack(index) {
    audio.src = tracks[index].file;
    document.getElementById('trackName').textContent = tracks[index].title;
    document.getElementById('trackArtist').textContent = tracks[index].artist;
    document.getElementById('albumCover').src = tracks[index].albumCover; // Set album cover image
}

// Call this to load the first track at start
loadTrack(currentTrackIndex);

// Play/Pause functionality
playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = '▶️'; // Change to play icon
    } else {
        audio.play();
        playPauseButton.textContent = '⏸️'; // Change to pause icon
    }
    isPlaying = !isPlaying;
});

// Function to play the previous track
document.getElementById('prevTrack').addEventListener('click', (event) => {
    event.preventDefault();
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    isPlaying = true;
    playPauseButton.textContent = '⏸️'; // Update to pause icon
});

// Function to play the next track
document.getElementById('nextTrack').addEventListener('click', (event) => {
    event.preventDefault();
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    isPlaying = true;
    playPauseButton.textContent = '⏸️'; // Update to pause icon
});

// Handle audio modal
audioModal.addEventListener('click', () => {
    audio.play().then(() => {
        audioModal.style.display = 'none'; // Hide modal if audio starts
    }).catch(error => {
        console.error('Audio playback failed:', error);
    });
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
