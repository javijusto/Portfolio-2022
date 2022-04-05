const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const ctx1 = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
    x:null,
    y:null,
    radius: (canvas.height/200) * (canvas.width/200)
};

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.size*1.4, 0, Math.PI * 2, false);
        ctx1.fillStyle = '#20415a';
        ctx1.globalAlpha = 0.4;
        ctx1.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#25415a';
        ctx.globalAlpha = 0.9;
        ctx.fill();
    }

    draw2() {
        ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = '#3b83bd';
            ctx.globalAlpha = 0.6;
            ctx.fill();
            ctx1.beginPath();
            ctx1.arc(this.x, this.y, this.size*1.4, 0, Math.PI * 2, false);
            ctx1.fillStyle = '#3b83bd';
            ctx.globalAlpha = 0.9;
            ctx1.fill();
    }

    update(){
        if(this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
//colisiones
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size) {
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x -= 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x += 10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y -= 10;
            }
            if(mouse.y > this.y && this.y > this.size* 10) {
                this.y += 10;
            }
            this.draw2();
        }
//movimiento
        this.x += this.directionX;
        this.y += this.directionY;
//dibujo
        this.draw();
    }
}

function init(){
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width)/2500;
    for(let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 7.5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '1d2c3d';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for(let i=0; i < particlesArray.length; i++) { 
        particlesArray[i].update();
    }
}

window.addEventListener('resize',
    function(){
        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;
        mouse.radius = ((canvas.height/200) * (canvas.height/200));
        init();
    }
);

window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.c = undefined;
    })



init();
animate();