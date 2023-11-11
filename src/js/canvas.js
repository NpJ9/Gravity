import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#B7AD99', '#FF4365', '#392F5A', '#00D9C0']

let gravity = 1;
let friction = 0.6;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', function() {
  init()
})


// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx;
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke();
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) 
      {
       this.dy =- this.dy * friction;
    } else {
        this.dy += gravity;
        console.log(this.dy)
    }

      if (this.x + this.radius > canvas.width || this.x - this.radius <= 0) {
        this.dx = -this.dx;
      }

  this.y += this.dy;
  this.x += this.dx;
  this.draw()
  }
}
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

// Implementation
var ball;
let ballArray = [];
var radius = 30;

function init() {
  ballArray = [];
  for (let i = 0; i < 100; i++){
    var radius = randomIntFromRange(10,50);
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(0, canvas.height - radius);
    let dx = randomIntFromRange(-2, 2);
    let dy = randomIntFromRange(-2, 2);
    let color = randomColor(colors);
   
        ballArray.push(new Ball(x, y, dx, dy, radius, color))
        
        
  }
  
 
 console.log(ballArray)
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)


  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ballArray.length; i++) {
    ballArray[i].update();
  
  }



}


init()
animate()

