var fileSystem = {
  root: './app.asar/',
  currentlyLoading: [],
  Loaded: []
};

function LoadJS(script, force, log){
  var original = script;
  script = './app.asar/'+script;

  //Dose file exist
  if (!fs.existsSync(script)){
    console.error("LoadJS: Cannot find file ("+ script +")");
    return false;
  }

  //If you are forcing a file to load, then don't bother checking if it exists
  if (force != true){
    //Check if scripts is in list. -1 means it is not in list
    if (fileSystem.Loaded.indexOf(script) != -1 || fileSystem.currentlyLoading.indexOf(script) != -1){
      return false
    }
  }

  //Setup new script for loading
  fileSystem.currentlyLoading.push(script);
  var NewScript = document.createElement('script');
  NewScript.type = 'text/javascript';
  NewScript.id = original;

  //Load file and add data to the new script
  var obj = fs.readFileSync(script, 'utf8');
  NewScript.innerHTML = obj;

  //Remove file from loading list
  fileSystem.currentlyLoading.splice(fileSystem.currentlyLoading.indexOf(script), 1);

  //Add File to loaded list
  fileSystem.Loaded.push(script);

  //Place in HTML document so it runs, then remove it
  document.getElementsByTagName('head')[0].appendChild(NewScript);
  document.head.removeChild(document.getElementById(original));

  if (log){
    console.log("Finnished Loading ("+original+")");
  }

  //Return if it is new
  return true;
};

LoadJS("engine/startup.js")
