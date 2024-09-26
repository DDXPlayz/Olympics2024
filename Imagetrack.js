const images = document.getElementsByClassName("image");
const button = document.getElementById("button");

let globalIndex = 0,
    last = { x: 0, y: 0 },
    isActive = true; // Flag to control activation

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = 10;

  image.dataset.status = "active";

  last = { x, y };
}

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
}

const isNearButton = (x, y) => {
  const rect = button.getBoundingClientRect(); 
  const buffer = 150; 

  return (
    x >= rect.left - buffer &&
    x <= rect.right + buffer &&
    y >= rect.top - buffer &&
    y <= rect.bottom + buffer
  );
}

const handleOnMove = s => {
  if (!isActive) return;

  if (isNearButton(s.clientX, s.clientY)) {
    return;
  }

  if (distanceFromLast(s.clientX, s.clientY) > (window.innerWidth / 20)) {
    const lead = images[globalIndex % images.length],
          tail = images[(globalIndex - 5) % images.length];

    activate(lead, s.clientX, s.clientY);

    if (tail) tail.dataset.status = "inactive";
    
    globalIndex++;
  }
}

// Stop image activation on button click
button.onclick = () => {
  var landing = document.getElementById('landing');
  var athleteTrack = document.getElementById('athleteTrack');
  
  landing.classList.add('slideOut');
  athleteTrack.classList.add('slideIn');
  isActive = false;
}

window.onmousemove = s => handleOnMove(s);
window.ontouchmove = s => handleOnMove(s.touches[0]);
