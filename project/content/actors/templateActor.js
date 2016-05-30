var newActorClass = {};
//SpawnActor({location: {x:0,y:0}, rotation: 0, size:{x:164,y:124}}, "playerActor")

newActorClass.tickEvent = function(dt, id){
  //console.log("playerActor Got a tick :D");
}

newActorClass.EventPlay = function(id){
  //I am controlled by GetActorById(id).controlledActorID
  //Getting a controller input value  GetControllerById(GetActorById(id).controlledActorID).axis["MoveForward"]
  console.info("Spawned Actor: ", GetActorById(id));
}

newActorClass.onPossese = function(myid, controllerid){
  //console.log("I've been possesed")
}

newActorClass.unPossese = function(myid, controllerid){
  //console.log("I've been unpossesed")
}
