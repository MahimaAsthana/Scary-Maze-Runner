//GameStates
var PLAY=2;
var START=1;
var END=0;
var gameState=START;

var edges;
var score=0;
var timer, death;

var boy, boy_dead, boy_run,boy_jump;
var diamond, diamondgroup;
var rubygroup;
var tree1,s1,tomb1,tomb2,db1, cratebox,wall0,wallc,wall;

function preload(){
    upload=new Upload();
}

function setup(){
   createCanvas(990,700);

   boy=createSprite(50,570,20,40);
   boy.addImage(Jonathan);
   boy.scale=0.1;
   boy.debug= true;
   boy.setCollider("circle",-120,20,200)

  restart=createSprite(520,400,20,10);
  restart.addImage(restartimg);
  restart.scale=0.5;
      
  gameover=createSprite(500,300,20,10);
  gameover.addImage(gameoverimg);
  gameover.scale=2.0;
      
  playbutton=createSprite(880,650,20,10);
  playbutton.addImage(playbuttonimg);
  playbutton.scale=0.1;

   maze();

   // Creating groups

   diamondgroup= new Group();
   rubygroup= new Group();
   
}

function draw(){
    background(bg);
    edges=createEdgeSprites();
    
    textSize(26);
    fill("yellow");
    text("SCARY MAZE RUNNER", 300,30);
    textSize(14);
    text("1.Press Space Key to make jump, left and right arrow to move",50,630);
    text("2.Collect items to score the points, diamond:10, ruby:5",50,650);
    text("3.Avoid obstacles, ghost, you have 3 chance",50,670);
    text("4.Score minimum 20 to, Reach the Crate to win", 50,690);
    textSize(40);
    text("Timer in there",500,660);
   
    
if(gameState===START){
boy.velocityX=0;
boy.velocityY=0;
boy.x=50;
boy.y=570;
timer=60;
death=0;
restart.visible=false;
gameover.visible=false;
playbutton.visible=true;
textSize(25);
fill("yellow")
text("TIME REMANING:"+Math.round(timer),690,30);
text("Score: " + score,20,30);
text("Death: " +death,150,30);
if(mousePressedOver(playbutton)){
  gameState=PLAY;
 }
}
else if(gameState===PLAY){
  restart.visible=false;
  gameover.visible=false;
  playbutton.visible=false;
    timer=timer-0.05;
    textSize(25);
    fill("yellow")
    text("TIME REMANING:"+Math.round(timer),690,30);
    text("Score: " + score,20,30);
    text("Death: " + death,150,30);
      
// Diamond and ruby
spawndiamond();
spawnruby();

if(boy.isTouching(diamondgroup)){
  score=score+10;
  diamondgroup.destroyEach();
}

if(boy.isTouching(rubygroup)){
  score=score+5;
  rubygroup.destroyEach();
}

// Giving control to boy
boy.velocityX=0;
boy.velocityY=0;

if(keyDown(UP_ARROW)){
  boy.velocityY=-10; 
}

if(keyDown(DOWN_ARROW)){
  boy.velocityY=10; 
}
   if(keyDown("LEFT_ARROW")){
  boy.velocityX=-10; 
}
   if(keyDown("RIGHT_ARROW")){
  boy.velocityX=10; 
}

// Reseting boy while touching obstacles
if(boy.isTouching(wall2) || boy.isTouching(wall3) || boy.isTouching(wall4)|| boy.isTouching(wall5) || boy.isTouching(wall6)
|| boy.isTouching(wall7)|| boy.isTouching(wall8)|| boy.isTouching(wall9)|| boy.isTouching(wall10) || boy.isTouching(wallc)
||boy.isTouching(tree1) || boy.isTouching(tree2)|| boy.isTouching(tomb2) || boy.isTouching(s1) || boy.isTouching(s2)
|| boy.isTouching(s3)){
  boy.x=50;
  boy.y=570;
  death= death+1;
}

// Win Condition
if(score>=20 && boy.isTouching(cratebox)){
  var endgame=createSprite(480,350,990,700);
  endgame.addImage(Last);
}
// End Game
if(death===3 ||timer<=0){
  gameState= END;
}

if(boy.isTouching(tomb1)){
  tomb1.x=1200;
}

}
else if(gameState===END){
  timer=0;
  restart.visible=true;
  restart.depth=100000;
  gameover.visible=true;
  gameover.depth=100001;
  playbutton.visible=true;
  textSize(25);
  fill("yellow")
  text("TIME REMANING:"+Math.round(timer),690,30);
  text("Score: " + score,20,30);
  text("Death: " +death,150,30);
  boy.velocityX=0;
  boy.velocityY=0;
  boy.x=50;
  boy.y=570;
}
if(mousePressedOver(restart)){
  reset();
  }
  
boy.bounceOff(edges);
boy.bounceOff(wall0);
boy.bounceOff(wall1);

    drawSprites();
}   

