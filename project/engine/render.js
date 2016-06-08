var render = {
  layers: []
};

render.DrawSection = function(image, location, selection){
  //Use: DrawSection(image, {x: 100, y: 100}, {start: {x: 0, y: 0}, width: 400, height: 400 })
  if (typeof(image) == "undefined"){
    console.error("Render: undefined draw image ("+image+")");
    return "error";
  };

  if (typeof(location) != "object"){
    location = {x: 0, y: 0};
  }else{
    if (typeof(location.x) != "number"){
      location.x = 0;
    }
    if (typeof(location.y) != "number"){
      location.y = 0;
    }
  }
  var tempLocation = WorldToScreen(location);

  //Draw image
  if (typeof(selection) != "object"){
    selection = {};
  }
  if (typeof(selection.start) != "object"){
    selection.start.x = 0;
    selection.start.y = 0;
  }
  if (typeof(selection.width) != "number"){
    selection.width = image.width
  }
  if (typeof(selection.height) != "number"){
    selection.height = image.height
  }

  tempLocation.x -= selection.width/2;
  tempLocation.y -= selection.height/2;

  if (tempLocation.x+selection.width<0 || tempLocation.x>canvas.width || tempLocation.y+selection.height<0 || tempLocation.y>canvas.height){
    return;
  }

  context.drawImage(image, selection.start.x, selection.start.y, selection.width, selection.height, tempLocation.x, tempLocation.y, selection.width, selection.height);
};

render.AddRender = function(zorder, imageData){
  if (render.layers[zorder] != "object"){
    render.layers[zorder] = [];
  }
  render.layers[zorder].push(imageData);
};

render.Draw = function(dt){

  for (var l=0; l<render.layers.length; l++){
    for (var i=0; i<render.layers[l].length; i++){
      render.DrawSection(render.layers[l][i].image, render.layers[l][i].location, render.layers[l][i].selection);
    }
  }
  render.Reset()
};

render.Reset = function(){
  render.layers = [];
};
