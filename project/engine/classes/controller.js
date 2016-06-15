LoadJS("engine/classes/object.js");
LoadJS("engine/structures/inputHandler.js");

class Controller extends GameObject{
  constructor(callback){
    super("controller");
    this.takeInputs = true;
    this.controlledActorID = null;
    this.movementInput = new Vector2();

    /*--------------------------------------------------------------------------
      Setup controll actions/axies
    --------------------------------------------------------------------------*/
    //Setup controller input actions
    this.actions = {};
    for(var action=0; action<settings.controls.actions.length; action++){
      this.actions[settings.controls.actions[action].name] = {
        pressed: false,
        down: false,
        release: false,
      };
    }
    //Setup controller input axis
    this.axis = {};
    for(var action=0; action<settings.controls.axises.length; action++){
      this.axis[settings.controls.axises[action].name] = 0;
    }

    //callback
    if (typeof(callback) == "function"){
      callback(this.id);
    }
  }

  get update(){
    if (this.takeInputs == true){
      //this.UpdateAxis();
      //this.UpdateActions();
    }
  }

  get controlledActor(){
    return objects.list[this.controlledActorID]
  }

  get hasControl(){
    return (typeof(objects.list[this.controlledActorID]) == "object");
  }
}

Controller.prototype.Possess = function(idNum){
  if (this.controllerID != null){
    this.unPosess();
  }
  this.controlledActorID = idNum;
  this.controlledActor.controllerID = this.id;
  this.controlledActor.onPossess;
}

Controller.prototype.unPossess = function(){
  var idNum = this.controlledActorID;
  this.controlledActor = null;
  objects.list[idNum].unPossess;
}

/*
Controller.prototype.UpdateActions = function(){
  for(var action=0; action<settings.controls.actions.length; action++){
    for (i=0; i<settings.controls.actions[action].inputs.length; i++){
      //Check if the action is setup
      if (typeof(this.actions[settings.controls.actions[action].name]) == "undefined"){
        this.actions[settings.controls.actions[action].name] = {};
      }
      if (typeof(this.actions[settings.controls.actions[action].name].down) == "undefined"){
        this.actions[settings.controls.actions[action].name].down = false;
      }
      if (typeof(this.actions[settings.controls.actions[action].name].press) == "undefined"){
        this.actions[settings.controls.actions[action].name].press = false;
      }
      if (typeof(this.actions[settings.controls.actions[action].name].release) == "undefined"){
        this.actions[settings.controls.actions[action].name].release = false;
      }
      //Change down press and release values for actions
      if (keyboard.isKeyDown(keyboard[settings.controls.actions[action].inputs[i]])){
        this.actions[settings.controls.actions[action].name].release = false;
        if (this.actions[settings.controls.actions[action].name].press == false && this.actions[settings.controls.actions[action].name].down == false){
          this.actions[settings.controls.actions[action].name].press = true;
        }else{
          this.actions[settings.controls.actions[action].name].press = false;
        }
        this.actions[settings.controls.actions[action].name].down = true;
      }else{
        this.actions[settings.controls.actions[action].name].press = false;
        if (this.actions[settings.controls.actions[action].name].release == false && this.actions[settings.controls.actions[action].name].down == true){
          this.actions[settings.controls.actions[action].name].release = true;
        }else{
          this.actions[settings.controls.actions[action].name].release = false;
        }
        this.actions[settings.controls.actions[action].name].down = false;
      }
    }
  }
}
*/


var index = fs.readdirSync(fileSystem.root+"content/controllers")
for (var i=0; i<index.length; i++){
  LoadJS("content/controllers/"+index[i])
}
index = undefined;
