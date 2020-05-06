import {MeshBuilder, Vector3, PhysicsImpostor, Color3, StandardMaterial} from 'babylonjs';

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
        const box = MeshBuilder.CreateBox("Box", {height, width, depth}, scene);
        box.position = new Vector3(x, y, z);
        const randomMaterial = new StandardMaterial("randomMaterial", scene);
        randomMaterial.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());
        // randomMaterial.emissiveColor = new Color3(Math.random(), Math.random(), Math.random());
        box.material = randomMaterial;
        box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);

        return box;
};

const createRotatingBox = (scene) =>
{
    const box = MeshBuilder.CreateBox("Wall", {height: 20, width: 10, depth: 20});
    const mass = 1000;

    const friction = .05;
    const restitution = .1;
    box.setAbsolutePosition(new Vector3(0, 6.5, 150));
    const material = new StandardMaterial("material", scene);
    material.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());
    box.material = material;
    box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);
    box.physicsImpostor.setAngularVelocity(new Vector3(0, 200, 0));
    return box;
};

const createRotatingBox2 = (scene) =>
{
    const box = MeshBuilder.CreateBox("Wall", {height: 20, width: 150, depth: 20});
    const mass = 1000;

    const friction = 0;
    const restitution = .1;
    box.setAbsolutePosition(new Vector3(40, 6.5, 150));
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
