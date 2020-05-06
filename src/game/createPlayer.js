import {Vector3} from 'babylonjs';
import {createPlayerBox} from '../scene/createBox.js';

class Player
{
    constructor(scene)
    {
        this.playerBox = createPlayerBox(scene);
        // console.log(this.playerBox);
        this.jumps = 0;
    }

    resetPlayer(curPlatform)
    {

        this.playerBox.physicsImpostor.setAngularVelocity(new Vector3(0, 0, 0));
        this.playerBox.physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));

        this.jumps = 0;
        this.playerBox.position = curPlatform.platform.position.clone();
        this.playerBox.position.y = 40;

    }

}



export default Player;


