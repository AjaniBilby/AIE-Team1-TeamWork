LoadJS("engine/structures/collisionStruc.js");

var collision = {
  tileSize: 10,
  staticTiles: new Array2D()
};




/*------------------------------------------------------------------------------
  Functions
------------------------------------------------------------------------------*/
function AddStaticCollisionPoint(location){
  var tileLoc = {
    x: Math.round(location.x/collision.tileSize),
    y: Math.round(location.y/collision.tileSize)
  };
  if (typeof(collision.staticTiles.get(tileLoc.x, tileLoc.y)) != "number"){
    collision.staticTiles.set(tileLoc.x, tileLoc.y, 0)
  }
  collision.staticTiles.set(tileLoc.x, tileLoc.y, (collision.staticTiles.get(tileLoc.x, tileLoc.y)+1))
  return true
}

function AddStaticCollision(location, size){
  if (typeof(size) == "undefined"){
    return AddStaticCollision(location);
  }

  var tileCover = {
    x: Math.ceil(size.x/collision.tileSize),
    y: Math.ceil(size.y/collision.tileSize)
  };

  for (var x=0; x<tileCover.x; x++){
    for (var y=0; y<tileCover.y; y++){
      AddStaticCollisionPoint({x:location.x+x*collision.tileSize , y:location.y+y*collision.tileSize})
    }
  }
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
    x: Math.round(location.x/collision.tileSize),
    y: Math.round(location.y/collision.tileSize)
  };
  if (collision.staticTiles.get(tileLoc.x, tileLoc.y) >= 1){
    return true;
  }
  //defualt return
  return false;
}

function TestCollision(location, size){
  collision = {
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
    x: Math.ceil(size.x/collision.tileSize),
    y: Math.ceil(size.y/collision.tileSize)
  };

  for (var x=0; x<=tileCover.x; x++){
    for (var y=0; y<=tileCover.y; y++){
      var pointVal = TestCollisionPoint({x: (location.x+(x*collision.tileSize))-(tileCover.x/2), y: (location.y+(y*collision.tileSize))-(tileCover.y/2)});
      if (pointVal){
        collision.normals.push({
          x: (Math.round(location.x+(x*collision.tileSize)/collision.tileSize))*collision.tileSize,
          y: (Math.round(location.y+(y*collision.tileSize)/collision.tileSize))*collision.tileSize
        })
        if (x == 0 && collision.right == false){
          collision.right = true;
        }
        if (x == tileCover.x && collision.left == false){
          collision.left = true;
        }
        if (y == 0 && collision.top == false){
          collision.top = true;
        }
        if (y == tileCover.y && collision.bottom == false){
          collision.bottom = true;
        }
      }
    }
  }
  return collision;
}
