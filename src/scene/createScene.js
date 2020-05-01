import * as BABYLON from 'babylonjs';

const createScene = (engine) => {
    const scene = new BABYLON.Scene(engine);
    scene.enablePhysics();
    // const g = new BABYLON.Vector3(0, -20, 0);
    // scene.getPhysicsEngine().setGravity(g);
    scene.clearColor = new BABYLON.Color3.Blue();
    return scene;
};


export default createScene;
