import {MeshBuilder, StandardMaterial, PhysicsImpostor, Color3, Vector3, Texture, PBRMaterial} from 'babylonjs';
import {createRandomBox, createRotatingBox, createRotatingBox2} from '../scene/createBox.js';
import createTrampoline from '../scene/createTrampoline';
import basalt from "../assets/basalt.png"
// Create a smaller platform that will jump vertically
const createLauncher = (scene, pos, platformDimensions) =>
{
    const launcher = createTrampoline(scene);
    const height = platformDimensions.height;
    launcher.position = pos;
    launcher.position.y += height;

    return launcher;

};


const createPlatform = (scene, pos, platformDimensions) =>
{
    const platform = MeshBuilder.CreateBox("Platform", { width: platformDimensions.width, height: platformDimensions.height, depth: platformDimensions.depth}, scene);
    platform.position = pos;
    const platformMat = new StandardMaterial("platformMat", scene);
    // platformMat.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());
    platformMat.emissiveColor = new Color3(0.1, 0.6, 0.2);
    platformMat.backFaceCulling = false;
    platformMat.diffuseTexture = new Texture(basalt, scene);
    platform.material = platformMat;
    platform.receiveShadows = true;

    platform.physicsImpostor = new PhysicsImpostor(platform, PhysicsImpostor.BoxImpostor, { mass: 0, friction: .15, restitution: 0.7 }, scene);
    return platform;
};



const createFallingSphere = (scene, platformPos, platformDimensions) =>
{
    const sphere = MeshBuilder.CreateSphere("Sphere", {diameter: 5+ 5*Math.random()}, scene);

    const fallingAreaX = platformDimensions.width*2;
    const fallingAreaZ = platformDimensions.depth*2;
    const fallingAreaY = 200;
    const xShift = (Math.random()*2-1)* fallingAreaX;
    const zShift = (Math.random()*2-1)* fallingAreaZ;
    const yShift = 50 + Math.random()*fallingAreaY;

    const mass = Math.random()*500;
    const restitution = Math.random();
    sphere.position        = new Vector3(platformPos.x + xShift, platformPos.y + yShift, platformPos.z + zShift);
    sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, {mass, restitution}, scene);

    const pbr = new PBRMaterial("pbr", scene);
    pbr.metallic = 0.0;
    pbr.roughness = 0;
    pbr.subSurface.isRefractionEnabled = true;
    pbr.subSurface.indexOfRefraction = .2;
    pbr.alpha = .7;
    pbr.emissiveColor = new Color3(0, 0, Math.random());
    pbr.ambientColor = new Color3(0, 0, Math.random());
    sphere.material = pbr;
    return sphere;
};



class Platform
{

    constructor(scene, pos, platformDimensions, hasObstacles)
    {
        // Initialize Instance Variables
        this.platform = createPlatform(scene, pos, platformDimensions);
        this.platformDimensions = platformDimensions;
        this.hasLauncher = false;

        this.hasLargeRotater = false;
        this.hasSmallRotater = false;
        this.hasRainingObstacles = false;
        this.setObstacle(hasObstacles);
        if  (this.hasLauncher)
        {
            this.launcher = createLauncher(scene, pos, platformDimensions);
            this.resetLauncher();
        }
        if (this.hasSmallRotater)
        {
            this.smallRotater = createRotatingBox(scene, pos.x, pos.y + 10.5, pos.z);
        }

        if (this.hasLargeRotater)
        {
            this.largeRotater = createRotatingBox2(scene, pos.x, pos.y + 10.5, pos.z);
        }
        if (this.hasRainingObstacles)
        {
            const numSpheres = 10 + Math.random()*10;
            this.rain = [];
            for (let i = 0; i < numSpheres; i++)
            {
                const sphere = createFallingSphere(scene, pos, platformDimensions);
                this.rain.push(sphere);
            }
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
        if (r < 0.3) {
            this.hasLauncher = true;
        }
        else if (r < .4) {
            this.hasRainingObstacles = true;
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
        if (!this.hasSmallRotater)
        {
            return;
        }
        const pos = this.platform.position;
        this.smallRotater.position = new Vector3(pos.x, pos.y + 10.5, pos.z);
        this.smallRotater.physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));
        this.smallRotater.physicsImpostor.setAngularVelocity(new Vector3(0, Math.random()*50, 0));



    }

    resetLargeRotater()
    {
        if (!this.hasLargeRotater)
        {
            return;
        }
        const pos = this.platform.position;
        this.largeRotater.position = new Vector3(pos.x, pos.y + 10.5, pos.z);
        this.largeRotater.physicsImpostor.setAngularVelocity(new Vector3(0, Math.random()*10, 0));
        this.largeRotater.physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));
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

    updateRain(curZ)
    {
        if (!this.hasRainingObstacles)
        {
            return;
        }
        const lava = -50;
        for (const sphere of this.rain)
        {
            if (sphere.position.y > lava)
            {
                continue;
            }
            sphere.position.copyFrom(this.platform.position);
            const fallingAreaX = this.platformDimensions.width*2;
            const fallingAreaZ = this.platformDimensions.depth*2;
            const fallingAreaY = 200;
            const xShift = (Math.random()*2-1)* fallingAreaX;
            const zShift = (Math.random()*2-1)* fallingAreaZ;
            const yShift = 50 + Math.random()*fallingAreaY;

            sphere.position.x += xShift;
            sphere.position.y += yShift;
            sphere.position.z += zShift;
            sphere.physicsImpostor.setLinearVelocity(new Vector3(0, 0, 0));
            sphere.physicsImpostor.mass = 10 + curZ / 10;

        }
    }
    resetPlatform()
    {
        this.resetSmallRotater();
        this.resetLargeRotater();
        this.resetLauncher();

    }

}


export default Platform;




