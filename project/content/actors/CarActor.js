var newActorClass = {};
//SpawnActor({location: {x:0,y:0}, rotation: 0, size:{x:164,y:124}}, "playerActor")
var ACCELERATION = 5;
var CAR_TURN_SPEED = 5;


var car = {
    image: document.createElement("img"),
    x: location.x,
    y: location.y,
    width: 93,
    height: 80,
    directionX: 0,
    directionY: 0,
    angularDirection: 0,
    rotation: 0,
};
car.image.src = "content/sprites/car.png";

newActorClass.tickEvent = function(dt, id){
  //console.log("playerActor Got a tick :D");
  //console.log(GetControllerById(GetActorById(id).controllerId).axis["MoveForward"])
  //console.log(GetControllerById(GetActorById(id).controllerId).axis["MoveRight"])

console.log("forward:", GetControllerById(GetActorById(id).controllerId).axis["MoveForward"], " | side:",GetControllerById(GetActorById(id).controllerId).axis["MoveRight"] )





  var s = Math.sin(car.rotation);
  var c = Math.cos(car.rotation);

  var xDir = (car.directionX * c) - (car.directionY * s);
  var yDir = (car.directionX * s) + (car.directionY * c);

  var xVel = xDir * ACCELERATION;
  var yVel = yDir * ACCELERATION;

  car.x += xVel;
  car.y += yVel;
  car.rotation += car.angularDirection * CAR_TURN_SPEED;
  context.save();
  context.translate(car.x, car.y);
  context.rotate(car.rotation);
  context.drawImage(
      car.image, -car.width / 2, -car.height / 2);
  context.restore();

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
