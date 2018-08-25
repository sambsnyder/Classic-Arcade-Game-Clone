// default variables needed, likes height and width of block, etc.
const defaults = {
  blockHeight : 80,
  blockWidth : 100,
  end: document.querySelector('.endGame'),
  score: document.querySelector('.score')
};

// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }
  
// Draw the enemy on the screen, required method for game
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    this.speed = Math.floor(Math.random() * (670 - 100) + 100);
    this.x += (this.speed * dt);
    if(this.x > 600){
      this.x = Math.floor(Math.random() * (-200 - -100) + -100);
    }
  }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/char-horn-girl.png';
    this.score = 0;
  }
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // handles arrow key inputs
  handleInput(inputKey){
    if(inputKey == 'up'){
      this.y -= defaults.blockHeight;
    }else if(inputKey == 'down') {
      this.y += defaults.blockHeight;
    }else if(inputKey == 'left') {
      this.x -= defaults.blockWidth;
    }else if(inputKey == 'right') {
      this.x += defaults.blockWidth;
    }
  }

// checks for player collision, and restricts player movement
  update(dt){
    this.checkCollisions();
    if(this.x > 400){
      this.x = 400;
    }else if (this.x<0) {
      this.x = 0;
    }
    if (this.y == -20) {
      this.score++;
      this.y = 380;
      this.x = 200;
    }else if (this.y > 380) {
      this.y = 380;
    }
  }

// checks if the player hit one of the enemies, calls death if so
  checkCollisions(){
    for (let i = 0; i < 3; i++){
      // if the x, y coordinates off player and enemies are ever overlapping reset player
      if(((player.x - allEnemies[i].x <= 75 && allEnemies[i].x < player.x) || (allEnemies[i].x - player.x <= 75 && allEnemies[i].x > player.x)) && player.y == allEnemies[i].y){
        death();
      }
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy(0,60);
const enemy2 = new Enemy(-200,140);
const enemy3 = new Enemy(-100,220);
let allEnemies = [enemy1,enemy2,enemy3];
const player = new Player();

// variables needed for keeping track of lives
const hearts = document.querySelectorAll(".heart");
let heart_counter = 2;
// function that updates player and lives if they hit the enemy
function death(){
  hearts[heart_counter].style.visibility = 'hidden';
  heart_counter--;
  player.y = 380;
  player.x = 200;
  if(heart_counter == -1){
    lose();
  }
}

// function called when player loses all 3 lives, displays end game
function lose(){
  defaults.score.innerHTML = player.score;
  player.score = 0;
  $(defaults.end).slideDown(200);
}

// called on restart button click. resets lives and player
function restart(){
  $(defaults.end).slideUp(200);
  heart_counter=2;
  player.x = 200;
  player.y = 380;
  hearts[0].style.visibility = "visible";
  hearts[1].style.visibility = "visible";
  hearts[2].style.visibility = "visible";
}

// restart called on load
window.onload = restart();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
