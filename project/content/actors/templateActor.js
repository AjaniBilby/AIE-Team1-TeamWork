/*OLD Code
var newActorClass = {};
newActorClass.tickEvent = function(dt, id){
  //console.log("playerActor Got a tick :D");
  console.log(GetControllerById(GetActorById(id).controllerId).axis["MoveForward"])
}
newActorClass.EventPlay = function(id){
  //I am controlled by GetActorById(id).controlledActorID
  //Getting a controller input value  GetControllerById(GetActorById(id).controlledActorID).axis["MoveForward"]
  console.info("Spawned Actor: ", GetActorById(id));
}
newActorClass.onPossess = function(myid, controllerid){
  //console.log("I've been possesed")
}
newActorClass.unPossess = function(myid, controllerid){
  //console.log("I've been unpossesed")
}
*/


class TemplateActor extends Actor{
  constructor(){
    super()
    //TODO Add code for eventPlay/onSpawn below
    this.movementSpeed = 100;
  }

  get tickEvent(){
    //TODO Add code for each frame/tick below
    if (isNaN(this.controllerID) == false){
      var movementInput = new Vector2(this.controller.axis["MoveForward"], this.controller.axis["MoveRight"]);
      movementInput.Normalize();
      console.log(movementInput)
      this.velocity.x += movementInput.x*this.movementSpeed;
      this.velocity.y += movementInput.y*this.movementSpeed;
    }
  }

  get onPossess(){
    //TODO Add code for when a controller possesses below
  }

  get unPossess(){
    //TODO Add code for when a controller unPossesses below
  }
}
