import Lane from './lane';
import { Vector3, Color3 } from 'babylonjs';
import { createScoreBoard, updateScoreBoard } from '../modals/scoreboard';

// Define Relevant Game Constants
const numPlatforms = 4;
const platformDimensions = {width: 50, height: 1, depth: 50};
const laneDimensions     = {width: platformDimensions.width*3};


const SPEED = 15;
const MAX_SPEED = 2 * SPEED;
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
        this.milestone = 2000

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
        createScoreBoard();
    }

    // Make the game appear infinite
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

                // Randomize Y position - if player is past 2000
                if (this.player.playerBox.position.z > this.milestone)
                {
                    const laneY = lane.lanePos.y;
                    const randRangeY = 100;
                    const yRandShift = Math.random()*randRangeY - randRangeY/2;
                    curPlatform.platform.position.y = laneY + yRandShift;
                }

                curPlatform.resetLauncher();
                lane.platforms.push(lane.platforms.shift());

                if (curPlatform.hasBreakableWall)
                {
                    curPlatform.resetBreakableWall(platformDimensions);
                }
                if (curPlatform.hasSmallRotater)
                {
                    curPlatform.resetSmallRotater();
                }
                if (curPlatform.hasLargeRotater)
                {
                    curPlatform.resetLargeRotater();
                }
            }

        }
    }

    // Update everything before render
    update()
    {
        const onGround = this.checkOnGround();
        if (onGround)
        {
            this.gameState.numJumps = 0;
        }
        this.extendTrack();
        // Check if player is in contact with a launcher
        this.handleLaunchers();
        this.checkIfDied();
        // Check if in contact with the ground, if so, reset jump count
        this.dampPlayerRotation();


        updateScoreBoard(Math.round(this.player.playerBox.position.z));
        this.updateBackGround();
    }

    updateBackGround()
    {
        const curPos = this.player.playerBox.position;
        const r = Math.min(curPos.z /5000, .3);
        const g = Math.min(curPos.z/ 10000, .6);
        const b = Math.min(curPos.z/ 20000, 1);
        this.scene.clearColor = new Color3(r, g, b);
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
                    const impulse  = new Vector3(0, 100, 0);
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
        if (this.player.playerBox.position.y < -200 || Math.abs(this.player.playerBox.position.x) > 1000)
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

    dampPlayerRotation()
    {
        const curAngularVel = this.player.playerBox.physicsImpostor.getAngularVelocity();
        this.player.playerBox.physicsImpostor.setAngularVelocity(curAngularVel.scale(0.97));
    }

    handleKeyPress(keyMap)
    {
        // Calculate velocity
        const velocity = this.player.playerBox.physicsImpostor.getLinearVelocity().scale(1);
        // AWSD Controls
        velocity.addInPlace(directionMap.left.scale(keyMap.a * SPEED));
        velocity.addInPlace(directionMap.right.scale(keyMap.d * SPEED));
        velocity.addInPlace(directionMap.forward.scale(keyMap.w * SPEED));
        velocity.addInPlace(directionMap.back.scale(keyMap.s * SPEED));

        // Arrow Keys Controls
        velocity.addInPlace(directionMap.left.scale(keyMap.ArrowLeft * SPEED));
        velocity.addInPlace(directionMap.right.scale(keyMap.ArrowRight * SPEED));
        velocity.addInPlace(directionMap.forward.scale(keyMap.ArrowUp * SPEED));
        velocity.addInPlace(directionMap.back.scale(keyMap.ArrowDown * SPEED));
        // velocity.addInPlace(directionMap.up.scale(-2));
        // Update Player's Velocity

        velocity.x = Math.min(velocity.x, MAX_SPEED);
        velocity.y = Math.min(velocity.y, MAX_SPEED);
        velocity.z = Math.min(velocity.z, MAX_SPEED);
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
