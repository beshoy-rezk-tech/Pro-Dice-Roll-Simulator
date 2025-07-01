// Animated background (floating bokeh circles)
(function() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = window.innerWidth;
  let h = window.innerHeight;
  let particles = [];
  const PARTICLE_COUNT = 32;
  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }
  window.addEventListener('resize', resize);
  resize();
  function makeParticle() {
    const r = 24 + Math.random() * 32;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: 0.10 + Math.random() * 0.13,
      hue: Math.random() * 360
    };
  }
  particles = Array.from({length: PARTICLE_COUNT}, makeParticle);
  function animate() {
    ctx.clearRect(0, 0, w, h);
    const isDark = document.body.classList.contains('dark');
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < -p.r) p.x = w + p.r;
      if (p.x > w + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = h + p.r;
      if (p.y > h + p.r) p.y = -p.r;
      ctx.save();
      ctx.globalAlpha = p.o;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = isDark
        ? `hsl(${p.hue}, 60%, 18%)`
        : `hsl(${p.hue}, 80%, 90%)`;
      ctx.shadowColor = isDark
        ? `hsl(${p.hue}, 60%, 30%)`
        : `hsl(${p.hue}, 80%, 80%)`;
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(animate);
  }
  animate();
  // Re-render on theme change
  const observer = new MutationObserver(() => {
    // Redraw on next frame
    setTimeout(() => {}, 0);
  });
  observer.observe(document.body, {attributes:true, attributeFilter:['class']});
})();

// Dice SVGs for each type and face (realistic 3D look)
const diceSVGs = {
  4: Array.from({length:4}, (_,i) => `
    <svg class="dice-svg" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="d4g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#b3bcf5"/>
          <stop offset="100%" stop-color="#6366f1"/>
        </linearGradient>
      </defs>
      <polygon points="24,6 44,42 4,42" fill="url(#d4g)" stroke="#312e81" stroke-width="2"/>
      <text x="24" y="32" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold">${i+1}</text>
    </svg>`),
  6: [
    // 1
    `<svg class="dice-svg" viewBox="0 0 48 48">
      <defs>
        <radialGradient id="d6g1" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#fff"/>
          <stop offset="100%" stop-color="#e2e8f0"/>
        </radialGradient>
      </defs>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="url(#d6g1)" stroke="#b0b0b0" stroke-width="2"/>
      <circle cx="24" cy="24" r="3.5" fill="#222"/>
    </svg>`,
    // 2
    `<svg class="dice-svg" viewBox="0 0 48 48">
      <defs><radialGradient id="d6g2" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#e2e8f0"/></radialGradient></defs>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="url(#d6g2)" stroke="#b0b0b0" stroke-width="2"/>
      <circle cx="16" cy="16" r="3.5" fill="#222"/>
      <circle cx="32" cy="32" r="3.5" fill="#222"/>
    </svg>`,
    // 3
    `<svg class="dice-svg" viewBox="0 0 48 48">
      <defs><radialGradient id="d6g3" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#e2e8f0"/></radialGradient></defs>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="url(#d6g3)" stroke="#b0b0b0" stroke-width="2"/>
      <circle cx="16" cy="16" r="3.5" fill="#222"/>
      <circle cx="24" cy="24" r="3.5" fill="#222"/>
      <circle cx="32" cy="32" r="3.5" fill="#222"/>
    </svg>`,
    // 4
    `<svg class="dice-svg" viewBox="0 0 48 48">
      <defs><radialGradient id="d6g4" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#e2e8f0"/></radialGradient></defs>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="url(#d6g4)" stroke="#b0b0b0" stroke-width="2"/>
      <circle cx="16" cy="16" r="3.5" fill="#222"/>
      <circle cx="32" cy="16" r="3.5" fill="#222"/>
      <circle cx="16" cy="32" r="3.5" fill="#222"/>
      <circle cx="32" cy="32" r="3.5" fill="#222"/>
    </svg>`,
    // 5
    `<svg class="dice-svg" viewBox="0 0 48 48">
      <defs><radialGradient id="d6g5" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#e2e8f0"/></radialGradient></defs>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="url(#d6g5)" stroke="#b0b0b0" stroke-width="2"/>
      <circle cx="16" cy="16" r="3.5" fill="#222"/>
      <circle cx="32" cy="16" r="3.5" fill="#222"/>
      <circle cx="24" cy="24" r="3.5" fill="#222"/>
      <circle cx="16" cy="32" r="3.5" fill="#222"/>
      <circle cx="32" cy="32" r="3.5" fill="#222"/>
    </svg>`,
    // 6
    `<svg class="dice-svg" viewBox="0 0 48 48">
      <defs><radialGradient id="d6g6" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#e2e8f0"/></radialGradient></defs>
      <rect x="6" y="6" width="36" height="36" rx="8" fill="url(#d6g6)" stroke="#b0b0b0" stroke-width="2"/>
      <circle cx="16" cy="16" r="3.5" fill="#222"/>
      <circle cx="32" cy="16" r="3.5" fill="#222"/>
      <circle cx="16" cy="24" r="3.5" fill="#222"/>
      <circle cx="32" cy="24" r="3.5" fill="#222"/>
      <circle cx="16" cy="32" r="3.5" fill="#222"/>
      <circle cx="32" cy="32" r="3.5" fill="#222"/>
    </svg>`
  ],
  8: Array.from({length:8}, (_,i) => `
    <svg class="dice-svg" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="d8g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fcd34d"/>
          <stop offset="100%" stop-color="#f59e42"/>
        </linearGradient>
      </defs>
      <polygon points="24,6 44,42 4,42" fill="url(#d8g)" stroke="#b45309" stroke-width="2"/>
      <text x="24" y="32" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold">${i+1}</text>
    </svg>`),
  10: Array.from({length:10}, (_,i) => `
    <svg class="dice-svg" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="d10g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6ee7b7"/>
          <stop offset="100%" stop-color="#10b981"/>
        </linearGradient>
      </defs>
      <polygon points="24,6 44,24 24,42 4,24" fill="url(#d10g)" stroke="#065f46" stroke-width="2"/>
      <text x="24" y="32" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold">${i+1}</text>
    </svg>`),
  12: Array.from({length:12}, (_,i) => `
    <svg class="dice-svg" viewBox="0 0 48 48">
      <defs>
        <radialGradient id="d12g" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#fda4af"/>
          <stop offset="100%" stop-color="#f43f5e"/>
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="url(#d12g)" stroke="#be123c" stroke-width="2"/>
      <text x="24" y="32" text-anchor="middle" font-size="18" fill="#fff" font-weight="bold">${i+1}</text>
    </svg>`),
  20: Array.from({length:20}, (_,i) => `
    <svg class="dice-svg" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="d20g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c4b5fd"/>
          <stop offset="100%" stop-color="#a21caf"/>
        </linearGradient>
      </defs>
      <polygon points="24,4 44,24 36,44 12,44 4,24" fill="url(#d20g)" stroke="#581c87" stroke-width="2"/>
      <text x="24" y="32" text-anchor="middle" font-size="16" fill="#fff" font-weight="bold">${i+1}</text>
    </svg>`)
};

