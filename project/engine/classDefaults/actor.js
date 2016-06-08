LoadJS("engine/classDefaults/Functions.js");
LoadJS("engine/classDefaults/Structures.js");
LoadJS("engine/render.js");
LoadJS("engine/animation.js");
LoadJS("engine/physics.js");
LoadJS("engine/classDefaults/controller.js");
LoadJS("engine/drawSprite.js");

var actors = {
  classes: {},
  list: []
};

function SpawnActor(transform, iclass, callback){
  //SpawnActor({location: {x:0,y:0}, rotation: 0, size:{x:164,y:124}}, "playerActor")
  //Check that transform is valid
  var temp = new Actor(iclass, function(newActorId){
    actors.list[newActorId].location = transform.location;
    actors.list[newActorId].rotation = transform.rotation;
    actors.list[newActorId].size = transform.size;

    //Run call back
    if (typeof(callback) == "function"){
      callback(newActorId);
    }
  });
}

/*---------------------------------------------------------
  Actor class
---------------------------------------------------------*/

Actor = function(actorClass, callback){
  //Load class
  if (typeof(actors.classes[actorClass]) != "object"){
    //If class isn't loaded, then load
    if (fs.existsSync("./app.asar/content/actors/"+actorClass+".js")){
      LoadJS("./content/actors/"+actorClass+".js", true);
      actors.classes[actorClass] = newActorClass;
    }
  }

  //Setup actor defualts
  this.location = new Vector2();
  this.size = new Vector2(165, 125);
  this.rotation = 0;
  this.velocity = new Vector2(0,0);
  this.animation = new Animation("./content/sprites/hero.png", {x:this.size.x, y:this.size.y});
  this.id = actors.list.length;
  this.controllerId = null;
  this.class = actorClass;
  this.physics = new Physics();
  actors.list.push(this);
  if (typeof(actors.classes[actorClass].EventPlay) == "function"){
    actors.classes[actorClass].EventPlay(this.id);
  }
  if (typeof(callback) == "function"){
    callback(this.id);
  }
}

Actor.prototype.update = function(){
  this.location.x += this.velocity.x;
  this.location.y += this.velocity.y;
}

Actor.prototype.GetController = function(id){
  if (typeof(id) != "number"){
    id = this.controllerId;
  };
  if (typeof(Controllers.list[id]) == "object"){
    return Controllers.list[id];
  }else{
    console.error("Cannot Get Controller: "+id);
    return null;
  }
};

function GetActorById(id){
  return actors.list[id];
}

function GetActorsOfClass(classname){
  var results = [];
  for (var a=0; a<actors.list.length; a++){
    if (typeof(actors.list[a]) == "object"){
      if (actors.list[a].class == classname){
        results.push(a);
      }
    }
  }
  return results;
};

AddTickEvent(function(dt){
  for (var a=0; a<actors.list.length; a++){
    if (typeof(actors.list[a]) == "object"){
      if (typeof(actors.classes[actors.list[a].class]) != "undefined"){
        if (typeof(actors.classes[actors.list[a].class].tickEvent) == "function"){
          actors.classes[actors.list[a].class].tickEvent(dt, a);
        }
      }
      actors.list[a].physics.update(a, dt);
      actors.list[a].update(dt);
      actors.list[a].animation.update(actors.list[a].location);
    }
  }
}, "game");
