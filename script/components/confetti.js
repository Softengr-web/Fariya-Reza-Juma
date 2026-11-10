(function () {
  window.Components = window.Components || {};

  const COLORS = ["#f472b6", "#60a5fa", "#f9d423", "#42e695", "#bd6ecf", "#ff6b6b", "#ffd93d"];

  window.Components.confetti = {
    overlay: true,

    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-confetti";
      div.setAttribute("aria-hidden", "true");
      const requestedCount = Math.max(1, Number(section.count) || 54);
      const countLimit = window.innerWidth <= 380 ? 36 : window.innerWidth <= 600 ? 48 : 100;
      const count = Math.min(countLimit, requestedCount);

      for (let index = 0; index < count; index++) {
        const piece = document.createElement("span");
        piece.className = `confetti-piece${index % 3 === 0 ? " confetti-piece--ribbon" : ""}`;
        const fromLeft = index % 2 === 0;
        piece.style.left = fromLeft
          ? `${3 + Math.random() * 11}%`
          : `${86 + Math.random() * 11}%`;
        piece.style.top = `${78 + Math.random() * 20}%`;
        piece.style.backgroundColor = COLORS[index % COLORS.length];
        piece.style.color = COLORS[index % COLORS.length];
        piece.dataset.burstX = String((fromLeft ? 1 : -1) * (90 + Math.random() * window.innerWidth * 0.24));
        piece.dataset.burstY = String(-window.innerHeight * (0.22 + Math.random() * 0.28));
        piece.dataset.drift = String((Math.random() - 0.5) * 150);
        piece.dataset.fall = String(window.innerHeight * (0.75 + Math.random() * 0.42));
        piece.dataset.spin = String((Math.random() - 0.5) * 900);
        div.appendChild(piece);
      }

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const pieces = el.querySelectorAll(".confetti-piece");
      tl.fromTo(pieces,
        { x: 0, y: 0, opacity: 0, rotation: -50, scale: 0.45 },
        {
          y: (index, piece) => Number(piece.dataset.burstY),
          x: (index, piece) => Number(piece.dataset.burstX),
          rotation: (index, piece) => Number(piece.dataset.spin),
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: { each: 0.012, from: "random" },
          ease: "power3.out",
        }
      ).to(pieces,
        {
          y: (index, piece) => Number(piece.dataset.burstY) + Number(piece.dataset.fall),
          x: (index, piece) => Number(piece.dataset.burstX) + Number(piece.dataset.drift),
          opacity: 0,
          duration: 2.3,
          stagger: { each: 0.008, from: "random" },
          ease: "power1.in",
        },
        "-=0.12"
      ).to(el, { duration: 0.3, autoAlpha: 0 }, "-=0.05");
    },
  };
})();

