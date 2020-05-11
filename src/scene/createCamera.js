import { FollowCamera, Mesh, Vector3} from 'babylonjs';

// A function to initialize the camera and set it to follow the player throughout the game.
const createCamera = (scene, canvas, player) => {

    const camPos = 80;
    const followCamera = new FollowCamera("followCamera", new Vector3(0, camPos, -camPos), scene);
    followCamera.radius = 35;               // How far from the object should the camera be.
    followCamera.heightOffset = 16;         // How high above the object should it be.
    followCamera.rotationOffset = 180;      // The camera's angle. here - from behind.
    followCamera.cameraAcceleration = 0.5;  // Acceleration of the camera.
    followCamera.maxCameraSpeed = 20;       // The camera's max speed.

    // Make a simple mesh to follow the actual player so this way the camera doesnt rotate like crazy
    const playerClone = Mesh.CreateBox("player-follower", 0.001, scene);
    // Set its position to be the same as the ball's position.
    playerClone.parent = player.playerBox;
    // Targets the camera to a particular position. In this case the player

    followCamera.lockedTarget = playerClone;

    // Attach the camera to the canvas
    followCamera.attachControl(canvas, true);
    followCamera.inputs.clear();
    // followCamera.maxZ = 300;
};



export default createCamera;
