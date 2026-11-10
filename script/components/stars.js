(function () {
  window.Components = window.Components || {};

  window.Components.stars = {
    overlay: true,

    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-stars";
      div.setAttribute("aria-hidden", "true");
      const count = Math.min(90, Math.max(1, Number(section.count) || 40));

      for (let index = 0; index < count; index++) {
        const star = document.createElement("span");
        star.className = index % 13 === 0 ? "star star--bright" : "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.setProperty("--star-size", `${(Math.random() * 2.4 + 1).toFixed(1)}px`);
        star.style.setProperty("--star-delay", `${(Math.random() * 4).toFixed(2)}s`);
        div.appendChild(star);
      }

      for (let index = 0; index < 3; index++) {
        const shootingStar = document.createElement("span");
        shootingStar.className = `shooting-star shooting-star--${index + 1}`;
        div.appendChild(shootingStar);
      }

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.75, ease: "power1.out" })
        .to(el, { opacity: 0, duration: 0.75, ease: "power1.in" }, "+=2.8");
    },
  };
})();

