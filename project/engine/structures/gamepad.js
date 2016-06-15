var Gamepad = function(){
  this.GAMEPAD_A = 0;
  this.GAMEPAD_B = 1;
  this.GAMEPAD_X = 2;
  this.GAMEPAD_Y = 3;
  this.GAMEPAD_LEFTSHOULDER = 4;
  this.GAMEPAD_RIGHTSHOULDER = 5;
  this.GAMEPAD_LEFTTRIGGER = 6;
  this.GAMEPAD_RIGHTTRIGGER = 7;
  this.GAMEPAD_BACK = 8;
  this.GAMEPAD_START = 9;
  this.GAMEPAD_LEFTSTICKDOWN = 10;
  this.GAMEPAD_RIGHTSTICKDOWN = 11;
  this.GAMEPAD_DPADUP = 12;
  this.GAMEPAD_DPADDOWN = 13;
  this.GAMEPAD_DPADLEFT = 14;
  this.GAMEPAD_DPADRIGHT = 15

  this.GAMEPAD_LEFTSTICKX = 0;
  this.GAMEPAD_LEFTSTICKY = 1;
  this.GAMEPAD_RIGTHSTICKX = 2;
  this.GAMEPAD_RIGTHSTICKY = 3;
}

Gamepad.prototype.value = function(key, controller){
  key = key.toUpperCase()
  if (isNaN(controller) == false){
    controller = 0;
  }
  if ((typeof(navigator.getGamepads()[controller]) == "object")){
    if (key.indexOf("STICK") != -1 && key.indexOf("DOWN") == -1){
      var value = navigator.getGamepads()[controller].axes[this[key]];
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
