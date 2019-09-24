$(document).ready(function () {
  // GLOBAL VARIABLES
  // =================================================================
  var time;
  var numberCorrect = 0;
  var numberIncorrect = 0;
  var numberUnanswered = 0;
  var questionCounter = 0;
  var questionTimer;
  var options = [
      {
          question: "What is Winnie the Pooh’s favorite snack?",
          answers: ["Peanut butter", "Salmon", "Honey", "Apple pie"],
          correctAnswer: 2
      },
      {
          question: "Fill in the blank: Babe, a little ______ goes a long way.",
          answers: ["Bit", "Pig", "Dog", "Love"],
          correctAnswer: 1
      },
      {
          question: "Who were best friends in Charlotte’s Web?",
          answers: ["Charlotte and Milton", "Charlotte and Bradley", "Charlotte and Stuart", "Charlotte and Wilbur"],
          correctAnswer: 3
      },
      {
          question: "Who created the comic strip, Garfield?",
          answers: ["Jim Davis", "Jon Arbuckle", "Betty White", "Joseph Conrad"],
          correctAnswer: 0
      },
      {
          question: "What color is Clifford the big dog?",
          answers: ["Blue", "Orange", "Red", "Golden"],
          correctAnswer: 2
      },
      {
          question: "What type of animal is Baloo from The Jungle Book?",
          answers: ["Bear", "Tiger", "Panther", "Elephant"],
          correctAnswer: 0
      },
      {
          question: "Who is Simba’s uncle in The Lion King?",
          answers: ["Mufasa", "Scar", "Rafiki", "Timon"],
          correctAnswer: 1
      },
      {
          question: "Moby Dick lived in this habitat: ",
          answers: ["Land", "Air", "Outer space", "Sea"],
          correctAnswer: 3
      }
  ];

  // FUNCTIONS
  // =================================================================

  // From start page, user clicks button to begin game
  $("#start-game").on("click", function () {
      showQuestion();
      showAnswers();
  });

  // Display question
  function showQuestion() {
      time = 15;
      // hide game start button
      $("#start-game").hide();
      // clear correct answer div
      $("#correct-answer").text("");
      // show question number and time remaining to answer question
      $("#interval-div").html("Question <span id='question-number'></span>/8");
      $("#question-number").text(questionCounter + 1);
      $("#interval-div").append("<br>Time Remaining: <span id='time-remaining'></span>");
      $("#time-remaining").text(time);
      // show question text
      $("#question").text(options[questionCounter].question);
      // set interval to 0
      questionTimer = setInterval(function () {
          // if 0 is reached, increase # unanswered and call showCorrectAnswer function
          if (--time === 0) {
              numberUnanswered += 1;
              showCorrectAnswer();
          }
          $("#time-remaining").text(time);
      }, 1000);
  }

  // Display multiple choice answers
  function showAnswers() {
      for (var i = 0; i < options[questionCounter].answers.length; i++) {
          $("#answers").append("<p class='answer-option'>" + options[questionCounter].answers[i] + "</p>");
      }
  };

  // User selects one answer
  $("#answers").on("click", "p.answer-option", function () {
      // compare clicked text to correct answer
      if ($(this).text() === options[questionCounter].answers[options[questionCounter].correctAnswer]) {
          // if text matches, show user they selected the correct answer
          $("#correct-answer").text("Correct! ");
          // increase numberCorrect answers
          numberCorrect += 1;
      }
      // if text does not match, show user they selected and incorrect answer
      else {
          $("#correct-answer").text("Incorrect. ");
          // increase numberIncorrect answers
          numberIncorrect += 1;
      }
      // call showCorrectAnswer function
      showCorrectAnswer();
  });

  //Correct answer is shown.
  function showCorrectAnswer() {
      // empty answers div
      $("#answers").empty();
      // text to let user know the next question will be shown soon
      $("#interval-div").html("Next question will begin shortly");
      // display the correct answer
      $("#correct-answer").append("<p>The correct answer is: " + options[questionCounter].answers[options[questionCounter].correctAnswer] + ".</p>");
      // clear the timer
      clearInterval(questionTimer);
      // if question counter is less than # options, display next question automatically without user input
      if (questionCounter < options.length - 1) {
          setTimeout(showQuestion, 3000);
          setTimeout(showAnswers, 3000);
          questionCounter += 1;
      }
      // if question counter is not less than # options, call endGame function
      else {
          setTimeout(endGame, 3000);
      };
  }

  // Once the last question is answered, shows # correct, # incorrect, and # unanswered then reset is called. 
  function endGame() {
      // empty game divs
      $("#interval-div").empty();
      $("#question").empty();
      $("#answers").empty();
      $("#correct-answer").empty();
      // show game results
      $("#correct-answer").append("<p>You made it to the end of trivia. Let's see how you did...</p>");
      $("#correct-answer").append("<p>Correct answers: " + numberCorrect + "</p>");
      $("#correct-answer").append("<p>Incorrect answers: " + numberIncorrect + "</p>");
      $("#correct-answer").append("<p>Unanswered: " + numberUnanswered + "</p>");
      // call reset function
      reset();
  }

  function reset() {
      // show button to start over without refreshing the page
      $("#start-game").show();
      // reset global variables
      numberCorrect = 0;
      numberIncorrect = 0;
      numberUnanswered = 0;
      questionCounter = 0;
  };

});

// =================================================================

// Add year to footer
$("#year").text(new Date().getFullYear());