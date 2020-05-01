import * as BABYLON from 'babylonjs';

const createGround = (scene) => {

    const ground = BABYLON.MeshBuilder.CreateBox("Ground", {width: 120, height: 1, depth: 120}, scene);
    ground.position.y = -5.0;
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);

    groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    // groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    groundMat.backFaceCulling = false;
    ground.material = groundMat;
    ground.receiveShadows = true;
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: .1, restitution: 0.7 }, scene);
};


export default createGround;
