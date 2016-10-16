// The monster !
var monster = {
  x:getRandomArbitrary(50,950),
  y:getRandomArbitrary(50,550),
  h:70,
  l:70,
  speed:300,
  boundingCircleRadius: 70,
  inputStates: {},
  miam: false,

  // Draw the monster
  draw: function() {
    canvas.ctx.save();

    canvas.ctx.fillStyle = "white";
    canvas.ctx.strokeStyle = "black";

    canvas.ctx.translate(this.x - 50, this.y - 50);

    /********  body  ********/
    canvas.ctx.fillRect(0, 0, this.h, this.l);
    canvas.ctx.strokeRect(0, 0, this.h, this.l);


    /********  nose  ********/
    canvas.ctx.fillStyle = "black";
    // left 
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(25, 35);
    canvas.ctx.lineTo(35, 45);
    canvas.ctx.arc(35, 35, 10, 0.5*Math.PI, Math.PI);
    canvas.ctx.fill();

    // right
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(45, 35);
    canvas.ctx.lineTo(35, 45);
    canvas.ctx.arc(35, 35, 10, 0, 0.5*Math.PI);
    canvas.ctx.fill();

    // philtrum
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(35,45);
    canvas.ctx.lineTo(35,55);
    canvas.ctx.stroke();

    /********  mouth  ********/
    canvas.ctx.beginPath();
    canvas.ctx.arc(35,35,20,0.3*Math.PI,0.7*Math.PI);
    canvas.ctx.stroke();

    /********  eyes  ********/
    // left
    canvas.ctx.beginPath();
    canvas.ctx.arc(35,25,10, 0.8*Math.PI, 1.2*Math.PI);
    canvas.ctx.arc(19,25,10, 1.8*Math.PI, 2.2*Math.PI);
    canvas.ctx.fill();

    // right
    canvas.ctx.beginPath();
    canvas.ctx.arc(35,25,10, 1.8*Math.PI, 2.2*Math.PI);
    canvas.ctx.arc(51,25,10, 0.8*Math.PI, 1.2*Math.PI);
    canvas.ctx.fill();

    /********  mustache  ********/
    // top left
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(5,38);
    canvas.ctx.lineTo(20,43);
    canvas.ctx.stroke();
    // top right
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(5,53);
    canvas.ctx.lineTo(20,48);
    canvas.ctx.stroke();
    // bottom left
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(50,43);
    canvas.ctx.lineTo(65,38);
    canvas.ctx.stroke();
    // bottom right
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(50,48);
    canvas.ctx.lineTo(65,53);
    canvas.ctx.stroke();

    /********  hears  ********/
    // left
    canvas.ctx.fillStyle = "#F5A9A9";
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(11.5,18);
    canvas.ctx.lineTo(16.5,18);
    canvas.ctx.lineTo(12,8.5);
    canvas.ctx.lineTo(10,12);
    canvas.ctx.fill();

    canvas.ctx.beginPath();
    canvas.ctx.moveTo(8,18);
    canvas.ctx.lineTo(20,18);
    canvas.ctx.lineTo(14,5);
    canvas.ctx.lineTo(2,27);
    canvas.ctx.lineTo(4,5);
    canvas.ctx.lineTo(14,5);
    canvas.ctx.stroke();

    // right
    canvas.ctx.fillStyle = "#F5A9A9";
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(53.5,18);
    canvas.ctx.lineTo(58.5,18);
    canvas.ctx.lineTo(60,12);
    canvas.ctx.lineTo(58,8.5);
    canvas.ctx.fill();

    canvas.ctx.beginPath();
    canvas.ctx.moveTo(62,18);
    canvas.ctx.lineTo(50,18);
    canvas.ctx.lineTo(56,5);
    canvas.ctx.lineTo(68,27);
    canvas.ctx.lineTo(66,5);
    canvas.ctx.lineTo(56,5);
    canvas.ctx.stroke();

    canvas.ctx.restore();
  },

  // Move the position monster
  updateMonsterPosition: function(delta) {
    this.speedX = this.speedY = 0;
    // check inputStates
    if (this.inputStates.left) {
      this.speedX = -this.speed;
    }
    if (this.inputStates.up) {
      this.speedY = -this.speed;
    }
    if (this.inputStates.right) {
      this.speedX = this.speed;
    }
    if (this.inputStates.down) {
      this.speedY = this.speed;
    } 
    if (this.inputStates.space) {
      this.speed = 500;
    } else {
      this.speed = 300;
    }
    if (this.inputStates.mousePos) { 
    }
    if (this.inputStates.mousedown) {
    }

    // Compute the incX and inY in pixels depending
    // on the time elasped since last redraw
    var newX = calcDistanceToMove(delta, this.speedX);
    var newY = calcDistanceToMove(delta, this.speedY);
    // gauche & droite
    if(this.x + newX - this.l/2 - 16 <= 0) {
      this.x = canvas.w - this.l/2;
    } else if(this.x + newX + this.l/2 + 10 >= canvas.w + this.l/2) {
      this.x = this.l/2 + newX + 10;
    } else {
      this.x += newX;
    }

    // haut et bas
    if(this.y + newY - this.h/2 -16 <= 0) {
      this.y = canvas.h - this.h/2;
    } else if(this.y + newY + this.h/2 + 16 >= canvas.h + this.h/2) {
      this.y = this.h/2 + 16;
    } else {
      this.y += newY;
    }
  }
};