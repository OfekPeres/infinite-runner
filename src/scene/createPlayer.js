import * as BABYLON from 'babylonjs';
import {createPlayerBox} from './createBox.js';



const SPEED = 5;
const left    = new BABYLON.Vector3(-1, 0, 0);
const right   = new BABYLON.Vector3(1, 0, 0);
const forward = new BABYLON.Vector3(0, 0, 1);
const back    = new BABYLON.Vector3(0, 0, -1);
const up      = new BABYLON.Vector3(0, 1, 0);

const directionMap = {left, right, forward, back, up};

class Player
{
    constructor(scene)
    {
        this.playerBox = createPlayerBox(scene);
        // console.log(this.playerBox);
    }


    handleKeyPress(keyMap)
    {
        // console.log(keyMap);
        // Calculate velocity
        const velocity = this.playerBox.physicsImpostor.getLinearVelocity();
        velocity.addInPlace(directionMap.left.scale(keyMap.a * SPEED));
        velocity.addInPlace(directionMap.right.scale(keyMap.d * SPEED));
        velocity.addInPlace(directionMap.forward.scale(keyMap.w * SPEED));
        velocity.addInPlace(directionMap.back.scale(keyMap.s * SPEED));
        this.playerBox.physicsImpostor.setLinearVelocity(velocity);

        const playerPos = this.playerBox.getAbsolutePosition();
        const impulse  = directionMap.up.scale(200 * keyMap[' ']);
        console.log(playerPos);
        console.log(impulse);
        this.playerBox.physicsImpostor.applyImpulse(impulse, playerPos);
    }
}



export default Player;


