var objects = {
  list: [],
  types: [],
  players: []
}

class GameObject{
  constructor(type){
    this.type = type;
    this.id = objects.list.length;
    this.customUpdate = [];
    objects.list.push(this);

    if (type == "controller"){
      objects.players.push(this.id)
    }
  }
  get update(){

  };
}

function getObjectById(id){
  return objects.list[id];
}

objects.UpdateAll = function(){
  for (var object=0; object<objects.list.length; object++){
    objects.list[object].update;
  }
}

function test(){
  var controller = new PlayerController();
  console.log(controller.controlledActor.velocity.x)
}
