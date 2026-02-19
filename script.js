const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

// Set canvas full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 240; // total number of images

// IMPORTANT: folder name is frames
const currentFrame = (index) => {
  return `frames/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
};

const images = [];
let loadedImages = 0;

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);

  img.onload = () => {
    loadedImages++;
    if (loadedImages === 1) {
      render(); // render first frame after loading
    }
  };

  images.push(img);
}

function render() {
  const scrollTop = window.scrollY;
  const maxScrollTop = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
}

window.addEventListener("scroll", render);

// Resize support
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});
