// Lista de palabras para el juego
const words = ["javascript", "programacion", "computadora", "algoritmo", "variable", "tecnologia"];

let wordToGuess;
let guessedLetters = [];
let remainingGuesses = 6;

const wordElement = document.getElementById("word");
const figureElement = document.getElementById("hangman-figure");
const guessesRemainingElement = document.getElementById("guesses-remaining");
const messageElement = document.getElementById("message");
const keyboardElement = document.getElementById("keyboard");

// Función para iniciar el juego
function startGame() {
    wordToGuess = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    remainingGuesses = 6;
    figureElement.querySelectorAll("div").forEach(part => part.style.display = "none"); // Ocultar todas las partes al inicio
    guessesRemainingElement.textContent = `Intentos restantes: ${remainingGuesses}`;
    messageElement.textContent = "";
    updateWordDisplay();
    createKeyboard();
}

// Función para actualizar la visualización de la palabra
function updateWordDisplay() {
    wordElement.textContent = wordToGuess.split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
}

// Función para crear el teclado virtual
function createKeyboard() {
    keyboardElement.innerHTML = "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    alphabet.forEach(letter => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleGuess(letter));
        keyboardElement.appendChild(button);
    });
}

// Función para manejar la adivinanza de una letra
function handleGuess(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!wordToGuess.includes(letter)) {
            remainingGuesses--;
            updateHangmanFigure();
        }
        updateWordDisplay();
        checkGameStatus();
    }
}

// Función para actualizar el dibujo del ahorcado
function updateHangmanFigure() {
    const bodyParts = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg"]; // Orden de aparición de las partes
    for (let i = 0; i < 6 - remainingGuesses; i++) {
        figureElement.querySelector(`.${bodyParts[i]}`).style.display = "block"; // Mostrar la parte correspondiente
    }
}

// Función para verificar el estado del juego
function checkGameStatus() {
    if (wordToGuess.split("").every(letter => guessedLetters.includes(letter))) {
        messageElement.textContent = "¡Felicidades! Ganaste!";
        disableKeyboard();
    } else if (remainingGuesses === 0) {
        messageElement.textContent = `¡Perdiste! La palabra era "${wordToGuess}"`;
        disableKeyboard();
        // Mostrar todas las partes del muñeco al perder (opcional)
        figureElement.querySelectorAll("div").forEach(part => part.style.display = "block");
    } else {
        guessesRemainingElement.textContent = `Intentos restantes: ${remainingGuesses}`;
    }
}

// Función para deshabilitar el teclado
function disableKeyboard() {
    keyboardElement.querySelectorAll("button").forEach(button => button.disabled = true);
}

// Iniciar el juego al cargar la página
startGame();
