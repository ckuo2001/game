let bin, binImg;
let trash, trashImg;
let audioButton;
let restartButton;
let song;
let timer;
let inGame = true;

function preload() {
	binImg = loadImage('assets/bin.png');
  trashImg = loadImage('assets/trash.png');
  song = loadSound('assets/mp3-bg.mp3');
}

function setup() {
	new Canvas(windowWidth-100, windowHeight-100);

  audioButton = createButton('music');
  audioButton.position(width-70, 70);
  audioButton.mousePressed(music);

  restartButton = createButton('restart');
  restartButton.position(width-70, height-70);
  restartButton.mousePressed(restart);

	bin = new Sprite(binImg);
  bin.scale = 0.1;

	trash = new Group();
	trash.image = trashImg;
  trash.scale = 0.05;
  trash.x = () => random(0, width);
  trash.y = () => random(0, height);
  trash.amount = 10;

  bin.overlaps(trash, collect);

  timer = 20;
}

function restart() {
  newGame();
}

function music() {
  if (song.isPlaying()){
    song.stop();
  } else {
    song.play();
  }
}

function draw() {
  background(150);

  textSize(16);
  text('Time remaining: ' + timer, 20, 50);

  if (inGame) {
    bin.moveTowards(mouse);
  }

  if (frameCount % 60 == 0 && timer > 0) {
    inGame = true;
    timer--;
    if (trash.length == 0) {
      inGame = false;
      text("WIN", width/2, height/2);
      timer = 0;
    }
  } else if (timer == 0) {
    inGame = false;
    if (trash.length == 0) {
      text("WIN", width/2, height/2);
      timer = 0;
    } else {
      text("LOSE", width/2, height/2);
    }
  }
}

function collect(earth, oneTrash) {
  oneTrash.remove();
}

function newGame() {
  trash.removeAll();
  inGame = true;
  trash = new Group();
	trash.image = trashImg;
  trash.scale = 0.05;
  trash.x = () => random(0, width);
  trash.y = () => random(0, height);
  trash.amount = 10;

  bin.overlaps(trash, collect);

  timer = 20;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}