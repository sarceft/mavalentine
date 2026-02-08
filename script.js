const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

let attempts = 0;
let scaleYes = 1;
let scaleNo = 1;
const yesButtons = [];
const MIN_DISTANCE = 120;

function moveNoButton() {
  attempts++;

  // 🔄 À la 7ᵉ tentative → NON devient OUI
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
  yesBtn.style.transform = `scale(${Math.min(scaleYes, 3.5)})`;

  // NON rétrécit
  scaleNo = Math.max(0.5, scaleNo - 0.08);
  noBtn.style.transform = `scale(${scaleNo})`;

  // ➕ Tous les 3 essais (3 et 6) → 2 nouveaux OUI
  if (attempts % 3 === 0 && attempts < 7) {
    addExtraYes();
    addExtraYes();
  }
}

function addExtraYes() {
  const newYes = document.createElement("button");
  newYes.textContent = "Oui 💖";
  newYes.className = "extra-yes";

  let pos, tries = 0;
  do {
    pos = randomPosition();
    tries++;
  } while (!isValidPosition(pos) && tries < 100);

  newYes.style.left = pos.x + "px";
  newYes.style.top = pos.y + "px";

  newYes.addEventListener("click", goToLovePage);

  // ✅ IMPORTANT : on l’ajoute à page1
  page1.appendChild(newYes);
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
  return Math.hypot(
    pos.x - (r.left + r.width / 2),
    pos.y - (r.top + r.height / 2)
  );
}

function transformNoIntoYes() {
  noBtn.textContent = "Oui 💖";
  noBtn.style.backgroundColor = "#ff4d6d";
  noBtn.style.transform = "scale(1)";
  noBtn.className = "extra-yes";

  // Supprimer l’ancien comportement NON
  noBtn.replaceWith(noBtn.cloneNode(true));

  const newYes = page1.querySelector(".extra-yes:last-child");
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
