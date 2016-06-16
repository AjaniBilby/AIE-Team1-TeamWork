class InputManager extends GameObject{
  constructor(){
    super();
    this.axises = {};
    this.actions = {};
    this.resetAxises;
    this.resetActions;
  }

  get resetAxises(){
    //get all axies
    for (var i=0; i<settings.controls.axises.length; i++){
      this.axises[settings.controls.axises[i].name] = {value: 0};
    }
  }

  get resetActions(){
    //get all actions
    for (var i=0; i<settings.controls.actions.length; i++){
      this.actions[settings.controls.actions[i].name] = {down: false, pressed: false, released: false};
    }
  }

  get update(){
    //Update axises
    for(var action=0; action<settings.controls.axises.length; action++){
      this.axises[settings.controls.axises[action].name] = 0;
      for (i=0; i<settings.controls.axises[action].inputs.length; i++){
        var key = settings.controls.axises[action].inputs[i].key;
        if (key.indexOf("KEY_") != -1){
          if (keyboard.isKeyDown(keyboard[settings.controls.axises[action].inputs[i].key])){
            this.axises[settings.controls.axises[action].name] += settings.controls.axises[action].inputs[i].value;
          }
        }else if (key.indexOf("MOUSE_") != -1){
          console.log("NO MOUSE CODE")
        }else if (key.indexOf("GAMEPAD_") != -1){
          this.axises[settings.controls.axises[action].name] += gamePad.value(settings.controls.axises[action].inputs[i].key, 0).value*settings.controls.axises[action].inputs[i].value;
        }
      }
      if (isNaN(this.axises[settings.controls.axises[action].name])){
        this.axises[settings.controls.axises[action].name] = 0;
      }
      this.axises[settings.controls.axises[action].name] = Clamp(this.axises[settings.controls.axises[action].name], -1, 1)
    }

    //Update actions
    for(var action=0; action<settings.controls.actions.length; action++){
      //Check if the action is setup
      if (typeof(this.actions[settings.controls.actions[action].name]) == "undefined"){
        this.actions[settings.controls.actions[action].name] = {};
      }
      if (typeof(this.actions[settings.controls.actions[action].name].down) == "undefined"){
        this.actions[settings.controls.actions[action].name].down = false;
      }
      if (typeof(this.actions[settings.controls.actions[action].name].press) == "undefined"){
        this.actions[settings.controls.actions[action].name].press = false;
      }
      if (typeof(this.actions[settings.controls.actions[action].name].release) == "undefined"){
        this.actions[settings.controls.actions[action].name].release = false;
      }
      var buttonDown = false;
      for (i=0; i<settings.controls.actions[action].inputs.length; i++){
        if (buttonDown == false){
          //Change down press and release values for actions
          var key = settings.controls.actions[action].inputs[i];
          if (key.indexOf("KEY_") != -1){
            buttonDown = keyboard.isKeyDown(keyboard[settings.controls.actions[action].inputs[i]]);
          }else if (key.indexOf("MOUSE_") != -1){

          }else if (key.indexOf("GAMEPAD_") != -1){
            buttonDown = (Math.abs(gamePad.value(settings.controls.axises[action].inputs[i].key, 0).value) > 0.5);
          }
        }
      }
      if (buttonDown){
        this.actions[settings.controls.actions[action].name].release = false;
        if (this.actions[settings.controls.actions[action].name].press == false && this.actions[settings.controls.actions[action].name].down == false){
          this.actions[settings.controls.actions[action].name].press = true;
        }else{
          this.actions[settings.controls.actions[action].name].press = false;
        }
        this.actions[settings.controls.actions[action].name].down = true;
      }else{
        this.actions[settings.controls.actions[action].name].press = false;
        if (this.actions[settings.controls.actions[action].name].release == false && this.actions[settings.controls.actions[action].name].down == true){
          this.actions[settings.controls.actions[action].name].release = true;
        }else{
          this.actions[settings.controls.actions[action].name].release = false;
        }
        this.actions[settings.controls.actions[action].name].down = false;
      }
    }
  }
}

InputManager.prototype.getAxis = function(name){
  var value = 0;
  if (typeof(this.axises[name]) != "undefined"){
    value = this.axises[name];
  }
  if (isNaN(value)){
    value = 0;
  }
  return value;
}

InputManager.prototype.getAction = function(name){
  var value = {down: false, pressed: false, released: false};
  if (typeof(this.actions[name]) != "undefined"){
    value.down = this.actions[name].down == true;
    value.down = this.actions[name].pressed == true;
    value.down = this.actions[name].released == true;
  }
  return value;
}

var control = new InputManager
console.log(control.getAxis("cat"));
