const state = {
    view:{
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#Score'),
    },
    values: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
};

function countDown() {
    state.values.curretTime --;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0){
        alert("Game Over! Your score is: " + state.values.result);
    }
} 

function playSound() {
    let audio = new Audio("./src/audios/src_audios_hit.m4a");
    audio.volume = 0.15;
    audio.play();
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
    state.values.timerId= setInterval(randomSquare, state.values.gameVelocity);
}

//fases
function verificarFase() {
  if (state.values.result === 10) {
    state.values.fase = 2;
    state.values.gameVelocity = 700;
    document.getElementById('fase').textContent = state.values.fase;
    reiniciarInimigo();
    alert("Level 2! Getting faster!");
  } else if (state.values.result === 20) {
    state.values.fase = 3;
    state.values.gameVelocity = 400;
    document.getElementById('fase').textContent = state.values.fase;
    reiniciarInimigo();
    alert("Level 3! Good luck!");
   } else if (state.values.result === 35 && state.values.fase < 4) {
    state.values.fase = 4;
    state.values.gameVelocity = 250;
    document.getElementById('fase').textContent = state.values.fase;
    reiniciarInimigo();
    alert("💥 Level 4! It's insane now!");
  }
}

function reiniciarInimigo() {
  clearInterval(state.values.timerId);
  moveEnemy();
}



function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
               state.values.result++;
               state.view.score.textContent = state.values.result;
               state.values.hitPosition = null;
               playSound();
               verificarFase();
            }       
        });
    });
        
}

function init() {
    moveEnemy();
    addListenerHitBox();    

}

init();

