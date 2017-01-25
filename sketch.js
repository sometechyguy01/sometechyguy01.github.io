var obj;
var dots;

function setup() {
  createCanvas(1750,800)
  
  obj = []
  dots = 300
  
  for (var i = 0; i<dots; i++) {
    obj[i] = new dot()
  }
}

function draw() {
  background(130)

  for (var i = 0; i<dots; i++){
    obj[i].draw()
  }
  
}

function dot() {
  this.p = createVector( random(width) , random(height))
  this.v = createVector(0,0)
  this.a = createVector(0,0)
  
  
  this.draw = function() {
    
    this.a.set(mouseX,mouseY)
    this.a.sub(this.p)
    this.a.normalize()
    this.a.mult(0.1)
    this.v.limit(5)
    this.v.add(this.a)
    this.p.add(this.v)
    
    ellipseMode(CENTER)
    ellipse(this.p.x,this.p.y,2,2)
  }
  
}