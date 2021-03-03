var bg,Last;
var crate, deadbush, skeleton, tree, Sign;
var tombstone, tombstone2; 
var Jonathan, Jonathan_run, Jonathan_dead, Jonathan_jump;
var Death, wood, woodimg;
var Diamond, diamondimg, restart, restartimg, gameover, gameoverimg, playbutton, playbuttonimg;
var rubyimg;

class Upload{
    constructor(){
    
    bg=loadImage("Images/Bg.jpg");
    Last= loadImage("Images/Last.jpg");
    crate= loadImage("Images/Crate.png");
    deadbush= loadImage("Images/DeadBush.png");
    skeleton= loadImage("Images/Skeleton.png");
    tree= loadImage("Images/Tree.png");
    Sign= loadImage("Images/ArrowSign.png");
    tombstone= loadImage("Images/TombStone (1).png");
    tombstone2= loadImage("Images/TombStone (2).png");
    Death= loadSound("Sounds/Death.mp3");
    Jonathan= loadImage("Boy/Idle.png");
    Jonathan_run= loadAnimation("Boy/Run1.png","Boy/Run2.png", "Boy/Run3.png" );
    Jonathan_dead= loadImage("Boy/Dead.png");
    Jonathan_jump= loadAnimation("Boy/Jump1.png","Boy/Jump2.png","Boy/Jump3.png");
    diamondimg= loadImage("Images/Diamond1.png");
    restartimg= loadImage("Images/restart.png");
    gameoverimg= loadImage("Images/gameover.png");
    playbuttonimg= loadImage("Images/play button.png");
    woodimg= loadImage("Images/wood.png");
    rubyimg=loadImage("Images/diamond.png");
   }
}