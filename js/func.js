// Generic function

// Return a random number between min and max
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

// Test collisions between circle
function circleCollide(x1, y1, r1, x2, y2, r2) {
	var dx = x1 - x2;
	var dy = y1 - y2;
	return ((dx * dx + dy * dy) < (r1 + r2)*(r1+r2));  
}

// Test collisions between rectangle
function rectsOverlap(x0, y0, w0, h0, x2, y2, w2, h2) {
	if ((x0 > (x2 + w2)) || ((x0 + w0) < x2))
	  return false;

	if ((y0 > (y2 + h2)) || ((y0 + h0) < y2))
	  return false;
	return true;
}

// Collisions between rectangle and circle
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
	var testX=cx; 
	var testY=cy; 

	if (testX < x0) testX=x0; 
	if (testX > (x0+w0)) testX=(x0+w0); 
	if (testY < y0) testY=y0; 
	if (testY > (y0+h0)) testY=(y0+h0); 

	return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))<r*r); 
}

// Collisions between 2 rectangles
function rectRectsOverlap(x0, y0, w0, h0, cx, cy, cw, ch) {
	var testX = false;
	var testT = false;

	// haut
	testX = (cx >= x0 && cx <= x0 + w0);
	testY = (cy >= y0 && cy <= y0 + h0);

	if(testX&&testY) return true;

	// bas
	testY = (cy >= y0 && cy - ch <= y0 + h0);

	if(testX&&testY) return true;

	// droite
	testY = (cy >= y0 && cy <= y0 + h0);

	if(testX&&testY) return true;

	// gauche
	testX = (cx + cw >= x0 && cx <= x0 + w0);

	if(testX&&testY) return true;

	return false;
}

// Get the mouse position
function getMousePos(evt) {
	// necessary to take into account CSS boudaries
	var rect = canvas.canva.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

// We want the rectangle to move at speed pixels/s (there are 60 frames in a second)
// If we are really running at 60 frames/s, the delay between frames should be 1/60
// = 16.66 ms, so the number of pixels to move = (speed * del)/1000. If the delay is twice
// longer, the formula works : let's move the rectangle twice longer!
var calcDistanceToMove = function(delta, speed) {
	return (speed * delta) / 1000; 
};

// calculate the number of digits of a number
function nbChiffre(nombre) {
	var i=0;
	for(; nombre >= 1; i++) {
		nombre /= 10;
	}
	return i;
}