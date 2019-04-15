// Array for the 4 colours
const buttonColours = ['red', 'blue', 'green', 'yellow'];

// Game's random generated array
let gamePattern = [];

// User's selections array
let userClickedPattern = [];

// Init gameStarted flag
let gameStarted = false;

// Init level variable
let level = 0;

// On keypress call nextSequence(), set gameStarted flag so it only runs on first keypress
$(document).keypress(function () {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }
});

// Button on click event listener
$('.btn').click(function () {
        // Store the id of the button that got clicked
        const userChosenColour = this.id;

        // Push to userClickedPattern
        userClickedPattern.push(userChosenColour);

        // Play the colour's sound file
        playSound(userChosenColour);

        // Animate clicked button
        animatePress(this);

        // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
        checkAnswer(userClickedPattern.length - 1);
    });

// Function to generate next sequence
function nextSequence() {
        // Reset the userClickedPattern to an empty array ready for the next level
        userClickedPattern = [];

        // Generate a new random number between 0 and 3
        const randomNumber = Math.floor(Math.random() * 4);

        // Select a random colour, based on randomNumber, from the buttonColours array
        let randomChosenColour = buttonColours[randomNumber];

        // Push randomChosenColour to gamePattern array.
        gamePattern.push(randomChosenColour);

        // Select the button with the same id as the randomChosenColour and make it flash
        $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);

        // Play the colour's sound file
        playSound(randomChosenColour);

        // Iterate level number
        level++;

        // And update the title accordingly
        $('#level-title').text(`Level ${level}`);
    }

// Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    // Check if the most recent user answer is the same as the game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // Then check that they have finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            // Call nextSequence() after a 1000 ms delay.
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    } else {
        // Play 'wrong' sound if the user got one of the answers wrong
        playSound('wrong');

        // Add 'game-over' class to the body, remove it after 200 ms
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over')
        }, 200)

        // Change the title accordingly
        $('#level-title').text('Game Over! Press Any Key to Restart.');

        // Call startOver() to start the game over
        startOver();
    }
}

function startOver() {
    // Reset level, gamePattern and gameStarted so the game starts over.
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

// Create a new function called playSound() that takes a single input parameter called name
function playSound(name) {

    // Refactor to work on both click and keypress
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

// Create a new function called animatePress(), it should take a single input parameter called currentColour
function animatePress(currentColour) {

    // Add 'pressed' class to the button that gets clicked
    $(currentColour).addClass('pressed');

    // Remove the pressed class after 100 ms
    setTimeout(function () {
        $(currentColour).removeClass('pressed');
    }, 100);
}

