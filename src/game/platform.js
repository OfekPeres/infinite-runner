import {MeshBuilder, StandardMaterial, PhysicsImpostor, Color3, Vector3} from 'babylonjs';
import {createRandomBox, createRotatingBox, createRotatingBox2} from '../scene/createBox.js';
import createTrampoline from '../scene/createTrampoline';

// Create a smaller platform that will jump vertically
const createLauncher = (scene, pos, platformDimensions) =>
{
    const launcher = createTrampoline(scene);
    // const width = platformDimensions.width/4;
    const height = platformDimensions.height/4;
    // const depth = platformDimensions.depth/4;
    // const launcher = MeshBuilder.CreateBox("launcher", {width, height, depth}, scene);
    // const launchMat = new StandardMaterial("launchMat", scene);
    launcher.position = pos;
    launcher.position.y += height;
    // launchMat.diffuseColor = new Color3(.7, 0, 0.1);
    // launcher.material = launchMat;
    // launcher.receiveShadows = true;
    // launcher.physicsImpostor = new PhysicsImpostor(launcher, PhysicsImpostor.BoxImpostor, { mass: 10000, friction: .1, restitution: 0.7 }, scene);
    return launcher;

};



const createBreakableWall = (scene, pos, platformDimensions) =>
{
    const width = 30;
    const height = 30;
    // const depth = 5;
    const wall = [];
    for (let i = 0; i < height; i += 5)
    {
        const row = [];
        for (let j = 0; j < width; j += 5)
        {
            const block = createRandomBox(scene, -width/2 + j + pos.x, i + 3 + pos.y, pos.z);
            row.push(block);
        }
        wall.push(row);
    }
    return wall;
};


const createPlatform = (scene, pos, platformDimensions) =>
{
    const platform = MeshBuilder.CreateBox("Platform", { width: platformDimensions.width, height: platformDimensions.height, depth: platformDimensions.depth}, scene);
    platform.position = pos;
    const platformMat = new StandardMaterial("platformMat", scene);
    platformMat.diffuseColor = new Color3(0.5, 0.5, 0.5);
    // platformMat.emissiveColor = new Color3(0.2, 0.2, 0.2);
    platformMat.backFaceCulling = false;
    platform.material = platformMat;
    platform.receiveShadows = true;
    platform.physicsImpostor = new PhysicsImpostor(platform, PhysicsImpostor.BoxImpostor, { mass: 0, friction: .15, restitution: 0.7 }, scene);
    return platform;
};
class Platform
{

    constructor(scene, pos, platformDimensions, hasObstacles)
    {
        // Initialize Instance Variables
        this.platform = createPlatform(scene, pos, platformDimensions);
        this.platformDimensions = platformDimensions;
        this.hasLauncher = false;
        this.hasBreakableWall = false;
        this.hasLargeRotater = false;
        this.hasSmallRotater = false;
        this.setObstacle(hasObstacles);
        if  (this.hasLauncher)
        {
            this.launcher = createLauncher(scene, pos, platformDimensions);
            this.resetLauncher();
        }
        if (this.hasBreakableWall)
        {
            this.breakableWall = createBreakableWall(scene, pos, platformDimensions);
            this.resetBreakableWall(platformDimensions);
        }
        if (this.hasSmallRotater)
        {
            this.smallRotater = createRotatingBox(scene, pos.x, pos.y + 10.5, pos.z);
        }

        if (this.hasLargeRotater)
        {
            this.largeRotater = createRotatingBox2(scene, pos.x, pos.y + 10.5, pos.z);
        }


    }

    // Bring the launcher to the current platform position
    resetLauncher()
    {
        if (this.hasLauncher)
        {
            this.launcher.position.y = this.platform.position.y + this.platformDimensions.height/4;
            this.launcher.position.z = this.platform.position.z;
            this.launcher.position.x = this.platform.position.x;
            this.launcher.physicsImpostor.setAngularVelocity(new Vector3(0, 0, 0));
            this.launcher.physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));
            // Position launcher randomly on the platform - make sure that it won't hang over the edge

            const launcherWidth = this.platformDimensions.width/4;
            const randRangeX = this.platformDimensions.width - launcherWidth;
            const xRandShift = Math.random()*randRangeX - randRangeX/2;
            this.launcher.position.x += xRandShift;

            // Figure out why this depth is divided by 2 and not by 4
            const launcherDepth = this.platformDimensions.depth/2;
            const randRangeZ = this.platformDimensions.depth-launcherDepth;
            const zRandShift = Math.random()*randRangeZ - randRangeZ/2;
            this.launcher.position.z += zRandShift;
        }
    }

    setObstacle(hasObstacles)
    {
        if (!hasObstacles)
        {
            return;
        }
        const r = Math.random();
        if (r < 0.2) {
            this.hasLauncher = true;
        }
        else if (r < .4) {
            this.hasBreakableWall = true;
        }
        else if (r < .6) {
            this.hasLargeRotater = true;
        }
        else if (r < .8)
        {
            this.hasSmallRotater = true;
        }
    }

    resetSmallRotater()
    {
        const pos = this.platform.position;
        this.smallRotater.position = new Vector3(pos.x, pos.y + 10.5, pos.z);
        this.smallRotater.physicsImpostor.setAngularVelocity(new Vector3(0, 200, 0));



    }

    resetLargeRotater()
    {
        const pos = this.platform.position;
        this.largeRotater.position = new Vector3(pos.x, pos.y + 10.5, pos.z);
        this.largeRotater.physicsImpostor.setAngularVelocity(new Vector3(0, 1, 0));
        this.largeRotater.physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));
    }

    // resets the breakable wall to its old position
    resetBreakableWall(platformDimensions)
    {
        const pos = this.platform.position;
        //first move all away
        for (let i = 0; i < 6; i++)
        {
            for (let j = 0; j < 6; j++)
            {
                    this.breakableWall[i][j].alignWithNormal(new Vector3(0, 1, 0));
                    this.breakableWall[i][j].setAbsolutePosition(new Vector3(-300 + 5* j + pos.x, 5* i + 3 + pos.y, pos.z));
                    this.breakableWall[i][j].physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));
                    this.breakableWall[i][j].physicsImpostor.setAngularVelocity(new Vector3(0, 0, 0));
                    this.breakableWall[i][j].alignWithNormal(new Vector3(0, 1, 0));

            }
        }

    }
    // Check if the player mesh is in contact with any part of the platform
    intersectsPlatform(playerMesh)
    {
        if (playerMesh.intersectsMesh(this.platform))
        {
            return true;
        }
        if (this.hasLauncher && playerMesh.intersectsMesh(this.launcher))
        {
            return true;
        }
        if (this.hasSmallRotater && playerMesh.intersectsMesh(this.smallRotater))
        {
            return true;
        }

        if (this.hasLargeRotater && playerMesh.intersectsMesh(this.largeRotater))
        {
            return true;
        }
        return false;
    }
}


export default Platform;




