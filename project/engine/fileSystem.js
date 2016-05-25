var FileSystem = {
  currentlyLoading: [],
  Loaded: [],
  LoadFinnishFunctions: []
};
var settings = {
  controlles: "null"
}

function LoadJS(script){
  if (FileSystem.currentlyLoading.length >= 2){
    setTimeout(function(){LoadJS(script);}, 100);
    return;
  }
  //Check if scripts is in list. -1 means it is not in list
  if (FileSystem.Loaded.indexOf(script) == -1 && FileSystem.currentlyLoading.indexOf(script) == -1){
    //Load File
    FileSystem.currentlyLoading.push(script);
    var NewScript = document.createElement('script');
    NewScript.src = script;
    NewScript.type = 'text/javascript';
    NewScript.async = "async";
    NewScript.id = script;
    NewScript.onload = setTimeout(function() {
      FileSystem.currentlyLoading.splice(FileSystem.currentlyLoading.indexOf(script), 1);
      //Add File to loaded list
      FileSystem.Loaded.push(script);
    }, 11);

    LoadLoop();

    console.debug("Finnished Loading: " + script);

    //Place in HTML document
    document.getElementsByTagName('head')[0].appendChild(NewScript);

    //Return if it is new
    return true;
  }
};

function LoadLoop(){
  if (FileSystem.currentlyLoading.length != 0){
    setTimeout(function (){LoadLoop()}, 1)
  }else{
    return;
  }
}

function ControlSetup(){
  obj = JSON.parse(fs.readFileSync("./settings/defaultInputs.json", 'utf8'));
  settings.controls = obj;
}
ControlSetup();

LoadJS("./engine/classDefaults/Structures.js");
LoadJS("./engine/classDefaults/Functions.js");
LoadJS("./engine/display.js");
LoadJS("./engine/inputHandler.js");
