import {createGround} from './createGround';
import {MeshBuilder, StandardMaterial, PhysicsImpostor, Color3, Vector3} from 'babylonjs';


// Create a smaller platform that will jump vertically
const createLauncher = (scene) =>
{
    const launcher = MeshBuilder.CreateBox("launcher", {width: 15, height: 0.5, depth: 15}, scene);
    const launchMat = new StandardMaterial("launchMat", scene);
    launcher.position.y = -4.5;
    launchMat.diffuseColor = new Color3(.7, 0, 0.1);
    launchMat.backFaceCulling = false;
    launcher.material = launchMat;
    launcher.receiveShadows = true;
    launcher.physicsImpostor = new PhysicsImpostor(launcher, PhysicsImpostor.BoxImpostor, { mass: 10000, friction: .1, restitution: 0.7 }, scene);
    return launcher;

};

class Platform
{

    constructor(scene, z, x, hasLauncher=true)
    {
        this.platform = createGround(scene, z, x);
        this.hasLauncher = hasLauncher;
        if  (hasLauncher)
        {
            this.launcher = createLauncher(scene);
            this.launcher.position.x = this.platform.position.x;
            this.launcher.position.z = this.platform.position.z;
        }

    }

    resetLauncher()
    {
        if (this.hasLauncher)
        {
            this.launcher.position.y = -4.5;
            this.launcher.position.z = this.platform.position.z;
            this.launcher.position.x = this.platform.position.x;
            this.launcher.physicsImpostor.setAngularVelocity(new Vector3(0, 0, 0));

        }
    }
}


export default Platform;




