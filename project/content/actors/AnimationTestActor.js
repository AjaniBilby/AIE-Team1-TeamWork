var newActorClass = {};

newActorClass.tickEvent = function(dt, id){
  //console.log("playerActor Got a tick :D");
  self.location.x += 10*dt
}

newActorClass.EventPlay = function(id){
  self.animation.image.src = "./content/sprites/TestAnim.png";
  self.animation.buildAnimation("idle", 0, 2, true, 0.5);
  self.animation.play("idle")
}
