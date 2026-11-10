(function () {
  window.Components = window.Components || {};

  window.Components.quote = {
    render(container, section) {
      const div = document.createElement("section");
      div.className = "section section-quote";
      div.innerHTML = `
        <p class="eyebrow quote-eyebrow">A thought for your new year</p>
        <figure class="quote-card">
          <span class="quote-mark" aria-hidden="true">“</span>
          <blockquote class="quote-text">${window.highlightPhrases(section.text || "May your next chapter bring gentle days, brave beginnings, easy laughter, and love that feels like home.", ["brave new beginnings", "love that always feels like home"])}</blockquote>
          ${section.author ? `<figcaption class="quote-author">— ${window.escapeHTML(section.author)}</figcaption>` : ""}
          <span class="quote-card__rule" aria-hidden="true"></span>
        </figure>
      `;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const card = el.querySelector(".quote-card");
      const author = el.querySelector(".quote-author");
      tl.from(el.querySelector(".quote-eyebrow"), { duration: 0.45, opacity: 0, y: 10 })
        .from(card, { duration: 0.7, opacity: 0, y: 20, scale: 0.985, ease: "power2.out" }, "-=0.12")
        .from(el.querySelector(".quote-mark"), {
          duration: 0.55, opacity: 0, y: -8, ease: "power2.out",
        }, "-=0.25")
        .from(el.querySelector(".quote-text"), { duration: 0.65, opacity: 0, y: 10 }, "-=0.15");
      window.animateHighlights(tl, el, "-=0.1");
      if (author) tl.from(author, { duration: 0.4, opacity: 0, y: 8 }, "-=0.15");
      tl.from(el.querySelector(".quote-card__rule"), { duration: 0.6, scaleX: 0 }, "-=0.1")
        .to(el, { duration: 0.5, autoAlpha: 0, y: -10, ease: "power1.in" }, "+=2.8");
    },
  };
})();

