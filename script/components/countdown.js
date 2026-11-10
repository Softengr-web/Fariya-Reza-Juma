(function () {
  window.Components = window.Components || {};

  window.Components.countdown = {
    render(container, section) {
      const div = document.createElement("section");
      div.className = "section section-countdown";
      const start = Math.max(1, Math.min(10, Number(section.from) || 3));
      const numbers = Array.from({ length: start }, (_, index) => start - index);
      div.innerHTML = `
        <p class="eyebrow countdown-kicker">Your birthday magic begins in</p>
        <div class="countdown-wrapper">
          <div class="countdown-orbit" aria-hidden="true"><span></span></div>
          ${numbers.map((number) => `<span class="countdown-num" aria-hidden="true">${number}</span>`).join("")}
          <span class="countdown-go" aria-hidden="true">${window.escapeHTML(section.goText || "✦")}</span>
        </div>
        <span class="scene-caption">Make a wish worth keeping.</span>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const numbers = el.querySelectorAll(".countdown-num");
      const go = el.querySelector(".countdown-go");
      tl.from(el.querySelector(".countdown-kicker"), { duration: 0.45, opacity: 0, y: 10 });
      numbers.forEach((number) => {
        tl.fromTo(number,
          { scale: 0.72, opacity: 0, rotation: -8 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.42, ease: "back.out(1.5)" }
        ).to(number, { scale: 1.14, opacity: 0, duration: 0.32, ease: "power1.in" }, "+=0.5");
      });
      tl.fromTo(go,
        { scale: 0.75, opacity: 0, rotation: -8 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.55, ease: "back.out(1.6)" }
      ).from(el.querySelector(".scene-caption"), { duration: 0.4, opacity: 0, y: 8 }, "-=0.2")
        .to(el, { duration: 0.45, autoAlpha: 0, y: -8, ease: "power1.in" }, "+=1.1");
    },
  };
})();

