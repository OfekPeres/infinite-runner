import {MeshBuilder, Vector3, PhysicsImpostor, Color3, StandardMaterial, Mesh, PBRMaterial, PointLight} from 'babylonjs';

// A simple box mesh with a random coloration
const createRandomBox = function(scene, x, y, z, widthScale)
{
        const height = 5;
        const width = 5;
        const depth = 5 *widthScale;

        // Create Random Physical Properties for Box
        const friction    = 10;
        const mass        = 1000;
        const restitution = 0;

        // Create Box
        const box = MeshBuilder.CreateBox("Box", {height, width, depth}, scene);
        box.position = new Vector3(x, y, z);
        const randomMaterial = new StandardMaterial("randomMaterial", scene);
        randomMaterial.diffuseColor = new Color3(Math.random(), Math.random(), Math.random());
        box.material = randomMaterial;
        // Activate physics for the mesh
        box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);

        return box;
};

// The basis for the small rotating wall obstacle
const createRotatingBox = (scene, x, y, z) =>
{
    const box = MeshBuilder.CreateBox("Wall", {height: 20, width: 10, depth: 20});
    const mass = 10000;

    const friction = 0;
    const restitution = 1;
    box.setAbsolutePosition(new Vector3(x, y, z));

    const pbr = new PBRMaterial("pbr", scene);
    pbr.metallic = 0.0;
    pbr.roughness = 0;
    pbr.subSurface.isRefractionEnabled = true;
    pbr.subSurface.indexOfRefraction = .2;
    pbr.alpha = .7;
    pbr.emissiveColor = new Color3(0, 0, Math.random());
    pbr.ambientColor = new Color3(0, 0, Math.random());

    box.material = pbr;

    box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);
    box.physicsImpostor.setAngularVelocity(new Vector3(0, 200, 0));
    return box;
};

// The basis for the large rotating wall object
const createRotatingBox2 = (scene, x, y, z) =>
{
    const box = MeshBuilder.CreateBox("Wall", {height: 20, width: 50, depth: 20});
    const mass = 10000;
    const friction = 0;
    const restitution = 1;

    box.setAbsolutePosition(new Vector3(x, y, z));

    // Make the material look ice-like
    const pbr = new PBRMaterial("pbr", scene);
    pbr.metallic = 0.0;
    pbr.roughness = 0;
    pbr.subSurface.isRefractionEnabled = true;
    pbr.subSurface.indexOfRefraction = .2;
    pbr.alpha = .7;
    pbr.emissiveColor = new Color3(0, 0, Math.random());
    pbr.ambientColor = new Color3(0, 0, Math.random());
    box.material = pbr;

    // Add physics
    box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);
    box.physicsImpostor.setAngularVelocity(new Vector3(0, 1, 0));
    return box;
};


const createPlayerBox = (scene) =>
{

    // Initialize Mesh and define constants
    const box = MeshBuilder.CreateBox("PlayerBox", { height: 10, width: 10, depth: 10 });
    const mass = 10;
    const friction = .05;
    const restitution = 0.2;
    box.position = new Vector3();


    // Initialise Physics Based Rendering Material to look ice-like
    const pbr = new PBRMaterial("pbr", scene);
    pbr.metallic = 0.0;
    pbr.roughness = 0;
    pbr.subSurface.isRefractionEnabled = true;
    pbr.subSurface.indexOfRefraction = .2;
    pbr.alpha = .7;
    pbr.emissiveColor = new Color3(0, 0, .8);
    pbr.ambientColor = new Color3(0, 0, .5);
    box.material = pbr;

    // Enable Physics
    box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass, friction, restitution }, scene);

    // Attach lighting to the player Object via a clone so that the lights dont rotate like crazy
    const playerClone = Mesh.CreateBox("player-follower", 0.001, scene);
    playerClone.parent = box;

    const light = new PointLight("pointLight", new Vector3(0, 1, 1), scene);
    light.parent = playerClone;
    light.intensity = .5;

    const light2 = new PointLight("pointLight", new Vector3(-2, 5, 8), scene);
    light2.parent = playerClone;
    light2.intensity = .5;
    light2.position.x += 10;
    return box;
};


export {createRandomBox, createPlayerBox, createRotatingBox, createRotatingBox2};