const diceTypeEl = document.getElementById('dice-type');
const diceCountEl = document.getElementById('dice-count');
const rollBtn = document.getElementById('roll-btn');
const diceDisplay = document.querySelector('.dice-display');
const resultValue = document.getElementById('result-value');
const avgValue = document.getElementById('avg-value');
const highValue = document.getElementById('high-value');
const lowValue = document.getElementById('low-value');
const rollHistoryEl = document.getElementById('roll-history');
const copyResultBtn = document.getElementById('copy-result');
const themeToggleBtn = document.getElementById('theme-toggle');
const rollSound = document.getElementById('roll-sound');
const diceColorEl = document.getElementById('dice-color');
const luckyRollBtn = document.getElementById('lucky-roll-btn');
const diceColorSwatch = document.getElementById('dice-color-swatch');
const dicePresetBtns = document.querySelectorAll('.dice-preset');
const themeSelect = document.getElementById('theme-select');

let rollHistory = [];
const HISTORY_LIMIT = 10;
let diceColor = diceColorEl ? diceColorEl.value : '#6366f1';
let confettiTimeout;

const themeMap = {
  default: {
    '--main-bg': 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
    '--main-color': '#222',
    '--accent': '#6366f1',
    '--dice-bg': '#fff',
    '--dice-shadow': 'rgba(99,102,241,0.12)'
  },
  retro: {
    '--main-bg': 'linear-gradient(135deg, #fdf6e3 0%, #f5deb3 100%)',
    '--main-color': '#3b2f1e',
    '--accent': '#eab308',
    '--dice-bg': '#f5deb3',
    '--dice-shadow': 'rgba(234,179,8,0.18)'
  },
  neon: {
    '--main-bg': 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)',
    '--main-color': '#f0f9ff',
    '--accent': '#22d3ee',
    '--dice-bg': '#0ea5e9',
    '--dice-shadow': 'rgba(34,211,238,0.22)'
  },
  wood: {
    '--main-bg': 'linear-gradient(135deg, #cbb67c 0%, #8d5524 100%)',
    '--main-color': '#3e2723',
    '--accent': '#a0522d',
    '--dice-bg': '#e0c097',
    '--dice-shadow': 'rgba(160,82,45,0.18)'
  },
  casino: {
    '--main-bg': 'linear-gradient(135deg, #14532d 0%, #f43f5e 100%)',
    '--main-color': '#fff',
    '--accent': '#f43f5e',
    '--dice-bg': '#fff',
    '--dice-shadow': 'rgba(244,63,94,0.18)'
  }
};

