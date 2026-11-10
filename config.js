/**
 * ✨ EDIT THIS FILE to customize the birthday greeting! ✨
 *
 * This is the ONLY file you need to modify.
 * No need to touch HTML, CSS, or any other JavaScript files.
 *
 * AVAILABLE SECTION TYPES:
 *   "greeting"      → Opening greeting with recipient's name
 *   "announcement"  → Birthday announcement text
 *   "chatbox"       → Chat message with typing animation
 *   "ideas"         → Sequential text reveals, one by one
 *   "quote"         → Styled quote card with optional author
 *   "countdown"     → Animated 3-2-1 countdown
 *   "stars"         → Twinkling stars background
 *   "fireworks"     → Colorful firework sparks burst
 *   "balloons"      → Floating balloon animation
 *   "profile"       → Profile photo with birthday wish
 *   "confetti"      → Confetti burst animation
 *   "closing"       → Closing message with replay button
 *
 * HOW TO USE:
 *   REMOVE a section  → Delete its object from the sections array
 *   DUPLICATE          → Copy-paste any section object
 *   REORDER            → Move the section object up/down in the array
 *   EDIT TEXT          → Change the string values
 */

const CONFIG = {
  // ── Recipient Info ────────────────────────────────────────────
  name: "Juma",
  photo: "./img/Fariya Reza Juma.jpeg", // Place your photo in the img/ folder
  music: "./music/hbd.mpeg",      // Place your music in the music/ folder

  // ── Theme Colors ──────────────────────────────────────────────
  // The celebration uses a fixed dark palette.
  colors: {
    primary: "#f472b6",           // Main accent color (rose pink)
    accent: "#60a5fa",            // Secondary accent color (sky blue)
    dark: {
      background: "#0f172a",      // Slate 900
      text: "#f1f5f9",            // Slate 100
    },
  },

  // ── Sections ──────────────────────────────────────────────────
  // Add, remove, duplicate, or reorder as you wish!
  sections: [
    {
      type: "greeting",
      title: "It's your day,",
      subtitle: "May it bring you laughter, lovely surprises, and all the little things that make you happy.",
    },
    {
      type: "countdown",
      from: 3,                    // Countdown from this number
      goText: "🎉",              // Text shown after countdown ends
    },
    {
      type: "announcement",
      text: "Juma, today is all about you. May every moment bring you a reason to smile and a reminder of how loved you are.",
    },
    {
      type: "chatbox",
      message:
        "Happy birthday, Juma! I hope today brings the kind of happiness that lingers long after the candles are out. You deserve laughter, peaceful moments, sweet surprises, and a year filled with dreams coming closer.",
      buttonText: "Send a wish",
    },
    {
      type: "ideas",
      lines: [
        "Your kindness leaves every place a little warmer.",
        "Your smile makes ordinary moments feel special.",
        "Your dreams deserve every chance to bloom.",
        "You bring your own kind of magic wherever you go.",
        "Which is why you are <strong>so</strong> worth celebrating <span>♡</span>",
      ],
      bigLetters: "SO",
    },
    {
      type: "quote",
      text: "May the year ahead bring you gentle days, brave new beginnings, easy laughter, and the kind of love that always feels like home.",
      author: "For Fariya Reza Juma, with love",
    },
    {
      type: "stars",
      count: 40,
    },
    {
      type: "balloons",
      count: 40,
    },
    {
      type: "fireworks",
      count: 48,
    },
    {
      type: "profile",
      wishTitle: "Happy Birthday, Juma!",
      wishText: "May this year bring you closer to the things you've been hoping for, fill your days with people who make you feel at home, and give you a thousand little reasons to smile. Keep shining, Juma; the world is brighter with your warmth in it.",
    },
    {
      type: "fireworks",
      count: 60,
    },
    {
      type: "confetti",
      count: 72,
    },
    {
      type: "closing",
      text: "I hope this little birthday surprise made you smile. May your next year be full of good people, beautiful memories, and moments that remind you how special you are.",
      replayText: "Relive the birthday magic",
      note: "Made with love, always cheering for you.",
    },
  ],
};

