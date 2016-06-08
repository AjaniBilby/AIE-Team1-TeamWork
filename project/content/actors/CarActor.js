var newActorClass = {};
//SpawnActor({location: {x:0,y:0}, rotation: 0, size:{x:164,y:124}}, "playerActor")

newActorClass.tickEvent = function(dt, id){
  //console.log("playerActor Got a tick :D");
  //console.log(GetControllerById(GetActorById(id).controllerId).axis["MoveForward"])
  //console.log(GetControllerById(GetActorById(id).controllerId).axis["MoveRight"])

  //console.log("forward:", GetControllerById(self.controllerId).axis["MoveForward"], " | side:",GetControllerById(self.controllerId).axis["MoveRight"] )


  self.velocity.y += parseFloat(-GetControllerById(self.controllerId).axis["MoveForward"]) * self.physics.acceleration;


}

newActorClass.EventPlay = function(id){
  //I am controlled by GetActorById(id).controlledActorID
  //Getting a controller input value  GetControllerById(GetActorById(id).controlledActorID).axis["MoveForward"]
  self.animation.image.src = "./content/sprites/TestAnim.png";
  self.animation.buildAnimation("idle", 0, 2, true, 0.5);
  self.animation.play("idle")
  console.info("Spawned Actor: ", GetActorById(id));
}

newActorClass.onPossess = function(myid, controllerid){
  //console.log("I've been possesed")

}

newActorClass.unPossess = function(myid, controllerid){
  //console.log("I've been unpossesed")
}
