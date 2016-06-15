var tileEndPoint = 0;

class FloorTileActor extends Actor{
  constructor(){
    console.log("Spawned FloorTileActor")
    super()
    this.size.x = 2000;
    this.size.y = 2000;
    //TODO Add code for eventPlay/onSpawn below

    var numRocks = Rand(50, 100);
    for (var i=0; i<numRocks; i++){
      var newRock = new RockActor;
      newRock.location.x = Rand(-this.size.x/2, this.size.x/2);
      newRock.location.y = Rand(-this.size.y/2, this.size.y/2)-tileEndPoint;
      AddStaticCollision(newRock.location, newRock.size);
    }
  }

  get tickEvent(){
    //TODO Add code for each frame/tick below
    if (typeof(objects.players[0]) == "number"){
      if (((0-getObjectById(objects.players[0]).controlledActor.location.y)+this.size.x) >= tileEndPoint){
        console.log("NEW")
        tileEndPoint += this.size.x;
        var newFloor = new FloorTileActor;
        getObjectById(newFloor.id).location.x = tileEndPoint+this.size.x;
      }
    }
  }
};
