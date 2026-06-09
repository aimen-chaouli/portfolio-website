const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollReveal();
  initCarousel();
});

/* -------------------------------------------------------------------------- */
/* Mobile navigation menu                                                     */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  if (!toggle || !menu) return;

  const icon = toggle.querySelector("i");

  const closeMenu = () => {
    menu.classList.add("hidden");
    toggle.setAttribute("aria-expanded", "false");
    if (icon) icon.className = "fa-solid fa-bars text-xl";
  };

  toggle.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    if (isOpen) {
      closeMenu();
    } else {
      menu.classList.remove("hidden");
      toggle.setAttribute("aria-expanded", "true");
      if (icon) icon.className = "fa-solid fa-xmark text-xl";
    }
  });

  // Close the menu when a link is tapped.
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu when resizing up to desktop.
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) closeMenu();
  });
}

/* -------------------------------------------------------------------------- */
/* Scroll reveal via IntersectionObserver                                     */
/* -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length === 0) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* Project image carousel                                                     */
/* -------------------------------------------------------------------------- */
function initCarousel() {
  const carousel = document.querySelector("#carousel-section");
  if (!carousel) return;

  const slidesContainer = carousel.querySelector(".carousel-slides");
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prevButton = carousel.querySelector(".carousel-button.prev");
  const nextButton = carousel.querySelector(".carousel-button.next");

  if (!slidesContainer || !prevButton || !nextButton || slides.length === 0) {
    return;
  }

  let currentIndex = 0;
  const totalSlides = slides.length;

  const update = () => {
    slidesContainer.style.transform = `translateX(${-currentIndex * 100}%)`;
  };

  const goTo = (index) => {
    currentIndex = (index + totalSlides) % totalSlides;
    update();
  };

  nextButton.addEventListener("click", () => goTo(currentIndex + 1));
  prevButton.addEventListener("click", () => goTo(currentIndex - 1));

  // Keyboard navigation when the carousel region has focus.
  carousel.setAttribute("tabindex", "0");
  carousel.setAttribute("role", "region");
  carousel.setAttribute("aria-label", "Project screenshots");
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(currentIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(currentIndex - 1);
    }
  });

  update();
}
