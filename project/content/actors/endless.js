var newActorClass = {};
//SpawnActor({location: {x:0,y:0}, rotation: 0, size:{x:164,y:124}}, "playerActor")

newActorClass.tickEvent = function(dt, id){
  //console.log("playerActor Got a tick :D");
}

newActorClass.EventPlay = function(id){
  console.info("Spawned Actor: ", GetActorById(id));
}
