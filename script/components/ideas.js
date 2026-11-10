(function () {
  window.Components = window.Components || {};

  window.Components.ideas = {
    render(container, section) {
      const div = document.createElement("section");
      div.className = "section section-ideas";
      const lines = section.lines || [];
      div.innerHTML = `
        <p class="eyebrow ideas-eyebrow">A few things worth celebrating</p>
        <div class="ideas-stack">
          ${lines.map((line, index) => {
            const special = index === lines.length - 1;
            return `<p class="idea-line${special ? " idea-special" : ""}">
              <span class="idea-copy">${line}</span>
            </p>`;
          }).join("")}
        </div>
        ${section.bigLetters ? `<p class="idea-big-letters" aria-hidden="true">${Array.from(section.bigLetters, (character) => `<span>${window.escapeHTML(character === " " ? "\u00a0" : character)}</span>`).join("")}</p>` : ""}
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const regularLines = el.querySelectorAll(".idea-line:not(.idea-special)");
      const specialLine = el.querySelector(".idea-special");
      const bigLetters = el.querySelectorAll(".idea-big-letters span");

      regularLines.forEach((line) => {
        tl.fromTo(line,
          { opacity: 0, y: 14, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, ease: "power2.out" }
        );
        const emphasis = line.querySelector("strong");
        if (emphasis) {
          tl.fromTo(emphasis,
            { color: "inherit", backgroundColor: "transparent" },
            { color: "#241b25", backgroundColor: "var(--accent)", duration: 0.35, ease: "power1.out" }
          );
        }
        tl.to(line, { opacity: 0, y: -10, duration: 0.4, ease: "power1.in" }, "+=1.55");
      });

      if (specialLine) {
        tl.fromTo(specialLine,
          { opacity: 0, y: 18, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" },
          "+=0.3"
        );
        const heart = specialLine.querySelector(".idea-copy span");
        const emphasis = specialLine.querySelector("strong");
        if (heart) {
          tl.from(heart, { duration: 0.4, opacity: 0, scale: 0.6 }, "-=0.2")
            .to(heart, { y: -4, scale: 1.16, duration: 0.35, repeat: 1, yoyo: true, ease: "sine.inOut" }, "-=0.04");
        }
        if (emphasis) {
          tl.fromTo(emphasis,
            { scale: 0.92, filter: "brightness(0.9)" },
            { scale: 1.1, filter: "brightness(1.2)", duration: 0.3, repeat: 1, yoyo: true, ease: "back.out(1.6)" },
            "-=0.15"
          );
        }
        tl.to(specialLine, { opacity: 0, y: -8, duration: 0.4 }, "+=1.8");
      }

      if (bigLetters.length) {
        tl.fromTo(bigLetters,
          { opacity: 0, y: 16, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.1, ease: "power2.out" }
        ).to(bigLetters, { opacity: 0, y: -12, duration: 0.45, stagger: 0.08 }, "+=1.05");
      }

      tl.to(el.querySelector(".ideas-eyebrow"), { opacity: 0, duration: 0.3 }, "<");
    },
  };
})();

