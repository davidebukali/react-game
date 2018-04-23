import React, { Component } from 'react';
import './GameCanvas.css';
import character from '../../img/spritesheet2.png';

class GameCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      STAGE_WIDTH : 600,
      STAGE_HEIGHT : 400,
      TIME_PER_FRAME : 330, //this equates to 30 fps
      GAME_FONTS : "bold 20px sans-serif",  
      COUNTER_X : 100,
      COUNTER_Y : 100,
      PATH_CHAR : 'img/spritesheet.png',

      CHAR_WIDTH : 72,
      CHAR_HEIGHT : 96,
      CHAR_START_X : 200,
      CHAR_START_Y : 200,
      IMAGE_START_X : 0,
      IMAGE_START_Y : 98,
      SPRITE_WIDTH : 216,

      TEXT_PRELOADING : 'Loading ...', 
      TEXT_PRELOADING_X : 200, 
      TEXT_PRELOADING_Y : 200
    };
    this.currX = this.state.IMAGE_START_X;
    this.currY = this.state.IMAGE_START_Y;

    //---------------
    //Preloading ...
    //---------------
    //Preload Art Assets
    // - Sprite Sheet    
    this.charImage = new Image(
      this.state.CHAR_WIDTH,
      this.state.CHAR_HEIGHT
    );
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
    this.ctx.fillStyle = "black";
    this.ctx.font = this.state.GAME_FONTS;
    
    this.ctx.fillRect(0,0,this.stage.width, this.stage.height);
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(this.state.TEXT_PRELOADING, this.state.TEXT_PRELOADING_X, this.state.TEXT_PRELOADING_Y);

  }

  imageLoaded() {
    setInterval(
      this.update.bind(this), 
      this.state.TIME_PER_FRAME
    );
  }

  //------------
  //Game Loop
  //------------
  update() { 
    this.counter++;
    
    //Clear Canvas
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.stage.width, this.stage.height);
    
    //Draw Image
    this.ctx.drawImage(
      this.charImage, 
      this.currX, 
      this.currY,
      this.state.CHAR_WIDTH,
      this.state.CHAR_HEIGHT,
      this.state.CHAR_START_X,
      this.state.CHAR_START_Y,
      this.state.CHAR_WIDTH,
      this.state.CHAR_HEIGHT
    );
    
    this.currX += this.state.CHAR_WIDTH;
    if (this.currX >= this.state.SPRITE_WIDTH)
      this.currX = 0;
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
