/*----------------------------------------------------------
  Vector 2 class
----------------------------------------------------------*/
var Vector2 = function(x, y){
  if (typeof(x) == "undefined"){
    x = 0;
  };
  if (typeof(y) == "undefined"){
    y = 0;
  }
  this.x = x;
  this.y = y;
};

Vector2.prototype.Set = function (nx, ny){
  this.x = nx;
  this.y = ny;
};

Vector2.prototype.Magnitude = function (){
  var mag = this.x*this.x + this.y*this.y
  mag = Math.sqrt(mag);
  return mag;
};

Vector2.prototype.Normalize = function (){ //destructive
  var mag = this.Magnitude();
  this.x /= mag;
  this.y /= mag;
};

Vector2.prototype.GetNormal = function (){
  var mag = this.Magnitude();
  var v2 = new Vector2(0,0);
  v2.x = this.x / mag;
  v2.y = this.y / mag;
  return v2;
};

Vector2.prototype.Add = function (other){
  this.x += other.x;
  this.y += other.y
};

Vector2.prototype.Multiply = function (scalar){
  this.x *= other.x;
  this.y *= other.y;
};

/*---------------------------------------------------
  Function relevent to vector2
---------------------------------------------------*/
function RotateVector(end, angle, center){
  if (typeof(center) != "object"){
    center = {};
  }
  if (typeof(center.x) != "number"){
    center.x = 0;
  }
  if (typeof(center.y) != "number"){
    center.y = 0;
  }
  var radians = (Math.PI / 180) * angle;
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	var nx = (cos * (end.x - center.x)) + (sin * (end.y + center.y)) + center.x;
	var ny = (cos * (end.y - center.y)) + (sin * (end.x + center.x)) + center.x;
	return {x: nx, y: ny};
};

function DistanceTo(start, end){
  var NewEnd = [
		(end.x - start.x),
		(end.y - start.y)
	];
  return Math.sqrt( (NewEnd[0] * NewEnd[0]) + (NewEnd[1] * NewEnd[1]) )
};


function LookAtRotation(start, target){
  return (Math.atan((target.x-start.x), (target.y-start.y)) * 180 / Math.PI);
}
