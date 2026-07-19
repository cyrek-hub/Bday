// ===================== Floating hearts + sparkles =====================
(function generateFloatingHearts() {
  const container = document.getElementById("floatingHearts");
  if (!container) return;

  const heartSymbols = ["♥", "♡"];
  const sparkleSymbols = ["✦", "✧", "⋆", "💫"];
  const colors = ["#d9a5a0", "#c17d84", "#f6d488", "#fffdf9"];
  const count = window.innerWidth < 600 ? 14 : 24;

  for (let i = 0; i < count; i++) {
    const isSparkle = Math.random() < 0.4;
    const heart = document.createElement("span");
    heart.className = isSparkle ? "floating-heart is-sparkle" : "floating-heart";
    const symbols = isSparkle ? sparkleSymbols : heartSymbols;
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    const size = isSparkle ? 0.6 + Math.random() * 1.1 : 0.8 + Math.random() * 1.6;
    const left = Math.random() * 100;
    const duration = isSparkle ? 6 + Math.random() * 6 : 9 + Math.random() * 10;
    const delay = Math.random() * 14;

    heart.style.left = `${left}vw`;
    heart.style.fontSize = `${size}rem`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;

    container.appendChild(heart);
  }
})();

// ===================== Intro gate (Do you love me?) =====================
(function introGate() {
  const overlay = document.getElementById("introOverlay");
  const yesBtn = document.getElementById("introYes");
  const noBtn = document.getElementById("introNo");
  if (!overlay || !yesBtn || !noBtn) return;

  function dodge() {
    const margin = 16;
    const rect = noBtn.getBoundingClientRect();
    const maxLeft = Math.max(window.innerWidth - rect.width - margin, margin);
    const maxTop = Math.max(window.innerHeight - rect.height - margin, margin);
    const left = margin + Math.random() * (maxLeft - margin);
    const top = margin + Math.random() * (maxTop - margin);

    noBtn.classList.add("is-dodging");
    noBtn.style.left = `${left}px`;
    noBtn.style.top = `${top}px`;
  }

  noBtn.addEventListener("mouseover", dodge);
  noBtn.addEventListener("focus", dodge);
  noBtn.addEventListener(
    "touchstart",
    (e) => {
      e.preventDefault();
      dodge();
    },
    { passive: false }
  );
  // safety net in case a click still lands on it
  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dodge();
  });

  yesBtn.addEventListener("click", () => {
    overlay.classList.add("is-hidden");
    document.body.classList.remove("no-scroll");
    window.setTimeout(() => {
      overlay.style.display = "none";
    }, 650);
  });
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
