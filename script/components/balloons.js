(function () {
  window.Components = window.Components || {};

  const BALLOONS = ["ballon1.svg", "ballon2.svg", "ballon3.svg"];

  window.Components.balloons = {
    overlay: true,

    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-balloons";
      div.setAttribute("aria-hidden", "true");
      const requestedCount = Math.max(1, Number(section.count) || 25);
      const countLimit = window.innerWidth <= 360 ? 20 : window.innerWidth <= 600 ? 26 : 40;
      const count = Math.min(countLimit, requestedCount);

      for (let index = 0; index < count; index++) {
        const balloon = document.createElement("img");
        balloon.className = "balloon";
        balloon.src = `img/${BALLOONS[index % BALLOONS.length]}`;
        balloon.alt = "";
        balloon.draggable = false;
        balloon.style.left = `${2 + Math.random() * 96}%`;
        balloon.style.top = `${102 + Math.random() * 25}%`;
        balloon.style.setProperty("--balloon-width", `${6 + Math.random() * 7}vw`);
        balloon.dataset.drift = String((Math.random() - 0.5) * window.innerWidth * 0.12);
        balloon.dataset.tilt = String((Math.random() - 0.5) * 30);
        balloon.dataset.scale = String(0.82 + Math.random() * 0.36);
        div.appendChild(balloon);
      }

      const cake = document.createElement("div");
      cake.className = "birthday-cake";
      cake.setAttribute("aria-hidden", "true");
      cake.innerHTML = `
        <span class="birthday-cake__spark birthday-cake__spark--one">✦</span>
        <span class="birthday-cake__spark birthday-cake__spark--two">✧</span>
        <svg viewBox="0 0 320 250" focusable="false" aria-hidden="true">
          <defs>
            <linearGradient id="cake-bottom" x1="89" y1="154" x2="228" y2="211" gradientUnits="userSpaceOnUse">
              <stop stop-color="#f9a8d4" />
              <stop offset="1" stop-color="#c4b5fd" />
            </linearGradient>
            <linearGradient id="cake-top" x1="106" y1="105" x2="214" y2="158" gradientUnits="userSpaceOnUse">
              <stop stop-color="#fff1f7" />
              <stop offset="1" stop-color="#e9d5ff" />
            </linearGradient>
            <linearGradient id="cake-icing" x1="106" y1="111" x2="214" y2="154" gradientUnits="userSpaceOnUse">
              <stop stop-color="#fffafc" />
              <stop offset="1" stop-color="#fbcfe8" />
            </linearGradient>
            <radialGradient id="cake-flame-glow">
              <stop stop-color="#fff7ad" stop-opacity=".7" />
              <stop offset="1" stop-color="#ffb85c" stop-opacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="160" cy="217" rx="110" ry="17" fill="#a78bfa" fill-opacity=".18" />
          <ellipse cx="160" cy="211" rx="100" ry="15" fill="#fbcfe8" stroke="#fff1f7" stroke-opacity=".8" stroke-width="2" />
          <path d="M88 151h144v47a13 13 0 0 1-13 13H101a13 13 0 0 1-13-13v-47Z" fill="url(#cake-bottom)" stroke="#fff7fb" stroke-opacity=".8" stroke-width="2" />
          <path d="M89 151h142v13c-7 0-7 11-14 11s-7-11-14-11-7 11-14 11-7-11-14-11-7 11-14 11-7-11-14-11-7 11-14 11-7-11-14-11-7 11-14 11v-13Z" fill="#fff1f7" />
          <path d="M106 108h108v47a11 11 0 0 1-11 11h-86a11 11 0 0 1-11-11v-47Z" fill="url(#cake-top)" stroke="#fff" stroke-width="2" />
          <path d="M107 109h106v10c-7 0-7 9-14 9s-7-9-14-9-7 9-14 9-7-9-14-9-7 9-14 9-7-9-14-9-7 9-14 9v-10Z" fill="url(#cake-icing)" />
          <path d="M128 141c0-4 5-7 9-2 4-5 9-2 9 2s-9 10-9 10-9-6-9-10ZM174 141c0-4 5-7 9-2 4-5 9-2 9 2s-9 10-9 10-9-6-9-10Z" fill="#f472b6" fill-opacity=".76" />
          <path d="m160 133 3 5-3 5-3-5 3-5Z" fill="#fbbf24" />
          <g class="birthday-cake__candle" transform="translate(-36 0)" style="--flame-delay:-.18s;--candle-color:#f472b6">
            <circle class="birthday-cake__flame-glow" cx="160" cy="58" r="23" fill="url(#cake-flame-glow)" />
            <path class="birthday-cake__flame" d="M160 36c-2 8-11 14-9 23 1 6 5 9 9 9s8-4 9-9c2-8-4-14-9-23Z" fill="#ffb84d" />
            <path class="birthday-cake__flame-core" d="M160 49c-2 5-5 8-4 12 .5 3 2 4 4 4s4-2 4-5c0-4-2-7-4-11Z" fill="#fff7ad" />
            <path d="M160 65v7" stroke="#8f5e75" stroke-width="1.5" stroke-linecap="round" />
            <rect x="157" y="71" width="6" height="38" rx="3" fill="#fff7fb" stroke="var(--candle-color)" stroke-width="1.5" />
            <path d="M157 82h6M157 94h6M157 105h6" stroke="var(--candle-color)" stroke-width="2" stroke-linecap="round" />
          </g>
          <g class="birthday-cake__candle" transform="translate(-24 0)" style="--flame-delay:-.52s;--candle-color:#60a5fa">
            <circle class="birthday-cake__flame-glow" cx="160" cy="58" r="23" fill="url(#cake-flame-glow)" />
            <path class="birthday-cake__flame" d="M160 36c-2 8-11 14-9 23 1 6 5 9 9 9s8-4 9-9c2-8-4-14-9-23Z" fill="#ffb84d" />
            <path class="birthday-cake__flame-core" d="M160 49c-2 5-5 8-4 12 .5 3 2 4 4 4s4-2 4-5c0-4-2-7-4-11Z" fill="#fff7ad" />
            <path d="M160 65v7" stroke="#8f5e75" stroke-width="1.5" stroke-linecap="round" />
            <rect x="157" y="71" width="6" height="38" rx="3" fill="#fff7fb" stroke="var(--candle-color)" stroke-width="1.5" />
            <path d="M157 82h6M157 94h6M157 105h6" stroke="var(--candle-color)" stroke-width="2" stroke-linecap="round" />
          </g>
          <g class="birthday-cake__candle" transform="translate(-12 0)" style="--flame-delay:-.31s;--candle-color:#f9a8d4">
            <circle class="birthday-cake__flame-glow" cx="160" cy="58" r="23" fill="url(#cake-flame-glow)" />
            <path class="birthday-cake__flame" d="M160 36c-2 8-11 14-9 23 1 6 5 9 9 9s8-4 9-9c2-8-4-14-9-23Z" fill="#ffb84d" />
            <path class="birthday-cake__flame-core" d="M160 49c-2 5-5 8-4 12 .5 3 2 4 4 4s4-2 4-5c0-4-2-7-4-11Z" fill="#fff7ad" />
            <path d="M160 65v7" stroke="#8f5e75" stroke-width="1.5" stroke-linecap="round" />
            <rect x="157" y="71" width="6" height="38" rx="3" fill="#fff7fb" stroke="var(--candle-color)" stroke-width="1.5" />
            <path d="M157 82h6M157 94h6M157 105h6" stroke="var(--candle-color)" stroke-width="2" stroke-linecap="round" />
          </g>
          <g class="birthday-cake__candle" style="--flame-delay:-.08s;--candle-color:#60a5fa">
            <circle class="birthday-cake__flame-glow" cx="160" cy="58" r="23" fill="url(#cake-flame-glow)" />
            <path class="birthday-cake__flame" d="M160 36c-2 8-11 14-9 23 1 6 5 9 9 9s8-4 9-9c2-8-4-14-9-23Z" fill="#ffb84d" />
            <path class="birthday-cake__flame-core" d="M160 49c-2 5-5 8-4 12 .5 3 2 4 4 4s4-2 4-5c0-4-2-7-4-11Z" fill="#fff7ad" />
            <path d="M160 65v7" stroke="#8f5e75" stroke-width="1.5" stroke-linecap="round" />
            <rect x="157" y="71" width="6" height="38" rx="3" fill="#fff7fb" stroke="var(--candle-color)" stroke-width="1.5" />
            <path d="M157 82h6M157 94h6M157 105h6" stroke="var(--candle-color)" stroke-width="2" stroke-linecap="round" />
          </g>
          <g class="birthday-cake__candle" transform="translate(12 0)" style="--flame-delay:-.42s;--candle-color:#f472b6">
            <circle class="birthday-cake__flame-glow" cx="160" cy="58" r="23" fill="url(#cake-flame-glow)" />
            <path class="birthday-cake__flame" d="M160 36c-2 8-11 14-9 23 1 6 5 9 9 9s8-4 9-9c2-8-4-14-9-23Z" fill="#ffb84d" />
            <path class="birthday-cake__flame-core" d="M160 49c-2 5-5 8-4 12 .5 3 2 4 4 4s4-2 4-5c0-4-2-7-4-11Z" fill="#fff7ad" />
            <path d="M160 65v7" stroke="#8f5e75" stroke-width="1.5" stroke-linecap="round" />
            <rect x="157" y="71" width="6" height="38" rx="3" fill="#fff7fb" stroke="var(--candle-color)" stroke-width="1.5" />
            <path d="M157 82h6M157 94h6M157 105h6" stroke="var(--candle-color)" stroke-width="2" stroke-linecap="round" />
          </g>
          <g class="birthday-cake__candle" transform="translate(24 0)" style="--flame-delay:-.26s;--candle-color:#60a5fa">
            <circle class="birthday-cake__flame-glow" cx="160" cy="58" r="23" fill="url(#cake-flame-glow)" />
            <path class="birthday-cake__flame" d="M160 36c-2 8-11 14-9 23 1 6 5 9 9 9s8-4 9-9c2-8-4-14-9-23Z" fill="#ffb84d" />
            <path class="birthday-cake__flame-core" d="M160 49c-2 5-5 8-4 12 .5 3 2 4 4 4s4-2 4-5c0-4-2-7-4-11Z" fill="#fff7ad" />
            <path d="M160 65v7" stroke="#8f5e75" stroke-width="1.5" stroke-linecap="round" />
            <rect x="157" y="71" width="6" height="38" rx="3" fill="#fff7fb" stroke="var(--candle-color)" stroke-width="1.5" />
            <path d="M157 82h6M157 94h6M157 105h6" stroke="var(--candle-color)" stroke-width="2" stroke-linecap="round" />
          </g>
          <g class="birthday-cake__candle" transform="translate(36 0)" style="--flame-delay:-.62s;--candle-color:#f9a8d4">
            <circle class="birthday-cake__flame-glow" cx="160" cy="58" r="23" fill="url(#cake-flame-glow)" />
            <path class="birthday-cake__flame" d="M160 36c-2 8-11 14-9 23 1 6 5 9 9 9s8-4 9-9c2-8-4-14-9-23Z" fill="#ffb84d" />
            <path class="birthday-cake__flame-core" d="M160 49c-2 5-5 8-4 12 .5 3 2 4 4 4s4-2 4-5c0-4-2-7-4-11Z" fill="#fff7ad" />
            <path d="M160 65v7" stroke="#8f5e75" stroke-width="1.5" stroke-linecap="round" />
            <rect x="157" y="71" width="6" height="38" rx="3" fill="#fff7fb" stroke="var(--candle-color)" stroke-width="1.5" />
            <path d="M157 82h6M157 94h6M157 105h6" stroke="var(--candle-color)" stroke-width="2" stroke-linecap="round" />
          </g>
          <g fill="#fff7fb">
            <circle cx="105" cy="183" r="3" /><circle cx="124" cy="193" r="2.5" /><circle cx="148" cy="181" r="3" /><circle cx="176" cy="194" r="2.7" /><circle cx="215" cy="183" r="3" />
            <circle cx="114" cy="139" r="2" /><circle cx="206" cy="139" r="2" />
          </g>
          <g fill="#f9a8d4">
            <circle cx="116" cy="179" r="2.5" /><circle cx="202" cy="178" r="2.5" />
          </g>
          <text class="birthday-cake__name" x="160" y="194" text-anchor="middle">Juma</text>
        </svg>
      `;
      div.appendChild(cake);

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const balloons = el.querySelectorAll(".balloon");
      const cake = el.querySelector(".birthday-cake");
      const baseTime = tl.duration();
      tl.fromTo(balloons,
        { x: 0, y: 0, opacity: 0, scale: 0.72, rotation: -5 },
        {
          x: (index, balloon) => Number(balloon.dataset.drift),
          y: () => -window.innerHeight * 1.52,
          opacity: 0.94,
          scale: (index, balloon) => Number(balloon.dataset.scale),
          rotation: (index, balloon) => Number(balloon.dataset.tilt),
          duration: 4.8,
          stagger: { each: 0.055, from: "random" },
          ease: "sine.inOut",
        }
      ).fromTo(cake,
        { autoAlpha: 0, xPercent: -50, yPercent: -50, y: 26, scale: 0.68 },
        { autoAlpha: 1, xPercent: -50, yPercent: -50, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" },
        baseTime + 0.35
      ).to(cake,
        { y: -7, duration: 1.2, repeat: 1, yoyo: true, ease: "sine.inOut" },
        baseTime + 1.1
      ).to(cake,
        { autoAlpha: 0, y: -15, scale: 0.9, duration: 0.55, ease: "power1.in" },
        baseTime + 4.85
      );
    },
  };
})();

