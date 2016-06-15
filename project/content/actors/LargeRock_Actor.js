var newActorClass = {};
{
//SpawnActor({location: {x:0,y:0}, rotation: 0, size:{x:164,y:124}}, "playerActor")
	image: document.createElement("img"),
	x = 50;
	y = 50;
	width: 69,
	height: 75,
	directionX: 0,
	directionY: 0
};

newActorClass.tickEvent = function(dt, id){
  //console.log("playerActor Got a tick :D");
}

newActorClass.EventPlay = function(id){
  console.info("Spawned Actor: ", GetActorById(id));
  GetActorById(id).animation.image.src = "./content/sprites/rock_large.png";
  GetActorById(id).animation.buildAnimation("idle", 0, 0, true);
  GetActorById(id).animation.play("idle")
}
