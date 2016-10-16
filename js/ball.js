// constructor function for balls
function Ball() {
  this.col = {
    0 : '#6495ED', // bleu
    1 : '#FF3A19', // rouge
    2 : '#FFD700', // jaune
    3 : '#B22C8C', // violet

    // darker color
    4 : '#36507F',
    5 : '#7F1D0C',
    6 : '#AD9200',
    7 : '#852168',

    number: function() {
      return 4;
    },
  };

  this.x = canvas.w*Math.random();
  this.y = canvas.h*Math.random();
  this.angle = (2*Math.PI)*Math.random();
  this.v = getRandomArbitrary(30,100);
  this.radius = getRandomArbitrary(10,20);
  this.color = Math.round(getRandomArbitrary(0,(this.col.number())-1));

  // Draw a ball
  this.draw = function() {
    // Body
    canvas.ctx.save();
    canvas.ctx.beginPath();
    canvas.ctx.fillStyle = this.col[this.color];
    canvas.ctx.strokeStyle = this.col[(this.col.number()) + this.color];
    canvas.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    canvas.ctx.fill();
    canvas.ctx.stroke();

    // mouth
    canvas.ctx.strokeStyle = "black";
    canvas.ctx.fillStyle = "white";
    canvas.ctx.lineJoin="round";

    canvas.ctx.beginPath();
    canvas.ctx.moveTo(this.x-5*this.radius/8, this.y+this.radius/8);
    canvas.ctx.lineTo(this.x-2.5*this.radius/8, this.y+2.7*this.radius/4);
    canvas.ctx.lineTo(this.x, this.y+this.radius/8);
    canvas.ctx.lineTo(this.x+2.5*this.radius/8, this.y+2.7*this.radius/4);
    canvas.ctx.lineTo(this.x+5*this.radius/8, this.y+this.radius/8);
    canvas.ctx.stroke();

    // left eye
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(this.x-5*this.radius/8, this.y-5*this.radius/8);
    canvas.ctx.lineTo(this.x-this.radius/8, this.y-this.radius/8);
    canvas.ctx.lineTo(this.x-5*this.radius/8, this.y-this.radius/8);
    canvas.ctx.closePath();
    canvas.ctx.fill();
    canvas.ctx.stroke();

    canvas.ctx.fillStyle = "red";
    canvas.ctx.beginPath();
    canvas.ctx.arc(this.x-3.5*this.radius/8, this.y-2.5*this.radius/8, this.radius/10, 0, 2*Math.PI);
    canvas.ctx.fill();

    // right eye
    canvas.ctx.fillStyle = "white";
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(this.x+5*this.radius/8, this.y-5*this.radius/8);
    canvas.ctx.lineTo(this.x+this.radius/8, this.y-this.radius/8);
    canvas.ctx.lineTo(this.x+5*this.radius/8, this.y-this.radius/8);
    canvas.ctx.closePath();
    canvas.ctx.fill();
    canvas.ctx.stroke();

    canvas.ctx.fillStyle = "red";
    canvas.ctx.beginPath();
    canvas.ctx.arc(this.x+3.5*this.radius/8, this.y-2.5*this.radius/8, this.radius/10, 0, 2*Math.PI);
    canvas.ctx.fill();

    canvas.ctx.restore();

  };

  // move the ball
  this.move = function() {
    var incX = this.v * Math.cos(this.angle);
    var incY = this.v * Math.sin(this.angle);

    this.x += calcDistanceToMove(delta, incX);
    this.y += calcDistanceToMove(delta, incY);
  };
}