function applyTheme(theme) {
  const vars = themeMap[theme] || themeMap.default;
  for (const key in vars) {
    document.documentElement.style.setProperty(key, vars[key]);
  }
}

themeSelect.addEventListener('change', (e) => {
  const theme = e.target.value;
  applyTheme(theme);
  localStorage.setItem('theme-custom', theme);
});

// On load, restore theme
(function() {
  const saved = localStorage.getItem('theme-custom') || 'default';
  themeSelect.value = saved;
  applyTheme(saved);
})();

function rollDice(sides, count) {
  const rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  return rolls;
}

function animateDice(rolls, sides) {
  diceDisplay.innerHTML = '';
  rolls.forEach((roll, i) => {
    const diceDiv = document.createElement('div');
    diceDiv.innerHTML = diceSVGs[sides][roll - 1];
    // Add random rotation for tossed effect
    const rot = Math.floor(Math.random() * 360);
    diceDiv.style.opacity = '0';
    diceDiv.style.transform = `scale(0.7) rotate(${rot}deg)`;
    diceDisplay.appendChild(diceDiv);
    setTimeout(() => {
      diceDiv.style.transition = 'opacity 0.3s, transform 0.3s';
      diceDiv.style.opacity = '1';
      diceDiv.style.transform = `scale(1) rotate(${rot}deg)`;
    }, 100 + i * 80);
  });
}

function updateStatistics() {
  if (rollHistory.length === 0) {
    avgValue.textContent = '-';
    highValue.textContent = '-';
    lowValue.textContent = '-';
    return;
  }
  const allRolls = rollHistory.flatMap(r => r.rolls);
  const avg = (allRolls.reduce((a, b) => a + b, 0) / allRolls.length).toFixed(2);
  const high = Math.max(...allRolls);
  const low = Math.min(...allRolls);
  avgValue.textContent = avg;
  highValue.textContent = high;
  lowValue.textContent = low;
}

