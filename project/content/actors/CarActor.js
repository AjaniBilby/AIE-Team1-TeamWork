class CarActor extends Actor{
  constructor(){
    super()
    //TODO Add code for eventPlay/onSpawn below
    this.movementSpeed = 800;
    //I am controlled by GetActorById(id).controlledActorID
    //Getting a controller input value  GetControllerById(GetActorById(id).controlledActorID).axis["MoveForward"]
    this.animation.image.src = "./content/sprites/TestAnim.png";
    this.buildAnimation("idle", 0, 2, true, 0.5);
    this.playAnimation("idle")
    this.dead = false
  }

  get tickEvent(){
    //TODO Add code for each frame/tick below
    console.log(this.controllerID)
    if (isNaN(this.controllerID) == false && !this.dead){
      camera.location.y = this.location.y;

      var movementInput = new Vector2(control.getAxis("MoveRight"), control.getAxis("MoveForward"));
      movementInput.Normalize();
      this.velocity.x += movementInput.x*this.movementSpeed;
      this.velocity.y += movementInput.y*this.movementSpeed;
    }

    if (this.collision.any.any){
      this.dead = true;
      this.destroy;
    }
  }

  get onPossess(){
    //TODO Add code for when a controller possesses below
  }

  get unPossess(){
    //TODO Add code for when a controller unPossesses below
  }
}
