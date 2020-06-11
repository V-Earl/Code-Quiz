var questionIndex = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var startTime;
var stopTime;

$(document).ready(function () {
  $("#start").click(function () {
    $("#start").hide();
    $("#start-quiz").show();
    startTime = moment(new Date());
  });
});

// constructor function for the scores
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

// get index of currect question
Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

// check if quiz has been completed
Quiz.prototype.finished = function () {
  return this.questions.length === this.questionIndex;
};

// check if answer is correct
Quiz.prototype.guess = function (answer) {
  this.questionIndex++;

  if (this.getQuestionIndex().correctAnswer(answer)) {
    this.score++;
  }
};

function Question(title, choices, answer) {
  this.title = title;
  this.choices = choices;
  this.answer = answer;
}

// check if answer is correct or not
Question.prototype.correctAnswer = function (choice) {
  return choice === this.answer;
};

// function to show each question
function showQuestion() {
  if (questionIndex > 3) {
    stopTime = moment(new Date());
    var diff = startTime.diff(stopTime, "seconds") * -1;
    $("#start-quiz").hide();
    $("#Correct").text("Correct Answers: " + correctAnswers);
    $("#Wrong").text("Wrong Answers: " + wrongAnswers);
    $("#Time").text("Elapsed Time: " + diff + " " + "sec");
    $("#Finished").show();
  } else {
    // show questions
    var questionElement = $("#question-title");
    questionElement.text(quizQuestions[questionIndex].question);

    // show answer choices
    for (var i = 0; i < quizQuestions[questionIndex].answers.length; i++) {
      var choiceElement = $("#Answer" + i);

      choiceElement
        .attr("data-answer", quizQuestions[questionIndex].correctAnswer)
        .text(quizQuestions[questionIndex].answers[i]);
    }
  }
}

$(document).on("click", ".answer-buttons-container button", function () {
  var correctAnswer = $(this).data().answer;
  var selectedAnswer = $(this).text();

  if (correctAnswer == selectedAnswer) {
    correctAnswers++;
  } else {
    wrongAnswers++;
  }
  questionIndex++;
  console.log(correctAnswers, wrongAnswers);
  showQuestion();
});

var quizQuestions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: ["js", "javascript", "scripting", "script"],
    correctAnswer: "script",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: ["onmouseclick", "onmouseover", "onchange", "onclick"],
    correctAnswer: "onclick",
  },
];

showQuestion();
