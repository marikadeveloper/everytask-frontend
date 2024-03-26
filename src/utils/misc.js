import { confetti } from "@tsparticles/confetti";

const dateFormats = [
  {
    label: "DD/MM/YYYY",
    value: "DD/MM/YYYY",
    description: "Day/Month/Year (e.g., 09/03/2024)",
  },
  {
    label: "MM/DD/YYYY",
    value: "MM/DD/YYYY",
    description: "Month/Day/Year (e.g., 03/09/2024)",
  },
  {
    label: "YYYY/MM/DD",
    value: "YYYY/MM/DD",
    description: "Year/Month/Day (e.g., 2024/03/09)",
  },
];

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Celebrate with confetti!
 */
function hurray() {
  (async () => {
    await confetti();
  })();
}

/**
 * Celebrate with fireworks!
 */
function moreSpecialHurray() {
  // fireworks!
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  // eslint-disable-next-line consistent-return
  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      }),
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      }),
    );
  }, 250);
}

export { dateFormats, randomInRange, hurray, moreSpecialHurray };
