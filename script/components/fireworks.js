(function () {
  window.Components = window.Components || {};

  const CENTERS = [
    { x: 12, y: 30 },
    { x: 31, y: 18 },
    { x: 50, y: 28 },
    { x: 69, y: 18 },
    { x: 88, y: 30 },
  ];
  const COLORS = ["#ff69b4", "#15a1ed", "#f9d423", "#42e695", "#bd6ecf", "#ff6b6b", "#ffd93d"];

  window.Components.fireworks = {
    overlay: true,

    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-fireworks";
      div.setAttribute("aria-hidden", "true");
      const isMobile = window.innerWidth <= 600;
      const mobileCenters = [
        { x: 20, y: 28 },
        { x: 35, y: 17 },
        { x: 50, y: 25 },
        { x: 65, y: 17 },
        { x: 80, y: 28 },
      ];
      const countLimit = window.innerWidth <= 380 ? 36 : isMobile ? 45 : 60;
      const count = Math.min(countLimit, Math.max(12, Number(section.count) || 24));
      const bursts = (isMobile ? mobileCenters : CENTERS).map((center, index) => {
        const burst = document.createElement("div");
        burst.className = "firework-burst";
        burst.style.left = `${center.x}%`;
        burst.style.top = `${center.y}%`;
        const rocket = document.createElement("span");
        rocket.className = "firework-rocket";
        rocket.style.color = COLORS[(index * 2) % COLORS.length];
        rocket.dataset.launchX = String((Math.random() - 0.5) * window.innerWidth * 0.1);
        burst.appendChild(rocket);
        const ring = document.createElement("span");
        ring.className = "firework-ring";
        ring.style.color = rocket.style.color;
        burst.appendChild(ring);
        const core = document.createElement("span");
        core.className = "firework-core";
        burst.appendChild(core);
        div.appendChild(burst);
        return { element: burst, rocket, ring, core, sparks: [] };
      });

      for (let index = 0; index < count; index++) {
        const group = index % bursts.length;
        const burst = bursts[group].element;
        const spark = document.createElement("span");
        const dotsInBurst = Math.ceil(count / bursts.length);
        const dotIndex = Math.floor(index / bursts.length);
        const angle = (dotIndex / dotsInBurst) * Math.PI * 2 + Math.random() * 0.18;
        const distance = isMobile ? 30 + Math.random() * 42 : 54 + Math.random() * 58;
        spark.className = "firework-spark";
        spark.style.backgroundColor = COLORS[index % COLORS.length];
        spark.style.color = COLORS[index % COLORS.length];
        spark.style.setProperty("--spark-size", `${(Math.random() * 3 + 2).toFixed(1)}px`);
        spark.dataset.dx = String(Math.cos(angle) * distance);
        spark.dataset.dy = String(Math.sin(angle) * distance);
        burst.appendChild(spark);
        bursts[group].sparks.push(spark);
      }

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const baseTime = tl.duration();
      const bursts = [...el.querySelectorAll(".firework-burst")].map((element) => ({
        rocket: element.querySelector(".firework-rocket"),
        ring: element.querySelector(".firework-ring"),
        core: element.querySelector(".firework-core"),
        sparks: element.querySelectorAll(".firework-spark"),
      }));

      bursts.forEach((burst, index) => {
        const start = baseTime + index * 0.42;
        tl.fromTo(burst.rocket,
          { x: () => Number(burst.rocket.dataset.launchX), y: () => window.innerHeight * 0.78, scale: 0.5, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.68, ease: "power2.in" },
          start
        ).to(burst.rocket, { scale: 0.1, opacity: 0, duration: 0.1 }, start + 0.62)
          .fromTo(burst.ring,
            { scale: 0.15, opacity: 0.95 },
            { scale: window.innerWidth <= 600 ? 8 : 12, opacity: 0, duration: 0.82, ease: "power2.out" },
            start + 0.62
          )
          .fromTo(burst.core,
            { scale: 0.1, opacity: 0 },
            { scale: 1.45, opacity: 1, duration: 0.24, ease: "back.out(2)" },
            start + 0.62
          ).fromTo(burst.sparks,
            { x: 0, y: 0, scale: 0.2, opacity: 0 },
            {
              x: (sparkIndex, spark) => Number(spark.dataset.dx),
              y: (sparkIndex, spark) => Number(spark.dataset.dy),
              scale: 1,
              opacity: 1,
              duration: 0.78,
              stagger: { each: 0.012, from: "random" },
              ease: "power2.out",
            },
            start + 0.64
          ).to(burst.sparks,
            { scale: 0.1, opacity: 0, duration: 0.7, stagger: 0.008, ease: "power1.in" },
            start + 1.16
          ).to(burst.core, { scale: 1.9, opacity: 0, duration: 0.6 }, start + 1.05);
      });

      const lastBurstEnd = baseTime + (bursts.length - 1) * 0.42 + 2.1;
      tl.to(el, { duration: 0.32, autoAlpha: 0 }, lastBurstEnd);
    },
  };
})();

