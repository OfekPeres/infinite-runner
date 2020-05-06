import {Vector3} from 'babylonjs';
import Platform from "./platform";


// Helper function to calculate starting X position for a platform
const calculatePlatformPos = (startPos, laneDimensions, firstPlatform = false) =>
{
    // Take the starting x position (the center of the lane), and shift it by a number in the range [-1, 1]
    // scaled by half the lane width
    if (firstPlatform)
    {
        return startPos.clone();
    }
    const x = startPos.x + (Math.random()*2-1)*laneDimensions.width/2;
    const y = startPos.y;
    const z = startPos.z;

    return new Vector3(x, y, z);
};

const initializePlatforms = (scene, numPlatforms, lanePos, laneDimensions, platformDimensions) =>
{
    // console.log("Initializing Platforms in Lane");
    const platforms = [];
    const startPos = lanePos.clone();
    for (let i = 0; i < numPlatforms; i++)
    {
        startPos.z = lanePos.z + i*platformDimensions.depth;
        if (i !== 0)
        {
            startPos.z += Math.random()*platformDimensions.depth;
        }
        // Check if first element (i === 0) for determining hasLauncher and whether it should have any offset from the origin
        const pos = calculatePlatformPos(startPos, laneDimensions, i===0);
        const curPlatform = new Platform(scene, pos, platformDimensions, i!==0);
        platforms.push(curPlatform);
    }
    return platforms;
};
class Lane
{
    constructor(scene, numPlatforms, lanePos, laneDimensions, platformDimensions)
    {
        // Initialize platforms
        this.platforms = initializePlatforms(scene, numPlatforms, lanePos, laneDimensions, platformDimensions);
        this.platformDimensions = platformDimensions;
    }

    extendTrack()
    {
        const curPlatform = this.platforms[0];
        if (curPlatform.platform.position.z + this.platformDimensions.depth < curZ)
        {
            curPlatform.platform.position.z = lane[lane.length-1].platform.position.z + (depth/2) + 3*depth*Math.random();
            curPlatform.platform.position.x = lane[lane.length-1].platform.position.x + (width/2) + 3*width*Math.random();
            curPlatform.resetLauncher();
            lane.push(lane.shift());

        }
    }
}



export default Lane;
