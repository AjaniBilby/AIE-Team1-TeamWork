LoadJS("engine/classes/object.js")
LoadJS("engine/collision.js")


class Actor extends GameObject{
  constructor(callback){
    super("actor");
    //Transform
    this.location = new Vector2();
    this.size = new Vector2(165, 125);
    this.rotation = 0;
    //Physics
    this.simulate = true;
    this.velocity = new Vector2();
    this.drag = 0.99;
    this.movementSpeed = 10;
    this.maxVel = 20;
    this.bounce = 0;
    this.pVel = new Vector2();
    this.acceleration = new Vector2();
    this.collides = {
      any: true,
      static: true,
      dynamic: true
    }
    this.collision = {
      any: new CollisionStruc(),
      static: new CollisionStruc(),
      dynamic: new CollisionStruc()
    }
    //Animation & display
    this.animation = {};
    this.animation.image = document.createElement("img");
    this.animation.image.src = "./content/sprites/hero.png";
    this.animation.frameTime = 0;
    this.animation.currentFrame = 0;
    this.animation.animations = {};
    this.animation.playing = null;
    //Hirachy
    this.cID = null;
  }

  get update(){
    this.tickEvent
    if (this.collides.static == true && this.collides.any == true){
      var data = TestCollision(this.location, this.size);
      //console.log(data)
      //Is there a new change?
      this.collision.static.new.up = (this.collision.static.up!=data.up);
      this.collision.static.new.down = (this.collision.static.down!=data.down);
      this.collision.static.new.left = (this.collision.static.left!=data.left);
      this.collision.static.new.right = (this.collision.static.right!=data.right);
      this.collision.static.new.center = (this.collision.static.center!=data.center);
      this.collision.static.normals = data.normals

      //Update static values
      this.collision.static.up = data.up;
      this.collision.static.down = data.down;
      this.collision.static.left = data.left;
      this.collision.static.right = data.right;
      this.collision.static.center = data.center;
    }
    if (this.collides.any == true){
      //Update collision values
      this.collision.any.up = (this.collision.static.up || this.collision.static.up);
      this.collision.any.down = (this.collision.static.down || this.collision.static.down);
      this.collision.any.left = (this.collision.static.left || this.collision.static.left);
      this.collision.any.right = (this.collision.static.right || this.collision.static.right);
      this.collision.any.center = (this.collision.static.center || this.collision.static.center);
      this.collision.any.any = (this.collision.any.center || this.collision.any.right || this.collision.any.left || this.collision.any.down || this.collision.any.up)
    }

    if (this.simulate){
      //Calculate bounce
      if ((this.collision.any.up && this.velocity.y < 0) || (this.collision.any.down && this.velocity.y > 0)){
        this.velocity.y *= -this.bounce;
      }
      if ((this.collision.any.right && this.velocity.x < 0) || (this.collision.any.left && this.velocity.x > 0)){
        this.velocity.x *= -this.bounce;
      }

      //Calculate velocity and acceleration
      this.velocity.x *= this.drag;
      this.velocity.y *= this.drag;
      this.acceleration.x = this.velocity.x-this.pVel.x;
      this.acceleration.y = this.velocity.y-this.pVel.y;
      this.pVel = this.velocity;
      this.location.x += this.velocity.x;
      this.location.y += this.velocity.y;
      this.velocity.x = Clamp(this.velocity.x, -this.maxVel, this.maxVel);
      this.velocity.y = Clamp(this.velocity.y, -this.maxVel, this.maxVel);
    }
    this.updateAnimation()
    return;
  }

  get controller(){
    if (this.controllerID == null || this.cID == undefined){
      return null
    }else{
      return objects.list[this.controllerID]
    }
  }

  get controllerID(){
    if (typeof(objects.list[this.cID]) == "object"){
      if (objects.list[this.cID].type == "controller"){
        return this.cID;
      }
    }
    return null;
  }

  get destroy(){
    if (this.controller != null){
      this.controller.dePosses;
      this.controller.controlledActorID = null;
      objects.list[this.id] = ""
    }
  }

  set controllerID(value){
    if (typeof(value) == "number"){
      if (typeof(objects.list[value]) == "object"){
        if (objects.list[value].type == "controller"){
          this.cID = value;
          return;
        }else{
          console.error("Invalid controller ID ("+value+")");
        }
      }else{
        console.error("Invalid controller object ("+value+")");
      }
    }else{
      console.error(value, " is an invalid ID number");
    }
    this.cID = null;
    return null;
  }
}

Actor.prototype.buildAnimation = function(name, row, frames, loop, frameDuration){
  if (typeof(loop) == "undefined"){
    loop = false;
  }
  if (typeof(frameDuration) != "number"){
    frameDuration = 1;
  }
  this.animation.animations[name] = {};
  this.animation.animations[name].row = row;
  this.animation.animations[name].frames = frames;
  this.animation.animations[name].loop = loop;
  this.animation.animations[name].frameDuration = frameDuration;
}

Actor.prototype.playAnimation = function(animation, reset){
  if (typeof(reset) == "undefined"){
    reset = true;
  }
  if (reset && this.animation.playing == animation){
    //Stop if it is already running the animation and it should not be reset
    return;
  }

  this.animation.currentFrame = 0;
  this.animation.frameTime = 0;
  if (typeof(this.animation.animations[animation]) == "object"){
    this.animation.playing = animation;
  }else{
    console.error("Animation: cannot find ("+animation+") in ("+this.animation.image.src+")")
  }
};

Actor.prototype.updateAnimation = function(){
  if (this.animation.playing == null || typeof(this.animation.playing) == "undefined"){
    //Draw defualt pose
    render.AddRender(0, {
      image: this.animation.image,
      location: {x: this.location.x, y: this.location.y},
      selection: {
        start: {
          x: 0,
          y: 0
        },
        width: this.size.x,
        height: this.size.y
      },
      rotation: this.rotation
    });
    return "invalid"
  }

  this.animation.frameTime += dt;

  if (typeof(this.animation.animations[this.animation.playing]) == "object"){
    //Update current drawing frame
    if (this.animation.frameTime >= this.animation.animations[this.animation.playing].frameDuration){
      this.animation.frameTime = 0;
      this.animation.currentFrame += 1;
    }
    //Detect if it has finished the animation
    if (this.animation.currentFrame >= this.animation.animations[this.animation.playing].frames){
      if (typeof(this.animation.onEndAnimation) == "function"){
        this.animation.onEndAnimation();
      }
      if (this.animation.animations[this.animation.playing].loop == true){
        this.animation.currentFrame = 0;
      }else{
        this.animation.playing = null;
      }
    }

    //Draw animation
    render.AddRender(0, {
      image: this.animation.image,
      location: {x: this.location.x, y: this.location.y},
      selection: {
        start: {
          x: this.animation.currentFrame*this.size.x,
          y: this.animation.animations[this.animation.playing].row*this.size.y
        },
        width: this.size.x,
        height: this.size.y
      },
      rotation: this.rotation
    });
  }else{
    console.error("Animation: Invalid animation to play (", this.animation.animations[this.animation.playing], ")");
  }
};

var index = fs.readdirSync(fileSystem.root+"content/actors")
for (var i=0; i<index.length; i++){
  LoadJS("content/actors/"+index[i])
}
index = undefined;
