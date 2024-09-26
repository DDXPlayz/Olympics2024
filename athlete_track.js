const track = document.getElementById("image-track");
var athleteTrack = document.getElementById('athleteTrack');


let isActive = true;
let mouseDownTimeout = null;

athleteTrack.classList.add('slideIn');

const handleOnDown = e => {
  track.dataset.mouseDownAt = e.clientX;
  mouseDownTimeout = setTimeout(() => {
    track.dataset.mouseDownAt = "0";
  }, 500); 
}

const handleOnUp = () => {
  if (mouseDownTimeout) {
    clearTimeout(mouseDownTimeout);
    mouseDownTimeout = null;
  }
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if (mouseDownTimeout) {
    clearTimeout(mouseDownTimeout);
    mouseDownTimeout = null;
  }
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("trackimage")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

function zoom(imageId, textId) {
    const zoomImage = document.getElementById(imageId);
    const textOverlay = document.getElementById(textId);
    
    const allImages = document.querySelectorAll('.trackimage');
    const allTextOverlays = document.querySelectorAll('.text-overlay');

    if (zoomImage.classList.contains('zoomed-in')) {
        zoomImage.classList.remove('zoomed-in');
        textOverlay.style.display = 'none';
    } else {
        allImages.forEach(img => {
            img.classList.remove('zoomed-in');
        });
        allTextOverlays.forEach(text => {
            text.style.display = 'none';
        });
        
        zoomImage.classList.add('zoomed-in');
        textOverlay.style.display = 'block';
    }
}

function closeZoom() {
    const allImages = document.querySelectorAll('.trackimage');
    const allTextOverlays = document.querySelectorAll('.text-overlay');
    allImages.forEach(img => {
        img.classList.remove('zoomed-in');
    });
    allTextOverlays.forEach(text => {
        text.style.display = 'none';
    });
}

window.onmousedown = e => {
  if (!isActive) return;
  handleOnDown(e);
}

window.ontouchstart = e => {
  if (!isActive) return;
  handleOnDown(e.touches[0]);
}

window.onmouseup = e => {
  if (!isActive) return;
  handleOnUp(e);
}

window.ontouchend = e => {
  if (!isActive) return;
  handleOnUp(e.touches[0]);
}

window.onmousemove = e => {
  if (!isActive) return;
  handleOnMove(e);
}

window.ontouchmove = e => {
  if (!isActive) return;
  handleOnMove(e.touches[0]);
}