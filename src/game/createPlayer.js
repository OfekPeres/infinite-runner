import {Vector3} from 'babylonjs';
import {createPlayerBox} from '../scene/createBox.js';

class Player
{
    constructor(scene)
    {
        this.playerBox = createPlayerBox(scene);
        // console.log(this.playerBox);
    }

    resetPlayer(curPlatform)
    {

        this.playerBox.physicsImpostor.setAngularVelocity(new Vector3(0, 0, 0));
        this.playerBox.physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));
        this.playerBox.position = curPlatform.platform.position.clone();
        this.playerBox.position.y = curPlatform.platform.position.y + 40;

    }

}



export default Player;


