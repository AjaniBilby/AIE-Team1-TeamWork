var Gamepad = function(){
  this.A = 0;
  this.B = 1;
  this.X = 2;
  this.Y = 3;
  this.LEFTSHOULDER = 4;
  this.RIGHTSHOULDER = 5;
  this.LEFTTRIGGER = 6;
  this.RIGHTTRIGGER = 7;
  this.BACK = 8;
  this.START = 9;
  this.LEFTSTICKDOWN = 10;
  this.RIGHTSTICKDOWN = 11;
  this.DPADUP = 12;
  this.DPADDOWN = 13;
  this.DPADLEFT = 14;
  this.DPADRIGHT = 15

  this.LEFTSTICKX = 0;
  this.LEFTSTICKY = 1;
  this.RIGTHSTICKX = 2;
  this.RIGTHSTICKY = 3;
}

Gamepad.prototype.value = function(key, controller){
  key = key.toUpperCase()
  if (isNaN(controller) == false){
    controller = 0;
  }
  if ((navigator.getGamepads()[controller] != undefined)){
    if (key.indexOf("STICK") != -1 && key.indexOf("DOWN") == -1){
      var value = navigator.getGamepads()[controller].axis[this[key]];
      if (Math.abs(value) < 0.1){
        value = 0;
      }
      return {pressed: (value!=0), value: value};
    }else{
      return navigator.getGamepads()[controller].buttons[this[key]];
    }
  }else{
    return {pressed: false, value: 0};
  }
}

var gamePad = new Gamepad();
console.log("GAME PAD")
