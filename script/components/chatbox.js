(function () {
  window.Components = window.Components || {};

  window.Components.chatbox = {
    render(container, section) {
      const div = document.createElement("section");
      div.className = "section section-chatbox";
      const message = section.message || "Happy birthday! May the year ahead be filled with warm moments, lovely surprises, and plenty of reasons to smile.";
      div.innerHTML = `
        <div class="letter-card">
          <div class="letter-card__top">
            <span class="letter-card__seal" aria-hidden="true">✦</span>
            <span class="eyebrow">A note for you</span>
            <span class="letter-card__rule" aria-hidden="true"></span>
          </div>
          <p class="hbd-chatbox" aria-label="${window.escapeHTML(message)}"></p>
          <div class="letter-card__footer">
            <span class="fake-btn" aria-hidden="true">
              <span class="fake-btn__label">${window.escapeHTML(section.buttonText || "Send")}</span>
              <span class="fake-btn__arrow">➤</span>
              <span class="fake-btn__check">✓</span>
              <span class="fake-btn__ripple"></span>
            </span>
          </div>
        </div>
      `;
      const messageBox = div.querySelector(".hbd-chatbox");
      const characters = Array.from(message);
      const highlightedCharacters = new Set();
      ["Happy birthday, Juma!", "sweet surprises", "dreams coming closer"].forEach((phrase) => {
        const phraseCharacters = Array.from(phrase.toLowerCase());
        for (let start = 0; start <= characters.length - phraseCharacters.length; start++) {
          const matches = phraseCharacters.every((character, offset) =>
            characters[start + offset].toLowerCase() === character
          );
          if (matches) {
            for (let index = start; index < start + phraseCharacters.length; index++) highlightedCharacters.add(index);
          }
        }
      });
      const renderCharacter = (character, index) =>
        `<span class="message-character${highlightedCharacters.has(index) ? " message-highlight" : ""}">${window.escapeHTML(character)}</span>`;
      const messageMarkup = [];
      for (let start = 0; start < characters.length;) {
        if (/\s/u.test(characters[start])) {
          messageMarkup.push(renderCharacter(characters[start], start));
          start++;
          continue;
        }

        let end = start + 1;
        while (end < characters.length && !/\s/u.test(characters[end])) end++;
        const word = characters.slice(start, end)
          .map((character, offset) => renderCharacter(character, start + offset))
          .join("");
        messageMarkup.push(`<span class="message-word">${word}</span>`);
        start = end;
      }
      messageBox.innerHTML = messageMarkup.join("");
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const text = el.querySelectorAll(".hbd-chatbox .message-character");
      const sendButton = el.querySelector(".fake-btn");
      const arrow = el.querySelector(".fake-btn__arrow");
      const check = el.querySelector(".fake-btn__check");
      const ripple = el.querySelector(".fake-btn__ripple");
      const messageHighlights = el.querySelectorAll(".message-highlight");
      const readingPause = Math.min(5.5, Math.max(3.2, Math.ceil(text.length / 32)));

      tl.from(el.querySelector(".letter-card"), {
        duration: 0.7, opacity: 0, y: 22, scale: 0.985, ease: "power2.out",
      })
        .from(el.querySelector(".letter-card__top"), { duration: 0.45, opacity: 0, y: 8 }, "-=0.25")
        .to(text, { duration: 1.35, visibility: "visible", stagger: 0.026, ease: "none" })
        .fromTo(messageHighlights,
          { scale: 1 },
          { scale: 1.1, duration: 0.24, stagger: 0.012, repeat: 1, yoyo: true, ease: "sine.inOut" },
          "+=0.12"
        )
        .from(el.querySelector(".letter-card__footer"), { duration: 0.4, opacity: 0, y: 8 }, "-=0.2")
        .to(sendButton, {
          duration: 0.14, scale: 0.9, y: 3, filter: "brightness(0.88)", ease: "power1.in",
        }, `+=${readingPause}`)
        .to(sendButton, {
          duration: 0.32, scale: 1.04, y: -2, backgroundColor: "var(--primary)",
          boxShadow: "0 0 30px color-mix(in srgb, var(--primary) 45%, transparent)", ease: "back.out(1.8)",
        })
        .to(sendButton, { duration: 0.2, scale: 1, y: 0, filter: "brightness(1)" }, "-=0.08")
        .to(arrow, { duration: 0.16, opacity: 0, scale: 0.45, rotation: -35 }, "<")
        .fromTo(check,
          { opacity: 0, scale: 0.45, rotation: -30 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.3, ease: "back.out(2)" },
          "-=0.05"
        )
        .fromTo(ripple,
          { opacity: 0.35, scale: 0.3 },
          { opacity: 0, scale: 2.8, duration: 0.5, ease: "power2.out" },
          "-=0.1"
        )
        .to(el, { duration: 0.5, autoAlpha: 0, y: -10 }, "+=0.8");
    },
  };
})();

