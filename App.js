// --- ELEMENTS ---
const icon = document.getElementById('oren-icon');
const polo = document.getElementById('polo-player');
const oren = document.getElementById('oren-player');
const audio = new Audio('Oren.mp3.wav');
audio.loop = true;

let isDragging = false;
let isTransformed = false;

// --- INITIAL POSITIONING ---
// Centering the icon in the tray at the start
function resetIconPosition() {
    icon.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    icon.style.left = "calc(50% - 32px)";
    icon.style.top = "calc(100% - 100px)";
}
resetIconPosition();

// --- DRAG EVENTS ---
icon.onmousedown = (e) => {
    if (isTransformed) return;
    isDragging = true;
    icon.style.transition = "none";
};

document.onmousemove = (e) => {
    if (!isDragging) return;
    // Follow mouse
    icon.style.left = `${e.clientX - 32}px`;
    icon.style.top = `${e.clientY - 32}px`;
};

document.onmouseup = (e) => {
    if (!isDragging) return;
    isDragging = false;

    const pRect = polo.getBoundingClientRect();
    const iRect = icon.getBoundingClientRect();

    // Check if Icon is dropped inside the Polo's area
    const isHit = (
        iRect.left < pRect.right &&
        iRect.right > pRect.left &&
        iRect.top < pRect.bottom &&
        iRect.bottom > pRect.top
    );

    if (isHit) {
        startTransformation();
    } else {
        resetIconPosition(); // Snap back smoothly
    }
};

// --- SPRUNKI LOGIC ---
function startTransformation() {
    isTransformed = true;
    icon.style.display = "none"; 
    polo.style.display = "none"; 
    oren.style.display = "block"; 

    // Play the synced music
    audio.play().catch(err => console.log("Interaction required for audio"));
    
    runRhythmLoop();
}

function runRhythmLoop() {
    // Sequence matches your Song Maker pattern
    const sequence = [
        {f: 0,   t: 0},    // Idle
        {f: 128, t: 250},  // Beat 1
        {f: 256, t: 500},  // Beat 2
        {f: 384, t: 625},  // Fast Beat
        {f: 128, t: 750},  // Beat 3
        {f: 256, t: 1000}  // Beat 4
    ];

    const loopLength = 1250; // Total pattern time

    function playFrame() {
        sequence.forEach(step => {
            setTimeout(() => {
                if (isTransformed) {
                    oren.style.backgroundPosition = `-${step.f}px 0px`;
                }
            }, step.t);
        });
    }

    playFrame();
    setInterval(playFrame, loopLength);
}
