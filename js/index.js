// ELEMENTS
const scoreButton = document.querySelector("#give-wm");

const helperButton = document.querySelector("#enlisthelp");

const redBullButton = document.querySelector("#give-redbull");

const saveButton = document.querySelector("#savegame");

const loadButton = document.querySelector("#loadgame");

let scoreDisplay = document.querySelector("#game_score-number");

let helpersDisplay = document.querySelector("#game_helper-number");

let helperCostDisplay = document.querySelector("#helpercost");

let redBullDisplay = document.querySelector("#redbulls");

let redBullCostDisplay = document.querySelector("#redbullcost");

const redBullHeading = document.querySelector(".game__red_bulls");

let speedDisplay = document.querySelector("#game_score-per-second");

// VARIABLES
let score = 0;

let helpers = 0;

let helperCost = 5;

let redBullCost = 25;

let redBulls = 0;

// FUNCTIONS
function addScore(amount) {
  score = score + amount;
  scoreDisplay.innerHTML = score;
}

function getScore() {
  let redBullModifier = redBulls * 5;
  score = score + helpers + redBullModifier;
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

function giveRedBull() {
  if (score >= redBullCost) {
    score = score - redBullCost;
    redBulls = redBulls + 1;
    redBullCost = Math.round(redBullCost * 1.5);

    scoreDisplay.innerHTML = score;
    redBullCostDisplay.innerHTML = redBullCost;
    redBullDisplay.innerHTML = redBulls;
    updateSpeedDisplay();
  }
}

function saveGame() {
  let gameSave = {
    score: score,
    helpers: helpers,
    redBulls: redBulls,
  };
  localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame() {
  let savedGame = JSON.parse(localStorage.getItem("gameSave"));
  if (typeof savedGame.score !== undefined) score = savedGame.score;
  if (typeof savedGame.helpers !== undefined) helpers = savedGame.helpers;
  if (typeof savedGame.redBulls !== undefined) redBulls = savedGame.redBulls;
  updateSpeedDisplay;
}

function updateSpeedDisplay() {
  speedDisplay.innerHTML = helpers + redBulls;
}
// EVENT LISTENERS
scoreButton.addEventListener("click", () => {
  addScore(1);
});

helperButton.addEventListener("click", () => {
  redBullButton.classList.remove("hidden");
  enlistHelp();
});
redBullButton.addEventListener("click", () => {
  redBullHeading.classList.remove("hidden");
  giveRedBull();
});
saveButton.addEventListener("click", () => {
  saveGame();
});
loadButton.addEventListener("click", () => {
  loadGame();
});

// On load events
window.onload = () => {
  loadGame();
  updateSpeedDisplay();
  scoreDisplay.innerHTML = score;
  helpersDisplay.innerHTML = helpers;
  helperCostDisplay.innerHTML = helperCost;
  redBullDisplay.innerHTML = redBulls;
  redBullCostDisplay.innerHTML = redBullCost;
};

// INTERVALS
setInterval(getScore, 1000);

setInterval(saveGame, 5000);
