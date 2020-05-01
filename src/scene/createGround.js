import {MeshBuilder, StandardMaterial, Color3, PhysicsImpostor} from 'babylonjs';

const createGround = (scene) => {

    const ground = MeshBuilder.CreateBox("Ground", {width: 120, height: 1, depth: 120}, scene);
    ground.position.y = -5.0;
    const groundMat = new StandardMaterial("groundMat", scene);

    groundMat.diffuseColor = new Color3(0.5, 0.5, 0.5);
    // groundMat.emissiveColor = new Color3(0.2, 0.2, 0.2);
    groundMat.backFaceCulling = false;
    ground.material = groundMat;
    ground.receiveShadows = true;
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, friction: .1, restitution: 0.7 }, scene);
};


export default createGround;