function spawndiamond(){

  if(frameCount % 150===0){
  diamond= createSprite(840,500,20,10);
  diamond.x=random(20,900);
  diamond.y=random(150,500);
  diamond.addImage(diamondimg);
  //diamond1.debug=true;
  diamond.scale=.2;
  diamond.velocityX=random(-5,5);
  diamond.bounceOff(edges);
  diamondgroup.add(diamond);
 }
}

function spawnruby(){

  if(frameCount % 120===0){
  var ruby= createSprite(840,500,20,10);
  ruby.x=random(20,900);
  ruby.y=random(150,500);
  ruby.addImage(rubyimg);
  //diamond1.debug=true;
  ruby.scale=.2;
  ruby.velocityX=random(-7,7);
  ruby.bounceOff(edges);
  rubygroup.add(ruby);
 }
}

function maze(){

  var arrowsign=createSprite(20,660,10,10);
  arrowsign.addImage(Sign);
  arrowsign.scale=0.7;

  cratebox=createSprite(940,100,10,10);
  cratebox.addImage(crate);
  cratebox.scale=0.6;
 // cratebox.debug=true;
  
  tomb1=createSprite(880,100,10,10);
  tomb1.addImage(tombstone2);
  tomb1.scale=0.9;
  //tomb1.debug=true;
  
  wallc= createSprite(930,150,200,10);
  wallc.addImage(woodimg);
  wallc.scale=0.05;
 // wallc.debug=true;
  wallc.setCollider("rectangle",0,0,2400,wallc.y);

  wall0= createSprite(540, 55, 1100,10);
  wall0.shapeColor="black";
  
  wall1= createSprite(540, 600, 1100,10);
  
  wall2= createSprite(70,520,200,10);
  wall2.addImage(woodimg);
  wall2.scale=0.08;
  wall2.debug=true;
  wall2.setCollider("rectangle",0,0,2200,wall2.y)

  tree1=createSprite(290,535,10,60);
  tree1.addImage(tree);
  tree1.scale=0.5;
  tree1.debug=true;
  tree1.setCollider("rectangle",0,0,100,250);
 
  tree2=createSprite(590,535,10,60);
  tree2.addImage(tree);
  tree2.scale=0.5;
  tree2.debug=true;
  tree2.setCollider("rectangle",0,0,100,250);

  tomb2=createSprite(940,554,10,10);
  tomb2.addImage(tombstone);
  tomb2.scale=1.5;

  wall3= createSprite(170,420,200,10);
  wall3.addImage(woodimg);
  wall3.scale=0.08;
  wall3.debug=true;
  wall3.setCollider("rectangle",0,0,2400,wall3.y);

  wall4= createSprite(470,420,200,10);
  wall4.addImage(woodimg);
  wall4.scale=0.08;
  wall4.debug=true;
  wall4.setCollider("rectangle",0,0,2400,wall4.y);
  
  wall5= createSprite(850,420,200,10);
  wall5.addImage(woodimg);
  wall5.scale=0.08;
  wall5.debug=true;
  wall5.setCollider("rectangle",0,0,2400,wall5.y);

  wall6= createSprite(20,310,200,10);
  wall6.addImage(woodimg);
  wall6.scale=0.08;
  wall6.debug=true;
  wall6.setCollider("rectangle",0,0,2400,wall6.y);

  wall7= createSprite(320,310,200,10);
  wall7.addImage(woodimg);
  wall7.scale=0.08;
  wall7.debug=true;
  wall7.setCollider("rectangle",0,0,2400,wall7.y);

  wall8= createSprite(590,310,200,10);
  wall8.addImage(woodimg);
  wall8.scale=0.08;
  wall8.debug=true;
  wall8.setCollider("rectangle",0,0,2400,wall8.y);

  wall9= createSprite(900,310,200,10);
  wall9.addImage(woodimg);
  wall9.scale=0.08;
  wall9.debug=true;
  wall9.setCollider("rectangle",0,0,2400,wall9.y);

  s1=createSprite(160,220,100,10);
  s1.addImage(skeleton);
  
  s2=createSprite(780,150,100,10);
  s2.addImage(skeleton);
  //s1.debug=true;

  s3=createSprite(360,100,100,10);
  s3.addImage(skeleton);

  wall10= createSprite(20,130,200,10);
  wall10.addImage(woodimg);
  wall10.scale=0.08;
   wall10.debug=true;
  wall10.setCollider("rectangle",0,0,2400,wall10.y);
  
  db1=createSprite(340,220,30,10);
  db1.addImage(deadbush);
 // db1.debug=true;

}

function reset(){
  gameState=START;
  tomb1.x=880;
  score=0;
}