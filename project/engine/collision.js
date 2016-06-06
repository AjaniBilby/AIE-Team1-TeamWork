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

function TestCollision(location){
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
