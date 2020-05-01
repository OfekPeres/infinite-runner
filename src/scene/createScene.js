import {Scene, Color3} from 'babylonjs';

const createScene = (engine) => {
    const scene = new Scene(engine);
    scene.enablePhysics();
    // const g = new Vector3(0, -20, 0);
    // scene.getPhysicsEngine().setGravity(g);
    scene.clearColor = new Color3.Blue();
    return scene;
};


export default createScene;
