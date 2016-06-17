class CarActor extends Actor{
  constructor(){
    super()
    //TODO Add code for eventPlay/onSpawn below
    this.movementSpeed = 0.2;
    //I am controlled by GetActorById(id).controlledActorID
    this.animation.image.src = "./content/sprites/ship.png";
    this.size.x = 93;
    this.size.y = 80;
    this.buildAnimation("idle", 0, 1, true, 0.5);
    this.playAnimation("idle")
    this.dead = false;
    this.drag = 0.99;
    this.maxVel = 10;
    this.respawning = true;
    setTimeout(function(){this.respawning = false;}, 500);
  }

  get tickEvent(){
    //TODO Add code for each frame/tick below
    if (isNaN(this.controllerID) == false && !this.dead){
      if (camera.location.y > this.location.y){
        camera.location.y = this.location.y;
      }

      var movementInput = new Vector2(control.getAxis("MoveRight"), control.getAxis("MoveForward"));
      this.rotation += movementInput.x*dt*5;
      if (movementInput.y != 0){
        var direction = {
          x:(0 * Math.cos(this.rotation)) - (1 * Math.sin(this.rotation)),
          y:(0 * Math.cos(this.rotation)) + (1 * Math.cos(this.rotation))
        };
        this.velocity.x += movementInput.y*this.movementSpeed*direction.x;
        this.velocity.y += movementInput.y*this.movementSpeed*direction.y;
        this.velocity.x /= this.drag;
        this.velocity.y /= this.drag;
      }
      if (this.respawning){
        if (camera.location.y+(canvas.height/2) < this.location.y){
          this.location.y = camera.location.y+(canvas.height/2)
        }
        if (canvas.width/2 < this.location.x){
          this.location.x = -canvas.width/2;
        }
        if (-canvas.width/2 > this.location.x){
          this.location.x = canvas.width/2;
        }
      }
    }
    if (this.collision.any.any){
      camera.location.y = 0;
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
