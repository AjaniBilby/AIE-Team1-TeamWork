LoadJS("./engine/classDefaults/actor.js")
var Physics = function(){
  this.drag = 0;
  this.bounce = 0;
  this.collision = true;
}

Physics.prototype.update = function(id){
  this.location = GetActorById(id).location;
  this.velocity = GetActorById(id).velocity;

  if (this.collision){
    //test center
    if (TestCollision(GetActorById(id).location)){
      console.log("Collision to the center");
    }
    //test right
    if (TestCollision(GetActorById(id).location+(GetActorById(id).size.x+1))){
      console.log("Collision to the right");
    }
    //test left
    if (TestCollision(GetActorById(id).location-(GetActorById(id).size.x+1))){
      console.log("Collision to the left");
    }
    //test up
    if (TestCollision(GetActorById(id).location-(GetActorById(id).size.x+1))){
      console.log("Collision to the up");
    }
    //test down
    if (TestCollision(GetActorById(id).location-(GetActorById(id).size.x+1))){
      console.log("Collision to the down");
    }
  }
}
