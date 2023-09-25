// ELEMENTS
const scoreButton = document.querySelector("#give-wm");

const helperButton = document.querySelector("#enlisthelp");

const superHelperButton = document.querySelector("#add-superhelper");

const saveButton = document.querySelector("#savegame");

const loadButton = document.querySelector("#loadgame");

const resetButton = document.querySelector("#resetgame");

let scoreDisplay = document.querySelector("#game_score-number");

let helpersDisplay = document.querySelector("#game_helper-number");

let helperCostDisplay = document.querySelector("#helpercost");

let superHelperDisplay = document.querySelector("#superhelpers");

let superHelperCostDisplay = document.querySelector("#superhelpercost");

const superHelperHeading = document.querySelector(".game__super_helpers");

let speedDisplay = document.querySelector("#game_score-per-second");

// VARIABLES
let score = 0;

let helpers = 0;

let helperCost = 5;

let superHelperCost = 25;

let superHelpers = 0;

// FUNCTIONS
function addScore(amount) {
  score = score + amount;
  scoreDisplay.innerHTML = score;
}

function getScore() {
  let superHelperModifier = superHelpers * 5;
  score = score + helpers + superHelperModifier;
  scoreDisplay.innerHTML = score;
}

function enlistHelp() {
  if (score >= helperCost) {
    score = score - helperCost;
    helpers = helpers + 1;
    helperCost = Math.round(helperCost * 1.15);

    scoreDisplay.innerHTML = score;
    helpersDisplay.innerHTML = helpers;
    helperCostDisplay.innerHTML = helperCost;
    updateSpeedDisplay();
  }
}

function enlistSuperHelper() {
  if (score >= superHelperCost) {
    score = score - superHelperCost;
    superHelpers = superHelpers + 1;
    superHelperCost = Math.round(superHelperCost * 1.5);

    scoreDisplay.innerHTML = score;
    superHelperCostDisplay.innerHTML = superHelperCost;
    superHelperDisplay.innerHTML = superHelpers;
    updateSpeedDisplay();
  }
}

function saveGame() {
  let gameSave = {
    score: score,
    helpers: helpers,
    superHelpers: superHelpers,
  };
  localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
  let savedGame = JSON.parse(localStorage.getItem("gameSave"));
  if (typeof savedGame.score !== "undefined") score = savedGame.score;
  if (typeof savedGame.helpers !== "undefined") helpers = savedGame.helpers;
  if (typeof savedGame.superHelpers !== "undefined")
    superHelpers = savedGame.superHelpers;
}

function updateSpeedDisplay() {
  speedDisplay.innerHTML = helpers + superHelpers;
}
function resetGame() {
  if (confirm("Are you sure you want to reset EVERYTHING?")) {
    let gameSave = {};
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
    location.reload();
  }
}
// EVENT LISTENERS
scoreButton.addEventListener("click", () => {
  addScore(1);
});

helperButton.addEventListener("click", () => {
  superHelperButton.classList.remove("hidden");
  enlistHelp();
});
superHelperButton.addEventListener("click", () => {
  superHelperHeading.classList.remove("hidden");
  enlistSuperHelper();
});
saveButton.addEventListener("click", () => {
  saveGame();
});
loadButton.addEventListener("click", () => {
  loadGame();
});
resetButton.addEventListener("click", () => {
  resetGame();
});
// On load events
window.onload = () => {
  loadGame();
  updateSpeedDisplay();
  scoreDisplay.innerHTML = score;
  helpersDisplay.innerHTML = helpers;
  helperCostDisplay.innerHTML = helperCost;
  superHelperDisplay.innerHTML = superHelpers;
  superHelperCostDisplay.innerHTML = superHelperCost;
};

// INTERVALS
setInterval(getScore, 1000);

setInterval(saveGame, 5000);
