
// fade on load
window.addEventListener("load", () => {
  document.querySelector(".hero").classList.add("show");
});

//  FADE ON SCROLL 
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

//  NAVBAR SCROLL HANDLER
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

//  SEARCH FORM  */
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

//  LOGIN FORM HANDLING
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = loginForm.querySelector("input[type='email']").value.trim();
    if (!email) {
      alert("Please enter your email to continue.");
      return;
    }
    alert(`Welcome back, ${email}! Your login is currently simulated.`);
    loginForm.reset();
  });
}

//  SIGNIN FORM HANDLING
const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = signinForm.querySelector("input[type='email']").value.trim();
    if (!email) {
      alert("Please enter your email to sign in.");
      return;
    }
    alert(`Signed in as ${email}. Welcome to White Space!`);
    signinForm.reset();
  });
}

//  SIGNUP FORM HANDLING
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = signupForm.querySelector("input[type='email']").value.trim();
    const password = signupForm.querySelector("input[type='password']").value.trim();
    const confirmPassword = signupForm.querySelectorAll("input[type='password']")[1].value.trim();

    if (!email || !password || !confirmPassword) {
      alert("Please complete all signup fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please check and try again.");
      return;
    }

    alert(`Account created for ${email}. You can now sign in.`);
    signupForm.reset();
  });
}

// parallax effect
const parallax = document.querySelector(".parallax");

if (parallax) {
  window.addEventListener("scroll", () => {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * 0.3 + "px";
  });
}

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
