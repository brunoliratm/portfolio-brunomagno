// Autor: Bruno Magno
let btnMenu = document.getElementById("btn-menu");
let menu = document.getElementById("menu-mobile");
let overlay = document.getElementById("overlay-menu");

let darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.querySelector("i").classList.toggle("bi-sun");
  darkModeToggle.querySelector("i").classList.toggle("bi-moon");
});

btnMenu.addEventListener("click", () => {
  menu.classList.add("abrir-menu");
});
menu.addEventListener("click", () => {
  menu.classList.remove("abrir-menu");
});
overlay.addEventListener("click", () => {
  menu.classList.remove("abrir-menu");
});

function scrollToElement(elementId) {
  document.getElementById(elementId).scrollIntoView({
    behavior: "smooth",
  });
}

const links = document.querySelectorAll("header nav a");
links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    scrollToElement(targetId);
  });
});

const btnContato = document.getElementById("btn-contato");

btnContato.addEventListener("click", () => {
    const email = "bmagnoserver@gmail.com";
    window.location.href = `mailto:${email}?subject=Contato%20pelo%20site&body=Olá,%20gostaria%20de%20entrar%20em%20contato.`;  
});

const languageToggle = document.getElementById("language-toggle");
const languageIndicator = document.getElementById("language-indicator");
const aboutElement1 = document.querySelector(".aboutme1");
const aboutElement2 = document.querySelector(".aboutme2");
languageToggle.addEventListener("click", () => {
  if (languageIndicator.textContent === "PT") {
    languageIndicator.textContent = "EN";
    aboutElement1.textContent =
      "More than code, I offer expertise and absolute commitment. My top-notch backend is synonymous with impeccable quality and robust security, differentiators that will make your app shine. Trust an expert dedicated to your success.";
    aboutElement2.textContent =
      "I have been passionate about technology since I was a child and I am currently dedicated to my undergraduate degree in Information Systems at Unifacol. I constantly seek to evolve, acquiring new skills and knowledge in the area.";
  } else {
    languageIndicator.textContent = "PT";
    aboutElement1.textContent =
      "Mais do que código, ofereço expertise e comprometimento absoluto. Meu backend de alta qualidade é sinônimo de qualidade impecável e segurança robusta, diferenciais que farão seu app brilhar. Confie em um especialista dedicado ao seu sucesso.";
    aboutElement2.textContent =
      "Sou apaixonado por tecnologia desde criança e atualmente estou dedicado ao meu curso de graduação em Sistemas de Informação na Unifacol. Busco constantemente evoluir, adquirindo novas habilidades e conhecimentos na área.";
  }
});

const messageElement = document.querySelector(".message");
const message = "MUITO PRAZER, SOU BRUNO MAGNO ☕";
const characters = message.split("");
let typedIndex = 0;
let isTyping = false;

function typeWriter() {
  if (!isTyping) {
    isTyping = true;
    const intervalId = setInterval(() => {
      if (typedIndex < characters.length) {
        messageElement.innerHTML += characters[typedIndex];
        typedIndex++;
      } else {
        clearInterval(intervalId);
        isTyping = false;
      }
    }, 80);
  }
}
typeWriter();

const carousels = document.querySelectorAll('.carrossel .container');

carousels.forEach(carousel => {
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('active');
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('active');
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 3;
    carousel.scrollLeft = scrollLeft - walk;
  });

  if (!carousel.closest('.portfolio')) {
    let scrollAmount = 0;
    let speed = carousel.closest('#tecnologias') ? 20 : 50;
    function autoScroll() {
      if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
        scrollAmount = 0;
      } else {
        scrollAmount += 1;
      }
      carousel.scrollLeft = scrollAmount;
    }
    setInterval(autoScroll, speed);
  }
});