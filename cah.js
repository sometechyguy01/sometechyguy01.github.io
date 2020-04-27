let imgW = [];
let imgB = [];
let a;
let cards = [];
let blacklist = [];

//reading sizes
let cardW = 603;
let cardH = 608;
let pageX = 71;
let pageY = 76;

//displaying sizes

let canvasX;
let sizeX;
let sizeY;
let canvasY;

function preload(){
  for (let i=0;i<3;i++) {
    imgB.push(loadImage(['assets/b',i,'.jpg'].join('')));
  }
  for(let i=0; i<17;i++){
    imgW.push(loadImage(['assets/w',i,'.jpg'].join('')));
    print([i,'processed'].join(' '));
  } 
}

class Card {
  constructor(pos) {
    this.place = pos;
    //this.me = imgW[0].get(pageX+cardW*0,pageY+cardH*0,cardW,cardH);
    this.row = this.place%4;
    this.col = int(this.place/4);
    this.corner = [(sizeX+10)*this.row+10,(sizeY+10)*this.col+10];
    this.newCard();
    this.selected = false;
  }
  newCard() {
    this.pos = [int(random(0,17)),int(random(0,4)),int(random(0,5))];
    this.me = imgW[this.pos[0]].get(pageX+cardW*this.pos[1],pageY+cardH*this.pos[2],cardW,cardH);
    if (this.place==0) {
      this.pos = [int(random(0,3)),int(random(0,4)),int(random(0,5))];
      this.me = imgB[this.pos[0]].get(pageX+cardW*this.pos[1],pageY+cardH*this.pos[2],cardW,cardH);
    }
    if(this.me.get(7,7) == '0,135,0,255' || this.me.get(7,7) == '200,200,200,255') {
      this.newCard();
    }
    for (let obj of blacklist) {
      if (obj==this.pos.join('')) {
        this.newCard();
        break;
      }  
    }
  }
  repos() {
    this.corner = [(sizeX+10)*this.row+10,(sizeY+10)*this.col+10];
  }
  render() {
    image(this.me,this.corner[0],this.corner[1],sizeX,sizeY);
    
    if (this.selected) {
      stroke(255, 204, 0);
      textSize(10);
      fill(255);
      textAlign(BOTTOM,RIGHT);
      text(this.me.get(7,7),width-20,height-10);
    } else {
      stroke(70);
    }
    noFill();
    strokeWeight(4);
    rect(this.corner[0],this.corner[1],sizeX,sizeY);
  }
  clicked(x,y){
    if (x>this.corner[0] && x<this.corner[0]+sizeX && y>this.corner[1] && y<this.corner[1]+sizeY) {
      this.selected = !this.selected;
      
    }
  }
  submit(){
    if (this.selected) {
      this.newCard();
      this.selected = false;
    }
  }
}

function setup() { 
  let wX = windowWidth;
  let wY = windowHeight;
  canvasX = wX;
  sizeX = (canvasX-10)/4-10;
  sizeY = sizeX*(cardW/cardH);
  canvasY = (sizeY+10)*2+50;
  if (canvasY>wY) {
    canvasY = wY;
    sizeY= (canvasY-50)/2-10;
    sizeX= sizeY*(cardH/cardW);
    canvasX = (sizeX+10)*4+10;
  }
  createCanvas(int(canvasX),int(canvasY));
  for (let i=0;i<8;i++) {
    cards.push(new Card(i));
    print('card created');
  }
}

function windowResized() {
  let wX = windowWidth;
  let wY = windowHeight;
  canvasX = wX;
  sizeX = (canvasX-10)/4-10;
  sizeY = sizeX*(cardW/cardH);
  canvasY = (sizeY+10)*2+50;
  if (canvasY>wY) {
    canvasY = wY;
    sizeY= (canvasY-50)/2-10;
    sizeX= sizeY*(cardH/cardW);
    canvasX = (sizeX+10)*4+10;
  }
  for (let i=0;i<8;i++) {
    cards[i].repos();
  }
  resizeCanvas(int(canvasX),int(canvasY));  
}

function draw() {
  background(200);
  
  for (let i=0;i<8;i++) {
    cards[i].render();
  }
  fill(255, 204, 0);
  stroke(70);
  rect(width/2-60,height-40,120,30);
  textSize(20);
  strokeWeight(1);
  fill(70);
  textAlign(CENTER,CENTER)
  text('submit cards',width/2,height-25);
  
  textSize(10);
  fill(255);
  textAlign(BOTTOM,RIGHT);
  text(cards[0].pos.join(''),sizeX-5,sizeY-2);
}

function touchStarted() {
  let x = mouseX;
  let y = mouseY;
  
  for (let i=0;i<8;i++) {
    cards[i].clicked(x,y);
  }
  
  if (x>width/2-60 && x<width/2+60 && y>height-40 && y<height-10) {
    for (let i=0;i<8;i++) {
      cards[i].submit();
    }
  }
}

//stuff to work on:
//Sizing to fit monitors
//Blacklist for cards
//getting on github
