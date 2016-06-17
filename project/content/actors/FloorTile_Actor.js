var tileEndPoint = 2000;

class FloorTileActor extends Actor{
  constructor(){
    console.log("Spawned FloorTileActor")
    super()
    this.size.x = 2000;
    this.size.y = 2000;
    this.collides.static = false;
    this.collides.any = false;
    this.simulate = false;
    this.hasSpawnedChild = false;
    //TODO Add code for eventPlay/onSpawn below

    var numRocks = Rand(tileEndPoint/2000, 15*tileEndPoint/2000);
    for (var i=0; i<numRocks; i++){
      var newRock = new RockActor({x: Rand(-this.size.x/2, this.size.x/2), y: Rand(-this.size.x/2, this.size.x/2)-tileEndPoint});
    }
  }

  get tickEvent(){
    //TODO Add code for each frame/tick below
    if (!this.hasSpawnedChild){
      if (typeof(objects.players[0]) == "number"){
        if (typeof(getObjectById(objects.list[objects.players[0]].controlledActorID)) == "object"){
          if (((0-getObjectById(objects.players[0]).controlledActor.location.y)+this.size.x) >= tileEndPoint){
            tileEndPoint += this.size.x;
            var newFloor = new FloorTileActor;
            getObjectById(newFloor.id).location.y = tileEndPoint+this.size.x;
          }
        }
      }
    }
  }
};
