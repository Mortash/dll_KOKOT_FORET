// Classe ET
function ET() {
  this.y = getRandomArbitrary(50,550);
  this.v = getRandomArbitrary(300,500);
  this.x = (Math.round(Math.random())) ? 25 : 975;
  this.angle = (this.x === 25) ? getRandomArbitrary(1.75,2.25)*Math.PI : getRandomArbitrary(0.75,1.25)*Math.PI;
  this.color = "red";
  this.w=35;
  this.h=17.5;

  // Draw ET
  this.draw = function() {
    canvas.ctx.save();

    canvas.ctx.fillStyle = this.color;
    canvas.ctx.strokeStyle = "black";

    var b = true;

    canvas.ctx.beginPath();
    canvas.ctx.moveTo(this.x, this.y);
    canvas.ctx.bezierCurveTo(this.x, this.y-this.h, this.x+this.w, this.y-this.h, this.x+this.w, this.y);
    canvas.ctx.lineTo(this.x, this.y);
    canvas.ctx.fill();
    canvas.ctx.stroke();

    canvas.ctx.beginPath();
    canvas.ctx.moveTo(this.x+5,this.y);
    canvas.ctx.lineTo(this.x+7.5, this.y+5);
    canvas.ctx.lineTo(this.x+10, this.y);
    canvas.ctx.fill();
    canvas.ctx.stroke();

    canvas.ctx.beginPath();
    canvas.ctx.moveTo(this.x+25,this.y);
    canvas.ctx.lineTo(this.x+27.5, this.y+5);
    canvas.ctx.lineTo(this.x+30, this.y);
    canvas.ctx.fill();
    canvas.ctx.stroke();

    canvas.ctx.beginPath();
    canvas.ctx.moveTo(this.x+15,this.y);
    canvas.ctx.lineTo(this.x+17.5, this.y+2.5);
    canvas.ctx.lineTo(this.x+20, this.y);
    canvas.ctx.fill();
    canvas.ctx.stroke();

    // windows
    canvas.ctx.fillStyle = "white";
    canvas.ctx.fillRect(this.x+5, this.y-6, 2.5, 2.5);
    canvas.ctx.fillRect(this.x+12.5, this.y-6, 2.5, 2.5);
    canvas.ctx.fillRect(this.x+20, this.y-6, 2.5, 2.5);
    canvas.ctx.fillRect(this.x+27.5, this.y-6, 2.5, 2.5);
    canvas.ctx.strokeRect(this.x+5, this.y-6, 2.5, 2.5);
    canvas.ctx.strokeRect(this.x+12.5, this.y-6, 2.5, 2.5);
    canvas.ctx.strokeRect(this.x+20, this.y-6, 2.5, 2.5);
    canvas.ctx.strokeRect(this.x+27.5, this.y-6, 2.5, 2.5);

    canvas.ctx.restore();
  };

  // Move ET
  this.move = function() {
    var incX = this.v * Math.cos(this.angle);
    var incY = this.v * Math.sin(this.angle);

    this.x += calcDistanceToMove(delta, incX);
    this.y += calcDistanceToMove(delta, incY);
  };
}
