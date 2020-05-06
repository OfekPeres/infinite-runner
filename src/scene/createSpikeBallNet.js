import 'babylonjs-loaders';
import {SceneLoader} from 'babylonjs';

const importSpikeball = (scene) => {
    SceneLoader.Append("src/assets/", "spikeball_net.stl", scene, (meshes) =>
    {
        meshes.forEach((mesh) =>
        {
            mesh.position.x = 0;
            mesh.position.y = 10;
            mesh.position.z = 0;
            mesh.scale = 10;
        });
    });
};


export default importSpikeball;
