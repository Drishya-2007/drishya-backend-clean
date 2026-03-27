let words = [
  "Pixel-perfect UI",
  "Responsive Design",
  "Interactive Interfaces"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {
  let currentWord = words[wordIndex];

  if (!isDeleting) {
    charIndex++;
    typingElement.textContent = currentWord.substring(0, charIndex);
  } else {
    charIndex--;
    typingElement.textContent = currentWord.substring(0, charIndex);
  }

  // WHEN WORD FULLY TYPED
  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1000); // pause AFTER full word
    return;
  }

  // WHEN WORD FULLY DELETED
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, isDeleting ? 40 : 70);
}

typeEffect();


const form = document.getElementById("contact-form");
if (form) {
form.addEventListener("submit", async (e) => {
  console.log("FORM SUBMITTED");
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const res = await fetch("https://drishya-backend-clean.onrender.com/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  });

  const data = await res.text();
  alert(data);
});
}
document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
    window.location.href = "admin/login.html";
  }
});

const aboutContainer = document.querySelector('.about-container');
const certs = document.querySelectorAll(".cert-card");
const projects = document.querySelectorAll(".project-card");

window.addEventListener("scroll", () => {
  const trigger = window.innerHeight * 0.85;

  // ABOUT
  if (aboutContainer) {
    const top = aboutContainer.getBoundingClientRect().top;
    if (top < trigger) {
      aboutContainer.classList.add("visible");
    }
  }

  // CERTIFICATES
  certs.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < trigger) {
      card.classList.add("show");
    }
  });

  // PROJECTS
  projects.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < trigger) {
      card.classList.add("show");
    }
  });

});