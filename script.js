/**
 * Portfolio interactions.
 * The page works without this file: links still jump, and the form can be
 * submitted by a future backend. These scripts add the mobile menu, scroll
 * state, and client-side checks.
 */

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const navLinks = navMenu.querySelectorAll("a");
const sections = document.querySelectorAll("main section[id]");
const year = document.querySelector("[data-year]");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const placeholderLinks = document.querySelectorAll("[data-placeholder-link]");
const placeholderStatus = document.querySelector("[data-placeholder-status]");

year.textContent = String(new Date().getFullYear());

/**
 * Opens or closes the small-screen menu and keeps the button state in sync
 * for assistive technology.
 */
function setMenuOpen(isOpen) {
  navMenu.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

/**
 * Marks the header once the visitor has scrolled, and highlights the nav link
 * for the section that has reached the upper third of the viewport.
 * The hero has no nav link, so nothing stays highlighted at the top.
 */
function updateOnScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 8);

  const marker = window.scrollY + header.offsetHeight + window.innerHeight * 0.28;
  let currentId = "";

  sections.forEach((section) => {
    if (section.offsetTop <= marker) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isCurrent = currentId !== "" && link.getAttribute("href") === `#${currentId}`;
    if (isCurrent) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

updateOnScroll();
window.addEventListener("scroll", updateOnScroll, { passive: true });

/**
 * Sample project links should not jump to the top of the page. They explain
 * where to put a real URL until the portfolio has live projects.
 */
placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    placeholderStatus.textContent =
      "This is a sample link. Replace its href in index.html with your demo or repository URL.";
    placeholderStatus.classList.add("is-success");
  });
});

/**
 * Shows one field message and exposes the invalid state to screen readers.
 */
function setFieldError(input, message) {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = message;
  input.setAttribute("aria-invalid", message ? "true" : "false");
  if (message) {
    input.setAttribute("aria-describedby", error.id);
  } else {
    input.removeAttribute("aria-describedby");
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = contactForm.elements.name;
  const email = contactForm.elements.email;
  const message = contactForm.elements.message;
  let isValid = true;

  if (name.value.trim().length < 2) {
    setFieldError(name, "Enter your name.");
    isValid = false;
  } else {
    setFieldError(name, "");
  }

  if (!isValidEmail(email.value.trim())) {
    setFieldError(email, "Enter a valid email address.");
    isValid = false;
  } else {
    setFieldError(email, "");
  }

  if (message.value.trim().length < 10) {
    setFieldError(message, "Write at least a short message.");
    isValid = false;
  } else {
    setFieldError(message, "");
  }

  if (!isValid) {
    formStatus.textContent = "Check the highlighted fields and try again.";
    formStatus.className = "form-status is-error";
    return;
  }

  contactForm.reset();
  formStatus.textContent =
    "Message ready. Add a form service when you want this delivered to your inbox.";
  formStatus.className = "form-status is-success";
});
