// Screen changes to question once user clicks on Start button

var renderQuestion = document.getElementById("question");
var renderOptions = document.querySelector(".options");
// var optionBtn = document.createElement("button");
// optionBtn.className = "btn btn-primary";

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
    questionList();
  }
}

// function for creating countdown timer
var timer = document.getElementById("timer");

var secondsLeft = 10;
var index = 0;

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
        }

    }, 1000)
}

function questionList() {

var questionList = questions.length -1;

if(index <= questionList) {
    renderQuestion.innerHTML = questions[index].question;
    optionsList();
} else {
    clearInterval(timerInterval);
}
};

function optionsList() {
    var options = questions[index].choices;
    for (var a = 0; a < options.length; a++) {
        var optionBtn = document.createElement("button");
        optionBtn.className = "btn btn-primary";
        optionBtn.innerHTML = options[a];
        console.log(a)
        console.log(options[a]);
        renderOptions.append(optionBtn);
        optionBtn.addEventListener("click", function() {
            while (renderOptions.hasChildNodes()) {  
                renderOptions.removeChild(renderOptions.firstChild);
              }
            index++;
            questionList();
        })
    }
}

if (optionBtn.addEventListener("click")) {
    clearInterval(timerInterval);
}
// optionBtn.addEventListener("click", function() {
//     console.log("here");
//     return index++;
// })

// for (var i = 0; i < questions.length; i++) {
//     var optionBtn = document.getElementsByClassName("btn");
//     var response = optionBtn.addEventListener("click");
//     var score = 0;
//     if (response === questions[1].answer) {
//         score++;
//         alert(correct);
//     }
// }