// Initial Values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// If the timer is over . then go to the next question
function nextQuestion() {
    const isQuestionOver = ( quizQuestions. length -1) === currentQuestion;
    if (isQuestionOver) {
        //TODO
        console.log('Game is over!!!!!');
        displayResult();
    } else {
        currentQuestion++;
        loadQuestion();
    }

}

// Start a 30 secound timer for user to respond or choose an answer to each question
function timeUP() {
    clearInterval(timer);

    lost++;

    preloadImage('lost')
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
        timeUP();
    }
}

// Display the question and the choices to the browser
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; //
    const choices = quizQuestions[currentQuestion].choices; //

    $('#time').html('Timer: ' + counter);
    $('#game').html(`
       <h4>${question}</h4>
       ${loadChoices(choices)}
       ${loadRemainigQuestion()}
    `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer= "${choices[i]}">${choices[i]}</p>`;
    }

    return result;

}

//Either correct/wrong choice selected, go to the next questio
$(document).on(`click`, `.choice`, function() {
    clearInterval(timer);
    const selectAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer===selectAnswer) {
       score++;
       console.log('winss!!!!!');
       preloadImage('win')
       setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        console.log('lost!!!!!');
        preloadImage('lost')
        setTimeout(nextQuestion, 3 * 1000);
    }  
});


function displayResult() {
    const result = `
        <p>You get ${score} questions(s) Right</p>
        <p>You missed ${lost} questions(s)<p>
        <p>Total questions is ${quizQuestions. length} Questions(s)</p>
        <button class="btn-btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}

$(document).on('click', '#reset', function(){
     counter = 30;
     currentQuestion = 0;
     score = 0;
     lost = 0;
     timer =null;

     loadQuestion();
});

function loadRemainigQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}

// Display a funny giphy for correct and wrong answers

function randomImage(images) {
    const random = Math.floor(Math.random() * images.length);
    const randomImage = images[random];
    return randomImage;

}

function preloadImage(status){
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    
    if (status === 'win') {
        $('#game').html(`
           <p class="preload-image">Congratulations you pick the correct answer</p>
           <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
           <img src="${randomImage(funImages)}"/>       
        `)    

    } else {
        $('#game').html(`
           <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
           <p class="preload-image">You lost pretty bad</p>
           <img src="${randomImage(sadImages)}"/>  
        
        `);  
        
    }

}
$('#start').click(function() {
    $('#start').remove();
    $('#time').html(counter);

    loadQuestion();;
});