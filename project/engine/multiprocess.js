console.log("START")
var start = Date.now()

var postProcess = new Worker('engine/postProcessor.js');
postProcess.addEventListener('message', function(e) {
  switch (e.data.message) {
    case "drawDone":

      break;
    default:
      console.log(e.data.message)
  }
})

function RunProcess(script, arguments){
  new Worker(script);
  return true;
}
