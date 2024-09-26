const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

function scrambleText(element) {
  let iteration = 0;
  
  clearInterval(interval); 
  
  interval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return element.dataset.value[index]; 
        }
      
        return letters[Math.floor(Math.random() * 26)]; 
      })
      .join("");
    
    if(iteration >= element.dataset.value.length) { 
      clearInterval(interval); 
    }
    
    iteration += 1 / 3;
  }, 30); 
}

document.querySelectorAll(".ffcard").forEach(card => {
  card.onmouseenter = () => scrambleText(card.querySelector(".name"));
});

function flip(cardname){
  const card = document.getElementById(cardname);
  card.classList.toggle("clicked");
}
