LoadJS("engine/inputHandler.js");

var controllers = {
  classes: {},
  list: []
};

function SpawnController(transform, iclass, callback){
  //SpawnController({location: {x:0,y:0}, rotation: 0, size:{x:164,y:124}}, "playerController")
  //Check that transform is valid
  var temp = new Controller(iclass, function(newControllerId){
    controllers.list[newControllerId].location = transform.location;
    controllers.list[newControllerId].rotation = transform.rotation;
    controllers.list[newControllerId].size = transform.size;


    //Run call back
    if (typeof(callback) == "function"){
      callback(newControllerId);
    }
  });
}

Controller = function(controllerClass, callback){
  if (typeof(controllers.classes[controllerClass]) != "object"){
    if (fs.existsSync("./app.asar/content/controllers/"+controllerClass+".js")){
      LoadJS("./content/controllers/"+controllerClass+".js", true);
      controllers.classes[controllerClass] = newControllerClass;
    }else{
      console.error("Invalid Controller Class: " + controllerClass)
      return;
    }
  }


  this.axis = {};
  this.takeInputs = true;
  this.actions = {};
  this.controlledActorID = "null";
  this.class = "null"
  this.id = controllers.list.length;
  this.movementInput = new Vector2();
  controllers.list.push(this);
  if (typeof(controllers.classes[controllerClass].EventPlay) == "function"){
    controllers.classes[controllerClass].EventPlay(this.id);
  }
  if (typeof(callback == "function")){
    callback(this.id);
  }
};

Controller.prototype.Possess = function(actorid){
  Possess
  this.controlledActor = actorid;
  GetActorById(actorid).controllerId = this.id;
  if (typeof(actors.classes[GetActorById(actorid).class].onPossess) == "function"){
    actors.classes[GetActorById(actorid).class].onPossess(actorid, this.id);
  }
};

Controller.prototype.unPossess = function(actorid){
  this.controlledActor = actorid;
  GetActorById(actorid).controllerId = "null";
  if (typeof(actors.classes[GetActorById(actorid).class].unPossess) == "function"){
    actors.classes[GetActorById(actorid).class].unPossess(actorid, this.id);
  }
};

Controller.prototype.Update = function(){
  if (this.HasControl()){
    this.movementInput.Normalize();
  }
};

Controller.prototype.UpdateAxis = function(){
  for(var action=0; action<settings.controls.axises.length; action++){
    this.axis[settings.controls.axises[action].name] = 0;
    for (i=0; i<settings.controls.axises[action].inputs.length; i++){
      if (keyboard.isKeyDown(keyboard[settings.controls.axises[action].inputs[i].key])){
        this.axis[settings.controls.axises[action].name] += settings.controls.axises[action].inputs[i].value;
      }
    }
  }
};

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

Controller.prototype.GetPawn = function(id){
  if (typeof(id) != "number"){
    id = this.controlledActorID;
  };
  if (typeof(actors.list[id]) == "object"){
    return actors.list[id];
  }else{
    console.error("Cannot Get Controller: "+id);
    return null;
  }
};

Controller.prototype.HasControl = function(){
  return typeof(actors.list[this.controlledActorID]) == "object";
}

function GetControllerById(id){
  return controllers.list[id];
}

AddTickEvent(function(){
  for (c=0; c<controllers.list.length; c++){
    if (typeof(controllers.list[c]) == "object") {
      if (controllers.list[c].takeInputs == true){
        controllers.list[c].UpdateAxis();
        controllers.list[c].UpdateActions();
      }
      if (typeof(controllers.list[c].class) == "string"){
        if (typeof(controllers.classes[controllers.list[c].class]) != "undefined"){
          if (typeof(controllers.classes[controllers.list[c].class].tickEvent) == "function"){
            controllers.classes[controllers.list[c].class].tickEvent();
          }
        }
      }
      controllers.list[c].Update();
    }
  }
}, "*");
