LoadJS("engine/classDefaults/Structures.js");
LoadJS("engine/classDefaults/Functions.js");
LoadJS("engine/collision.js");
LoadJS("engine/render.js");
LoadJS("engine/drawSprite.js");
LoadJS("engine/classDefaults/actor.js")

console.log("Running Display")

/*------------------------------------------------------------------------------
  Setup Camera
------------------------------------------------------------------------------*/
var camera = {
  location: new Vector2(0,0)
}


/*------------------------------------------------------------------------------
  Setup Display
------------------------------------------------------------------------------*/

var canvas = document.getElementById("game-Canvas");

/*Create canvas if it doesn't exist*/
if (typeof(canvas) == undefined || canvas == null){
  canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 500;
  document.body.appendChild(canvas);
  EventResize();
};
var context = canvas.getContext("2d");


/**On Window Resize**/
function EventResize() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};
window.addEventListener("resize", function () { EventResize(); }, false);
EventResize();





/*------------------------------------------------------------------------------
  Functions
------------------------------------------------------------------------------*/
function WorldToScreen(worldLocation){
  return {x: worldLocation.x-(camera.location.x-canvas.width/2), y: worldLocation.y-(camera.location.y-canvas.height/2)};
};

function ScreenToWorld(screenLocation){
  var temp = {
    x: parseInt(screenLocation.x+(camera.location.x - canvas.width/2)),
    y: parseInt(screenLocation.y+(camera.location.y - canvas.height/2))
  }
  return screenLocation;
};




/*------------------------------------------------------------------------------
  Setup game tick
------------------------------------------------------------------------------*/
var dt = 0.0;
var lastTick = Date.now();
var MAXFRAMECOUNT = 60;


function AddTickEvent(ifunction, state){
  if (typeof(state) == "undefined"){
    state = "game";
  }
  if (typeof(game.tickEvents[state]) != "object"){
    game.tickEvents[state] = [];
  }
  game.tickEvents[state].push(ifunction);
};

function run(){
  //Handel Delta
  var now = Date.now();
  dt = (now - lastTick) / 1000.0; // Convert to ms
  lastTick = now;

  //Fill Background
  context.fillStyle = "rgba(0, 100, 255, 1)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (FileSystem.currentlyLoading > 0){
    //Draw Loading
    context.fillStyle = "rgb(209, 209, 209)"
    context.font = "38px Arial";
    var txt = "Loading... ";
    context.fillText(txt, (15), (SCREEN_HEIGHT - 40));

    //To stop the game from running while loading
    return;
  };

  //Run global tick Events
  if (typeof(game.tickEvents["*"]) == "object"){
    for (i=0; i<game.tickEvents["*"].length; i++){
      if (typeof(game.tickEvents["*"][i]) == "function"){
        game.tickEvents["*"][i](dt);
      }
    }
  }

  if (typeof(game.tickEvents[game.state]) == "object"){
    //Run tick Events
    for (i=0; i<game.tickEvents[game.state].length; i++){
      if (typeof(game.tickEvents[game.state][i]) == "function"){
        game.tickEvents[game.state][i](dt);
      }
    }
  }

  if (typeof(render) == "object"){
    if (typeof(render.Draw) == "function"){
      render.Draw();
    }
  }
};

//-------------------- Don't modify anything below here
// This code will set up the framework so that the 'run' function is
// called 60 times per second. We have some options to fall back on
// in case the browser doesn't support our preferred method.
(function () {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.requestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.mozRequestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        onEachFrame = function (cb) {
            setInterval(cb, 1000 / MAXFRAMECOUNT);
        }
    }
    window.onEachFrame = onEachFrame;
})();
window.onEachFrame(run);
