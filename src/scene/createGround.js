import {MeshBuilder, StandardMaterial, Color3, PhysicsImpostor} from 'babylonjs';
import Platform from './platform';

const numTracks = 3
const width = 120 / numTracks;
const height = 1;
const depth = 50;


const createGround = (scene, z=0, x) => {

    const ground = MeshBuilder.CreateBox("Ground", {width, height, depth}, scene);
    ground.position.y = -5.0;
    ground.position.z = z;
    ground.position.x += width * x
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
    for (let i = 0; i < numTracks; i++ ){
    platforms.push(new Platform(scene, 0, i, false));
    platforms.push(new Platform(scene, 150, i));
    platforms.push(new Platform(scene, 300, i));
    platforms.push(new Platform(scene, 450, i));
    platforms.push(new Platform(scene, 600, i));
    }
    return platforms;
};


const updateInfiniteTrack = (platforms, curZ) =>
{
    for (let i = 0; i < numTracks; i++) {
        let curPlatform = platforms[i*5]
        let curLast  = platforms[i * 5 + 4]
    if (curPlatform.platform.position.z + depth < curZ)
    {

        curPlatform.platform.position.z = curLast.platform.position.z + (depth/2) + 3*depth*Math.random();
        curPlatform.resetLauncher();
        let temp = curPlatform
        platforms[i*5] = curLast
        platforms[i * 5 + 4] = temp
    }
}
};


export default createInfiniteTrack;
export {updateInfiniteTrack, createGround};
