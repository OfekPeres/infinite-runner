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

        // this.playerBox.position.y = 20;
        this.playerBox.physicsImpostor.setAngularVelocity(new Vector3(0, 0, 0));
        this.playerBox.physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));
        // console.log(curPlatform.platform.position);

        this.jumps = 0;
        this.playerBox.position = curPlatform.platform.position.clone();
        this.playerBox.position.y = 40;
        // console.log(this.playerBox.position);

    }

}



export default Player;


