//Create global variables
const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

//Create another global variable called word and give it the value of "magnolia". 
//Magnolia is your starting word to test out the game until you fetch words from a hosted file in a later step.
let word = "magnolia";
const guessedLetters = [];
let = remainingGuesses = 8;

const getWord = async function () {
    const response = await
    fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

//Write a Function to Add Placeholders for Each Letter.
//Create and name a function to update the paragraph’s innerText for the “words-in-progress” 
//element with circle symbols (●) to represent each letter in the word. 
//The symbols will stay on the screen until the correct letter is guessed (in a future step). 
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
      //console.log(letter);
      placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

//Add an event listener for when a player clicks the Guess button. 
//In the callback function, add a parameter for the event: e.
//Because you’re working with a form, you want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page. To prevent this reloading behavior, add this line of code at the top of the callback function: e.preventDefault();.
//Create and name a variable to capture the value of the input.
//Log out the value of the variable capturing the input. 
//Empty the value of the input. You should see the letter you enter into the input field in the 
//console when the Guess button is clicked. 
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";  //empty the message
    const guess = letterInput.value;
    const goodGuess = validateInput(guess);
    //Make sure that the variable mapped to the result of the function validates that the player’s input is returning a letter (as opposed to “undefined”). If it’s returning a letter, pass it as an argument to your makeGuess function.
    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

//Create and name a function that accepts the input value as a parameter. This function’s purpose is to validate the player’s input.
//Inside the function, create a variable for the accepted letter sequence.
//Check if input in empty.
//Check if they entered more than one letter.
//check if they’ve entered a character that doesn’t match the regular expression pattern. 
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Make sure to enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please only enter one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please only enter a letter A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have already guessed that letter. Please guess again.";
    } else {
        guessedLetters.push(guess);
        console.log (guessedLetters);
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `So sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word does have the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};