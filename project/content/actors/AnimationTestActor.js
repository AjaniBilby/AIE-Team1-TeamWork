/*
var newActorClass = {};

newActorClass.tickEvent = function(id){
  //console.log("playerActor Got a tick :D");
}

newActorClass.EventPlay = function(id){
  GetActorById(id).animation.image.src = "./content/sprites/TestAnim.png";
  GetActorById(id).animation.buildAnimation("idle", 0, 2, true, 0.5);
  GetActorById(id).animation.play("idle")
}
*/

class AnimationTestActor extends Actor{
  constructor(){
    super();

    this.animation.image.src = "./content/sprites/TestAnim.png";
    this.buildAnimation("idle", 0, 2, true, 0.5);
    this.controllerID = 42;
  }

  get tickEvent(){

  }

  get onPossess(){

  }

  get unPossess(){
    
  }
}
