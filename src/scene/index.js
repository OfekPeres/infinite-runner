import {Engine} from 'babylonjs';

import createScene from './createScene';
import createLighting from './createLighting';
import createGround from './createGround';
import createCamera from './createCamera';
import { createRandomBox} from './createBox';
import Player from './createPlayer';
import handleKeyboard from './handleKeyboard';
import handleResize from '../eventListeners/resize';



const main = () => {
    const canvas = document.getElementById('game-canvas');
    canvas.focus();
    const engine = new Engine(canvas, true);
    const scene = createScene(engine);
    createLighting(scene);
    createGround(scene);
    const player = new Player(scene);
    createCamera(scene, canvas, player);
    for (let i = 0; i < 3; i++) {
        createRandomBox(scene);
    }
    handleKeyboard(scene, player);
    handleResize(engine);


    engine.runRenderLoop(function() {
        scene.render();
    });

};

export default main;



