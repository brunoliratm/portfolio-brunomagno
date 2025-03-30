// Cache DOM elements to avoid repetitive queries
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu-mobile");
const overlay = document.getElementById("overlay-menu");
const header = document.querySelector("header");
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Throttle function to limit scroll event firing
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Optimized scroll handler
window.addEventListener(
  "scroll",
  throttle(function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, 100)
);

// Dark mode toggle with optimized class toggling
darkModeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);

  const icon = darkModeToggle.querySelector("i");
  if (isDarkMode) {
    icon.classList.remove("bi-sun");
    icon.classList.add("bi-moon");
  } else {
    icon.classList.remove("bi-moon");
    icon.classList.add("bi-sun");
  }
});

// DOMContentLoaded optimization
document.addEventListener("DOMContentLoaded", () => {
  // Dark mode initialization
  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode === "true") {
    document.body.classList.add("dark-mode");
    darkModeToggle.querySelector("i").classList.remove("bi-sun");
    darkModeToggle.querySelector("i").classList.add("bi-moon");
  }

  // Lazy load images
  lazyLoadImages();

  // Set up observers only when needed
  setupIntersectionObserver();
});

// Mobile menu handlers - optimized
btnMenu.addEventListener("click", () => {
  menu.classList.add("abrir-menu");
  overlay.style.display = "block";
  document.body.style.overflow = "hidden";
});

menu.querySelector(".btn-fechar").addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

function closeMenu() {
  menu.classList.remove("abrir-menu");
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
}

// Optimized smooth scroll
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const headerOffset = 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}

// Event delegation for click handling instead of multiple listeners
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='#']");
  if (link) {
    event.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    scrollToElement(targetId);

    if (menu.classList.contains("abrir-menu")) {
      closeMenu();
    }
  }
});

// Optimized image lazy loading
function lazyLoadImages() {
  const projectImgs = document.querySelectorAll(".project-img[data-src]");
  projectImgs.forEach((img) => {
    const src = img.getAttribute("data-src");
    if (src) {
      // Create image object to preload
      const tempImg = new Image();
      tempImg.onload = function () {
        img.style.backgroundImage = `url(${src})`;
        img.classList.add("loaded");
        img.removeAttribute("data-src");
      };
      tempImg.src = src;
    }
  });
}

// Set up intersection observer only when needed
function setupIntersectionObserver() {
  if (!("IntersectionObserver" in window)) return;

  const projectImgs = document.querySelectorAll(".project-img[data-src]");
  if (projectImgs.length === 0) return;

  const projectObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          if (src) {
            const tempImg = new Image();
            tempImg.onload = function () {
              img.style.backgroundImage = `url(${src})`;
              img.classList.add("loaded");
              img.removeAttribute("data-src");
              observer.unobserve(img);
            };
            tempImg.src = src;
          }
        }
      });
    },
    {
      rootMargin: "0px 0px 200px 0px",
      threshold: 0.1,
    }
  );

  projectImgs.forEach((img) => {
    projectObserver.observe(img);
  });
}
