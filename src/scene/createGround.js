import {MeshBuilder, StandardMaterial, Color3, PhysicsImpostor} from 'babylonjs';
import Platform from './platform';

const width = 120;
const height = 1;
const depth = 50;


const createGround = (scene, z=0) => {

    const ground = MeshBuilder.CreateBox("Ground", {width, height, depth}, scene);
    ground.position.y = -5.0;
    ground.position.z = z;
    const groundMat = new StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new Color3(0.5, 0.5, 0.5);
    // groundMat.emissiveColor = new Color3(0.2, 0.2, 0.2);
    groundMat.backFaceCulling = false;
    ground.material = groundMat;
    ground.receiveShadows = true;
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, friction: .1, restitution: 0.7 }, scene);
    return ground;
};


const createInfiniteTrack = (scene) =>
{
    const platforms = [];

    platforms.push(new Platform(scene, 0, false));
    platforms.push(new Platform(scene, 150));
    platforms.push(new Platform(scene, 300));
    platforms.push(new Platform(scene, 450));
    platforms.push(new Platform(scene, 600));
    return platforms;
};


const updateInfiniteTrack = (platforms, curZ) =>
{
    const curPlatform = platforms[0];

    if (curPlatform.platform.position.z + depth < curZ)
    {

        curPlatform.platform.position.z = platforms[platforms.length-1].platform.position.z + (depth/2) + 3*depth*Math.random();
        curPlatform.resetLauncher();
        platforms.push(platforms.shift());
    }

};


export default createInfiniteTrack;
export {updateInfiniteTrack, createGround};
