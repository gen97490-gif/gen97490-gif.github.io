'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile (guarded)
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
// add click event to modal close button (guarded)
if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
if (selectItems && selectItems.length) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      if (select) elementToggleFunc(select);
      filterFunc(selectedValue);

    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
if (filterBtn && filterBtn.length) {
  let lastClickedBtn = filterBtn[0];

  // Initialisation du filtre au chargement de la page
  const activeBtn = document.querySelector("[data-filter-btn].active");
  if (activeBtn) {
    lastClickedBtn = activeBtn;
    filterFunc(activeBtn.innerText.toLowerCase());
  }

  for (let i = 0; i < filterBtn.length; i++) {

    filterBtn[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;

    });

  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
// add event to all form input field
if (formInputs && formInputs.length && form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {

      // check form validation
      if (form.checkValidity()) {
        if (formBtn) formBtn.removeAttribute("disabled");
      } else {
        if (formBtn) formBtn.setAttribute("disabled", "");
      }

    });
  }
}

// Form submission simulation
if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (formBtn) {
      const originalText = formBtn.innerHTML;
      formBtn.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon><span>Message envoyé !</span>';
      formBtn.style.background = 'var(--bg-gradient-onyx)';
      form.reset();
      setTimeout(() => {
        formBtn.innerHTML = originalText;
        formBtn.removeAttribute("style");
        formBtn.setAttribute("disabled", "");
      }, 3000);
    }
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// ensure a single active page/nav on load
if (pages && pages.length) {
  let activePage = Array.from(pages).find(p => p.classList.contains('active'));
  if (!activePage) {
    pages[0].classList.add('active');
    activePage = pages[0];
  }

  if (navigationLinks && navigationLinks.length && activePage) {
    navigationLinks.forEach(nav => {
      const target = (nav.getAttribute('data-page-target') || nav.innerText).trim().toLowerCase();
      if (target === (activePage.dataset.page || '').trim().toLowerCase()) {
        nav.classList.add('active');
      } else {
        nav.classList.remove('active');
      }
    });
  }
}

// add event to all nav link (guarded)
if (navigationLinks && navigationLinks.length && pages && pages.length) {
  navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
      const currentPage = (this.getAttribute("data-page-target") || this.innerText).trim().toLowerCase();

      // debug info
      console.debug('nav click ->', currentPage);
      console.debug('available pages:', Array.from(pages).map(p => p.dataset.page));

      // activate matching page and deactivate others
      let found = false;
      pages.forEach(page => {
        const pageName = (page.dataset.page || '').trim().toLowerCase();
        if (pageName === currentPage) {
          page.classList.add("active");
          window.scrollTo(0, 0);
          found = true;
        } else {
          page.classList.remove("active");
        }
      });

      if (!found) console.warn('No page matched', currentPage);

      // update nav active state: remove from all, then add to clicked
      navigationLinks.forEach(nav => nav.classList.remove("active"));
      this.classList.add("active");
    });
  });
}
// PDF Modal functionality
const pdfModal = document.getElementById('pdfModal');
const pdfOverlay = document.getElementById('pdfOverlay');
const pdfCloseBtn = document.getElementById('pdfCloseBtn');
const pdfTitle = document.getElementById('pdfTitle');
const pdfViewer = document.getElementById('pdfViewer');
const pdfDownloadBtn = document.getElementById('pdfDownloadBtn');
const projectLinks = document.querySelectorAll('.project-link');

function openPDFModal(pdfUrl, title) {
  pdfTitle.textContent = title;
  pdfViewer.src = pdfUrl;
  pdfDownloadBtn.href = pdfUrl;
  pdfDownloadBtn.download = title.replace(/\s+/g, '_') + '.pdf';
  pdfModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePDFModal() {
  pdfModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  pdfViewer.src = '';
}

// Add event listeners to project links
if (projectLinks && projectLinks.length) {
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pdfUrl = this.getAttribute('data-pdf');
      const title = this.getAttribute('data-title') || this.querySelector('.project-title')?.innerText || 'Document';

      if (pdfUrl) {
        const encodedUrl = encodeURI(pdfUrl);
        openPDFModal(encodedUrl, title);
      } else {
        const href = this.getAttribute('href');
        if (href && href.endsWith('.html')) {
          window.open(href, '_blank');
        } else if (href && href !== '#') {
          window.open(href, '_blank');
        }
      }
    });
  });
}

// Close modal events
if (pdfCloseBtn) pdfCloseBtn.addEventListener('click', closePDFModal);
if (pdfOverlay) pdfOverlay.addEventListener('click', closePDFModal);

// Close on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
    closePDFModal();
  }
});

// --- NOUVELLES FONCTIONNALITÉS ---

// 1. Effet "Machine à écrire" pour le titre
const titleElement = document.querySelector('.info-content .title');
if (titleElement) {
  const titles = [
    "Étudiant en BUT 3 R&T",
    "Spécialisation Cybersécurité",
    "Passionné d'Informatique"
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
      titleElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      titleElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause à la fin
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500; // Pause avant de recommencer
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Lancer l'effet
  typeEffect();
}

// 2. Animation des barres de compétences au scroll
const skillSection = document.querySelector('.skills-list');
const progressBars = document.querySelectorAll('.skill-progress-fill');

const showProgress = () => {
  progressBars.forEach(progressBar => {
    // Récupère la valeur depuis le HTML (style inline ou data attribute si ajouté)
    // Ici on utilise la largeur définie dans le style inline du HTML original
    const value = progressBar.style.width; 
    progressBar.style.width = '0'; // Reset pour l'animation
    setTimeout(() => {
      progressBar.style.width = value;
    }, 100);
  });
};

// Observer pour déclencher l'animation quand la section est visible
if (skillSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        showProgress();
        observer.unobserve(entry.target); // Ne jouer qu'une fois
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(skillSection);
}
