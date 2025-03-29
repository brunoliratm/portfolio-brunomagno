let btnMenu = document.getElementById("btn-menu");
let menu = document.getElementById("menu-mobile");
let overlay = document.getElementById("overlay-menu");
let header = document.querySelector("header");

window.addEventListener("scroll", function() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

let darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.querySelector("i").classList.toggle("bi-sun");
  darkModeToggle.querySelector("i").classList.toggle("bi-moon");
  
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
});

window.addEventListener("DOMContentLoaded", () => {
  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode === "true") {
    document.body.classList.add("dark-mode");
    darkModeToggle.querySelector("i").classList.remove("bi-sun");
    darkModeToggle.querySelector("i").classList.add("bi-moon");
  }
});

btnMenu.addEventListener("click", () => {
  menu.classList.add("abrir-menu");
  overlay.style.display = "block";
  document.body.style.overflow = "hidden";
});

menu.querySelector(".btn-fechar").addEventListener("click", () => {
  menu.classList.remove("abrir-menu");
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
});

overlay.addEventListener("click", () => {
  menu.classList.remove("abrir-menu");
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
});

function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

const links = document.querySelectorAll("header nav a, .menu-mobile nav a, .footer-links a");
links.forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.getAttribute("href").startsWith("#")) {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      scrollToElement(targetId);
      
      if (menu.classList.contains("abrir-menu")) {
        menu.classList.remove("abrir-menu");
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
      }
    }
  });
});

const contactForm = document.getElementById("contatoForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;
    
    window.location.href = `mailto:bmagnoserver@gmail.com?subject=Contato de ${nome}&body=${mensagem}%0A%0AEmail: ${email}`;
    
    contactForm.reset();
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const projectCards = document.querySelectorAll('.project-img');
  
  if ('IntersectionObserver' in window) {
    const projectObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/)[1];
          
          const tempImg = new Image();
          tempImg.src = src;
          tempImg.onload = function() {
            img.style.backgroundImage = `url(${src})`;
            observer.unobserve(img);
          };
        }
      });
    }, {
      rootMargin: '0px 0px 200px 0px'
    });
    
    projectCards.forEach(card => {
      projectObserver.observe(card);
    });
  }
});

function handleScrollAnimations() {
  const elements = document.querySelectorAll('.skill-item, .project-card, h2.titulo, .contato-form, .contato-info');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    
    if (elementTop < window.innerHeight - 60 && elementBottom > 0) {
      element.classList.add('is-visible');
    }
  });
}

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('resize', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);