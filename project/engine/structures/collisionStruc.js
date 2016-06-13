class CollisionStruc{
  constructor(){
    this.new = {
      up: false,
      down: false,
      left: false,
      right: false,
      center: false
    }
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.center = false;
    this.normals = [];
  }

  get touching(){
    if (this.up || this.down || this.left || this.right || this.center){
      return true;
    }else{
      return false;
    }
  }

  get collisionNormal(){
    var totalX = 0;
    var totalY = 0;
    for (var i=0; i<this.collisionNormals.length; i++){
      totalX += this.normals[i].x;
      totalY += this.normals[i].y;
    }
    return {x: totalX/this.normals.length, y: totalY/this.normals.length}
  }
};
