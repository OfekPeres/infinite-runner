import * as BABYLON from 'babylonjs';


const handleKeyboard = (scene, player) => {


    const map ={a: 0, w: 0, s: 0, d: 0, " ": 0}; //object for multiple key presses
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger,
        function(evt) {
          map[evt.sourceEvent.key] = 1;
          player.handleKeyPress(map);
      }));

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger,
        function(evt) {
          map[evt.sourceEvent.key] = 0;
      }));


};


export default handleKeyboard;
