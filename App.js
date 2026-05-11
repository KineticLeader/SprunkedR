const icon = document.getElementById('oren-icon');
const oren = document.getElementById('oren-player');
const slots = document.querySelectorAll('.character-slot');
const audio = new Audio('Oren.mp3.wav');
audio.loop = true;

let isDragging = false;
let currentX, currentY, initialX, initialY;
let xOffset = 0, yOffset = 0;

// Set the tray position initially
const tray = document.getElementById('tray').getBoundingClientRect();
xOffset = tray.left + (tray.width / 2) - 32;
yOffset = tray.top + 20;
setTranslate(xOffset, yOffset, icon);

// --- IMPROVED DRAG LOGIC ---
icon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    if (e.target === icon) {
        isDragging = true;
        icon.style.transition = "none";
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        setTranslate(currentX, currentY, icon);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}

function dragEnd(e) {
    isDragging = false;
    let droppedOnSlot = null;

    // Check all 7 slots
    slots.forEach(slot => {
        const sRect = slot.getBoundingClientRect();
        const iRect = icon.getBoundingClientRect();
        if (iRect.left < sRect.right && iRect.right > sRect.left && 
            iRect.top < sRect.bottom && iRect.bottom > sRect.top) {
            droppedOnSlot = slot;
        }
    });

    if (droppedOnSlot) {
        transform(droppedOnSlot);
    } else {
        // Snap back to tray center
        xOffset = tray.left + (tray.width / 2) - 32;
        yOffset = tray.top + 20;
        icon.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        setTranslate(xOffset, yOffset, icon);
    }
}

// --- TRANSFORM LOGIC ---
function transform(targetSlot) {
    icon.style.display = "none";
    
    // Hide the specific Polo in that slot
    targetSlot.querySelector('.polo').style.display = "none";
    
    // Move Oren into that specific slot
    targetSlot.appendChild(oren);
    oren.style.display = "block";
    
    audio.play();
    startAnimation();
}

function startAnimation() {
    const sequence = [
        {f: 0, t: 0}, {f: 128, t: 250}, {f: 256, t: 500}, 
        {f: 384, t: 625}, {f: 128, t: 750}, {f: 256, t: 1000}
    ];
    setInterval(() => {
        sequence.forEach(step => {
            setTimeout(() => {
                oren.style.backgroundPosition = `-${step.f}px 0px`;
            }, step.t);
        });
    }, 1250);
}
