(function () {
  window.Components = window.Components || {};

  window.Components.profile = {
    render(container, section, config) {
      const div = document.createElement("section");
      div.className = "section section-profile";
      div.innerHTML = `
        <p class="eyebrow profile-eyebrow">Today, we celebrate you</p>
        <div class="profile-frame">
          <span class="profile-frame__halo" aria-hidden="true"></span>
          <span class="profile-picture-clip">
            <img src="${window.escapeHTML(config.photo || "")}" alt="${window.escapeHTML(config.name || "Birthday star")}" class="profile-picture" />
          </span>
          <span class="profile-frame__spark profile-frame__spark--one" aria-hidden="true">✦</span>
          <span class="profile-frame__spark profile-frame__spark--two" aria-hidden="true">✧</span>
        </div>
        <div class="wish">
        <h2 class="wish-hbd">${window.escapeHTML(section.wishTitle || "Happy Birthday, " + (config.name || "Juma") + "!")}</h2>
        <p class="wish-text">${window.highlightPhrases(section.wishText || "", ["closer to the things you've been hoping for", "Keep shining, Juma", "the world is brighter with your warmth in it"])}</p>
        </div>
        <span class="scene-caption">Keep shining in your own way.</span>
      `;
      const title = div.querySelector(".wish-hbd");
      title.innerHTML = Array.from(title.textContent, (character) =>
        `<span>${window.escapeHTML(character === " " ? "\u00a0" : character)}</span>`
      ).join("");
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const letters = el.querySelectorAll(".wish-hbd span");
      tl.from(el.querySelector(".profile-eyebrow"), { duration: 0.4, opacity: 0, y: 10 })
        .from(el.querySelector(".profile-frame"), {
          duration: 0.85, opacity: 0, scale: 0.92, ease: "power2.out",
        }, "-=0.1")
        .from(letters, {
          duration: 0.38, opacity: 0, y: 12, stagger: 0.045, ease: "power2.out",
        }, "-=0.18")
        .to(el.querySelector(".wish-hbd"), {
          duration: 0.45,
          textShadow: "0 0 22px rgba(244, 114, 182, 0.58)",
          repeat: 1,
          yoyo: true,
          ease: "sine.inOut",
        }, "-=0.12")
        .from(el.querySelector(".wish-text"), { duration: 0.55, opacity: 0, y: 10 }, "-=0.1");
      window.animateHighlights(tl, el, "-=0.05");
      tl.from(el.querySelector(".scene-caption"), { duration: 0.4, opacity: 0, y: 8 }, "-=0.1")
        .call(() => {}, null, "+=2.5");
    },

    exit(tl, el) {
      tl.to(el, { duration: 0.55, autoAlpha: 0, y: 12, ease: "power1.in" });
    },
  };
})();

