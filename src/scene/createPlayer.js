import {Vector3} from 'babylonjs';
import {createPlayerBox} from './createBox.js';



const SPEED = 20;
const left    = new Vector3(-1, 0, 0);
const right   = new Vector3(1, 0, 0);
const forward = new Vector3(0, 0, 1);
const back    = new Vector3(0, 0, -1);
const up      = new Vector3(0, 1, 0);

const directionMap = {left, right, forward, back, up};

class Player
{
    constructor(scene, game)
    {
        this.playerBox = createPlayerBox(scene);
        // console.log(this.playerBox);
        this.game = game;
    }

    resetPlayer()
    {

        // this.playerBox.position.y = 20;
        this.playerBox.physicsImpostor.setAngularVelocity(new Vector3(0, 0, 0));
        this.playerBox.physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));
        const curPlatform = this.game.platforms[1][2];
        // console.log(curPlatform.platform.position);
        this.playerBox.physicsImpostor.position = curPlatform.platform.position;
        this.playerBox.position.y+=20;
        // console.log(this.playerBox.position);

    }

    handleKeyPress(keyMap)
    {
        // console.log(keyMap);
        // Calculate velocity
        const velocity = this.playerBox.physicsImpostor.getLinearVelocity().scale(.7);
        velocity.addInPlace(directionMap.left.scale(keyMap.a * SPEED));
        velocity.addInPlace(directionMap.right.scale(keyMap.d * SPEED));
        velocity.addInPlace(directionMap.forward.scale(keyMap.w * SPEED));
        velocity.addInPlace(directionMap.back.scale(keyMap.s * SPEED));
        velocity.addInPlace(directionMap.up.scale(-2));
        this.playerBox.physicsImpostor.setLinearVelocity(velocity);

        const playerPos = this.playerBox.getAbsolutePosition();
        // Only allow the player to jump if the player is currently on the ground.
        let onGround = 0;
        for (let i = 0; i < 3; i++)
        {
            const lane = this.game.platforms[i];
            for (const platform of lane)
            {
            if (this.playerBox.intersectsMesh(platform.platform)) {
                onGround = 1;
                break;
            }
        }
    }
        const impulse  = directionMap.up.scale(200 * keyMap[' '] * onGround);
        this.playerBox.physicsImpostor.applyImpulse(impulse, playerPos);
    }
}



export default Player;


