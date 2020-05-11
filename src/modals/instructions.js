import './instructions.css';

// Add html elements to the game over modal
const createInstructionsModal = () =>
{
    const instructionsModalContainer = document.createElement('div');
    const instructionsModal = document.createElement('div');
    const closeButton = document.createElement('button');
    const instructionsModalMessage = document.createElement('div');
    const instructionsModalHeader = document.createElement('p');
    const readyToPlayButton = document.createElement('div');

    instructionsModalContainer.id = "instructions-modal-container";
    instructionsModal.id = "instructions-modal";
    closeButton.id = "instructions-modal-close-button";
    instructionsModalMessage.id = "instructions";
    readyToPlayButton.id = "ready-button";

    closeButton.classList.add("close");
    closeButton.innerHTML = "X";

    instructionsModalMessage.classList.add("message");
    readyToPlayButton.classList.add("play");
    readyToPlayButton.innerHTML = "Ready To Play";

    instructionsModal.appendChild(closeButton);
    instructionsModal.appendChild(instructionsModalHeader);
    instructionsModal.appendChild(instructionsModalMessage);
    instructionsModal.appendChild(readyToPlayButton);
    instructionsModalContainer.appendChild(instructionsModal);
    document.body.appendChild(instructionsModalContainer);

    closeButton.addEventListener('click', startGame);
    readyToPlayButton.addEventListener('click', startGame);




    instructionsModalHeader.id = "game-title";
    instructionsModalHeader.innerHTML = '<p>A Game of <span class="ice">ICE </span> and <span class="fire">FIRE</span></p>';

    instructionsModalMessage.innerHTML = "To play the game, use the Arrow Keys OR AWSD to move. Use the spacebar to jump! Earn more points by surviving longer! <br> Good Luck!"

    window.playerIsReady = false;
};

// Update the game over display with the correct score
const startGame = () =>
{
    const instructionsModal = document.getElementById('instructions-modal-container');
    const canvas = document.querySelector('#game-canvas');
    canvas.focus();
    instructionsModal.style.display = 'none';
    window.playerIsReady = true;
};


// Function that is called on click on the game over modal to reset the game. It alerts the game object to
// reset by toggling the global resetGame boolean flag
const resetGame = () =>
{
    const instructionsModal = document.getElementById('game-over-modal-container');
    const canvas = document.querySelector('#game-canvas');
    canvas.focus();
    instructionsModal.style.display = 'none';
    window.resetGame = true;
};

export {createInstructionsModal};
