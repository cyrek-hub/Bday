// ===================== Floating hearts =====================
(function generateFloatingHearts() {
  const container = document.getElementById("floatingHearts");
  if (!container) return;

  const symbols = ["♥", "♡"];
  const count = window.innerWidth < 600 ? 10 : 18;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const size = 0.8 + Math.random() * 1.6;
    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 10;
    const delay = Math.random() * 14;

    heart.style.left = `${left}vw`;
    heart.style.fontSize = `${size}rem`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;

    container.appendChild(heart);
  }
})();

// ===================== Scroll reveal =====================
(function scrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const siblingDelay = index * 60;
          setTimeout(() => el.classList.add("is-visible"), siblingDelay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

// ===================== Subtle hero parallax =====================
(function heroParallax() {
  const hero = document.getElementById("hero");
  const content = document.querySelector(".hero-content");
  if (!hero || !content) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;
      if (scrollY > window.innerHeight) return;
      content.style.transform = `translateY(${scrollY * 0.25}px)`;
      content.style.opacity = String(Math.max(1 - scrollY / 600, 0));
    },
    { passive: true }
  );
})();
