const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

let scaleYes = 1;
let scaleNo = 1;
let attempts = 0;

const yesButtons = []; // stocke les OUI ajoutés
const NEW_YES_EVERY = 8; // un nouveau OUI tous les X essais
const MIN_DISTANCE = 120; // distance minimale entre boutons

function moveNoButton() {
  attempts++;

  // Déplacement du NON
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";

  // OUI principal grandit
  scaleYes += 0.12;
  if (scaleYes <= 3.5) {
    yesBtn.style.transform = `scale(${scaleYes})`;
  }

  // NON rétrécit
  scaleNo -= 0.04;
  if (scaleNo < 0.4) scaleNo = 0.4;
  noBtn.style.transform = `scale(${scaleNo})`;

  // Tous les X essais → ajouter un nouveau OUI
  if (attempts % NEW_YES_EVERY === 0) {
    addExtraYes();
  }
}

function addExtraYes() {
  const newYes = document.createElement("button");
  newYes.textContent = "Oui 💖";
  newYes.className = "extra-yes";

  let position;
  let tries = 0;

  do {
    position = randomPosition(newYes);
    tries++;
  } while (!isPositionValid(position) && tries < 100);

  newYes.style.left = position.x + "px";
  newYes.style.top = position.y + "px";

  newYes.addEventListener("click", goToLovePage);

  document.body.appendChild(newYes);
  yesButtons.push(newYes);
}

function randomPosition(el) {
  return {
    x: Math.random() * (window.innerWidth - 140),
    y: Math.random() * (window.innerHeight - 70)
  };
}

function isPositionValid(pos) {
  // Vérifie distance avec le OUI principal
  if (distanceToElement(pos, yesBtn) < MIN_DISTANCE * scaleYes) {
    return false;
  }

  // Vérifie distance avec les autres OUI
  for (const btn of yesButtons) {
    if (distanceToElement(pos, btn) < MIN_DISTANCE) {
      return false;
    }
  }

  return true;
}

function distanceToElement(pos, el) {
  const rect = el.getBoundingClientRect();
  const elX = rect.left + rect.width / 2;
  const elY = rect.top + rect.height / 2;

  const dx = pos.x - elX;
  const dy = pos.y - elY;

  return Math.sqrt(dx * dx + dy * dy);
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
