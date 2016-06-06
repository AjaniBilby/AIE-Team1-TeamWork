var collision = {
  tileSize: 10,
  staticTiles: []
};




/*------------------------------------------------------------------------------
  Functions
------------------------------------------------------------------------------*/
function AddStaticCollision(location){
  var tileLoc = {
    x: parseInt(location.x/collision.tileSize),
    y: parseInt(location.y/collision.tileSize)
  };
  if (typeof(collision.staticTiles[tileLoc.x]) != "object"){
    collision.staticTiles[tileLoc.x] = [];
  }
  if (typeof(collision.staticTiles[tileLoc.x][tileLoc.y]) == "number"){
    collision.staticTiles[tileLoc.x][tileLoc.y] += 1;
  }else{
    collision.staticTiles[tileLoc.x][tileLoc.y] = 1;
  }
  return true
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
    x: parseInt(location.x/collision.tileSize),
    y: parseInt(location.y/collision.tileSize)
  };
  if (typeof(collision.staticTiles) == "object") {
    if (typeof(collision.staticTiles[tileLoc.x]) == "object") {
      if (collision.staticTiles[tileLoc.x][tileLoc.y] >= 1){
        return true;
      }
    }
  }
  //else
  return false;
}

function TestCollision(location, size){
  if (typeof(size) == "undefined"){
    return TestCollisionPoint();
  }

  var tileCover = {
    x: Math.ceil(size.x/collision.tileSize),
    y: Math.ceil(size.y/collision.tileSize)
  };

  var isColliding = false;
  for (var x=0; x<tileCover.x; x++){
    if (isColliding != true){
      for (var y=0; y<tileCover.y; y++){
        if (isColliding != true){
          var point = {
            x:(location.x-(size.x/2))+x*collision.tileSize,
            y:(location.y-(size.y/2))+y*collision.tileSize
          }
          //console.log(location)
          isColliding = TestCollisionPoint(point)
        }else{
          break;
        }
      }
    }else{
      break;
    }
  }
  return isColliding;
}
