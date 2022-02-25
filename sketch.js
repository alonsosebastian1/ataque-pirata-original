
var backgroundImg,platform;
var barcoimg,barco;
var cañonimg,cañon;
var pirataimg,pirata;
var ballimg,ball;
var coin,coinimg;
var mira,miraimg;
var cofre_cerradoimg,cofre,cofre_abiertoimg;
var nubes,nubesimg;
var pirata1img,pirata1;
var pirata2img,pirata2;
var gameState = PLAY;
var PLAY = 1;
var END = 0;


function preload() {
backgroundImg = loadImage("fondo1.1.png");
barcoimg = loadImage("barco1.1.png");
cañonimg = loadImage("cañon1.1.png");
pirataimg = loadImage("pirata1.1.png");
coinimg = loadImage("coin1.png","coin2.png");
miraimg = loadImage("mira.png");
cofre_cerradoimg = loadImage("cofre_cerrado.png");
cofre_abiertoimg = loadImage("cofre_abierto.png");
nubesimg = loadImage("images.jpeg.jfif");
pirata1img = loadImage("pirata0.png");
pirata2img = loadImage("imported piskel.gif");
ballimg = loadImage("Cannon_Ball.png");
}

function setup(){
    var canvas = createCanvas(1350,400);
       enemyGroup = new Group();
       barcoGroup = new Group();
       ballGroup = new Group();

   cañon = createSprite(80,330);
   cañon.addImage(cañonimg);
   cañon.scale = 0.2;

   pirata = createSprite(150,360);
   pirata.addImage(pirataimg);
   pirata.scale = 0.2;

   coin = createSprite(28,15);
   coin.addImage(coinimg);
   coin.scale = 0.2;


   mira = createSprite(1,1);
   mira.addImage(miraimg);

   cofre= createSprite(220,360);
   cofre.addImage(cofre_cerradoimg);
   cofre.scale = 0.2;
   cofre.setCollider("circle",0,0,50);
    cofre.debug = false;
   
   puntuacion = 0;
   Barcosdestruidos = 0;
   coins = 1;
}

function draw(){
    background(nubesimg);
        background(backgroundImg);
     //mira//
        mira.scale = 0.2;
        mira.x = mouseX;
        mira.y = mouseY;
        textSize(20);
        fill("black");
        text("Coins:" + coins,40,22);
        text("Barcos destruidos:" + Barcosdestruidos,300,25);
        text("puntuacion:" +puntuacion ,650,25);
       cañon.y = mouseY;

       //if(gameState === PLAY){
       //enemyGroup.visible = true;
      //  barcoGroup.visible = true;
        if(mira.overlap(enemyGroup)){
            balas();   
          }
          if(mousePressedOver(barco)){
            balas();
        }
         if(ballGroup.overlap(enemyGroup)){
            enemyGroup.destroyEach();
            puntuacion = puntuacion + 100;
         }
        if(ballGroup.overlap(barco)){
          barcoGroup.destroyEach();
          puntuacion = puntuacion + 300;
          Barcosdestruidos = Barcosdestruidos + 1;
          coins = coins + 2
        }

        if(enemyGroup.overlap(cofre)){
            cofre.addImage(cofre_abiertoimg);
            if(frameCount % 30 === 0){
                coins = coins -1;
              
            }
            if(frameCount %20 === 0){
                puntuacion = puntuacion - 50;
            }
        }else{
            cofre.addImage(cofre_cerradoimg);
        }

       
   
   
   
//}else if(gameState === END){
  //enemyGroup.visible = false;
  //barcoGroup.visible = false;
//} 

spawnenemy();
spawnbarco();
drawSprites();

}
      
        
         
       

       


function balas(){
    if(frameCount %5 === 0){
        bala = createSprite(80,360);
        bala.addImage(ballimg);
        bala.y = cañon.y -30;
        bala.x = cañon.x +60;
        bala.scale = 0.2
        bala.velocityX = 12;
       bala.lifetime = 250;
       ballGroup.add(bala);
   }
    
}
function spawnbarco(){
    if(frameCount % 200 === 0){
        barco = createSprite(1100,150);
        barco.addImage(barcoimg);
        barco.scale = 0.3;
        barco.velocityX = -3;
        barco.lifetime = 370;
        barcoGroup.add(barco);
        barco.setCollider("circle",0,0,200);
        barco.debug = false;
    }
}
function spawnenemy(){
    if(frameCount % 100 === 0){
        enemy = createSprite(1100,360);
        enemy.addImage(pirata1img);
        enemy.scale = 0.05;
        enemy.velocityX = -3;
        enemy.lifetime = 300;
        enemyGroup.add(enemy);
        enemy.setCollider("circle",0,0,600);
        enemy.debug = true;
    }
}