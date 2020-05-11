import {Engine, AssetsManager} from 'babylonjs';
import createScene from './createScene';
import createLighting from './createLighting';
import createCamera from './createCamera';
import Player from '../game/createPlayer';
import handleKeyboard from './handleKeyboard';
import handleResize from '../eventListeners/resize';
import Game from '../game/game';


const main = () => {
    // Initialize Babylon Assets and Game Global Variables
    window.resetGame = false;
    const canvas = document.getElementById('game-canvas');
    // Click onto the canvas so you can immediately use the keyboard to play.
    canvas.focus();
    const engine = new Engine(canvas, true);
    const scene = createScene(engine);

    // Load Assets (3D Models, etc)
    const assetsManager = new AssetsManager(scene);

    const meshTask = assetsManager.addMeshTask("trampoline", "", "", 'https://raw.githubusercontent.com/OfekPeres/infinite-runner/master/src/assets/Trampoline.obj');

    // Once mesh is loaded, add a global reference to it for cloning.
    meshTask.onSuccess = function(task)
    {
        const trampoline = task.loadedMeshes[1];
        trampoline.isVisible = false;
        trampoline.position.y = -100;
        window.trampoline = trampoline;

    };

    // Set up the loading screen
    assetsManager.useDefaultLoadingScreen = true;
    engine.loadingUIText = "Loading 3D Models! Game will be ready soon!";

    // After Assets are done loading, initialize the game
    assetsManager.onFinish = () => {

        createLighting(scene);
        const player = new Player(scene);
        createCamera(scene, canvas, player);
        const game = new Game(scene, player, 4);

        // Add keyboard and resize listeners
        handleKeyboard(scene, game);
        handleResize(engine);

        // Render Loop
        engine.runRenderLoop(function()
        {
            // Update Game one timestep as long as the game is till going on
            if (!game.gameState.gameOver)
            {
                game.update();
            }
            // If game is over, check that the user has clicked out of the game over modal.
            if (window.resetGame)
            {
                game.reset();
                window.resetGame = false;
            }
            scene.render();
        });
    };
    // Actually call the load function to begin downloading/setting up the meshes.
    assetsManager.load();

};

export default main;
