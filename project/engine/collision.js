var collision = {};
collision.tileSize = 20;




/*------------------------------------------------------------------------------
  Functions
------------------------------------------------------------------------------*/
function WorldToCollisionTile(location){
  location.x = parseInt(location.x/collision.tileSize);
  location.y = parseInt(location.y/collision.tileSize);
  return location;
}

function CollisionTileToWorld(tile){
  tile.x *= collision.tileSize;
  tile.y *= collision.tileSize;
  return tile;
};

function AddStaticCollision(location){
  var tileLoc = {};
  tileLoc.x = location.x;
  tileLoc.y = location.y;
  if (typeof(collision.static) != "object"){
    collision.static = [];
  }
  if (typeof(collision.static[x]) != "object"){
    collision.static = [];
  }
  collision.static[x][y] = true;
}

function TestCollision(point){
  if (typeof(collision.static) != "object"){
    return false
  }
  if (typeof(collision.static[point.x]) != "object"){
    return false;
  }
  return collision.static[point.x][point.y];
}
