import React, { Component } from 'react';
import './GameCanvas.css';
import character from '../../img/spritesheet2.png';
import mushroom from '../../img/mushroom2.png';

class GameCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      STAGE_WIDTH : 600,
      STAGE_HEIGHT : 400,
      TIME_PER_FRAME : 33, //this equates to 30 fps
      GAME_FONTS : "bold 20px sans-serif",  
      COUNTER_X : 100,
      COUNTER_Y : 100,
      PATH_CHAR : 'img/spritesheet.png',

      CHAR_WIDTH : 72,
      CHAR_HEIGHT : 96,
      CHAR_START_X : 200,
      CHAR_START_Y : 200,
      CHAR_SPEED : 5,
      IMAGE_START_NORTH_Y : 0,
      IMAGE_START_EAST_Y : 96,
      IMAGE_START_SOUTH_Y : 192,
      IMAGE_START_WEST_Y : 288, 
      IMAGE_START_X : 0,
      IMAGE_START_Y : 98,
      SPRITE_WIDTH : 216,

      TEXT_PRELOADING : 'Loading ...', 
      TEXT_PRELOADING_X : 200, 
      TEXT_PRELOADING_Y : 200
    };

    this.charX = this.state.CHAR_START_X;
    this.charY = this.state.CHAR_START_Y;

    this.currX = this.state.IMAGE_START_X;
    this.currY = this.state.IMAGE_START_EAST_Y;

    //---------------
    //Preloading ...
    //---------------
    //Preload Art Assets
    // - Sprite Sheet    
    this.mushroomImage = new Image();
    this.mushroomImage.ready = false;
    this.mushroomImage.src = mushroom;
    
    this.charImage = new Image();
    this.charImage.ready = false;
    this.charImage.onload = this.imageLoaded.bind(this);
    this.charImage.src = character;
  }

  componentDidMount() {
    this.stage = this.myGameCanvas;
    this.stage.width = this.state.STAGE_WIDTH;
    this.stage.height = this.state.STAGE_HEIGHT;

    this.counter = 0;
    this.ctx = this.stage.getContext("2d");
    this.ctx.fillStyle = "white";
    this.ctx.font = this.state.GAME_FONTS;
    
    this.ctx.fillRect(0,0,this.stage.width, this.stage.height);
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(this.state.TEXT_PRELOADING, this.state.TEXT_PRELOADING_X, this.state.TEXT_PRELOADING_Y);

  }

  imageLoaded() {
    this.facing = "E"; //N = North, E = East, S = South, W = West
    this.isMoving = false;
    
    setInterval(
      this.update.bind(this), 
      this.state.TIME_PER_FRAME
    );

    document.addEventListener("keydown", this.keyDownHandler.bind(this), false); 
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false); 
  }

  //------------
  //Game Loop
  //------------
  update() { 
    this.counter++;
    
    //Clear Canvas
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, 0, this.stage.width, this.stage.height);

    if (this.isMoving)
    {
      if (this.facing == "N")
      {
        this.charY -= this.state.CHAR_SPEED;
        this.currY = this.state.IMAGE_START_NORTH_Y;
      }
      else if (this.facing == "E")
      {
        this.charX += this.state.CHAR_SPEED;
        this.currY = this.state.IMAGE_START_EAST_Y;
      }
      else if (this.facing == "S")
      {
        this.charY += this.state.CHAR_SPEED;
        this.currY = this.state.IMAGE_START_SOUTH_Y;
      }
      else if (this.facing == "W")
      {
        this.charX -= this.state.CHAR_SPEED;
        this.currY = this.state.IMAGE_START_WEST_Y;
      }
      
      this.currX += this.state.CHAR_WIDTH;
      
      if (this.currX >= this.state.SPRITE_WIDTH)
        this.currX = 0;
    }
    
    //Draw Image
    this.ctx.drawImage(
      this.charImage, 
      this.currX, 
      this.currY,
      this.state.CHAR_WIDTH,
      this.state.CHAR_HEIGHT,
      this.charX,
      this.charY,
      this.state.CHAR_WIDTH,
      this.state.CHAR_HEIGHT
    );

    this.ctx.drawImage(
      this.mushroomImage, 
      0, 
      0,
      46,
      45,
      400,
      400,
      46,
      45
    );    
    
  }

  //------------
  //Key Handlers
  //------------
  keyDownHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);

    if (keyPressed == "W")
    {   
      this.facing = "N";
      this.isMoving = true;
    }
    else if (keyPressed == "D")
    { 
      this.facing = "E";
      this.isMoving = true;    
    }
    else if (keyPressed == "S")
    { 
      this.facing = "S";
      this.isMoving = true;    
    }
    else if (keyPressed == "A")
    { 
      this.facing = "W";
      this.isMoving = true;    
    }
  }

  keyUpHandler(event) {
    var keyPressed = String.fromCharCode(event.keyCode);
    console.log("keyPressed is "+keyPressed);
    if ((keyPressed === "W") || (keyPressed === "A") || 
      (keyPressed === "S") || (keyPressed === "D"))
    {
      this.isMoving = false;
    }
  }

  render() {
    return (
      <div className="GameCanvas">
      <canvas ref={(ref) => this.myGameCanvas = ref} />
      </div>
      );
  }
}

export default GameCanvas;
