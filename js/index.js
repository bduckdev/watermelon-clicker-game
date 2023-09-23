// ELEMENTS
const scoreButton = document.querySelector("#give-wm");

const helperButton = document.querySelector("#enlisthelp");

const redBullButton = document.querySelector("#give-redbull");

let scoreDisplay = document.querySelector("#game_score-number");

let helpersDisplay = document.querySelector("#game_helper-number");

let helperCostDisplay = document.querySelector("#helpercost");

let redBullDisplay = document.querySelector("#redbulls");

let redBullCostDisplay = document.querySelector("#redbullcost");

// VARIABLES
let score = 0;

let helpers = 0;

let helperCost = 5;

let redBullCost = 5;

let redBulls = 0;

let secretRedBulls = redBulls + 1;

let speed = 1000;

let helperImpact = 1;

// FUNCTIONS
function addScore(amount) {
  score = score + amount;
  scoreDisplay.innerHTML = score;
}

function getHelperImpact() {
  if (helpers != 0 && redBulls != 0) {
    helperImpact = helpers + secretRedBulls;
  } else {
    helperImpact = helpers;
  }
}

function enlistHelp() {
  if (score >= helperCost) {
    score = score - helperCost;
    helpers = helpers + 1;
    helperCost = Math.round(helperCost * 1.15);

    scoreDisplay.innerHTML = score;
    helpersDisplay.innerHTML = helpers;
    helperCostDisplay.innerHTML = helperCost;
  }
}

function giveRedBull() {
  if (score >= redBullCost) {
    score = score - redBullCost;
    redBulls = redBulls + 1;
    redBullCost = Math.round(redBullCost * 5);

    scoreDisplay.innerHTML = score;
    redBullCostDisplay.innerHTML = redBullCost;
    redBullDisplay.innerHTML = redBulls;
  }
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
  giveRedBull();
});

// INTERVALS

setInterval(function () {
  getHelperImpact();
  score = score + helperImpact;
  scoreDisplay.innerHTML = score;
}, speed);
