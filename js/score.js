// The score !
var score = {
  sc:0,
  scEt:0,
  bigScore:0,
  addSc:100,
  subBall:1000,

  // Increments the score
  incScore: function() {
    this.sc++;
  },

  // Call when the player hit an ET
  hitEt: function() {
    this.scEt += this.addSc;
  },

  // Call when the player hit a ball
  hitBall: function() {
    if(this.sc+this.scEt < this.subBall) {
      this.sc = 0;
      this.scEt = 0;
    }
    else this.sc -= this.subBall;
  },

  // Reset the scores
  reset: function(){
    this.sc = 0;
    this.scEt = 0;
  },

  // Update the best Score
  updateScore: function() {
    if(this.sc+this.scEt > this.bigScore  ) this.bigScore = this.sc+this.scEt;
  },

  // Draw the scores
  draw: function(canvas, x , y) {

    canvas.ctx.save();
    canvas.ctx.fillStyle = "rgba(173, 216, 230, 0.5)"
    canvas.ctx.fillRect(x-5, y-20, 200, 47);

    canvas.ctx.strokeStyle = "white"; 
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(x-5, y-20);
    canvas.ctx.lineTo(x+195,y-20);
    canvas.ctx.lineTo(x+195,y+27);
    canvas.ctx.lineTo(x-5,y+27);
    canvas.ctx.lineTo(x-5,y-20);
    canvas.ctx.stroke();
    canvas.ctx.restore();

    canvas.ctx.fillStyle= "#191970";
    canvas.ctx.fillText("Score : " + (this.sc+this.scEt), x, y);
    canvas.ctx.fillText('Best Score : ' + this.bigScore, x, y+20);
  }
}