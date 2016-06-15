console.log("Starting up postProcessor")

self.render = {
  layers: []
}

self.onmessage = function (msg) {
  switch (msg.data) {
    case 'draw':
      console.log("Will draw sir!")
      self.postMessage({message: "drawDone"});
      break;
    default:
      console.log("got message: ", msg);
  }
}

console.log(self)

self.postMessage({message: "loaded"})
