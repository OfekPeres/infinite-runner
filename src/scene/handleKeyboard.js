import {ActionManager, ExecuteCodeAction} from 'babylonjs';


const handleKeyboard = (scene, game) => {


    const map ={a: 0, w: 0, s: 0, d: 0, " ": 0}; //object for multiple key presses
    scene.actionManager = new ActionManager(scene);

    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger,
        function(evt) {
          map[evt.sourceEvent.key] = 1;
          game.handleKeyPress(map);
      }));

    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger,
        function(evt) {
          map[evt.sourceEvent.key] = 0;
      }));


};


export default handleKeyboard;
