let playerState = "run";
const dropdown =document.getElementById("animation");
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'move.png';
const spriteWidth = 1000; // 6876/7
const spriteHeight = 770; //

/*
let frameX = 0;//0~6
let frameY = 0;//0~3
*/

let gameFrame = 0;
const staggerFrames = 8;
const spriteAnimation = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'run',
        frames: 7,
    },
    {
        name: 'roll',
        frames: 7,
    }
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spriteAnimation[state.name] = frames;
});
console.log(spriteAnimation);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimation[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimation[playerState].loc[position].y;

    
    //ctx.fillRect(100,50,100,100);
    //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    /*
    if (gameFrame % staggerFrames == 0) {
        if (frameX < 6) {
            frameX+=1;
        } else {
            frameX = 0;
        }
    }
    */

    gameFrame+=1;
    requestAnimationFrame(animate);
};

animate();