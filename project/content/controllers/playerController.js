var newControllerClass = {};
//SpawnController({location: {x:0,y:0}, rotation: 0, size:{x:164,y:124}}, "playerController")

newControllerClass.tickEvent = function(dt, id){
  console.log("controller Got a tick :D");
};

newControllerClass.EventPlay = function(id){
  console.log("Spawned Actor: ", GetControllerById(id));
  SpawnActor({location: {x:0,y:0}, rotation: 0, size:{x:164,y:124}}, "CarActor", function(newId){
    GetControllerById(id).Possess(newId)
  })
};
