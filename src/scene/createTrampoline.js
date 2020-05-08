import 'babylonjs-loaders';
import {StandardMaterial, Vector3, Color3, PhysicsImpostor} from 'babylonjs';




const createTrampoline = (scene) => {
    // Initialize a trampoline as a clone of the original
    const trampoline = window.trampoline.clone();
    trampoline.isVisible = true;
    const mass = 0;
    const friction = 1;
    const restitution = 0;

    trampoline.scaling = new Vector3(2, 2, 2);
    const material = new StandardMaterial("material", scene);
    material.diffuseColor = new Color3(1, Math.random(), Math.random());
    trampoline.material = material;
    // trampoline.physicsImpostor = new PhysicsImpostor(trampoline, PhysicsImpostor.CylinderImpostor, { mass, friction, restitution }, scene);
    return trampoline;
};


export default createTrampoline;
