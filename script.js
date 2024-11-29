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
function createFireworkBurst(container, xCenter, yCenter) {
    const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#900C3F', '#581845'];

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework');
        container.appendChild(particle);

        // Randomize particle direction and position
        const angle = Math.random() * 2 * Math.PI; // Random angle in radians
        const distance = Math.random(); // Distance multiplier (0-1)
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.setProperty('--x', x);
        particle.style.setProperty('--y', y);

        // Set position relative to the heart center
        particle.style.left = `${xCenter}px`;
        particle.style.top = `${yCenter}px`;

        // Randomize color
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1500); // Matches animation duration
    }
}

function startContinuousFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');

    setInterval(() => {
        const xCenter = fireworksContainer.offsetWidth / 2;
        const yCenter = fireworksContainer.offsetHeight / 2;
        createFireworkBurst(fireworksContainer, xCenter, yCenter);
    }, 2000); // Create a new burst every 2 seconds
}

// Start fireworks on page load or when the end screen is shown
startContinuousFireworks();


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
