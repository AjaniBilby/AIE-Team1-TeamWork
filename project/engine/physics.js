LoadJS("./engine/classDefaults/actor.js")
var Physics = function(){
  this.drag = 0.99;
  this.acceleration = 8;
  this.maxVelocity = 10;
  this.bounce = 0;
  this.collision = true;
}

Physics.prototype.update = function(dt, id){
  var self = GetActorById(id);
  self.velocity.x *= ((this.drag));
  self.velocity.y *= ((this.drag));
  self.velocity.x = Clamp(self.velocity.x, -this.maxVelocity, this.maxVelocity);
  self.velocity.y = Clamp(self.velocity.y, -this.maxVelocity, this.maxVelocity);

  if (this.collision){
    //test center
    if (TestCollision(GetActorById(id).location, {x: GetActorById(id).size.x, y:GetActorById(id).size.y})){
      console.log("Collision to the center");
    }
    //test right
    if (TestCollision((GetActorById(id).location+GetActorById(id).size.x), {x:1, y:GetActorById(id).size.x})){
      console.log("Collision to the right");
      if (GetActorById(id).velocity.x > 0){
        GetActorById(id).velocity.x = (0-GetActorById(id).velocity.x)*this.bounce;
      }
    }
    //test left
    if (TestCollision((GetActorById(id).location-GetActorById(id).size.x), {x:1, y:GetActorById(id).size.x})){
      console.log("Collision to the left");
      if (GetActorById(id).velocity.x < 0){
        GetActorById(id).velocity.x = (0-GetActorById(id).velocity.x)*this.bounce;
      }
    }
    //test up
    if (TestCollision((GetActorById(id).location-GetActorById(id).size.y), {x:GetActorById(id).size.y, y:1})){
      console.log("Collision to the up");
      if (GetActorById(id).velocity.y < 0){
        GetActorById(id).velocity.y = (0-GetActorById(id).velocity.y)*this.bounce;
      }
    }
    //test down
    if (TestCollision((GetActorById(id).location+GetActorById(id).size.y), {x:GetActorById(id).size.y, y:1})){
      console.log("Collision to the down");
      if (GetActorById(id).velocity.y > 0){
        GetActorById(id).velocity.y = (0-GetActorById(id).velocity.y)*this.bounce;
      }
    }
  }
}
