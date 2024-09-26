document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }

const toggleNav = () => {
  document.body.dataset.nav = document.body.dataset.nav === "true" ? "false" : "true";
}

function openModal(modal) {
  const modalborder = document.getElementById("modalborder");
  const activeModal = document.querySelector('.modal.active'); 
  
  if (modal == null || activeModal != null) return;

  modal.classList.add('active');
  modalborder.classList.add('active');
}

function closeModal(modal) {
  const modalborder = document.getElementById("modalborder");

  if (modal == null) return;
  modal.classList.remove('active');
  modalborder.classList.remove('active');
}
