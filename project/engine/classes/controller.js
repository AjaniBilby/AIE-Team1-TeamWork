LoadJS("engine/classes/object.js");

class Controller extends GameObject{
  constructor(callback){
    super("controller");
    this.takeInputs = true;
    this.controlledActorID = null;

    //callback
    if (typeof(callback) == "function"){
      callback(this.id);
    }
  }

  get update(){
    this.tickEvent;
  }

  get controlledActor(){
    if (typeof(this.controlledActorID) != "number"){
      return null
    }else{
      return objects.list[this.controlledActorID]
    }
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
};

Controller.prototype.unPossess = function(){
  var idNum = this.controlledActorID;
  this.controlledActor = null;
  objects.list[idNum].unPossess;
};


var index = fs.readdirSync(fileSystem.root+"content/controllers")
for (var i=0; i<index.length; i++){
  LoadJS("content/controllers/"+index[i])
}
index = undefined;
