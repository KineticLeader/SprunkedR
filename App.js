let isPlaying = false;

function startCycle() {
    if (isPlaying) return;

    const btn = document.getElementById('play-btn');
    const player = document.getElementById('oren-player');
    
    // EXACT match for your filename
    const audio = new Audio('Oren.mp3.wav');
    
    isPlaying = true;
    btn.disabled = true;
    btn.innerText = "VIBING...";

    // Matches the "dots" rhythm from your Song Maker screenshot
    // Each 'pos' is a frame jump (0, 128, 256, 384)
    const rhythmPattern = [
        { pos: 0,   delay: 300 }, 
        { pos: 128, delay: 300 }, 
        { pos: 256, delay: 150 }, 
        { pos: 384, delay: 300 }, 
        { pos: 256, delay: 150 },
        { pos: 128, delay: 300 },
        { pos: 0,   delay: 300 }
    ];

    // Start the music
    audio.play().catch(e => {
        console.log("Audio play failed. Make sure Oren.mp3.wav is in the main folder!");
        console.error(e);
    });

    let step = 0;

    function playNextStep() {
        if (step < rhythmPattern.length) {
            player.style.backgroundPosition = `-${rhythmPattern[step].pos}px 0px`;
            
            setTimeout(() => {
                step++;
                playNextStep();
            }, rhythmPattern[step].delay);
        } else {
            // Reset Oren to frame 1
            player.style.backgroundPosition = "0px 0px";
            isPlaying = false;
            btn.disabled = false;
            btn.innerText = "PLAY ANIMATION";
        }
    }

    playNextStep();
}
