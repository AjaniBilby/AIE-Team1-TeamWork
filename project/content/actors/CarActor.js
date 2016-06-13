class CarActor extends Actor{
  constructor(){
    super()
    //TODO Add code for eventPlay/onSpawn below
    this.movementSpeed = 100;
    //I am controlled by GetActorById(id).controlledActorID
    //Getting a controller input value  GetControllerById(GetActorById(id).controlledActorID).axis["MoveForward"]
    this.animation.image.src = "./content/sprites/TestAnim.png";
    this.buildAnimation("idle", 0, 2, true, 0.5);
    this.playAnimation("idle")
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
