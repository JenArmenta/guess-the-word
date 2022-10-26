//Create global variables
const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const remainingSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");


//Create another global variable called word and give it the value of "magnolia". 
//Magnolia is your starting word to test out the game until you fetch words from a hosted file in a later step.
const word = "magnolia";

//Write a Function to Add Placeholders for Each Letter.
//Create and name a function to update the paragraph’s innerText for the “words-in-progress” 
//element with circle symbols (●) to represent each letter in the word. 
//The symbols will stay on the screen until the correct letter is guessed (in a future step). 


const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
      console.log(letter);
      placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

//Call the function and pass it the word variable as the argument. 
placeholder (word);

//Add an event listener for when a player clicks the Guess button. 
//In the callback function, add a parameter for the event: e.
//Because you’re working with a form, you want to prevent the default behavior of clicking a button, the form submitting, and then reloading the page. To prevent this reloading behavior, add this line of code at the top of the callback function: e.preventDefault();.
//Create and name a variable to capture the value of the input.
//Log out the value of the variable capturing the input. 
//Empty the value of the input. You should see the letter you enter into the input field in the 
//console when the Guess button is clicked. 
button.addEventListener("click", function (e) {
    e.preventDefault();
    const inputValue = letter.value;
    console.log(inputValue);
    letter.value = "";
});