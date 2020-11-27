var tower,towerImage;
var door,doorImage,doorGroup;
var climber,climberImage,climberGroup;
var invisible,invisibleGroup;
var ghost,ghostImage;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var spooky;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");  
  
  spooky = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImage);
  ghost.scale= 0.3;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleGroup = createGroup();
  
  spooky.loop();
}

function draw(){
  background(0);
  
  
  if(gamestate === PLAY){
    spawnDoors();
    
  if(tower.y>400){
  tower.y = 300;
    
  }
  
  if(keyDown("space")){
    ghost.velocityY = -12;
    
  }
  if(keyDown("right_arrow")){
    ghost.x += 5;
    
  }
  if(keyDown("left_arrow")){
    ghost.x -= 5;
    
  }
  
  
  ghost.collide(climberGroup);
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    
  }
  
  ghost.velocityY +=0.8;           
  
  drawSprites();
  if(ghost.isTouching(invisibleGroup) || ghost.y>600){
    ghost.destroy();
    gamestate = END; 
    
    
  }
  }
  
  else if(gamestate === END){
   stroke("green");
   fill("yellow");
   textSize(30);
   text("GAME OVER",210,300);
    
  }
  
}

function spawnDoors(){
  if(frameCount % 250===0){
  door = createSprite(200,-50);
  door.addImage("door",doorImage);
  door.velocityY = 1;
  door.x = Math.round(random(120,400));
  doorGroup.add(door);
  ghost.depth = door.depth;
  ghost.depth += 1;
    
  climber = createSprite(200,10);
  climber.addImage("climber",climberImage);
  climber.velocityY = 1;
  climber.x = door.x;
  climberGroup.add(climber);
    
  invisible = createSprite(200,15);
  invisible.width = climber.width;
  invisible.height = 2;
  invisible.velocityY = 1;
  invisible.x =  door.x;
  invisible.debug = true;
  invisibleGroup.add(invisible);
    
  door.lifetime = 600;
  climber.lifetime = 600;  
  invisible.lifetime = 600;  
 }
}