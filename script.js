function startFunction() {
    var startScreen = document.getElementById("start-screen");
    var questionStart = document.querySelector(".full-question");
  if (startScreen.style.display === "none") {
    startScreen.style.display = "block";
    questionStart.style.display = "none";
  } else {
    startScreen.style.display = "none";
    questionStart.style.display = "block";
    setTime();
  }
}

var timer = document.getElementById("timer");

var secondsLeft = 10;

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
        }

    }, 1000)
}