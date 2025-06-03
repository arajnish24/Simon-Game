let gameSeq=[];
let userSeq=[];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {  /* Accessing the keys which is pressed by the user */
    if(started == false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 200);   /* 1000 = 1 Second */
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 200);   /* 1000 = 1 Second */
}

function levelUp() {
    userSeq = [];
    level++;

    if (level > 20) {
        h2.innerHTML = `🎉 You Win the Game! 🎉 <br>Your score was <b>${level - 1}</b><br>Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "#00ff99";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
            reset();
            return;
    }


    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 200);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> ${isMobile ? "Click the button to play again." : "Press Any Key to Restart."}`;
        document.body.style.backgroundColor = "red";
        setTimeout(() => document.body.style.backgroundColor = "white", 150);

        // Show start button again on mobile
        if (isMobile) {
            startBtn.style.display = "inline-block";
        }

        reset();
    }
}


function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

let isMobile = window.innerWidth <= 768; // Basic mobile detection

let startBtn = document.getElementById("start-btn");

// Show start button on mobile
if (isMobile) {
    startBtn.style.display = "inline-block";
}

// Shared start logic
function startGame() {
    if (!started) {
        started = true;
        levelUp();
        if (isMobile) {
            startBtn.style.display = "none"; // Hide after starting
        }
        console.log("Game started");
    }
}

// Keyboard start (for desktop)
document.addEventListener("keypress", startGame);

// Button click (for mobile)
startBtn.addEventListener("click", startGame);
