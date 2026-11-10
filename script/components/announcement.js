(function () {
  window.Components = window.Components || {};

  window.Components.announcement = {
    render(container, section) {
      const div = document.createElement("section");
      div.className = "section section-announcement";
      div.innerHTML = `
        <div class="announcement-seal" aria-hidden="true"><span>✦</span></div>
        <p class="eyebrow">Today is yours</p>
        <h2 class="announcement-text">${window.highlightPhrases(section.text || "Today belongs to you. May it bring all the joy and love you deserve.", ["Juma", "how loved you are"])}</h2>
        <span class="announcement-rule" aria-hidden="true"></span>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      tl.from(el.querySelector(".announcement-seal"), {
        duration: 0.75, opacity: 0, scale: 0.55, rotation: -18, ease: "back.out(1.5)",
      })
        .from(el.querySelector(".eyebrow"), { duration: 0.45, opacity: 0, y: 10 }, "-=0.35")
        .from(el.querySelector(".announcement-text"), {
          duration: 0.8, opacity: 0, y: 20, ease: "power3.out",
        }, "-=0.15");
      window.animateHighlights(tl, el, "-=0.05");
      tl.from(el.querySelector(".announcement-rule"), {
        duration: 0.65, scaleX: 0, ease: "power2.out",
      }, "-=0.25")
        .to(el, { duration: 0.5, autoAlpha: 0, y: -10 }, "+=2.3");
    },
  };
})();

