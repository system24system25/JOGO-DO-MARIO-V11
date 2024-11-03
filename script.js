const mario = document.getElementById('mario');
const platforms = document.querySelectorAll('.platform');
const obstacles = document.querySelectorAll('.obstacle');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game');
const startButton = document.getElementById('start-button');

let level = 1;
let isJumping = false;
let isMovingLeft = false;
let isMovingRight = false;
let marioPosition = 50; // Posição inicial
let gravity = 0;
let jumpHeight = 150;
let marioBottom = 0; // Posição vertical

startButton.addEventListener('click', startGame);

function startGame() {
    startScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    resetGame();
    gameLoop();
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft') {
        isMovingLeft = true;
    }
    if (event.code === 'ArrowRight') {
        isMovingRight = true;
    }
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft') {
        isMovingLeft = false;
    }
    if (event.code === 'ArrowRight') {
        isMovingRight = false;
    }
});

function jump() {
    isJumping = true;
    let position = 0;
    const jumpInterval = setInterval(() => {
        if (position >= jumpHeight) {
            clearInterval(jumpInterval);
            const downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                    marioBottom = 0;
                    mario.style.bottom = marioBottom + 'px';
                }
                position -= 5;
                mario.style.bottom = position + 'px';
            }, 20);
        }
        position += 5;
        mario.style.bottom = position + 'px';
    }, 20);
}

function gameLoop() {
    if (isMovingLeft && marioPosition > 0) {
        marioPosition -= 5;
        mario.style.left = marioPosition + 'px';
    }
    if (isMovingRight && marioPosition < window.innerWidth - 50) {
        marioPosition += 5;
        mario.style.left = marioPosition + 'px';
    }

    // Aplicar gravidade
    if (!isJumping) {
        gravity += 2;
        marioBottom -= gravity;
        if (marioBottom < 0) {
            marioBottom = 0;
            gravity = 0;
        }
        mario.style.bottom = marioBottom + 'px';
    }

    // Colisão com plataformas
    platforms.forEach(platform => {
        const platformRect = platform.getBoundingClientRect();
        const marioRect = mario.getBoundingClientRect();

        if (
            marioRect.bottom <= platformRect.bottom &&
            marioRect.right >= platformRect.left &&
            marioRect.left <= platformRect.right &&
            marioBottom <= platformRect.bottom
        ) {
            marioBottom = platformRect.bottom;
            gravity = 0;
            isJumping = false;
        }
    });

    // Colisão com obstáculos
    obstacles.forEach(obstacle => {
        const obstacleRect = obstacle.getBoundingClientRect();
        const marioRect = mario.getBoundingClientRect();

        if (
            marioRect.right >= obstacleRect.left &&
            marioRect.left <= obstacleRect.right &&
            marioRect.bottom >= obstacleRect.top
        ) {
            alert("Game Over!");
            resetGame();
        }
    });

    // Progresso de nível
    if (marioPosition > 600) { // Exemplo de condição para passar de nível
        level++;
        alert("Parabéns! Você avançou para o nível " + level);
        resetGame();
    }

    requestAnimationFrame(gameLoop);
}

function resetGame() {
    startScreen.style.display = 'flex';
    gameContainer.style.display = 'none';
    marioPosition = 50;
    mario.style.left = marioPosition + 'px';
    marioBottom = 0;
    mario.style.bottom = marioBottom + 'px';
    isJumping = false;
    gravity = 0;
    // Reconfigure plataformas e obstáculos conforme o nível
    setupLevel();
}

function setupLevel() {
    // Configurar plataformas e obstáculos com base no nível
    // Adicione lógica aqui para mudar as posições ou quantidades
}


