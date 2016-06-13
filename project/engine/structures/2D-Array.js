var Array2D = function(){
  this.list = [];
}

Array2D.prototype.set = function (x, y, value){
  if (x > 0) {
    if (typeof(this.list[x*2]) != "object"){
      this.list[x*2] = [];
    }
    if (y > 0){
      this.list[Math.abs(x)*2][Math.abs(y)*2] = value;
    }else{
      this.list[Math.abs(x)*2][Math.abs(y)*2-1] = value;
    }
  }else{
    if (typeof(this.list[Math.abs(x)*2-1]) != "object"){
      this.list[Math.abs(x)*2-1] = [];
    }

    if (y > 0){
      this.list[Math.abs(x)*2-1][Math.abs(y)*2] = value;
    }else{
      this.list[Math.abs(x)*2-1][Math.abs(y)*2-1] = value;
    }
  }
};

Array2D.prototype.get = function (x, y){
  if (x > 0){
    if (typeof(this.list[x*2]) != "object"){
      return undefined;
    }
    if (y > 0){
      return this.list[Math.abs(x)*2][Math.abs(y)*2];
    }else{
       return this.list[Math.abs(x)*2][Math.abs(y)*2-1];
    }
  }else{
    if (typeof(this.list[Math.abs(x)*2-1]) != "object"){
      return undefined;
    }
    if (y > 0){
      return this.list[Math.abs(x)*2-1][Math.abs(y)*2];
    }else{
       return this.list[Math.abs(x)*2-1][Math.abs(y)*2-1];
    }
  }
};

Array2D.prototype.indexOf = function(item){
  var index = {x: undefined, y:undefined};

  for (var x=0; x<this.list.length; x++){
    if (typeof(this.list[x]) == "object"){
      for (var y=0; y<this.list[x].length; y++){
        if (typeof(this.list[x][y]) != "undefined"){
          if (this.list[x][y] == item){
            index.x = x;
            index.y = y;

            if (isOdd(index.x)){
              index.x = -(index.x+1)/2
            }else{
              index.x = (index.x)/2
            }
            if (isOdd(index.y)){
              console.log(index.y)
              console.log("ODD")
              index.y = -(index.y+1)/2
            }else{
              index.y = (index.y)/2
            }
            return index;
          }
        }
      }
    }
  }
};
