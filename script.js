const wordToGuess = "hasti"; // Het geheime woord
let attempts = 0;
let currentGuess = "";

// Selecteer elementen
const grid = document.getElementById('grid');
const keyboard = document.getElementById('keyboard');
const endScreen = document.getElementById('end-screen');

// Maak een lege grid
function createGrid() {
    for (let i = 0; i < 30; i++) { // 6 rijen van 5
        const cell = document.createElement('div');
        grid.appendChild(cell);
    }
}

// Genereer toetsenbord
function createKeyboard() {
    const keys = [
        ..."qwertyuiop",
        ..."asdfghjkl",
        "enter", ..."zxcvbnm", "delete"
    ];

    keys.forEach((key) => {
        const button = document.createElement('button');
        button.textContent = key === "enter" ? "Enter" : key === "delete" ? "⌫" : key;
        button.classList.add('key');
        if (key === "enter") button.classList.add('enter');
        if (key === "delete") button.classList.add('delete');
        keyboard.appendChild(button);

        button.addEventListener('click', () => handleKeyPress(key));
    });
}

// Verwerk toetsinvoer
function handleKeyPress(key) {
    if (key === "enter") {
        submitGuess();
    } else if (key === "delete") {
        currentGuess = currentGuess.slice(0, -1);
        updateGrid();
    } else if (currentGuess.length < 5) {
        currentGuess += key;
        updateGrid();
    }
}

// Update het grid
function updateGrid() {
    const currentRow = Math.floor(attempts / 5) * 5;
    for (let i = 0; i < 5; i++) {
        const cell = grid.children[currentRow + i];
        cell.textContent = currentGuess[i] || "";
    }
}

// Controleer de invoer
function submitGuess() {
    if (currentGuess.length !== 5) return alert("Voer een woord in van 5 letters!");

    const currentRow = Math.floor(attempts / 5) * 5;
    for (let i = 0; i < 5; i++) {
        const cell = grid.children[currentRow + i];
        if (currentGuess[i] === wordToGuess[i]) {
            cell.style.backgroundColor = "green";
        } else if (wordToGuess.includes(currentGuess[i])) {
            cell.style.backgroundColor = "yellow";
        } else {
            cell.style.backgroundColor = "gray";
        }
    }

    attempts += 5;

    if (currentGuess === wordToGuess) {
        showEndScreen();
    } else if (attempts >= 30) {
        alert("Helaas, je hebt verloren!");
    }

    currentGuess = "";
}
function openLetter() {
    const envelope = document.querySelector('.envelope');
    const messages = document.querySelectorAll('.message');

    // Open the envelope
    envelope.classList.add('opened');

    // Reveal messages
    setTimeout(() => {
        messages.forEach(message => {
            message.classList.remove('hidden');
        });
    }, 500); // Delay to sync with animation
}



// Toon het eindscherm
function showEndScreen() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'none'; // Verberg de game-container
    endScreen.classList.remove('hidden'); // Maak het eindscherm zichtbaar
}


// Initialisatie
createGrid();
createKeyboard();
if (currentGuess === wordToGuess) {
    showEndScreen();
}
