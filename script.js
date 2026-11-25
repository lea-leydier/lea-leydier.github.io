
let burgerBtn, navLinks, videoFrame, modal;

function closeMenu() {
  navLinks.classList.remove('active');
  burgerBtn.setAttribute('aria-expanded', 'false');
  burgerBtn.textContent = '☰';
}

function openVideo(videoUrl, time) {
  if (!videoUrl) {
    showModal('Vidéo non disponible');
    return;
  }
  var src = videoUrl + "?autoplay=1";
  if (time) {
    src+= "&start=" + time;
  }
  videoFrame.src = src;
  modal.classList.add('open');
}

function closeVideo(e) {
  if (e.target === modal || e.target.classList.contains('close-modal')) {
    modal.classList.remove('open');
    videoFrame.src = "";
  }
}

function showModal(text) {
  document.getElementById('modal-text').textContent = text;
  document.getElementById('info-modal').showModal();
}

document.addEventListener("DOMContentLoaded", () => {

  burgerBtn = document.getElementById('burgerBtn');
  navLinks = document.getElementById('navLinks');

  burgerBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    burgerBtn.setAttribute('aria-expanded', isOpen);
    burgerBtn.textContent = isOpen ? '✕' : '☰';
  });
  
  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !burgerBtn.contains(event.target)) {
      closeMenu();
    }
  });
  
  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });
  
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  
  let resizeTimer;

  window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
      }, 400);
    });

  modal = document.getElementById('videoModal');
  videoFrame = document.getElementById('videoFrame');

  document.getElementById('info-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.close();
    }
  });
  
  const nom = "contact";
  const domaine = "lea-leydier.fr";
  const email = nom + "@" + domaine;
  const lien = document.createElement("a");
  lien.href = "mailto:" + email;
  lien.textContent = email;
  document.getElementById("contact-auteur").appendChild(lien);
  
});