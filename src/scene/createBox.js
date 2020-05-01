import * as BABYLON from 'babylonjs';

const createRandomBox = function(scene)
{
        // Create Random Constants for Box Dimensions
        const scale = 15;
        const height = Math.random()*scale;
        const width  = Math.random()*scale;
        const depth  = Math.random()*scale;

        // Create Random Position for Box
        const x = Math.random()*100-50;
        const y = Math.random()*50;
        const z = Math.random()*100-50;

        // Create Random Physical Properties for Box
        const friction    = Math.random()*10;
        const mass        = height*width*depth/scale;
        const restitution = Math.random()*.7;

        // Create Box
        const box = BABYLON.MeshBuilder.CreateBox("Box", {height, width, depth}, scene);
        box.position = new BABYLON.Vector3(x, y, z);
        const randomMaterial = new BABYLON.StandardMaterial("randomMaterial", scene);
        randomMaterial.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        // randomMaterial.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        box.material = randomMaterial;
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);

        return box;
};


const createPlayerBox = (scene) =>
{
    const box = BABYLON.MeshBuilder.CreateBox("PlayerBox", { height: 10, width: 10, depth: 10 });
    const mass = 10;
    const friction = .05;
    const restitution = .1;
    box.position = new BABYLON.Vector3();
    const material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = new BABYLON.Color3(.6, .3, .9);
    // material.emissiveColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
    box.material = material;
    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);

    return box;
};


export {createRandomBox, createPlayerBox};
