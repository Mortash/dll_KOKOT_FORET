// The monster !
function nuage() {
  this.x = (Math.round(Math.random())) ? 0 : 950;
  this.y = getRandomArbitrary(50,550);
  this.dir = 1;
  this.h = getRandomArbitrary(25,100);
  this.l = 0;
  this.speed = getRandomArbitrary(10,50);

  this.initDir = function() {
    // Define width
    this.l = this.h*2;

    // Define the direction of the cloud
    if(this.x === 950) {
      this.dir = -1;
    }
    this.x += this.dir*-1*this.l;
  };

  // Draw the cloud
  this.draw = function() {
    // save the context
    canvas.ctx.save();

    canvas.ctx.fillStyle = "white";
    canvas.ctx.strokeStyle = "black";
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(this.x, this.y-this.h/9);
    // haut
    canvas.ctx.bezierCurveTo(this.x, this.y-this.h/3, this.x+this.l/4, this.y-this.h/3, this.x+this.l/4, this.y-this.h/9);
    canvas.ctx.bezierCurveTo(this.x+this.l/4, this.y-this.h/3, this.x+this.l/2, this.y-this.h/3, this.x+this.l/2, this.y-this.h/9);
    canvas.ctx.bezierCurveTo(this.x+this.l/2, this.y-this.h/3, this.x+3*this.l/4, this.y-this.h/3, this.x+3*this.l/4, this.y-this.h/9);
    // droite
    canvas.ctx.bezierCurveTo(this.x+this.l, this.y-this.h/9, this.x+this.l, this.y+4*this.h/9, this.x+3*this.l/4, this.y+4*this.h/9);
    // bas
    canvas.ctx.bezierCurveTo(this.x+3*this.l/4, this.y+2*this.h/3,this.x+this.l/2,this.y+2*this.h/3,this.x+this.l/2,this.y+4*this.h/9);
    canvas.ctx.bezierCurveTo(this.x+this.l/2,this.y+2*this.h/3,this.x+this.l/4, this.y+2*this.h/3,this.x+this.l/4,this.y+4*this.h/9);
    canvas.ctx.bezierCurveTo(this.x+this.l/4,this.y+2*this.h/3,this.x, this.y+2*this.h/3,this.x,this.y+4*this.h/9);
    // gauche
    canvas.ctx.bezierCurveTo(this.x-this.l/4,this.y+4*this.h/9, this.x-this.l/4, this.y-this.h/9, this.x,this.y-this.h/9);
    canvas.ctx.fill();
    canvas.ctx.stroke();
    
    // restore the context
    canvas.ctx.restore(); 
  };

  // Move the cloud
  this.move = function(delta) {
    var newX = calcDistanceToMove(delta, this.speed);
    this.x += (newX*this.dir);
  };
};