import {Engine, Vector3} from 'babylonjs';

import createScene from './createScene';
import createLighting from './createLighting';
import createInfiniteTrack, { updateInfiniteTrack } from './createGround';
import createCamera from './createCamera';
import { createRandomBox} from './createBox';
import Player from './createPlayer';
import handleKeyboard from './handleKeyboard';
import handleResize from '../eventListeners/resize';
import Platform from './platform';

const game = {};

const main = () => {
    const canvas = document.getElementById('game-canvas');
    canvas.focus();
    const engine = new Engine(canvas, true);
    const scene = createScene(engine);
    createLighting(scene);
    const platforms = createInfiniteTrack(scene);
    game.platforms = platforms;
    const player = new Player(scene, game);
    // debugger;
    createCamera(scene, canvas, player);
    for (let i = 0; i < 3; i++) {
        createRandomBox(scene);
    }
    handleKeyboard(scene, player);
    handleResize(engine);


    engine.runRenderLoop(function() {
        updateInfiniteTrack(platforms, player.playerBox.position.z);
        for (let i = 0; i < 3; i ++){
            let lane = platforms[i]
        for (const platform of lane)
        {
            if (platform.hasLauncher && player.playerBox.intersectsMesh(platform.launcher))
            {
                platform.launcher.physicsImpostor.setLinearVelocity(new Vector3(0, 10, 0));
                platform.launcher.physicsImpostor.setAngularVelocity(new Vector3(0, 0, 0));
                if (platform.launcher.position.y > 10)
                {
                    platform.resetLauncher();
                }
            }

        }}
        scene.render();
    });

};

export default main;



