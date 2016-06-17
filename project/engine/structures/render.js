var render = {
  layers: []
};

render.DrawSection = function(image, location, selection, rotation){
  //Use: DrawSection(image, {x: 100, y: 100}, {start: {x: 0, y: 0}, width: 400, height: 400 })
  if (typeof(image) == "undefined"){
    console.error("Render: undefined draw image ("+image+")");
    return "error";
  };

  if (typeof(rotation) != "number"){
    location = 0;
  }

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


  if (tempLocation.x+selection.width<0 || tempLocation.x-selection.width>canvas.width || tempLocation.y+selection.height<0 || tempLocation.y-selection.height>canvas.height){
    return;
  }
  context.save();
  context.translate(tempLocation.x, tempLocation.y);
  context.rotate(rotation);
  context.drawImage(image, selection.start.x, selection.start.y, selection.width, selection.height, -selection.width/2, -selection.height/2, selection.width, selection.height);
  context.restore();
};

render.AddRender = function(zorder, imageData){
  if (typeof(render.layers[zorder]) != "object"){
    render.layers[zorder] = [];
  }
  imageData.type = "image"
  render.layers[zorder].push(imageData);
};

render.AddText = function(content, size, position, zorder, alignment, color, font){
  var data = {};

  if (typeof(zorder) != "number"){
    zorder = 0;
  }
  if (typeof(font) != "string"){
    font = "Arial";
  }
  if (typeof(color) != "string"){
    color = "black";
  }
  if (typeof(size) != "number"){
    size = 6;
  }
  if (typeof(alignment) != "string"){
    alignment = "right";
  }
  alignment = Clamp(alignment, 0, 2);

  if (typeof(position) != "object"){
    position = {x: 0, y: 0};
  }else{
    if (typeof(position.x) != "number"){
      position.x = 0;
    }
    if (typeof(position.y) != "number"){
      position.y = 0;
    }
  }
  data.position = position;
  data.content = content;
  data.size = size;
  data.font = font;
  data.alignment = alignment;
  data.color = color

  if (typeof(render.layers[zorder]) != "object"){
    render.layers[zorder] = [];
  }
  data.type = "text"
  render.layers[zorder].push(data);
}

render.DrawText = function(data){
  context.fillStyle = data.color;
  context.font = data.size+"px "+data.font;
  context.textAlign = data.alignment;
  context.fillText(data.content, data.position.x, data.position.y+data.size/2)
}

render.Draw = function(dt){
  for (var l=0; l<render.layers.length; l++){
    if (typeof(render.layers[l]) == "object"){
      for (var i=0; i<render.layers[l].length; i++){
        if (render.layers[l][i].type == "image"){
          render.DrawSection(render.layers[l][i].image, render.layers[l][i].location, render.layers[l][i].selection, render.layers[l][i].rotation);
        }else if (render.layers[l][i].type == "text"){
          render.DrawText(render.layers[l][i]);
        }
      }
    }
  }
  render.Reset()
};

render.Reset = function(){
  render.layers = [];
};
