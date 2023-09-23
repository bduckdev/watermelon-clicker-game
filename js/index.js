const scoreButton = document.querySelector("#give-wm");

let scoreDisplay = document.querySelector("#game_score-number");

function addScore(amount) {
  score = score + amount;
  scoreDisplay.innerHTML = score;
}

let score = 0;

scoreButton.addEventListener("click", () => {
  addScore(1);
});
