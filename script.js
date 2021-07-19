var renderQuestion = document.getElementById("question");
var renderOptions = document.querySelector(".options");
var timer = document.querySelector("#timer");
var questionStart = document.querySelector(".full-question");
var startScreen = document.getElementById("start-screen");
var totalSeconds = 10;
var secondsElapsed = 10;
var index = 0;
var interval;
var finalScore = 0;
var scores = [];

function startFunction() {
  var timer = document.querySelector("#timer");

  if (startScreen.style.display === "none") {
    timer.style.display === "none";
    startScreen.style.display = "block";
    questionStart.style.display = "none";
  } else {
    timer.style.display = "block";
    startScreen.style.display = "none";
    questionStart.style.display = "block";
    renderTime();
    startTimer();
    questionList();
  }
}

function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;

  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}

function setTime() {
  clearInterval(interval);
}

function renderTime() {
  timer.textContent = getFormattedSeconds();
  if (secondsElapsed >= totalSeconds) {
    stopTimer();
  }
}

function startTimer() {
  setTime();

  interval = setInterval(function () {
    secondsElapsed++;
    timer.textContent = secondsElapsed;

    renderTime();

    if (secondsElapsed === 0) {
      for (var a = 0; a < 3; a++) {
        while (renderOptions.hasChildNodes()) {
          renderOptions.removeChild(renderOptions.firstChild);
        }
      }
      index++;
      alert("Not quite my tempo... Hit OK to continue.");
      questionList();
      stopTimer();
      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  secondsElapsed = 0;
  setTime();
  renderTime();
}

function questionList() {
  var questionList = questions.length - 1;

  if (index <= questionList) {
    renderQuestion.innerHTML = questions[index].question;
    optionsList();
  } else {
    timer.style.display = "none";
    renderTime();
    renderQuestion.innerHTML = `Your chops score is ${finalScore}%!!`;
    submitScore();
    submitScore.fired = true;
  }
}

function optionsList() {
  renderTime();
  var options = questions[index].choices;
  let answer = questions[index].answer;
  for (var a = 0; a < options.length; a++) {
    var optionBtn = document.createElement("button");
    optionBtn.className = "btn btn-primary";
    optionBtn.innerHTML = options[a];
    renderOptions.append(optionBtn);
    optionBtn.addEventListener("click", function (e) {
      while (renderOptions.hasChildNodes()) {
        renderOptions.removeChild(renderOptions.firstChild);
      }

      if (e.target.innerHTML === answer) {
          finalScore += 10;
      }
      alert = function() {};
      index++;
      questionList();
      stopTimer();
      startTimer();
    });
  }
}

let leaderboard = () => {
    window.location.href = "/leaderboard/index.html";
}

init();

function init() {

    let storedScores = JSON.parse(localStorage.getItem("scores"));

    if (storedScores !== null) {
        scores = storedScores;
    }

    renderScores();
}

function renderScores() {
    for (let i = 0; i < scores.length; i++) {
        let score = scores[i];

        let newRow = document.createElement("tr");
        let newdata1 = document.createElement("td");
        let newdata2 = document.createElement("td");

        newRow.setAttribute("data-index", i);

        newdata1.className = "bandname";
        newdata2.className = "score";

        newdata1.textContent = score.bandName;
        newdata2.textContent = score.scoreNumber;
        
        document.querySelector("tbody").appendChild(newRow);
        newRow.appendChild(newdata1);
        newRow.appendChild(newdata2);
    }
}

function storeScores() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

function submitScore() {
    if (submitScore.fired) return;
    let nameInput = questionStart.appendChild(document.createElement("input"));
    nameInput.className = "nameInput";
    nameInput.placeholder = "Band Name";
    let submitBtn = document.createElement("button");
    questionStart.append(submitBtn);
    submitBtn.className = "scoreButton";
    submitBtn.innerHTML = "Add Score";

    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();
    
        localStorage.setItem("bandname", nameInput.value);
        localStorage.setItem("score", finalScore);
    
        let score = {
            bandName: nameInput.value.trim(),
            scoreNumber: finalScore
        }
        alert("Score added!");
        scores.push(score);
        location.reload();
        storeScores();
        renderScores();
    });
}