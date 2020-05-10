import 'babylonjs-loaders';
import {PBRMaterial, Vector3, Color3} from 'babylonjs';

const createTrampoline = (scene) => {
    // Initialize a trampoline as a clone of the original
    const trampoline = window.trampoline.clone();
    trampoline.isVisible = true;

    trampoline.scaling = new Vector3(2, 2, 2);
    const pbr = new PBRMaterial("pbr", scene);
    pbr.metallic = 0.0;
    pbr.roughness = 0;
    pbr.subSurface.isRefractionEnabled = true;
    pbr.subSurface.indexOfRefraction = .2;
    pbr.alpha = .7;
    pbr.emissiveColor = new Color3(0, 0, Math.random());
    pbr.ambientColor = new Color3(0, 0, Math.random());
    trampoline.material = pbr;
    trampoline.material = pbr;
    return trampoline;
};


export default createTrampoline;
