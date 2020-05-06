import {ActionManager, ExecuteCodeAction} from 'babylonjs';


const handleKeyboard = (scene, game) => {

  //object for multiple key presses
    const map ={a: 0, w: 0, s: 0, d: 0, " ": 0, ArrowUp: 0, ArrowLeft: 0, ArrowRight: 0, ArrowDown: 0};

    scene.actionManager = new ActionManager(scene);

    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger,
        function(evt) {
          map[evt.sourceEvent.key] = 1;
          game.handleKeyPress(map);
          // console.log(evt.sourceEvent.key);
      }));

    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger,
        function(evt) {
          map[evt.sourceEvent.key] = 0;
      }));


};


export default handleKeyboard;
