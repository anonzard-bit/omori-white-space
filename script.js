// fade on load
window.addEventListener("load", () => {
  document.querySelector(".hero").classList.add("show");
});

// fade on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".fade").forEach(el => {
  observer.observe(el);
});

// hide navbar on scroll down
let lastScroll = 0;
const nav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 100) {
    // scroll down
    nav.classList.add("hide");
  } else {
    // scroll up
    nav.classList.remove("hide");
  }

  lastScroll = currentScroll;
});

// parallax effect
const parallax = document.querySelector(".parallax");

window.addEventListener("scroll", () => {
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.3 + "px";
});

// audio
const btn = document.getElementById("enterBtn");
const audio = document.getElementById("bgAudio");

btn.addEventListener("click", () => {
  audio.volume = 0.4;
  audio.play();
  btn.style.display = "none";
});
