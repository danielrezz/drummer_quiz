var renderQuestion = document.getElementById("question");
var renderOptions = document.querySelector(".options");
var timer = document.querySelector("#timer");
var totalSeconds = 10;
var secondsElapsed = 10;
var index = 0;
var interval;
// var optionBtn = document.createElement("button");
// optionBtn.className = "btn btn-primary";

function startFunction() {
  var startScreen = document.getElementById("start-screen");
  var questionStart = document.querySelector(".full-question");
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
      alert("Not quite my tempo... Hit OK to continue.");
      index++;
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
    renderQuestion.innerHTML = "Quiz complete!";
    renderOptions.appendChild(document.querySelector(".scoreButton"));
  }
}

function optionsList() {
  renderTime();
  var options = questions[index].choices;
  for (var a = 0; a < options.length; a++) {
    var optionBtn = document.createElement("button");
    optionBtn.className = "btn btn-primary";
    optionBtn.innerHTML = options[a];
    renderOptions.append(optionBtn);
    optionBtn.addEventListener("click", function () {
      while (renderOptions.hasChildNodes()) {
        renderOptions.removeChild(renderOptions.firstChild);
      }
      index++;
      questionList();
      stopTimer();
      startTimer();
    });
  }
}

// for (var i = 0; i < questions.length; i++) {
//     var optionBtn = document.getElementsByClassName("btn");
//     var response = optionBtn.addEventListener("click");
//     var score = 0;
//     if (response === questions[1].answer) {
//         score++;
//         alert(correct);
//     }
// }
