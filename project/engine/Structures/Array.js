var Array = function(){
  this.list = [];
}

Array.prototype.set = function (x, value){
  if (x > 0) {
    if (typeof(this.list[x*2]) != "object"){
      this.list[x*2] = [];
    }
    this.list[Math.abs(x)*2] = value;
  }else{
    this.list[(Math.abs(x)*2)-1] = value;
  }
};

Array.prototype.get = function (x){
  if (x > 0){
    if (typeof(this.list[x*2]) == "undefined"){
      return undefined;
    }
    return this.list[x*2];
  }else{
    if (typeof(this.list[Math.abs(x)*2-1]) == "undefined"){
      return undefined;
    }
    return this.list[Math.abs(x)*2-1];
  }
};

Array.prototype.forAll = function(callback){
  for (var i=0; i<this.list.length; i++){
    if (typeof(this.list[i]) != "undefined"){
      var index=i
      if (isOdd(index)){
        index = -(index+1)/2
      }else{
        index = (index)/2
      }
      if (typeof(callback) == "function"){
        callback(index)
      }
    }
  }
}
