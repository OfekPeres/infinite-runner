import {HemisphericLight, Color3, Vector3} from 'babylonjs';

// Create Ambient white lighting for the game
const createLighting = (scene) => {
    const light = new HemisphericLight("hemiLight", new Vector3(0, 1, 0), scene);
    light.diffuse = new Color3(1, 1, 1);
    light.specular = new Color3(1, 1, 1);
    light.groundColor = new Color3(0, 0, 0);
};


export default createLighting;
