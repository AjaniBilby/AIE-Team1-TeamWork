/*
OLD Code
var newControllerClass = {};
//SpawnController({location: {x:0,y:0}, rotation: 0, size:{x:164,y:124}}, "playerController")

newControllerClass.tickEvent = function(dt, id){
  console.log("controller Got a tick :D");
};

newControllerClass.EventPlay = function(id){
  console.log("Spawned Actor: ", GetControllerById(id));
  SpawnActor({location: {x:0,y:0}, rotation: 0, size:{x:164,y:124}}, "CarActor", function(newId){
    GetControllerById(id).Possess(newId)
  })
};
*/

class PlayerController extends Controller{
  constructor(){
    super("controller");
    var pawn = new CarActor;
    this.Possess(pawn.id);
    this.score = 0;
    this.isHighScore = false;
    this.respawning = false;
  }

  get tickEvent(){
    //TODO the controller got a tick
    if (this.controlledActorID == null && !this.respawning){
      if (this.isHighScore){
        render.AddText("New Highscore", 25, {x: canvas.width/2, y: canvas.height/2}, 10, "center", "yellow");
        render.AddText("Highscore: "+highscore, 14, {x: canvas.width/2, y: canvas.height/2+50}, 10, "center", "white");
      }else{
        render.AddText("You Died", 25, {x: canvas.width/2, y: canvas.height/2}, 10, "center", "white");
      }
      render.AddText("Score: "+this.score, 14, {x: canvas.width/2, y: canvas.height/2+100}, 10, "center", "white");

      //Respawn
      if (control.getAction("Restart").press){
        this.respawning = true;
        objects.list = [];
        objects.players = [];
        objects.types = [];
        tileEndPoint = 2000;
        worldCollision.staticTiles = new Array2D()
        control = new InputManager
        new FloorTileActor
        new PlayerController
      }
    }else{
      this.score = Math.ceil((-this.controlledActor.location.y)/100);
      render.AddText("Score: "+this.score, 25, {x: canvas.width-14, y: 15}, 10, "right", "white");
    }
  }

  get dePosses(){
    if (this.score > highscore){
      this.isHighScore = true;
      highscore = this.score;
    }
  }
}
