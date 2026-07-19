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
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
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

    if (music) {
      music.volume = 0.55;
      music.play().catch(() => {});
    }
    if (musicToggle) {
      musicToggle.classList.add("is-visible");
    }
  });

  if (musicToggle && music) {
    musicToggle.addEventListener("click", () => {
      music.muted = !music.muted;
      musicToggle.classList.toggle("is-muted", music.muted);
      musicToggle.setAttribute("aria-pressed", String(!music.muted));
      musicToggle.querySelector(".music-toggle-icon").textContent = music.muted ? "🔇" : "🎵";
      musicToggle.setAttribute("aria-label", music.muted ? "Unmute music" : "Mute music");
    });
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

// ===================== Envelope open (birthday note) =====================
(function envelopeGate() {
  const wrap = document.getElementById("envelopeWrap");
  const button = document.getElementById("envelopeButton");
  const noteCard = document.getElementById("noteCard");
  if (!wrap || !button || !noteCard) return;

  button.addEventListener("click", () => {
    if (wrap.classList.contains("is-open")) return;
    wrap.classList.add("is-open");

    window.setTimeout(() => {
      button.style.display = "none";
      noteCard.classList.remove("note-hidden");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => noteCard.classList.add("note-visible"));
      });
    }, 700);
  });
})();

// ===================== Live "time together" counter =====================
(function liveCounter() {
  const grid = document.getElementById("loveCounter");
  if (!grid) return;

  const start = new Date(grid.dataset.start);
  if (Number.isNaN(start.getTime())) return;

  const daysEl = document.getElementById("counterDays");
  const hoursEl = document.getElementById("counterHours");
  const minutesEl = document.getElementById("counterMinutes");
  const secondsEl = document.getElementById("counterSeconds");

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function tick() {
    const diff = Math.max(Date.now() - start.getTime(), 0);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    daysEl.textContent = String(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
})();

// ===================== Particle burst helper (hearts + confetti) =====================
function spawnParticleBurst(x, y, options) {
  const opts = options || {};
  const count = opts.count || 7;
  const symbols = opts.symbols || ["♥", "♡", "✦", "✧"];
  const colors = opts.colors || ["#d9a5a0", "#c17d84", "#f6d488", "#a45d6b"];
  const minDistance = opts.minDistance || 40;
  const maxDistance = opts.maxDistance || 95;
  const upwardBias = opts.upwardBias || 20;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = "heart-burst-particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.fontSize = `${0.9 + Math.random() * 0.9}rem`;

    const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.6 - 0.3);
    const distance = minDistance + Math.random() * (maxDistance - minDistance);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - upwardBias;
    const rot = (Math.random() * 90 - 45).toFixed(0);

    particle.style.setProperty("--dx", `${dx}px`);
    particle.style.setProperty("--dy", `${dy}px`);
    particle.style.setProperty("--rot", `${rot}deg`);

    document.body.appendChild(particle);
    particle.addEventListener("animationend", () => particle.remove());
    window.setTimeout(() => particle.remove(), 1200);
  }
}

// ===================== Click-anywhere heart burst =====================
(function heartBurst() {
  document.addEventListener("click", (e) => {
    const target = e.target.closest(
      "button, a, img.gallery-photo, img.polaroid-photo, img.calendar-photo"
    );
    if (!target) return;
    spawnParticleBurst(e.clientX, e.clientY);
  });
})();

// ===================== Polaroid flip (things I love about you) =====================
(function polaroidFlip() {
  document.querySelectorAll(".polaroid-flip").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("is-flipped");
    });
  });
})();

// ===================== Make a wish (blow out the candle) =====================
(function makeAWish() {
  const cake = document.getElementById("cakeButton");
  const wishMessage = document.getElementById("wishMessage");
  const relightButton = document.getElementById("relightButton");
  if (!cake || !wishMessage || !relightButton) return;

  cake.addEventListener("click", () => {
    if (cake.classList.contains("is-blown")) return;
    cake.classList.add("is-blown");
    wishMessage.classList.add("is-visible");
    relightButton.classList.add("is-visible");

    const rect = cake.getBoundingClientRect();
    spawnParticleBurst(rect.left + rect.width / 2, rect.top, {
      count: 22,
      symbols: ["🎉", "🎊", "✨", "♥", "✦", "💫"],
      colors: ["#d9a5a0", "#c17d84", "#f6d488", "#a45d6b", "#f8d7dd"],
      minDistance: 60,
      maxDistance: 150,
      upwardBias: 60,
    });
  });

  relightButton.addEventListener("click", () => {
    cake.classList.remove("is-blown");
    wishMessage.classList.remove("is-visible");
    relightButton.classList.remove("is-visible");
  });
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
