
const highScoreList= document.getElementById("HighScoreList");
const highScores=JSON.parse(localStorage.getItem("highScores")) || [];



   highScoreList.innerHTML =highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");

