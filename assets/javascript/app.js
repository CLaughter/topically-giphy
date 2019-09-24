$(document).ready(function () {

    // GLOBAL VARIABLES****
    let time;
    let timer;
    let numberCorrect = 0;
    let numberIncorrect = 0;
    let numberUnanswered = 0;
    let questionCounter = 0; 

    // Arrays****
    let questionsArr = [
        'Which is a Prime number?',
        'Which ratio is equivalent?',
        'Which is the closest star to earth?',
        'It is better to stargaze in the summer',
        'When a gas changes into a liquid it is called what?',
        'An instrument to measure temperature is called __________ ?',
        'Another name for a tidal wave is a __________?',
        'The fear of what animal is known as ‘arachnophobia’?'
    ];

    let choicesArr = [
        ['22', '13', '25', '32'],
        ['60:1 to 120/2', '5:3 to 8/5', 'mph to hpk'],
        ['Proxima Centauri', 'Icarus', 'Alpha Centauri B', 'Pluto'],
        ['True', 'False'],
        ['Sublimation', 'Condensation', 'Melting', 'Evaporation'],
        ['Hydrometer', 'Tempometer', 'Gyrometer', 'Thermometer'],
        ['Surge', 'Depression', 'Tsunami', 'Ripple'],
        ['Butterflies', 'Monkeys', 'Snakes', 'Spiders']
    ];

//   options[0].possOption
    let realAnswersArr = [

        { 
            answer: '13',
            explanation: 'A prime number is a natural number greater than 1 that cannot be formed by multiplying two smaller natural numbers. A natural number greater than 1 that is not prime is called a composite number. For example, 5 is prime because the only ways of writing it as a product, 1 × 5 or 5 × 1, involve 5 itself.'
        },

        {
            answer: '60:1 to 120/2',
            explanation: 'A ratio is a relationship between two units of type and can be written either way 1:10 to 1/10; x:y to x/y; miles/hour (mph) to kilometers/hour (kph).'
        },

        {
            answer: 'Alpha Centauri B',
            explanation: 'The closest star to Earth are three stars in the Alpha Centauri system. The two main stars are Alpha Centauri A and Alpha Centauri B, which form a binary pair.'
        },

        {
            answer: 'False',
            explanation: 'Summer months mean long days and short nights and significantly reduces stargazing opportunities. Autumn, Winter and Spring offer the best times to stargaze and many astronomers refer to an "observing season". This is the time from when clocks go back in October (nights become 1 hour longer) to the time they go forward in March (nights become 1 hour shorter).'
        },

        {
            answer: 'Condensation',
            explanation: 'Changes of state are physical changes in matter. They are reversible changes that do not change matter\'s chemical makeup or chemical properties. Processes involved in changes of state include melting, freezing, sublimation, deposition, condensation, and evaporation.'
        },

        {
            answer: 'Thermometer',
            explanation: 'A thermometer is a device that measures temperature or a temperature gradient.'
        },

        {
            answer: 'Tsunami',
            explanation: 'They are both long gravity waves which get amplified in shallow water, but they are caused by totally different phenomena. Storm surge is cause by hurricanes and happens far more often than tsunamis. ... Tsunamis occur far less often than storm surge and bring with them much more loss of life and damage.'
        },

        {
            answer: 'Spiders',
            explanation: 'Arachnophobia is the unreasonable fear of spiders and other arachnids such as scorpions.'
        },
    ];

    // FUNCTIONS****
    // Game starts with button click
    $('#startGame').on('click', function () {
        question();
        possOptions();
        // rightAnswer();
    });

    // Display question
    function question() {
        time = 15;
        console.log(questionsArr[7]); // test
        
        // hides start game button
        $('#startGame').hide();
        // clears correct answer div
        $('#correctAnswers').text('');
        // show question number and time remaining to answer question
        $('#intervalDiv').html('Question <span id="questionNumber"></span>/8');
        $('#questionNumber').text(questionCounter + 1);
        $('#intervalDiv').append('<br>Time Remaining: <span id="timeRemaining"></span>');
        $('#timeRemaining').text(time);
        // display question
        $('#question').text(questionsArr[questionCounter]);
        // Set interval to 0
        timer = setInterval(function () {
          // If time=0, add 1 to unanswered and call correctAnswer function
          if (--time === 0) {
            numberUnanswered += 1;
            rightAnswer();
          }
          $('#timeRemaining').text(time);
        }, 1000);
    }; // End Function

    // Display user answer choices
    function possOptions() {
        for (let i = 0; i < choicesArr[questionCounter].length; i++) {
            $('#answers').append('<p class="answerChoice">' + (choicesArr[questionCounter][i]) + '</p>');
        } // End Function
    };

  // User selects one answer
  $(document).on('click', '.answerChoice', function () {
        // Compare clicked text to correct answer
        if ($(this).text() === realAnswersArr[questionCounter].answer) {
            // If text matches, show user they selected the correct answer
            $('#correctAnswer').text('Awesome!');
            // Increase numberCorrect answers
            numberCorrect += 1;
        }
        // If text does not match, show user they selected and incorrect answer
        else {
            $('#correctAnswer').text('Nope. That\'s not it.');
            // Increase numberIncorrect answers
            numberIncorrect += 1;
        }
        // Call showCorrectAnswer function
        rightAnswer();
    }); // End Function

    //Correct answer is shown.
    function rightAnswer() {
        // Empty answers div
        $('#answers').empty();
        // Text to let user know the next question will be shown soon
        $('#intervalDiv').html('Next question will begin shortly');
        // Display the correct answer
        $('#correctAnswers').append('<p>The correct answer is: ' + realAnswersArr[questionCounter].answer + '</p>');
        $('#correctAnswers').append('<p>' + realAnswersArr[questionCounter].explanation + '</p>');
        // Clear the timer
        clearInterval(timer);
        // If question counter is less than Array length, display next question automatically without user input
        if (questionCounter < questionsArr.length - 1) {
            setTimeout(function() {question()}, 20000);
            setTimeout(function() {possOptions()}, 20000);
            questionCounter += 1;
        }
        // If question counter is not less than # options, call endGame function
        else {
            setTimeout(endGame, 3000);
        }
    }; // End Function

    // Once the last question is answered, shows # correct, # incorrect, and # unanswered then reset is called. 
    function endGame() {
        // Empty game divs
        $('#intervalDiv').empty();
        $('#question').empty();
        $('#answers').empty();
        $('#correctAnswers').empty();
        // Show game results
        $('#correctAnswers').append('<p>You made it to the end of trivia. Let\'s see how you did...</p>');
        $('#correctAnswers').append('<p>Correct answers: ' + numberCorrect + '</p>');
        $('#correctAnswers').append('<p>Incorrect answers: ' + numberIncorrect + '</p>');
        $('#correctAnswers').append('<p>Unanswered: ' + numberUnanswered + '</p>');
        // Call reset function
        reset();
    }; // End function

    function reset() {
        time = 5;
        // Show button to start over without refreshing the page
        $('#startGame').show();
        // Reset global variables
        numberCorrect = 0;
        numberIncorrect = 0;
        numberUnanswered = 0;
        questionCounter = 0;
    }; // End function

});