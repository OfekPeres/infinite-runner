import {Vector3} from 'babylonjs';
import Platform from "./platform";


// Helper function to calculate starting X position for a platform
const calculatePlatformPos = (startPos, laneDimensions, firstPlatform = false, platformDimensions) =>
{
    // Take the starting x position (the center of the lane), and shift it by a number in the range [-1, 1]
    // scaled by half the lane width
    if (firstPlatform)
    {
        return startPos.clone();
    }
    const randRangeX = laneDimensions.width - platformDimensions.width;
    const xShift = Math.random()*randRangeX - randRangeX/2;
    const x = startPos.x + xShift;
    const y = startPos.y;
    const z = startPos.z;

    return new Vector3(x, y, z);
};

// Helper function to initially place all of the platforms in the lane
const initializePlatforms = (scene, numPlatforms, lanePos, laneDimensions, platformDimensions) =>
{
    const platforms = [];

    const startPos = lanePos.clone();
    for (let i = 0; i < numPlatforms; i++)
    {
        startPos.z = lanePos.z;
        if (i !== 0)
        {
            startPos.z = platforms[i-1].platform.position.z + platformDimensions.depth + Math.random()*3*platformDimensions.depth;

        }
        // Check if first element (i === 0) for determining hasLauncher and whether it should have any offset from the origin
        const pos = calculatePlatformPos(startPos, laneDimensions, i===0, platformDimensions);
        const hasObstacles = i !== 0;
        const curPlatform = new Platform(scene, pos, platformDimensions, hasObstacles);
        platforms.push(curPlatform);
    }
    return platforms;
};



// Class to contain all platforms in a lane of the game
class Lane
{
    constructor(scene, numPlatforms, lanePos, laneDimensions, platformDimensions)
    {
        // Initialize platforms
        this.lanePos = lanePos.clone();
        this.platformDimensions = platformDimensions;
        this.laneDimensions = laneDimensions;
        this.platforms = initializePlatforms(scene, numPlatforms, lanePos, laneDimensions, platformDimensions);
    }

    // When the game ends, reset the positions of all of the lanes
    resetLane()
    {
        this.platforms[0].platform.position = this.lanePos;
        this.platforms[0].resetPlatform();
        for (let i = 1; i < this.platforms.length; i++)
        {
            const prevPlatformPos = this.platforms[i-1].platform.position;
            const zShift = this.platformDimensions.depth *(1 + Math.random()*3);
            const yShift = 0;
            const randRangeX = this.laneDimensions.width - this.platformDimensions.width;
            const xShift = Math.random()*randRangeX - randRangeX/2;
            const newPos = prevPlatformPos.clone();

            newPos.x += xShift;
            newPos.y += yShift;
            newPos.z += zShift;
            this.platforms[i].platform.position = newPos;
            this.platforms[i].resetPlatform();
        }
    }

}



export default Lane;
