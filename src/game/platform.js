import {MeshBuilder, StandardMaterial, PhysicsImpostor, Color3, Vector3} from 'babylonjs';


// Create a smaller platform that will jump vertically
const createLauncher = (scene, pos, platformDimensions) =>
{
    const width = platformDimensions.width/4;
    const height = platformDimensions.height/4;
    const depth = platformDimensions.depth/4;
    const launcher = MeshBuilder.CreateBox("launcher", {width, height, depth}, scene);
    const launchMat = new StandardMaterial("launchMat", scene);

    launcher.position = pos;
    launcher.position.y += height;
    launchMat.diffuseColor = new Color3(.7, 0, 0.1);
    launchMat.backFaceCulling = false;
    launcher.material = launchMat;
    launcher.receiveShadows = true;
    launcher.physicsImpostor = new PhysicsImpostor(launcher, PhysicsImpostor.BoxImpostor, { mass: 10000, friction: .1, restitution: 0.7 }, scene);
    return launcher;

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

    constructor(scene, pos, platformDimensions, hasLauncher=true)
    {
        // console.log("Initializing Platform in Platform");
        this.platform = createPlatform(scene, pos, platformDimensions);
        this.platformDimensions = platformDimensions;
        this.hasLauncher = hasLauncher;
        if  (hasLauncher)
        {
            this.launcher = createLauncher(scene, pos, platformDimensions);
            this.resetLauncher();
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
        return false;
    }
    intersectsLauncher(playerMesh)
    {
        return this.hasLauncher && playerMesh.intersectsMesh(this.launcher);
    }
}


export default Platform;




