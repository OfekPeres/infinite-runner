import * as BABYLON from 'babylonjs';


const createCamera = (scene, canvas, player) => {

    const camPos = 80;
    // Parameters : name, position, scene
    // const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, camPos, -2*camPos), scene);


    const followCamera = new BABYLON.FollowCamera("followCamera", new BABYLON.Vector3(0, camPos, -2*camPos), scene);
    followCamera.radius = 1.2*camPos;              // How far from the object should the camera be.
    followCamera.heightOffset = camPos/2;        // How high above the object should it be.
    followCamera.rotationOffset = 180;      // The camera's angle. here - from behind.
    followCamera.cameraAcceleration = 0.5;  // Acceleration of the camera.
    followCamera.maxCameraSpeed = 20;       // The camera's max speed.

    // Make a simple mesh to follow the actual player so this way the camera doesnt rotate like crazy
    const playerClone = BABYLON.Mesh.CreateBox("player-follower", 0.001, scene);
    // Set its position to be the same as the ball's position.
    playerClone.parent = player.playerBox;
    // Targets the camera to a particular position. In this case the player

    followCamera.lockedTarget = playerClone;

    // Attach the camera to the canvas
    followCamera.attachControl(canvas, true);
};



export default createCamera;
