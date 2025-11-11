/* ============================================================
   NAVBAR (MOBILE TOGGLE)
   ============================================================ */

const navBtn = document.querySelector(".nav-btn");
const nav = document.querySelector("nav");
const divs = document.querySelectorAll("nav div");
const links = divs[1];
const socialMedia = divs[2];

const isMobile = window.matchMedia("(max-width: 768px)").matches;

const toggleNavbar = () => {
    if (!isMobile) return;

    navBtn.classList.toggle("rotate-btn");
    nav.classList.toggle("nav-open-container");
    links.classList.toggle("nav-open-item");
    socialMedia.classList.toggle("nav-open-item");
    
};

navBtn.addEventListener("click", toggleNavbar);

/* ============================================================
   GALLERY (INFINITE AUTO-SCROLL)
   ============================================================ */

const tracks = document.querySelectorAll(".gallery-track");

tracks.forEach((track) => {
  let x = 0;
  const speed = 0.2;
  let paused = false;

  function animate() {
    if (!paused) {
      x -= speed;

      const resetWidth = track.scrollWidth / 2;
      if (Math.abs(x) >= resetWidth) x = 0;

      track.style.transform = `translateX(${x}px)`;
    }

    requestAnimationFrame(animate);
  }

  animate();

  track.addEventListener("mouseenter", () => (paused = true));
  track.addEventListener("mouseleave", () => (paused = false));
});

/* ============================================================
   PAYMENT POPUPS
   ============================================================ */

function showPopup(button) {
  const parent = button.closest(".method");
  const popUp = parent.querySelector(".pop-up");

  popUp.style.display = "flex";
  popUp.style.opacity = "0";

  setTimeout(() => {
    popUp.style.transition = "0.5s";
    popUp.style.opacity = "1";
  }, 10);
}

/* ============================================================
   COPY PAYMENT CODE
   ============================================================ */

function copyText(btn) {
  const parent = btn.closest(".method");
  const popUp = parent.querySelector(".pop-up");
  const text = parent.querySelector(".iban-copy")?.textContent.trim();

  const btnText = btn.querySelector("p");
  const btnImg = btn.querySelector("img");

  navigator.clipboard.writeText(text).then(() => {
    btn.style.border = "1px solid green";
    btnText.textContent = "تم النسخ";
    btnText.style.color = "green";
    btnImg.src = "./assets/icons/check.png";

    setTimeout(() => {
      btnText.textContent = "انسخ كود ";
      btnText.style.color = "var(--darkred-color)";
      btnImg.src = "./assets/imgs/copy.png";
      btn.style.border = "1px solid var(--darkred-color)";

      popUp.style.opacity = "0";
      popUp.style.transition = "0.5s";

      setTimeout(() => {
        popUp.style.display = "none";
      }, 500);
    }, 1000);
  });
}
