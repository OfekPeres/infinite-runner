import {Scene, Color3, Vector3} from 'babylonjs';

const createScene = (engine) => {
    const scene = new Scene(engine);
    scene.enablePhysics();
    // const g = new Vector3(0, -20, 0);
    // scene.getPhysicsEngine().setGravity(g);
    scene.getPhysicsEngine().setTimeStep(1/20);
    scene.clearColor = new Color3(0, 0, 0.2);
    return scene;
};


export default createScene;
