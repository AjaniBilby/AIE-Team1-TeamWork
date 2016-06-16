var tileEndPoint = 0;

class FloorTileActor extends Actor{
  constructor(){
    console.log("Spawned FloorTileActor")
    super()
    this.size.x = 2000;
    this.size.y = 2000;
    this.collides.static = false;
    this.collides.any = false;
    this.simulate = false;
    //TODO Add code for eventPlay/onSpawn below

    var numRocks = Rand(50, 10*tileEndPoint/2000);
    for (var i=0; i<numRocks; i++){
      var newRock = new RockActor;
      var tempLocation = {
        x: ((Math.round(Rand(-this.size.x/2, this.size.x/2)/worldCollision.tileSize))*worldCollision.tileSize),
        y: (Math.round((Rand(-this.size.x/2, this.size.x/2)-tileEndPoint)/worldCollision.tileSize)*worldCollision.tileSize)
      }
      getObjectById(newRock.id).location.x = tempLocation.x;
      getObjectById(newRock.id).location.y = tempLocation.y;
      AddStaticCollision(tempLocation, getObjectById(newRock.id).size);
      getObjectById(newRock.id).location.y += newRock.size.y/4;
    }
  }

  get tickEvent(){
    //TODO Add code for each frame/tick below
    if (typeof(objects.players[0]) == "number"){
      if (((0-getObjectById(objects.players[0]).controlledActor.location.y)+this.size.x) >= tileEndPoint){
        tileEndPoint += this.size.x;
        var newFloor = new FloorTileActor;
        getObjectById(newFloor.id).location.x = tileEndPoint+this.size.x;
      }
    }
  }
};
