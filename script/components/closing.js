(function () {
  window.Components = window.Components || {};

  window.Components.closing = {
    render(container, section) {
      const div = document.createElement("section");
      div.className = "section section-closing";
      div.innerHTML = `
        <div class="closing-emblem" aria-hidden="true"><span>✦</span></div>
        <p class="eyebrow">One last birthday wish</p>
        <h2 class="closing-text">${window.highlightPhrases(section.text || "I hope this little birthday surprise made you smile. May the year ahead bring beautiful memories and all the happiness you deserve.", ["made you smile", "how special you are"])}</h2>
        <button class="replay-btn" id="replay" type="button">
          <span>${window.escapeHTML(section.replayText || "Let's celebrate again")}</span>
          <span class="replay-btn__icon" aria-hidden="true">↻</span>
        </button>
        <p class="closing-note">${window.escapeHTML(section.note || "Made with love, just for you.")}</p>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      tl.from(el.querySelector(".closing-emblem"), {
        duration: 0.7, opacity: 0, scale: 0.7, rotation: -15, ease: "back.out(1.4)",
      })
        .from(el.querySelector(".eyebrow"), { duration: 0.4, opacity: 0, y: 10 }, "-=0.25")
        .from(el.querySelector(".closing-text"), {
          duration: 0.75, opacity: 0, y: 16, ease: "power2.out",
        }, "-=0.1");
      window.animateHighlights(tl, el, "-=0.05");
      tl.from(el.querySelector(".replay-btn"), { duration: 0.55, opacity: 0, y: 10 }, "-=0.08")
        .set(el.querySelector(".replay-btn"), { pointerEvents: "auto" })
        .from(el.querySelector(".closing-note"), { duration: 0.4, opacity: 0 }, "-=0.05");
    },
  };
})();

