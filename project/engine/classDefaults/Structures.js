LoadJS("engine/classDefaults/Functions.js");
LoadJS("engine/Structures/Vector2.js");
LoadJS("engine/Structures/Transform.js");
LoadJS("engine/Structures/Array.js");
LoadJS("engine/Structures/2D-array.js");

/*----------------------------------------------------------
  Custom Event Caller
----------------------------------------------------------*/
function CallEvent(actor, eventname){
  var event = new Event(eventname);
  actor.dispatchEvent(event);
}
