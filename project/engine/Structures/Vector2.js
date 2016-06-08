/*----------------------------------------------------------
  Vector 2 class
----------------------------------------------------------*/
var Vector2 = function(x, y){
  if (x == "undefined"){
    x = 0;
  };
  if (y == "undefined"){
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
Vector2.prototype.RotateVector = function(center, end, angle){
  var radians = (Math.PI / 180) * angle,
		cos = Math.cos(radians),
		sin = Math.sin(radians),
		nx = (cos * (end[0] - center[0])) + (sin * (end[1] = center[1])) + center[0],
		ny = (cos * (end[1] - center[1])) + (sin * (end[0] = center[0])) + center[1];
	return [nx, ny];
};
Vector2.prototype.DistanceTo = function(end){
  var NewEnd = [
		(end.x - this.x),
		(end.y - this.y)
	];
  return Math.sqrt( (NewEnd[0] * NewEnd[0]) + (NewEnd[1] * NewEnd[1]) )
};
Vector2.prototype.LookAtRotation = function(target){
  return (Math.atan((target.x-this.x), (target.y-this.y)) * 180 / Math.PI);
}