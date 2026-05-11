// Settings for your 160x32 spritesheet
const frameWidth = 128; // Each frame is 32px * 4 scale
const totalFrames = 4;  // Your requested 4-frame cycle
const fps = 15;
const frameDuration = 1000 / fps; // Roughly 66.6ms

let isPlaying = false;

function startCycle() {
    // 1. Prevent overlapping animations
    if (isPlaying) return;

    const btn = document.getElementById('play-btn');
    const player = document.getElementById('oren-player');

    // 2. Lock the button and state
    isPlaying = true;
    btn.disabled = true;
    btn.innerText = "PLAYING...";

    let currentFrame = 0;

    // 3. Start the animation timer
    const animationInterval = setInterval(() => {
        currentFrame++;

        if (currentFrame < totalFrames) {
            // Move the sheet to the left to show next frame
            player.style.backgroundPosition = `-${currentFrame * frameWidth}px 0px`;
        } else {
            // 4. Reset after 4 frames
            clearInterval(animationInterval);
            player.style.backgroundPosition = `0px 0px`; // Snap back to first frame
            
            // Unlock everything
            isPlaying = false;
            btn.disabled = false;
            btn.innerText = "PLAY ANIMATION";
        }
    }, frameDuration);
}
