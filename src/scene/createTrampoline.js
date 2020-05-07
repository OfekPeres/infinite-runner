import 'babylonjs-loaders';
import {SceneLoader, StandardMaterial, Vector3, Color3, PhysicsImpostor} from 'babylonjs';



const sleep = (milliseconds) =>
{
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    }   while (currentDate - date < milliseconds);
};


const createTrampoline = (scene) => {
    let mesh;
    SceneLoader.ImportMesh("", "src/assets/", "Trampoline.obj", scene, (meshes) =>
    {
            mesh = meshes[1];
            // console.log(meshes)
            const mass = 10000;
            const friction = 1;
            const restitution = 1;

            const material = new StandardMaterial("material", scene);
            material.diffuseColor = new Color3(1, Math.random(), Math.random());
            mesh.material = material;
            mesh.physicsImpostor = new PhysicsImpostor(mesh, PhysicsImpostor.CylinderImpostor, { mass, friction, restitution }, scene);
    });
    console.log(mesh);
    return mesh;
};


export default createTrampoline;
