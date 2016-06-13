var objects = {
  list: [],
  types: []
}

class GameObject{
  constructor(type){
    this.type = type;
    this.id = objects.list.length;
    this.customUpdate = [];
    objects.list.push(this)
  }
  get update(){}
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
