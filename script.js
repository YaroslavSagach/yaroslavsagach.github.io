const canvas = document.querySelector("#graph-bg");
const ctx = canvas.getContext("2d");
const themeToggle = document.querySelector(".theme-toggle");
const scrollSpeed = 0.2;
const pointSpacing = 38;

let width = 0;
let height = 0;
let pixelRatio = 1;
let frame = 0;
let animationId = 0;
let points = [];
let nextPointX = 0;
const wave = {
  base: 0.52 + Math.random() * 0.12,
  amplitude: 0.12 + Math.random() * 0.06,
  frequency: 0.008 + Math.random() * 0.005,
  secondaryFrequency: 0.0035 + Math.random() * 0.003,
  phase: Math.random() * Math.PI * 2,
  secondaryPhase: Math.random() * Math.PI * 2,
};

function readColor(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function setTheme(theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  if (persist) {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Storage can be unavailable in strict privacy modes.
    }
  }
  themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} theme`);
  themeToggle.querySelector(".theme-toggle__text").textContent = theme === "dark" ? "Light" : "Dark";
}

function resizeCanvas() {
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  points = [];
  nextPointX = Math.floor((frame * scrollSpeed) / pointSpacing) * pointSpacing;
}

function drawGrid() {
  const step = 48;

  ctx.strokeStyle = readColor("--grid");
  ctx.lineWidth = 1;

  for (let x = 0; x <= width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = 0; y <= height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawFunction(scroll) {
  ctx.beginPath();

  for (let x = -20; x <= width + 20; x += 4) {
    const y = curveY(x + scroll);

    if (x === -20) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.strokeStyle = readColor("--graph");
  ctx.lineWidth = 2;
  ctx.stroke();
}

function curveY(x) {
  const amplitude = Math.min(120, height * wave.amplitude);

  return (
    height * wave.base +
    Math.sin(x * wave.frequency + wave.phase) * amplitude * 0.72 +
    Math.cos(x * wave.secondaryFrequency + wave.secondaryPhase) * amplitude * 0.36
  );
}

function drawPoints(scroll) {
  while (nextPointX < scroll + width + pointSpacing) {
    points.push(nextPointX);
    nextPointX += pointSpacing;
  }

  while (points.length > 0 && points[0] < scroll - pointSpacing) {
    points.shift();
  }

  for (const pointX of points) {
    const x = pointX - scroll;
    const y = curveY(pointX);

    ctx.beginPath();
    ctx.arc(x, y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = readColor("--point");
    ctx.fill();
  }
}

function render() {
  const scroll = frame * scrollSpeed;

  ctx.clearRect(0, 0, width, height);
  drawGrid();
  drawFunction(scroll);
  drawPoints(scroll);

  frame += 1;

  animationId = window.requestAnimationFrame(render);
}

resizeCanvas();
setTheme(document.documentElement.dataset.theme, false);
render();

window.addEventListener("resize", () => {
  resizeCanvas();
  window.cancelAnimationFrame(animationId);
  render();
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  window.cancelAnimationFrame(animationId);
  render();
});
