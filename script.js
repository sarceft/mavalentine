const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

let scaleYes = 1;
let scaleNo = 1;
let attempts = 0;
let extraYesAdded = false;

function moveNoButton() {
  attempts++;

  // Déplacement aléatoire du NON
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";

  // YES grandit
  scaleYes += 0.12;
  if (scaleYes <= 3.2) {
    yesBtn.style.transform = `scale(${scaleYes})`;
  }

  // NON rétrécit
  scaleNo -= 0.04;
  if (scaleNo < 0.4) scaleNo = 0.4;
  noBtn.style.transform = `scale(${scaleNo})`;

  // Après 15 tentatives → nouveau OUI
  if (attempts >= 15 && !extraYesAdded) {
    addExtraYes();
    extraYesAdded = true;
  }
}

function addExtraYes() {
  const newYes = document.createElement("button");
  newYes.textContent = "Oui 💖";
  newYes.classList.add("extra-yes");

  // Position aléatoire
  newYes.style.left = Math.random() * (window.innerWidth - 120) + "px";
  newYes.style.top = Math.random() * (window.innerHeight - 60) + "px";

  // Même action que le vrai OUI
  newYes.addEventListener("click", goToLovePage);

  document.body.appendChild(newYes);
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
