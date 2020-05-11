import {Scene, Color3} from 'babylonjs';

// Initialize and Scene and activate physics
const createScene = (engine) => {
    const scene = new Scene(engine);
    scene.enablePhysics();
    scene.getPhysicsEngine().setTimeStep(1/20);
    scene.clearColor = new Color3(0, 0, 0.2);
    return scene;
};


export default createScene;
