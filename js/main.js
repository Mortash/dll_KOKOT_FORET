// Inits
window.onload = function init() {
  var game = new GF();
  game.start();
};

// GAME FRAMEWORK STARTS HERE
var GF = function(){

  // etat du jeu
  var tempsTotal=0;

  var modScore = 250;
  var modET = 400;
  var modNuage = 175;
  var lastBigScore = 0;

  var maxBalls=0;
  var maxEt=0;

  var etats = {
    menuPrincipal : 0,
    jeuEnCours : 1,
    gameOver : 2,
  };

  var etatCourant = etats.menuPrincipal;

  // vars for counting frames/s, used by the measureFPS function
  var frameCount = 0;
  var lastTime;
  var fpsContainer;
  var fps=0; 

  var oldTime = 0;

  // Fonction du jeu

  var measureFPS = function(newTime){
    // test for the very first invocation
    if(lastTime === undefined) {
      lastTime = newTime; 
      return;
    }

    //calculate the difference between last & current frame
    var diffTime = newTime - lastTime; 

    if (diffTime >= 1000) {
      fps = frameCount;    
      frameCount = 0;
      lastTime = newTime;
    }


    //and display it in an element we appended to the 
    // document in the start() function
    //fpsContainer.innerHTML = 'FPS: ' + fps; 
    frameCount++;
  };

  // clears the canvas content
  function clearCanvas() {
    canvas.ctx.clearRect(0, 0, canvas.w, canvas.h);
  }

  function timer(currentTime) {
    var delta = currentTime - oldTime;
    oldTime = currentTime;
    return delta;
  }

  var mainLoop = function(time){
    // Clear the canvas
    clearCanvas();

    if(monster.dead) {
      etatCourant = etats.gameOver;
    }

    switch(etatCourant) {
      case etats.menuPrincipal:
        //oldTime = new Date().getTime();
        writeWriter();

        if(monster.inputStates.enter) {
          canvas.writ = [];
          createBalls(10);
          etatCourant = etats.jeuEnCours;
        }
        break;
      case etats.jeuEnCours: 
        //main function, called each frame 
        measureFPS(time);

        // number of ms since last frame draw
        delta = timer(time);
        tempsTotal += delta;
        score.incScore();

        if(score.sc%modScore === 0 ) {
          createBalls(1);
        }
        if(score.sc%modET === 0 ) {
          var et =  new ET();
          var str = "New UFO !";
          canvas.writ[canvas.writ.length] = new writeNewBall(str, canvas.w/2 - (str.length/2)*12, 100, new Date().getTime());;
          canvas.etArray.push(et);
        }
        if(score.sc%modNuage === 0 ) {
          var nua =  new nuage();
          canvas.nuageArray.push(nua);
          canvas.nuageArray[canvas.nuageArray.length-1].initDir();
        }


        // draw the monster
        monster.draw();

        // Check inputs and move the monster
        monster.updateMonsterPosition(delta);


        // update and draw balls
        updateBalls(delta);
        // update and draw ET
        updateET(delta);

        // update and draw nuage
        updateNuage(delta);

        score.draw(canvas, 10, 570);

        score.updateScore();

        writeWriter();
        break;

      case etats.gameOver:
        score.updateScore();
        score.draw(canvas, 10, 570);

        writeWriter();

        // réinitialise la partie
        if(monster.inputStates.enter) {

          canvas.writ.splice(canvas.writ.length-1,1);
          tempsTotal-=tempsTotal;
          lastTime-=lastTime;
          score.reset();
          canvas.reset();
          maxBalls-=maxBalls;
          monster.x = getRandomArbitrary(50,950);
          monster.y = getRandomArbitrary(50,550)
          createBalls(10);
          monster.dead = false;
          etatCourant = etats.jeuEnCours;

          for(var i = 0; i < 3; i++) {
            var nua =  new nuage();
            nua.initDir();
            canvas.nuageArray.push(nua);
          }
        }
        break;

      }
      requestAnimationFrame(mainLoop);
    };

function createBalls(numberOfBalls) {
  for(var i=0; i < numberOfBalls; i++) {

    // Create a ball with random position and speed. 
    // You can change the radius

    var ball =  new Ball();

    if(!circleCollide(ball.x, ball.y, ball.radius,
      monster.x, monster.y, monster.boundingCircleRadius)) {
        // On la rajoute au tableau
      canvas.ballArray.push(ball);
      maxBalls++;
    } else {
      i--;
    }
  }
}

function updateBalls(delta) {
    // for each ball in the array
    for(var i=0; i < canvas.ballArray.length; i++) {
      var ball = canvas.ballArray[i];

      // 1) move the ball
      ball.move();

      // 2) test if the ball collides with a wall
      testCollisionWithWalls(ball);

      if(circRectsOverlap(monster.x-50, monster.y-50, monster.h, monster.l, ball.x, ball.y, ball.radius)) {
        canvas.ballArray.splice(i,1);
        canvas.writ[canvas.writ.length] = new writeBonusScore("- 1000",canvas.w/2 - 60,200,new Date().getTime(),"red");
        score.hitBall();
        i++;

        // score = 0, loose !
        if(score.sc+score.scEt <= 0){
          canvas.writ = [];
          canvas.writ[canvas.writ.length] = new writeGameOver();
          monster.dead = true;
          lastTime = 0;
          tempsTotal = 0;
        }
      }

      // 3) draw the ball
      ball.draw();
    }
} 

function testCollisionWithWalls(ball) {
  // left
  if (ball.x < ball.radius) {
    ball.x = ball.radius;
    ball.angle = -ball.angle + Math.PI;
  } 
  // right
  if (ball.x > canvas.w - (ball.radius)) {
    ball.x = canvas.w - (ball.radius);
    ball.angle = -ball.angle + Math.PI; 
  }     
  // up
  if (ball.y < ball.radius) {
    ball.y = ball.radius;
    ball.angle = -ball.angle;     
  }     
  // down
  if (ball.y > canvas.h - (ball.radius)) {
    ball.y = canvas.h - (ball.radius);
    ball.angle =-ball.angle; 
  } 
}

function writeWriter() {
  // for each writer in the array
  for(var i=0; i < canvas.writ.length; i++) {
    var w = canvas.writ[i];

    if(new Date().getTime() - w.getTime() >= 1000 & w.getText()!="gameover" & w.getText()!="menu") {
      canvas.writ.splice(i,1);
    } else {
      w.draw();  
    }
  }
}

function updateNuage(delta) {
  // for each writer in the array
  for(var i=0; i < canvas.nuageArray.length; i++) {
    var nua = canvas.nuageArray[i];
    nua.move(delta);

    // If cloud is out of bound
    if((nua.dir === 1 & nua.x-nua.l/4 >= canvas.w) || nua.x+nua.l <= 0) {
      canvas.nuageArray.splice(i,1);
    }

    nua.draw();  
  }
}

function updateET(delta) {
  // for each et in the array
  for(var i=0; i < canvas.etArray.length; i++) {
    var et = canvas.etArray[i];

    // 1) move the ball
    et.move();   

    // 2) test if the et collides with a wall
    // left
    if (et.x < (et.w/2)) {
      canvas.etArray.splice(i,1);
    } 
    // right
    if (et.x > canvas.w - (et.w/2)) {
      canvas.etArray.splice(i,1);
    }     
    // up
    if (et.y < (et.h-3)) {
      et.y = et.h-3;
      et.angle = -et.angle;     
    }     
    // down
    if (et.y > canvas.h - (et.h/2) + 3) {
      et.y = canvas.h - (et.h/2) + 3;
      et.angle =-et.angle; 
    } 

    // collide this player
    if(rectRectsOverlap(monster.x-50, monster.y-50, monster.h, monster.l, et.x, et.y, et.w, et.h)) {
      score.hitEt();

      canvas.writ[canvas.writ.length] = new writeBonusScore("+ " + score.addSc,
                                                            canvas.w/2 - 60,
                                                            200,
                                                            new Date().getTime(),
                                                            "#EBDA26");
      canvas.etArray.splice(i,1);
    }
    else {
      // 3) draw the et
      et.draw(); 
    }
  }
}

var start = function(){
    // adds a div for displaying the fps value
    fpsContainer = document.createElement('div');
    document.body.appendChild(fpsContainer);

    canvas.constructor();
    canvas.writ[0] = new writeMenu();

    for(var i = 0; i < 3; i++) {
      var nua =  new nuage();
      nua.initDir();
      canvas.nuageArray.push(nua);
    }

    // important, we will draw with this object
    // default police for text
    canvas.ctx.font="20px Candara";

    //add the listener to the main, window object, and update the states
    window.addEventListener('keydown', function(event){
      if (event.keyCode === 37) {
        monster.inputStates.left = true;
      } else if (event.keyCode === 38) {
        monster.inputStates.up = true;
      } else if (event.keyCode === 39) {
        monster.inputStates.right = true;
      } else if (event.keyCode === 40) {
        monster.inputStates.down = true;
      }  else if (event.keyCode === 32) {
        monster.inputStates.space = true;
      } else if (event.keyCode === 13) {
        monster.inputStates.enter = true;
      }
    }, false);

    //if the key will be released, change the states object 
    window.addEventListener('keyup', function(event){
      if (event.keyCode === 37) {
        monster.inputStates.left = false;
      } else if (event.keyCode === 38) {
        monster.inputStates.up = false;
      } else if (event.keyCode === 39) {
        monster.inputStates.right = false;
      } else if (event.keyCode === 40) {
        monster.inputStates.down = false;
      } else if (event.keyCode === 32) {
        monster.inputStates.space = false;
      } else if (event.keyCode === 13) {
        monster.inputStates.enter = false;
      } else if (event.keyCode === 80) {
        monster.inputStates.p = false;
      }
    }, false);

    // Mouse event listeners
    canvas.canva.addEventListener('mousemove', function (evt) {
      monster.inputStates.mousePos = getMousePos(evt);
    }, false);

    canvas.canva.addEventListener('mousedown', function (evt) {
      monster.inputStates.mousedown = true;
      monster.inputStates.mouseButton = evt.button;
    }, false);

    canvas.canva.addEventListener('mouseup', function (evt) {
      monster.inputStates.mousedown = false;
    }, false);      

    // start the animation
    requestAnimationFrame(mainLoop);
  };

  //our GameFramework returns a public API visible from outside its scope
  return {
    start: start
  };
};
