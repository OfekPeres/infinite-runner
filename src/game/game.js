import Lane from './lane';
import { Vector3 } from 'babylonjs';


// Define Relevant Game Constants
const numPlatforms = 4;
const platformDimensions = {width: 50, height: 1, depth: 50};
const laneDimensions     = {width: platformDimensions.width*3};


const SPEED = 15;
const left    = new Vector3(-1, 0, 0);
const right   = new Vector3(1, 0, 0);
const forward = new Vector3(0, 0, 1);
const back    = new Vector3(0, 0, -1);
const up      = new Vector3(0, 1, 0);

const directionMap = {left, right, forward, back, up};


// Define Initial Game State
const initialGameState = {numJumps: 0};

class Game
{
    constructor(scene, player, numLanes=3)
    {
        this.player = player;
        this.scene = scene;
        this.gameState = initialGameState;

        // Initialize Lanes
        this.lanes = [];
        const lanePos = new Vector3(0, -5, 0);
        for (let i = 0; i < numLanes; i++)
        {
            // Shift each lane over by the width of a lane
            const curLanePos = lanePos.clone();
            curLanePos.x+= i*laneDimensions.width;
            const curLane = new Lane(scene, numPlatforms, curLanePos, laneDimensions, platformDimensions);
            this.lanes.push(curLane);
        }
        this.extendTrack();

    }

    // Make the game appear infinite
    // MAKE SURE TO ADD A SHIFT IN THE X POSITION AS WELL AS THE Z POSTION. ***************************************
    extendTrack()
    {
        const depth = platformDimensions.depth;
        const laneWidth = laneDimensions.width;
        for (const lane of this.lanes)
        {
            const curPlatform = lane.platforms[0];
            const laneX = lane.lanePos.x;
            if (curPlatform.platform.position.z + depth < this.player.playerBox.position.z)
            {
                // Randomize Z position - place the new platform at the front of the lane + some random bonus
                curPlatform.platform.position.z = lane.platforms[lane.platforms.length-1].platform.position.z + (depth) + 3*depth*Math.random();

                // Randomize X position - place the new platform randomly within the lane

                const randRangeX = laneWidth - platformDimensions.width;
                const xRandShift = Math.random()*randRangeX - randRangeX/2;
                curPlatform.platform.position.x = laneX + xRandShift;
                // Randomize Y position

                curPlatform.resetLauncher();
                lane.platforms.push(lane.platforms.shift());



            }

        }
    }

    // Update everything before render
    update()
    {
        this.extendTrack();
        this.checkIfDied();
        // Check if in contact with the ground, if so, reset jump count
        const onGround = this.checkOnGround();
        if (onGround)
        {
            this.gameState.numJumps = 0;
        }

        // Check if player is in contact with a launcher
        this.handleLaunchers();

        // Update Player's Velocity to move forward
        // debugger
        // const curVel = this.player.playerBox.physicsImpostor.getLinearVelocity();
        // const vel = new Vector3(0, 0, SPEED*2);
        // vel.x += curVel.x;
        // vel.y += curVel.y;
        // this.player.playerBox.physicsImpostor.setLinearVelocity(vel);

    }

    handleLaunchers()
    {
        for (const lane of this.lanes)
        {
            for (let i = 0; i < 3; i++)
            {
                const curPlatform = lane.platforms[i];
                if (curPlatform.hasLauncher && this.player.playerBox.intersectsMesh(curPlatform.launcher))
                {
                    const impulse  = new Vector3(0, 300, 0);
                    this.player.playerBox.physicsImpostor.applyImpulse(impulse, this.player.playerBox.getAbsolutePosition());
                }
            }

        }
    }
    checkOnGround()
    {
        for (const lane of this.lanes)
        {
            // Only check first 3 platforms of each lane because it is highly unlikely that the player will be allowed to jump farther than that
            for (let i = 0; i < 3; i++)
            {
                const curPlatform = lane.platforms[i];
                if (curPlatform.intersectsPlatform(this.player.playerBox))
                {
                    return true;
                }
            }
        }
        return false;
    }
    checkIfDied()
    {
        if (this.player.playerBox.position.y < -40)
        {
            this.player.resetPlayer(this.lanes[1].platforms[0]);
        }
    }

    // Returns a 0 if not allowed to jump and a 1 if allowed to jump
    handleJump()
    {
        // // If have already jumped 2 times, cannot jump again
        if (this.gameState.numJumps >= 1)
        {
            return 0;
        }
        // // At this point, player is allowed to jump
       this.gameState.numJumps++;
       return 1;


    }
    handleKeyPress(keyMap)
    {
        // Calculate velocity
        const velocity = this.player.playerBox.physicsImpostor.getLinearVelocity().scale(.7);
        velocity.addInPlace(directionMap.left.scale(keyMap.a * SPEED));
        velocity.addInPlace(directionMap.right.scale(keyMap.d * SPEED));
        velocity.addInPlace(directionMap.forward.scale(keyMap.w * SPEED));
        velocity.addInPlace(directionMap.back.scale(keyMap.s * SPEED));
        // velocity.addInPlace(directionMap.up.scale(-2));
        // Update Player's Velocity
        this.player.playerBox.physicsImpostor.setLinearVelocity(velocity);

        // Handle Jump
        // First check that spacebar was pressed, if so, figure out if can jump
        if  (keyMap[' '] === 1)
        {
            // canJump is either a 0 or 1 denoting ability to jump
            const canJump = this.handleJump();
            if (canJump === 1)
            {
                // console.log("Applying impulse");
                const playerPos = this.player.playerBox.getAbsolutePosition();
                const impulse  = directionMap.up.scale(200);
                this.player.playerBox.physicsImpostor.applyImpulse(impulse, playerPos);

            }

        }

    }

}




export default Game;
