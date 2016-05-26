LoadJS("engine/inputHandler.js");

var Controllers = {
  classes: {},
  list: []
};

Controller = function(controllerClass, callback){
  this.axis = {};
  this.controlledActorID = "null";
  this.class = "null"
  this.id = Controllers.list.length;
  this.movementInput = new Vector2();
  Controllers.list.push(this);
};

Controller.prototype.Possese = function(actorid){
  this.controlledActor = actorid;
  if (typeof(actors.list[id].onPossese()) == "funciton"){
    actors.list[id].onPossese();
  }
};

Controller.prototype.Update = function(){
  if (this.HasControl()){
    this.movementInput.Normalize();
    this.GetPawn().velocity.x = parsefloat(this.movementInput.x);
    this.GetPawn().velocity.y = parsefloat(this.movementInput.y)
  }
};

Controller.prototype.UpdateAxis = function(){
  for(action=0; action<settings.controls.axises.length; action++){
    this.axis[settings.controls.axises[action].name] = 0;
    for (i=0; i<settings.controls.axises[action].inputs.length; i++){
      if (keyboard.isKeyDown(keyboard[settings.controls.axises[action].inputs[i].key])){
        this.axis[settings.controls.axises[action].name] += settings.controls.axises[action].inputs[i].value;
      }
    }
  }
};

Controller.prototype.GetPawn = function(id){
  if (typeof(id) != "number"){
    id = this.controlledActorID;
  };
  if (typeof(actors.list[id]) == "object"){
    return actors.list[id];
  }else{
    console.log("Cannot Get Controller: "+id);
    return null;
  }
};

Controller.prototype.HasControl = function(){
  return typeof(actors.list[this.controlledActorID]) == "object";
}

AddTickEvent(function(){
  for (c=0; c<Controllers.list.length; c++){
    if (typeof(Controllers.list[c]) == "object") {
      Controllers.list[c].UpdateAxis();
      if (typeof(Controllers.list[c].class) == "string"){
        if (typeof(Controllers.classes[Controllers.list[c].class]) != "undefined"){
          if (typeof(Controllers.classes[Controllers.list[c].class].tickEvent) == "function"){
            Controllers.classes[Controllers.list[c].class].tickEvent();
          }
        }
      }
      Controllers.list[c].Update();
    }
  }
}, "*");

test = new Controller()
