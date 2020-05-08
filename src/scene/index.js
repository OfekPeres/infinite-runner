import {Engine, Vector3, AssetsManager} from 'babylonjs';


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

const main = () => {
    const canvas = document.getElementById('game-canvas');
    canvas.focus();
    const engine = new Engine(canvas, true);
    const scene = createScene(engine);
    createLighting(scene);
    // const platforms = createInfiniteTrack(scene);
    const player = new Player(scene);
    createCamera(scene, canvas, player);
    // const testPlatform = new Platform(scene, new Vector3(0, -5, 0), {width: 100, height: 1, depth: 100});
    // const testLane = new Lane(scene, 4, new Vector3(0, -5, 0), {width: 40, height: 1, depth: 50});
    const game = new Game(scene, player, 3);
    // for (let i = 0; i < 3; i++)
    // {
    //     createRandomBox(scene);
    // }
    // createRotatingBox2(scene);
    handleKeyboard(scene, game);
    handleResize(engine);

    createTrampoline(scene);

    createTrampoline(scene);

    createTrampoline(scene);

    createTrampoline(scene);

    createTrampoline(scene);

    createTrampoline(scene);

    engine.runRenderLoop(function() {
        // updateInfiniteTrack(platforms, player.playerBox.position.z);
        // for (let i = 0; i < 3; i ++) {
        //     const lane = platforms[i];
        //     for (const platform of lane)
        //     {
        //         if (player.playerBox.intersectsMesh(platform.platform)){
        //             player.jumps = 0
        //         }
        //         if (platform.hasLauncher && player.playerBox.intersectsMesh(platform.launcher)){
        //         player.jumps = 0
        //         const impulse  = new Vector3(0, 300, 0);

        //         player.playerBox.physicsImpostor.applyImpulse(impulse, player.playerBox.getAbsolutePosition());
        //         // platform.launcher.physicsImpostor.setLinearVelocity(new Vector3(0, 10, 0));
        //         // platform.launcher.physicsImpostor.setAngularVelocity(new Vector3(0, 0, 0));
        //         // if (platform.launcher.position.y > 10)
        //         // {
        //         //     platform.resetLauncher();
        //         // }
        //     }

        // }
    // }
    // if (player.playerBox.position.y < -40)
    // {
    //     console.log("Reset Player");
    //     player.resetPlayer();
    //     // player.playerBox.position.y = 20;
    // }
        game.update();
        scene.render();
    });

    // Load Assets (3D Models, etc)
    const assetsManager = new AssetsManager(scene);

    const meshTask = assetsManager.addMeshTask("trampoline", "", "/src/assets/", "Trampoline.obj");

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

        engine.runRenderLoop(function() {

            game.update();
            scene.render();
        });
    };
    assetsManager.load();

};

export default main;



