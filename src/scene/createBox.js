import {MeshBuilder, Vector3, PhysicsImpostor, Color3, StandardMaterial} from 'babylonjs';

const createRandomBox = function(scene, x, y, z)
{
        const scale = 15;
        const height = 5
        const width = 5 
        const depth = 5

        // Create Random Physical Properties for Box
        const friction    = Math.random()*10;
        const mass        = 5;
        const restitution = Math.random()*.7;

        // Create Box
        const box = MeshBuilder.CreateBox("Box", {height, width, depth}, scene);
        box.position = new Vector3(x, y, z);
        const randomMaterial = new StandardMaterial("randomMaterial", scene);
        randomMaterial.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());
        box.material = randomMaterial;
        box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);

        return box;
};


const createRotatingBox = (scene, x, y, z) =>
{
    const box = MeshBuilder.CreateBox("Wall", {height: 20, width: 10, depth: 20});
    const mass = 1000;

    const friction = .05;
    const restitution = .1;
    box.setAbsolutePosition(new Vector3(x, y, z));
    const material = new StandardMaterial("material", scene);
    material.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());
    box.material = material;
    box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);
    box.physicsImpostor.setAngularVelocity(new Vector3(0, 200, 0));
    return box;
};

const createRotatingBox2 = (scene, x, y, z) =>
{
    const box = MeshBuilder.CreateBox("Wall", {height: 20, width: 50, depth: 20});
    const mass = 1000;

    const friction = 0;
    const restitution = .1;
    box.setAbsolutePosition(new Vector3(x, y, z));
    // debugger;
    const material = new StandardMaterial("material", scene);
    material.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());
    box.material = material;
    box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);
    box.physicsImpostor.setAngularVelocity(new Vector3(0, 1, 0));
    // debugger
    return box;
};


const createPlayerBox = (scene) =>
{
    const box = MeshBuilder.CreateBox("PlayerBox", { height: 10, width: 10, depth: 10 });
    const mass = 10;
    const friction = .05;
    const restitution = .1;
    box.position = new Vector3();
    const material = new StandardMaterial("material", scene);
    material.diffuseColor = new Color3(.6, .3, .9);
    // material.emissiveColor = new Color3(Math.random(), Math.random(), Math.random());
    box.material = material;
    box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);

    return box;
};


export {createRandomBox, createPlayerBox, createRotatingBox, createRotatingBox2};
