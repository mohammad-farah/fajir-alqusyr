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

const gallery = document.querySelector(".gallery");
const galleryItems = document.querySelectorAll(".gallery-item");

let currentIndex = 0;
const totalItems = galleryItems.length;
const scrollInterval = 3000; // time between auto scroll in ms

function scrollGallery() {
  currentIndex++;

  if (currentIndex >= totalItems) {
    // Loop back to start
    gallery.scrollTo({ left: 0, behavior: "smooth" });
    currentIndex = 0;
  } else {
    const scrollLeft =
      galleryItems[currentIndex].offsetLeft - gallery.offsetLeft;
    gallery.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }
}

// Auto scroll every 3 seconds
let autoScroll = setInterval(scrollGallery, scrollInterval);

// Optional: pause auto-scroll on hover
gallery.addEventListener("mouseenter", () => clearInterval(autoScroll));
gallery.addEventListener("mouseleave", () => {
  autoScroll = setInterval(scrollGallery, scrollInterval);
});

// Optional: enable mouse wheel horizontal scroll on hover
gallery.addEventListener("wheel", (e) => {
  e.preventDefault();
  gallery.scrollLeft += e.deltaY;
});

/* ============================================================
   PAYMENT POPUPS
   ============================================================ */

function showPopup(button) {
  const parent = button.closest(".method");
  const popUp = parent.querySelector(".pop-up");

  popUp.style.display = "flex";
  popUp.style.opacity = "0";
  popUp.style.transition = "opacity 0.5s";

  setTimeout(() => {
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
  const btnImg = btn.querySelector(".copy-icon");

  if (!text) return;

  // Try modern clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (btnImg) btnImg.src = "./assets/icons/check.png";

        setTimeout(() => {
          if (btnImg) btnImg.src = "./assets/imgs/copy.png";
          hidePopup(popUp);
        }, 1000);
      })
      .catch((err) => {
        fallbackCopy(text, btnImg, popUp);
      });
  } else {
    fallbackCopy(text, btnImg, popUp);
  }
}

// Fallback for older browsers
function fallbackCopy(text, btnImg, popUp) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed"; // avoid scrolling
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    if (btnImg) btnImg.src = "./assets/icons/copy.png";
  } catch (err) {
    alert("نسخ النص فشل! حاول مرة أخرى.");
  }
  document.body.removeChild(textarea);

  setTimeout(() => {
    if (btnImg) btnImg.src = "./assets/icons/copy.png";
    hidePopup(popUp);
  }, 1000);
}

function hidePopup(popUp) {
  popUp.style.opacity = "0";
  setTimeout(() => {
    popUp.style.display = "none";
  }, 500);
}

/* ============================================================
   GSAP
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

// donation btn

if (isMobile) {
  gsap.from(".donation-btn", {
    x: -250,
    duration: 0.2,
    ease: "none",
    scrollTrigger: {
      trigger: "#donation-btn-trigger",
      start: "center bottom",
      toggleActions: "play none none none",
    },
  });
}

// payment methods
if (isMobile) {
  gsap.registerPlugin(ScrollTrigger);

  const goals = gsap.utils.toArray(".goal");

  goals.forEach((goal) => {
    const stat = goal.querySelector(".statistics");
    const target = parseInt(stat.textContent);

    // Reset number to zero initially
    stat.textContent = 0;

    gsap.from(goal, {
      opacity: 0,
      x: -400,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: goal,
        start: "center bottom",
        onEnter: () => {
          gsap.to(stat, {
            innerText: target,
            duration: 1,
            snap: { innerText: 1 },
            ease: "power1.out",
          });
        },
      },
    });
  });
}
