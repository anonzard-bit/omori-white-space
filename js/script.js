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

// search form
const form = document.getElementById("heroSearchForm");
const engine = document.getElementById("searchEngine");
const query = document.getElementById("searchQuery");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const value = query.value.trim();
  if (!value) return;

  let url = "";

  if (engine.value === "google") {
    url = `https://www.google.com/search?q=${encodeURIComponent(value)}`;
  } 
  else if (engine.value === "youtube") {
    url = `https://www.youtube.com/results?search_query=${encodeURIComponent(value)}`;
  } 
  else if (engine.value === "site") {
    url = `https://www.google.com/search?q=site:yusril.github.io ${encodeURIComponent(value)}`;
  }

  window.open(url, "_blank");
});

// parallax effect
const parallax = document.querySelector(".parallax");

window.addEventListener("scroll", () => {
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.3 + "px";
});

// audio
const btn = document.getElementById("enterBtn");
const audio = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const icon = musicBtn.querySelector("i");

musicBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    icon.classList.remove("bi-play-fill");
    icon.classList.add("bi-pause-fill");
  } else {
    audio.pause();
    icon.classList.remove("bi-pause-fill");
    icon.classList.add("bi-play-fill");
  }
});

btn.addEventListener("click", () => {
  audio.volume = 0.4;
  audio.play();
  btn.style.display = "none";
});