function updateHistory() {
  rollHistoryEl.innerHTML = '';
  rollHistory.slice(-HISTORY_LIMIT).reverse().forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.count} x D${entry.sides}: [${entry.rolls.join(', ')}] → ${entry.total}`;
    rollHistoryEl.appendChild(li);
  });
}

// Utility: Generate dice SVG with custom color
function getDiceSVG(sides, value, color) {
  if (sides === 6) {
    // Replace fill in SVG for D6
    return diceSVGs[6][value - 1].replace(/fill="url\(#d6g\d\)"/g, `fill="${color}"`).replace(/fill="url\(#d6g\d\)"/g, `fill="${color}"`);
  }
  // For others, replace gradient with solid color
  return diceSVGs[sides][value - 1].replace(/fill="url\([^)]+\)"/g, `fill="${color}"`);
}

function handleRoll(isLucky = false) {
  let sides = parseInt(diceTypeEl.value);
  let count = Math.max(1, Math.min(10, parseInt(diceCountEl.value)));
  if (isLucky) {
    const diceTypes = [4, 6, 8, 10, 12, 20];
    sides = diceTypes[Math.floor(Math.random() * diceTypes.length)];
    count = Math.floor(Math.random() * 10) + 1;
    diceTypeEl.value = sides;
    diceCountEl.value = count;
  }
  animateRoll(sides, count, () => {
    const rolls = rollDice(sides, count);
    const total = rolls.reduce((a, b) => a + b, 0);
    diceDisplay.innerHTML = '';
    rolls.forEach((roll, i) => {
      const diceDiv = document.createElement('div');
      const rot = Math.floor(Math.random() * 360);
      diceDiv.innerHTML = getDiceSVG(sides, roll, diceColor);
      diceDiv.style.opacity = '1';
      diceDiv.style.transform = `scale(1) rotate(${rot}deg)`;
      diceDisplay.appendChild(diceDiv);
    });
    resultValue.textContent = count > 1 ? `${rolls.join(' + ')} = ${total}` : rolls[0];
    rollHistory.push({ sides, count, rolls, total });
    if (rollHistory.length > HISTORY_LIMIT) rollHistory = rollHistory.slice(-HISTORY_LIMIT);
    updateHistory();
    updateStatistics();
    if (rollSound) {
      rollSound.currentTime = 0;
      rollSound.play();
    }
    // Vibration
    if (window.navigator.vibrate) {
      window.navigator.vibrate(80);
    }
    // Confetti and extra sound for max roll
    if (total === count * sides) {
      showConfetti();
      // Optionally play a special sound here
    }
  });
}

rollBtn.addEventListener('click', () => handleRoll());
luckyRollBtn.addEventListener('click', () => handleRoll(true));

function updateDiceSwatch() {
  // Show a D6 face 5 as preview
  diceColorSwatch.innerHTML = getDiceSVG(6, 5, diceColor);
}

function updatePresetSelection() {
  dicePresetBtns.forEach(btn => {
    if (btn.getAttribute('data-color').toLowerCase() === diceColor.toLowerCase()) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

diceColorEl.addEventListener('input', (e) => {
  diceColor = e.target.value;
  updateDiceSwatch();
  updatePresetSelection();
  // Optionally update dice color live if dice are shown
  if (resultValue.textContent !== '-' && resultValue.textContent !== '') {
    const last = rollHistory[rollHistory.length - 1];
    if (last) {
      diceDisplay.innerHTML = '';
      last.rolls.forEach((roll, i) => {
        const diceDiv = document.createElement('div');
        const rot = Math.floor(Math.random() * 360);
        diceDiv.innerHTML = getDiceSVG(last.sides, roll, diceColor);
        diceDiv.style.opacity = '1';
        diceDiv.style.transform = `scale(1) rotate(${rot}deg)`;
        diceDisplay.appendChild(diceDiv);
      });
    }
  }
});

dicePresetBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    diceColor = btn.getAttribute('data-color');
    diceColorEl.value = diceColor;
    updateDiceSwatch();
    updatePresetSelection();
    // Optionally update dice color live if dice are shown
    if (resultValue.textContent !== '-' && resultValue.textContent !== '') {
      const last = rollHistory[rollHistory.length - 1];
      if (last) {
        diceDisplay.innerHTML = '';
        last.rolls.forEach((roll, i) => {
          const diceDiv = document.createElement('div');
          const rot = Math.floor(Math.random() * 360);
          diceDiv.innerHTML = getDiceSVG(last.sides, roll, diceColor);
          diceDiv.style.opacity = '1';
          diceDiv.style.transform = `scale(1) rotate(${rot}deg)`;
          diceDisplay.appendChild(diceDiv);
        });
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Remove initial roll
  // Restore theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggleBtn.textContent = '☀️';
  }
  updateDiceSwatch();
  updatePresetSelection();
});

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

copyResultBtn.addEventListener('click', () => {
  const text = resultValue.textContent;
  navigator.clipboard.writeText(text);
  copyResultBtn.textContent = '✅';
  setTimeout(() => {
    copyResultBtn.textContent = '';
  }, 1200);
});

// Confetti effect
function showConfetti() {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.left = 0;
  confetti.style.top = 0;
  confetti.style.width = '100vw';
  confetti.style.height = '100vh';
  confetti.style.pointerEvents = 'none';
  confetti.style.zIndex = 9999;
  confetti.innerHTML = Array.from({length: 80}, () => {
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 6 + Math.random() * 8;
    const color = `hsl(${Math.random()*360},90%,60%)`;
    return `<div style="position:absolute;left:${x}vw;top:${y}vh;width:${size}px;height:${size}px;background:${color};border-radius:50%;opacity:0.8;"></div>`;
  }).join('');
  document.body.appendChild(confetti);
  clearTimeout(confettiTimeout);
  confettiTimeout = setTimeout(() => confetti.remove(), 1200);
}

// Roll animation
function animateRoll(sides, count, onFinish) {
  let frames = 12;
  let frame = 0;
  function nextFrame() {
    const rolls = Array.from({length: count}, () => Math.floor(Math.random() * sides) + 1);
    diceDisplay.innerHTML = '';
    rolls.forEach((roll, i) => {
      const diceDiv = document.createElement('div');
      const rot = Math.floor(Math.random() * 360);
      diceDiv.innerHTML = getDiceSVG(sides, roll, diceColor);
      diceDiv.style.opacity = '1';
      diceDiv.style.transform = `scale(1) rotate(${rot}deg)`;
      diceDisplay.appendChild(diceDiv);
    });
    frame++;
    if (frame < frames) {
      setTimeout(nextFrame, 40);
    } else {
      onFinish();
    }
  }
  nextFrame();
}
