console.log(process.mainWindow)
function toolBarAction(action){
  switch (action){
    case "max":
      console.log("max")
      mainWindow.setFullScreen(!mainWindow.isFullScreen())
      break;
    case "min":
      console.log("min")
      break;
    case "close":
      console.log("close")
      break;
  }
}
