// Black box class
function writer(text1, x1, y1, time){
	var x=x1, y=y1, text=text1, time=time;

	function getX() {
		return x;
	}
	function getY() {
		return y;
	}
	function getText() {
		return text;
	}
	function getTime() {
		return time;
	}
	function setX(x1) {
		x = x1;
	}
	function setY(y1) {
		y = y1;
	}
	function setText(text1) {
		text = text1;
	}
	function setTime(time1) {
		time = time1;
	}

	function draw() {
	}

	return {
		draw:draw,
		getX:getX,
		setX:setX,
		getY:getY,
		setY:setY,
		getText:getText,
		setText:setText,
		getTime:getTime,
		setTime:setTime
	}
}

// Write the menu (inherited of  writer)
function writeMenu() {
	var writ = new writer("menu", canvas.w/2, canvas.h/4, new Date().getTime());
	var blink = true;

	writ.draw = function() {
	    canvas.ctx.save();

	    var tx = 300, ty = 170;
	    canvas.ctx.fillStyle = "rgba(255,255,255,0.75)"; 
		canvas.ctx.shadowBlur=20;
		canvas.ctx.shadowColor="black";
	    canvas.ctx.beginPath();
	    canvas.ctx.arc(tx+375, ty+25, 25, 1.5*Math.PI, 2*Math.PI);
	    canvas.ctx.arc(tx+375, ty+200, 25, 0,0.5*Math.PI);
	    canvas.ctx.arc(tx+25, ty+200, 25, 0.5*Math.PI,Math.PI);
	    canvas.ctx.arc(tx+25, ty+25, 25, Math.PI, 1.5*Math.PI);
	    canvas.ctx.fill();

	    canvas.ctx.restore();
	    canvas.ctx.save();

	    canvas.ctx.strokeStyle = "rgba(25,25,170,1)"; 
	    canvas.ctx.beginPath();
	    canvas.ctx.moveTo(tx, ty+70);
	    canvas.ctx.lineTo(tx+400, ty+70);
	    canvas.ctx.stroke();

	    canvas.ctx.restore();
	    canvas.ctx.save();

	    canvas.ctx.fillStyle = "rgba(57,57,255,0.4)";

	    // Caret
	    if(new Date().getTime() - this.getTime() >= 500) {
	    	blink = !blink;
	    	this.setTime(new Date().getTime());
	    }

	    if(blink) {
		    var xa = 310;
		    var ya = 185;
		    canvas.ctx.fillStyle = "navy"; 
		    canvas.ctx.beginPath();
		    canvas.ctx.moveTo(xa, ya);
		    canvas.ctx.lineTo(xa+25,ya+25);
		    canvas.ctx.lineTo(xa,ya+50);
		    canvas.ctx.lineTo(xa,ya);
		    canvas.ctx.fill();

		    xa = 690;

		    canvas.ctx.beginPath();
		    canvas.ctx.moveTo(xa, ya);
		    canvas.ctx.lineTo(xa-25,ya+25);
		    canvas.ctx.lineTo(xa,ya+50);
		    canvas.ctx.lineTo(xa,ya);
		    canvas.ctx.fill();
    	
	    	canvas.ctx.font="40px Candara";
		    canvas.ctx.fillStyle = "navy";
		    var txt = "Press Enter to Play";
	        canvas.ctx.fillText(txt, 340, ya+36);
	    }
		
		canvas.ctx.font="22px Candara";
	    canvas.ctx.fillStyle = "navy";
	    var xmin = 310;
	    var ymin = 270;
        canvas.ctx.fillText("Make the best score !", xmin, ymin);
        canvas.ctx.fillText("Catch the UFO for extra points,", xmin, ymin+25);
        canvas.ctx.fillText("Hit a monster and your score go down !", xmin, ymin+50);
        canvas.ctx.fillText("If your score fell to 0, you LOSE !", xmin, ymin+75);
		canvas.ctx.font="30px Candara";
        canvas.ctx.fillText("Good Luck !!!", xmin+105, ymin+113);



	    canvas.ctx.restore();
	}

	return writ;
}

// Write the bonus score (inherited of  writer)
function writeBonusScore(text, x , y, time, c) {
	var writ = new writer(text, x, y, time);
	var px = "40", oldY=y, back=false, color = c;

	writ.draw = function() {		
	    canvas.ctx.save();

		canvas.ctx.font= px+"px Candara";
	    canvas.ctx.fillStyle= color;

	    canvas.ctx.fillText(text, x, y);


	    if(y <= oldY-30) back = true;

	   	if (!back) y-=2;
    	else y+=1;


	    if(px>0) {
	    	px-=1;
    		x+=1;	
	    } 

	    canvas.ctx.restore();
	}

	return writ;
}

// Write the new ball message (inherited of  writer)
function writeNewBall(text, x, y, time) {
	var writ = new writer(text, x, y, time);

	writ.draw = function() {		
	    canvas.ctx.save();

    	canvas.ctx.font="40px Candara";
	    
	    canvas.ctx.fillStyle = "red";
	    canvas.ctx.fillText(text, x, y);

	    canvas.ctx.restore();
	}

	return writ;
}

// Write the game over menu (inherited of  writer)
function writeGameOver() {
	var writ = new writer("gameover", canvas.w/2, canvas.h/2, 0);
	var img = new Image();

	writ.draw = function() {
		img.src="./picts/tdm.png";


	    canvas.ctx.save();

		canvas.ctx.shadowBlur=20;
		canvas.ctx.shadowColor="white";

		canvas.ctx.drawImage(img,canvas.w/2-300,0);


	    canvas.ctx.fillStyle = "rgba(32,32,143,0.4)"; 
	    canvas.ctx.strokeStyle = "rgba(255,255,255,0.53"; 

	    canvas.ctx.fillRect(this.getX()-260, this.getY()-50, 520, 125);
	    canvas.ctx.strokeRect(this.getX()-260, this.getY()-50, 520, 125);

		canvas.ctx.restore();
		canvas.ctx.save();

    	canvas.ctx.font="45px Candara";
	    canvas.ctx.fillStyle = "crimson";
		canvas.ctx.shadowBlur=15;
		canvas.ctx.shadowColor="black";

	    var txt = "GAME OVER";
        canvas.ctx.fillText(txt, this.getX()-130, this.getY());

        txt = "Press ENTER to start again";
        canvas.ctx.fillText(txt, this.getX()- 250, this.getY()+50);

	    canvas.ctx.restore();
	}

	return writ;
}