class RockActor extends Actor{
  constructor(){
    super()
    //TODO Add code for eventPlay/onSpawn below
    this.rotation = Math.random()*2-1;
    switch (Rand(0, 3)) {
      case 1:
        this.animation.image.src = "./content/sprites/rock_medium.png";
        this.size.x = 40;
        this.size.y = 50;
        break;
      case 2:
        this.animation.image.src = "./content/sprites/rock_large.png";
        this.size.x = 69;
        this.size.y = 75;
        break;
      default:
        this.animation.image.src = "./content/sprites/rock_small.png";
        this.size.x = 22;
        this.size.y = 20;
    }
    this.buildAnimation("idle", 0, 1, true, 1);
    this.playAnimation("idle");
    this.collides.static = false;
    this.collides.any = false;
    this.simulate = false;
  }

  get tickEvent(){
  }

  get onPossess(){
    //TODO Add code for when a controller possesses below
  }

  get unPossess(){
    //TODO Add code for when a controller unPossesses below
  }
}
