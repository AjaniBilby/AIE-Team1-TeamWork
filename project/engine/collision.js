LoadJS("engine/structures/collisionStruc.js");

var worldCollision = {
  tileSize: 5,
  staticTiles: new Array2D()
};




/*------------------------------------------------------------------------------
  Functions
------------------------------------------------------------------------------*/
function AddStaticCollisionPoint(location){
  var tileLoc = {
    x: Math.round(location.x/worldCollision.tileSize),
    y: Math.round(location.y/worldCollision.tileSize)
  };
  if (typeof(worldCollision.staticTiles.get(tileLoc.x, tileLoc.y)) != "number"){
    worldCollision.staticTiles.set(tileLoc.x, tileLoc.y, 0)
  }
  worldCollision.staticTiles.set(tileLoc.x, tileLoc.y, (worldCollision.staticTiles.get(tileLoc.x, tileLoc.y)+1))
  return true
}

function AddStaticCollision(location, size){
  if (typeof(size) == "undefined"){
    return AddStaticCollision(location);
  }

  var tileCover = {
    x: Math.ceil(size.x/worldCollision.tileSize),
    y: Math.ceil(size.y/worldCollision.tileSize)
  };
  var xOffSet = (tileCover.x*worldCollision.tileSize)/2;
  var yOffSet = (tileCover.y*worldCollision.tileSize)/2;
  for (var x=0; x<tileCover.x; x++){
    for (var y=0; y<tileCover.y; y++){
      AddStaticCollisionPoint({ x:(location.x+(x*worldCollision.tileSize))+xOffSet, y:(location.y+(y*worldCollision.tileSize))+yOffSet})
    }
  }
  return true;
}

function TestCollisionPoint(location){
  if (typeof(location) == "undefined"){
    return false;
  }else{
    if (typeof(location.x) != "number"){
      return false;
    }
    if (typeof(location.y) != "number"){
      return false;
    }
  }
  var tileLoc = {
    x: Math.round(location.x/worldCollision.tileSize),
    y: Math.round(location.y/worldCollision.tileSize)
  };
  if (worldCollision.staticTiles.get(tileLoc.x, tileLoc.y) >= 1){
    return true;
  }
  //defualt return
  return false;
}

function TestCollision(location, size){
  var collision = {
    up: false,
    down: false,
    left: false,
    right: false,
    center: false,
    normals: []
  }
  if (typeof(size) == "undefined"){
    collision.center = TestCollisionPoint(location);
    if (collision.center){
      var location = {
        x: (Math.round(location.x/collision.tileSize))*collision.tileSize,
        y: (Math.round(location.y/collision.tileSize))*collision.tileSize
      }
    }else{
      var location = {x:0, y:0};
    }
    collision.normals.push(new Vector2(location.x, location.y))
    return collision;
  }

  var tileCover = {
    x: Math.ceil(size.x/worldCollision.tileSize),
    y: Math.ceil(size.y/worldCollision.tileSize)
  };

  for (var x=0; x<=tileCover.x; x++){
    for (var y=0; y<=tileCover.y; y++){
      var pointVal = TestCollisionPoint({x: (location.x+(x*worldCollision.tileSize))-(tileCover.x/2), y: (location.y+(y*worldCollision.tileSize))-(tileCover.y/2)});
      if (pointVal){
        collision.normals.push({
          x: (Math.round(location.x+(x*worldCollision.tileSize)/worldCollision.tileSize))*worldCollision.tileSize,
          y: (Math.round(location.y+(y*worldCollision.tileSize)/worldCollision.tileSize))*worldCollision.tileSize
        })
        if (x == 0 && collision.right == false){
          collision.right = true;
        }
        if (x == tileCover.x && collision.left == false){
          collision.left = true;
        }
        if (y == 0 && collision.up == false){
          collision.up = true;
        }
        if (y == tileCover.y && collision.down == false){
          collision.down = true;
        }
      }
    }
  }
  return collision;
}
