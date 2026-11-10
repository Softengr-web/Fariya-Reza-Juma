(function () {
  window.Components = window.Components || {};

  window.Components.greeting = {
    render(container, section, config) {
      const div = document.createElement("section");
      div.className = "section section-greeting";
      div.innerHTML = `
        <p class="eyebrow greeting-eyebrow">For someone who makes days brighter</p>
        <h1 class="greeting-title">
          <span class="greeting-title__intro">${window.escapeHTML(section.title || "It's your day,")}</span>
          <span class="greeting-name">${window.escapeHTML(config.name || "you")}</span>
        </h1>
        <div class="greeting-ornament" aria-hidden="true"><span>✦</span></div>
        <p class="greeting-subtitle">${window.escapeHTML(section.subtitle || "May it bring you laughter, lovely surprises, and all the little things that make you happy.")}</p>
        <span class="scene-caption">Take your time. This moment is yours.</span>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      tl.from(el.querySelector(".greeting-eyebrow"), {
        duration: 0.55, opacity: 0, y: 12, ease: "power2.out",
      })
        .from(el.querySelector(".greeting-title__intro"), {
          duration: 0.7, opacity: 0, y: 20, ease: "power3.out",
        }, "-=0.15")
        .from(el.querySelector(".greeting-name"), {
          duration: 0.95, opacity: 0, y: 28, scale: 0.96, ease: "power3.out",
        }, "-=0.3")
        .to(el.querySelector(".greeting-name"), {
          duration: 0.36, scale: 1.035, repeat: 1, yoyo: true, ease: "sine.inOut",
        }, "-=0.18")
        .from(el.querySelector(".greeting-ornament"), {
          duration: 0.65, opacity: 0, scaleX: 0, ease: "power2.out",
        }, "-=0.35")
        .from(el.querySelector(".greeting-subtitle"), {
          duration: 0.6, opacity: 0, y: 12, ease: "power2.out",
        }, "-=0.2")
        .from(el.querySelector(".scene-caption"), {
          duration: 0.5, opacity: 0, y: 8,
        }, "-=0.1")
        .to(el, { duration: 0.55, autoAlpha: 0, y: -12, ease: "power1.in" }, "+=2.8");
    },
  };
})();

