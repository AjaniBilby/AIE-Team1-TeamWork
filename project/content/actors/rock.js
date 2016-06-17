class RockActor extends Actor{
  constructor(location){
    super()
    this.location.x = location.x;
    this.location.y = location.y;
    this.location.x = Math.round((this.location.x/worldCollision.tileSize)*worldCollision.tileSize);
    this.location.y = Math.round((this.location.y/worldCollision.tileSize)*worldCollision.tileSize);
    //TODO Add code for eventPlay/onSpawn below
    this.rotation = Math.random()*2-1;
    switch (2) {
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
    AddStaticCollision(this.location, this.size);
    this.location.y += this.size.y/2
    this.location.x += this.size.x/4
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
