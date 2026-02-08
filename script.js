const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

let attempts = 0;
let scaleYes = 1;
let scaleNo = 1;
let extraYesCount = 0;
const yesButtons = [];
const MIN_DISTANCE = 120;

function moveNoButton() {
  attempts++;

  // --- CAS 7 : NON devient OUI ---
  if (attempts === 7) {
    transformNoIntoYes();
    return;
  }

  // Déplacement du NON
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";

  // YES principal grandit
  scaleYes += 0.15;
  if (scaleYes <= 3.5) {
    yesBtn.style.transform = `scale(${scaleYes})`;
  }

  // NON rétrécit
  scaleNo -= 0.08;
  if (scaleNo < 0.5) scaleNo = 0.5;
  noBtn.style.transform = `scale(${scaleNo})`;

  // --- CAS 3 : apparition de 2 OUI ---
  if (attempts === 3) {
    addExtraYes();
    addExtraYes();
  }
}

function addExtraYes() {
  const newYes = document.createElement("button");
  newYes.textContent = "Oui 💖";
  newYes.className = "extra-yes";

  let pos;
  let tries = 0;

  do {
    pos = randomPosition();
    tries++;
  } while (!isValidPosition(pos) && tries < 100);

  newYes.style.left = pos.x + "px";
  newYes.style.top = pos.y + "px";

  newYes.addEventListener("click", goToLovePage);

  document.body.appendChild(newYes);
  yesButtons.push(newYes);
}

function randomPosition() {
  return {
    x: Math.random() * (window.innerWidth - 140),
    y: Math.random() * (window.innerHeight - 70)
  };
}

function isValidPosition(pos) {
  if (distanceTo(pos, yesBtn) < MIN_DISTANCE * scaleYes) return false;

  for (const btn of yesButtons) {
    if (distanceTo(pos, btn) < MIN_DISTANCE) return false;
  }

  return true;
}

function distanceTo(pos, el) {
  const r = el.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;

  return Math.hypot(pos.x - cx, pos.y - cy);
}

function transformNoIntoYes() {
  noBtn.textContent = "Oui 💖";
  noBtn.style.backgroundColor = "#ff4d6d";
  noBtn.style.transform = "scale(1)";
  noBtn.classList.add("extra-yes");

  // Supprime l'ancien comportement
  noBtn.replaceWith(noBtn.cloneNode(true));

  const newYes = document.querySelector(".extra-yes:last-of-type");

  newYes.addEventListener("click", goToLovePage);
}

function goToLovePage() {
  page1.classList.add("hidden");
  page2.classList.remove("hidden");
}

// PC
noBtn.addEventListener("mouseover", moveNoButton);

// Mobile
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// OUI principal
yesBtn.addEventListener("click", goToLovePage);
