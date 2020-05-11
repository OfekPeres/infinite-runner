import {ActionManager, ExecuteCodeAction} from 'babylonjs';

// Attach keyboard listeners to the game to that the user can play
const handleKeyboard = (scene, game) => {

  // Create a map of key presses to 1 or 0 values. When a key is pressed, the map's value will update to one.
  // When the key is released, the map will reset the value to 0
    const map = {a: 0, w: 0, s: 0, d: 0, " ": 0, ArrowUp: 0, ArrowLeft: 0, ArrowRight: 0, ArrowDown: 0};

    scene.actionManager = new ActionManager(scene);

    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger,
        function(evt) {
          map[evt.sourceEvent.key] = 1;
          // Send the map into the game to update the player's velocity
          game.handleKeyPress(map);
      }));

    scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger,
        function(evt) {
          map[evt.sourceEvent.key] = 0;
      }));


};


export default handleKeyboard;
