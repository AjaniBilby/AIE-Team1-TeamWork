/*----------------------------------------------------------
  Transform Class
----------------------------------------------------------*/
var Transform = function(location, rotation, scale){
  //Set values to 0, if they are undefined
  if (typeof(location) == "undefined"){
    location = new Vector2();
  }
  if (typeof(location.x) == "number"){
    location.x = 0;
  }
  if (typeof(location.y) == "number"){
      location.y = 0;
  }
  if (typeof(rotation) == "number"){
    rotation = 0;
  }
  if (typeof(scale) == "undefined"){
    scale = new Vector2();
  }
  if (typeof(scale.x) == "number"){
    scale.x = 0;
  }
  if (typeof(scale.y) == "number"){
    scale.y = 0;
  }

  this.location = new Vector2(location.x, location.y);
  this.rotation = rotation;
  this.scale = new Vector2(scale.x, scale.y);
}
