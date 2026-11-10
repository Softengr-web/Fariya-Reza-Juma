/**
 * The story engine: applies the theme, loads the configured scenes,
 * and plays them as one restartable GSAP timeline.
 */

window.escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[character]));

window.highlightPhrases = (value, phrases = []) => {
  const text = String(value ?? "");
  const matches = phrases.map(String).filter(Boolean).sort((a, b) => b.length - a.length);
  if (!matches.length) return window.escapeHTML(text);

  const escapePattern = (phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matcher = new RegExp(`(${matches.map(escapePattern).join("|")})`, "gi");
  const normalizedMatches = new Set(matches.map((phrase) => phrase.toLowerCase()));

  return text.split(matcher).map((part) => normalizedMatches.has(part.toLowerCase())
    ? `<span class="text-highlight">${window.escapeHTML(part)}</span>`
    : window.escapeHTML(part)
  ).join("");
};

window.animateHighlights = (timeline, element, position = ">") => {
  const highlights = element.querySelectorAll(".text-highlight");
  if (!highlights.length) return;

  timeline.fromTo(highlights,
    { scale: 0.96, filter: "brightness(0.9)" },
    {
      scale: 1.045,
      filter: "brightness(1.16)",
      duration: 0.3,
      stagger: 0.08,
      repeat: 1,
      yoyo: true,
      ease: "sine.inOut",
    },
    position
  );
};

function applyDarkTheme() {
  const root = document.documentElement;
  const colors = CONFIG.colors || {};
  const palette = colors.dark || {};

  root.style.setProperty("--primary", colors.primary || "#f472b6");
  root.style.setProperty("--accent", colors.accent || "#60a5fa");
  root.style.setProperty("--bg", palette.background || "#0f172a");
  root.style.setProperty("--text", palette.text || "#f1f5f9");
}

function createAmbient(reducedMotion) {
  const layer = document.getElementById("ambient-stars");
  if (!layer) return;

  for (let index = 0; index < 42; index++) {
    const star = document.createElement("span");
    star.className = index % 9 === 0 ? "ambient-star ambient-star--spark" : "ambient-star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--star-size", `${(Math.random() * 2.2 + 1).toFixed(1)}px`);
    star.style.setProperty("--star-delay", `${(Math.random() * 5).toFixed(2)}s`);
    star.style.setProperty("--star-duration", `${(3 + Math.random() * 4).toFixed(2)}s`);
    layer.appendChild(star);
  }

  const butterflyLayer = document.getElementById("ambient-butterflies");
  if (butterflyLayer) {
    const isSmallScreen = window.innerWidth <= 600;
    const butterflyCount = window.innerWidth <= 360 ? 8 : isSmallScreen ? 12 : 20;
    const palette = [
      ["#f9a8d4", "#fbcfe8"],
      ["#c4b5fd", "#ddd6fe"],
      ["#93c5fd", "#bfdbfe"],
      ["#fcd34d", "#fde68a"],
    ];
    const butterflyShape = `
      <svg viewBox="0 0 64 52" aria-hidden="true" focusable="false">
        <path class="ambient-butterfly__wing ambient-butterfly__wing--left" d="M31 24C26 13 18 5 10 7 2 9 5 21 14 26 6 29 8 39 15 42 22 45 29 37 32 30Z" fill="var(--butterfly-color)" stroke="rgba(255,255,255,.72)" stroke-width="1.1" />
        <path class="ambient-butterfly__wing ambient-butterfly__wing--right" d="M33 24C38 13 46 5 54 7 62 9 59 21 50 26 58 29 56 39 49 42 42 45 35 37 32 30Z" fill="var(--butterfly-color-soft)" stroke="rgba(255,255,255,.72)" stroke-width="1.1" />
        <path d="M30 24C23 18 17 13 10 11M30 29C23 31 18 35 15 40M34 24C41 18 47 13 54 11M34 29C41 31 46 35 49 40" fill="none" stroke="rgba(255,255,255,.64)" stroke-linecap="round" stroke-width="1" />
        <path d="M32 22C29 27 29 34 32 39 35 34 35 27 32 22Z" fill="#fff7fb" stroke="rgba(190,92,158,.68)" stroke-width="1" />
        <path d="M31 23 27 17M33 23 37 17" fill="none" stroke="rgba(255,247,251,.92)" stroke-linecap="round" stroke-width="1.2" />
      </svg>`;

    for (let index = 0; index < butterflyCount; index++) {
      const butterfly = document.createElement("span");
      const [wingColor, softWingColor] = palette[index % palette.length];
      const drift = (Math.random() - 0.5) * window.innerWidth * (isSmallScreen ? 0.2 : 0.28);
      butterfly.className = "ambient-butterfly";
      butterfly.style.left = `${7 + Math.random() * 86}%`;
      butterfly.style.top = `${22 + Math.random() * 88}%`;
      butterfly.style.setProperty("--butterfly-size", `${isSmallScreen ? 24 + Math.random() * 14 : 30 + Math.random() * 23}px`);
      butterfly.style.setProperty("--butterfly-color", wingColor);
      butterfly.style.setProperty("--butterfly-color-soft", softWingColor);
      butterfly.style.setProperty("--butterfly-opacity", `${(0.42 + Math.random() * 0.34).toFixed(2)}`);
      butterfly.style.setProperty("--flight-duration", `${(14 + Math.random() * 15).toFixed(2)}s`);
      butterfly.style.setProperty("--flight-delay", `-${(Math.random() * 18).toFixed(2)}s`);
      butterfly.style.setProperty("--drift-one", `${drift.toFixed(1)}px`);
      butterfly.style.setProperty("--drift-two", `${(-drift * 0.62).toFixed(1)}px`);
      butterfly.style.setProperty("--drift-three", `${(drift * 0.74).toFixed(1)}px`);
      butterfly.style.setProperty("--drift-end", `${(drift * 1.25).toFixed(1)}px`);
      butterfly.innerHTML = butterflyShape;
      butterflyLayer.appendChild(butterfly);
    }
  }

  if (reducedMotion) return;

  let pointerFrame = 0;
  window.addEventListener("pointermove", (event) => {
    if (pointerFrame) cancelAnimationFrame(pointerFrame);
    const x = `${(event.clientX / window.innerWidth) * 100}%`;
    const y = `${(event.clientY / window.innerHeight) * 100}%`;
    pointerFrame = requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--pointer-x", x);
      document.documentElement.style.setProperty("--pointer-y", y);
      pointerFrame = 0;
    });
  }, { passive: true });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Component not found: ${src}`));
    document.head.appendChild(script);
  });
}

function setActiveScene(activeElement, rendered) {
  rendered.forEach(({ el, comp }) => {
    el.setAttribute("aria-hidden", String(comp.overlay === true || el !== activeElement));
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.toggle("reduce-motion", reducedMotion);
  applyDarkTheme();
  createAmbient(reducedMotion);
  document.title = `Happy Birthday, ${CONFIG.name || "you"}!`;

  const audio = document.querySelector(".song");
  if (audio && CONFIG.music) {
    audio.querySelector("source").src = CONFIG.music;
    audio.load();
  }

  const types = [...new Set(CONFIG.sections.map((section) => section.type))];
  for (const type of types) {
    try {
      await loadScript(`./script/components/${type}.js`);
    } catch (error) {
      console.warn(error.message);
    }
  }

  const container = document.querySelector(".container");
  container.setAttribute("aria-label", `A birthday celebration for ${CONFIG.name || "you"}`);
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = `A birthday story full of warm wishes, joyful surprises, and love for ${CONFIG.name || "you"}.`;
  const rendered = [];

  CONFIG.sections.forEach((section) => {
    const component = window.Components && window.Components[section.type];
    if (!component) {
      console.warn(`Component "${section.type}" not found, skipping.`);
      return;
    }

    const element = component.render(container, section, CONFIG);
    element.setAttribute("aria-hidden", "true");
    rendered.push({ el: element, comp: component, section });
  });

  const beginCelebration = () => buildTimeline(rendered, reducedMotion);
  if (window.Swal) {
    Swal.fire({
      title: "One little birthday surprise",
      html: `
        <div class="music-intro">
          <div class="music-intro__art" aria-hidden="true">
            <span class="music-intro__flower music-intro__flower--one">✿</span>
            <span class="music-intro__heart music-intro__heart--one">♡</span>
            <img src="./img/doll.svg" alt="" />
            <span class="music-intro__heart music-intro__heart--two">♥</span>
            <span class="music-intro__flower music-intro__flower--two">✿</span>
          </div>
          <p class="music-intro__eyebrow">Made with love for ${window.escapeHTML(CONFIG.name || "you")}</p>
          <h2 class="music-intro__question">Shall we add a birthday song?</h2>
          <p class="music-intro__copy">A little music as your birthday story begins.</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: CONFIG.colors.accent || "#60a5fa",
      cancelButtonColor: "#766c78",
      confirmButtonText: "Play the song",
      cancelButtonText: "Start quietly",
      background: "#1e293b",
      color: "#f1f5f9",
      customClass: {
        popup: "birthday-prompt",
        title: "birthday-prompt__title",
        confirmButton: "birthday-prompt__confirm",
        cancelButton: "birthday-prompt__cancel",
      },
    }).then((result) => {
      if (result.isConfirmed && audio) audio.play().catch(() => {});
      beginCelebration();
    });
  } else {
    beginCelebration();
  }
});

