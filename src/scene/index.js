import {Engine, Vector3, AssetsManager, StandardMaterial, MeshBuilder, Texture, Mesh} from 'babylonjs';


import createScene from './createScene';
import createLighting from './createLighting';
// import createInfiniteTrack, { updateInfiniteTrack } from './createGround';
import createCamera from './createCamera';
// import { createRandomBox, createRotatingBox, createRotatingBox2} from './createBox';
import Player from '../game/createPlayer';
import handleKeyboard from './handleKeyboard';
import handleResize from '../eventListeners/resize';
import Game from '../game/game';
// import Platform from '../game/platform';
// import Lane from '../game/lane';

import createTrampoline from "./createTrampoline";
// import TrampolineObj from '../assets/Trampoline.obj';

import lava from "../assets/lava2.jpeg";

const main = () => {
    window.resetGame = false;
    const canvas = document.getElementById('game-canvas');
    canvas.focus();
    const engine = new Engine(canvas, true);
    const scene = createScene(engine);

    // Load Assets (3D Models, etc)
    const assetsManager = new AssetsManager(scene);

    const meshTask = assetsManager.addMeshTask("trampoline", "", "", 'https://raw.githubusercontent.com/OfekPeres/infinite-runner/master/src/assets/Trampoline.obj');

    meshTask.onSuccess = function(task)
    {
        const trampoline = task.loadedMeshes[1];
        trampoline.isVisible = false;
        trampoline.position.y = -100;
        window.trampoline = trampoline;

    };

    assetsManager.useDefaultLoadingScreen = true;
    engine.loadingUIText = "Loading 3D Models! Game will be ready soon!";

    assetsManager.onFinish = () => {

        // Initialize player and game objects once all assets have been loaded
        createLighting(scene);
        const player = new Player(scene);
        createCamera(scene, canvas, player);
        const game = new Game(scene, player, 3);

        handleKeyboard(scene, game);
        handleResize(engine);









        engine.runRenderLoop(function()
        {
            if (!game.gameState.gameOver)
            {
                game.update();
            }
            if (window.resetGame)
            {
                game.reset();
                window.resetGame = false;
            }
            scene.render();
        });
    };
    assetsManager.load();

};

export default main;



