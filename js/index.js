const scoreButton = document.querySelector("#give-wm");

let scoreDisplay = document.querySelector("#game_score-number").innerHTML;

let score = 0;

function addScore(amount) {
  score = score + amount;
  scoreDisplay.innerHTML = score;
  console.log(score);
}

scoreButton.addEventListener("click", addScore(1));