function buildTimeline(rendered, reducedMotion) {
  const container = document.querySelector(".container");
  const progress = document.getElementById("experience-progress");
  const progressFill = document.querySelector(".experience-progress__fill");
  const timeline = gsap.timeline();

  if (reducedMotion) {
    rendered.forEach(({ el }) => timeline.set(el, { autoAlpha: 0 }, 0));
    timeline.set(container, { visibility: "visible" }, 0);

    rendered.forEach(({ el, comp }, index) => {
      const readText = [...el.querySelectorAll("h1, h2, h3, p, blockquote")]
        .map((node) => node.textContent.trim())
        .filter(Boolean)
        .join(" ");
      const wordCount = readText.split(/\s+/).filter(Boolean).length;
      const readingPause = Math.min(6, Math.max(1.5, wordCount / 3.2));

      if (!comp.overlay) timeline.call(() => setActiveScene(el, rendered));
      if (el.querySelector("#replay")) {
        timeline.set(el.querySelector("#replay"), { pointerEvents: "auto" });
      }
      timeline.to(el, { autoAlpha: 1, duration: 0.18, ease: "power1.out" });
      if (index < rendered.length - 1) {
        timeline.to(el, { autoAlpha: 0, duration: 0.18, ease: "power1.in" }, `+=${readingPause}`);
      }
    });
  } else {
    timeline.to(container, { duration: 0.7, visibility: "visible", ease: "power1.out" });
    let deferredExits = [];

    rendered.forEach(({ el, comp }, index) => {
      const isOverlay = comp.overlay === true;

      if (!isOverlay) {
        if (deferredExits.length) {
          deferredExits.forEach((exit) => exit());
          deferredExits = [];
        }
        timeline.call(() => setActiveScene(el, rendered));
      }

      const sceneStart = timeline.duration();
      comp.animate(timeline, el, CONFIG);
      if (!isOverlay) {
        timeline.fromTo(el,
          { autoAlpha: 0, y: 16, scale: 0.99 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" },
          sceneStart
        );
      }

      if (comp.exit) {
        const next = rendered[index + 1];
        if (next && next.comp.overlay === true) {
          deferredExits.push(() => comp.exit(timeline, el));
        } else if (!isOverlay) {
          comp.exit(timeline, el);
        }
      }
    });

    deferredExits.forEach((exit) => exit());
  }

  timeline.eventCallback("onUpdate", () => {
    const value = Math.round(timeline.progress() * 100);
    if (progressFill) progressFill.style.transform = `scaleX(${timeline.progress()})`;
    if (progress) progress.setAttribute("aria-valuenow", String(value));
  });

  const replayButton = document.getElementById("replay");
  if (replayButton) replayButton.addEventListener("click", () => {
    rendered.forEach(({ el }) => el.setAttribute("aria-hidden", "true"));
    timeline.restart();
  });
}

