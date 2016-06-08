var collision = {
  tileSize: 10,
  staticTiles: new Array2D()
};




/*------------------------------------------------------------------------------
  Functions
------------------------------------------------------------------------------*/
function AddStaticCollision(location){
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
  if (typeof(size) == "undefined"){
    return TestCollisionPoint(location);
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
