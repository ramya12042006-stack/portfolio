// script.js

const frameCount = 240;
const images = [];
let currentFrame = index => `frame/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

const canvas = document.getElementById('animationCanvas');
const context = canvas.getContext('2d');

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Resize canvas to window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Draw frame
function render(index) {
    const img = images[index];
    if (!img.complete) return;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image centered
    const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// Scroll listener
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const maxScrollTop = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;

    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => render(frameIndex));
});

// Initial render
images[0].onload = () => render(0);
