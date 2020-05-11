import './gameover.css';

// Add html elements to the game over modal
const createGameOverModal = () =>
{
    const gameOverModalContainer = document.createElement('div');
    const gameOverModal = document.createElement('div');
    const closeButton = document.createElement('button');
    const gameOverMessage = document.createElement('div');
    const gameOverResetButton = document.createElement('div');

    gameOverModalContainer.id = "game-over-modal-container";
    gameOverModal.id = "game-over-modal";
    closeButton.id = "game-over-close-button";
    gameOverMessage.id = "game-over-message";
    gameOverResetButton.id = "game-over-reset-button";

    closeButton.classList.add("close");
    closeButton.innerHTML = "X";

    gameOverMessage.classList.add("game-over-message");
    gameOverResetButton.classList.add("reset");
    gameOverResetButton.innerHTML = "Reset Game";

    gameOverModal.appendChild(closeButton);
    gameOverModal.appendChild(gameOverMessage);
    gameOverModal.appendChild(gameOverResetButton);
    gameOverModalContainer.appendChild(gameOverModal);
    document.body.appendChild(gameOverModalContainer);


    closeButton.addEventListener('click', resetGame);
    gameOverResetButton.addEventListener('click', resetGame);

};

// Update the game over display with the correct score
const updateGameOverModal = (score) =>
{
    const scoreMessageDiv = document.getElementById('game-over-message');
    scoreMessageDiv.innerHTML = "Game Over! Your final score was: " + score;

    const gameOverModalContainer = document.getElementById('game-over-modal-container');
    gameOverModalContainer.style.display = 'flex';
};


// Function that is called on click on the game over modal to reset the game. It alerts the game object to
// reset by toggling the global resetGame boolean flag
const resetGame = () =>
{
    const gameOverModal = document.getElementById('game-over-modal-container');
    const canvas = document.querySelector('#game-canvas');
    canvas.focus();
    gameOverModal.style.display = 'none';
    window.resetGame = true;
};

export {createGameOverModal, updateGameOverModal};
