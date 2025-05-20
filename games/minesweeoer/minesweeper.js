let kolDiv = [];
let kol = [];
let bombNum = 15;
let kolNum = 10;
window.startX;
window.startY;
let game = false;
let gameDiv = document.querySelector(".game");
let gameParent = document.querySelector(".bomb");
let startDiv = document.querySelector(".start");
let restart = document.querySelector(".restart");
let restartDiv = document.querySelector(".restart-div");
let sizeDiv = document.querySelector(".size");
let sizeNumDiv = document.querySelector(".size-div");
let sizeContent = document.querySelector(".size-content");
let flagNumDiv = document.querySelector(".f-num");
let bombNumDiv = document.querySelector(".b-num");
let bombDiv = document.querySelector(".bomb-num");
let bombContent = document.querySelector(".bomb-content");
let flagNum = 0;
let addCheck = false;
let gameWidth = 500;
let gameHeight = 600;
let divWH = 40;
let divFS = 20;
let checks = [false,true,false];
let correctNum = 0;
let emptys = [];
let s = "00";
let m = "00";
let sDiv = document.querySelector(".s");
let mDiv = document.querySelector(".m");
let restartText = document.querySelector(".restart-text");
let restartS = document.querySelector(".restart-s");
let restartM = document.querySelector(".restart-m");
let aaaaa = document.querySelector(".restart-timer > div:nth-child(2)");
start();
function start() {
    KOL();
    gameDiv.style.display = "flex";
    startDiv.style.display = "none";
    restart.style.display = "none";
    restartDiv.style.display = "none";
}
function KOL() {
    kol = [];
    kolDiv = [];
    gameParent.innerHTML = "";
    correctNum = 0;
    for (let a = 0 ; a < kolNum ** 2 ; a++) {
        let div = document.createElement("div");
        gameParent.appendChild(div);
        kolDiv.push(div);
        let n = a + 1;
        let x = n % kolNum;
        if (x == 0) {
            x = kolNum;
        }
        let y = ((kolNum ** 2 - (n + (kolNum - x))) / kolNum) + 1;
        kol.push({x: x, y: y, div: kolDiv[a], type: "empty", bomb: 0, status: "hidden"});
        kol[a].div.style.backgroundCoطپr = "#ddd";
        kol[a].div.innerHTML = "";
        kol[a].div.classList = "";
    }
    s = "00";
    m = "00";
    sDiv.innerHTML = s;
    mDiv.innerHTML = m;
    restartS.innerHTML = "";
    restartM.innerHTML = "";
    aaaaa.innerHTML = "";
    flagNum = 0;
    flagNumDiv.innerHTML = 0;
    game = false;
    click();
}
function add() {
    let x = Math.floor(Math.random() * (kolNum ** 2));
    addCheck = false;
    if (!(window.startX - 1 == kol[x].x && window.startY + 1 == kol[x].y) && !(window.startX == kol[x].x && window.startY + 1 == kol[x].y) && !(window.startX + 1 == kol[x].x && window.startY + 1 == kol[x].y) && !(window.startX - 1 == kol[x].x && window.startY == kol[x].y) && !(window.startX == kol[x].x && window.startY == kol[x].y) && !(window.startX + 1 == kol[x].x && window.startY == kol[x].y) && !(window.startX - 1 == kol[x].x && window.startY - 1 == kol[x].y) && !(window.startX == kol[x].x && window.startY - 1 == kol[x].y) && !(window.startX + 1 == kol[x].x && window.startY - 1 == kol[x].y)) {
        if (kol[x].type == "empty") {
            addCheck = true;
            kol[x].type = "bomb";
        }
    }
    if (!addCheck) {
        add();
    }
}
function click() {
    // Left Click
    for (let a = 0 ; a < kolNum ** 2 ; a++) {
        kol[a].div.onclick = function(e) {
            if (e.which == 1 || e.button == 0) {
                // start
                if (!game) {
                    game = true;
                    div = kol[a];
                    emptyFunction();
                    window.startX = kol[a].x;
                    window.startY = kol[a].y;
                    for (let b = 0 ; b < bombNum ; b++) {
                        add();
                    }
                    let z = kolNum ** 2;
                    for (let b = 0 ; b < z ; b++) {
                        if (kol[b].type == "empty") {
                            for (let c = 0 ; c < z ; c++) {
                                function bombCheck() {
                                    if (kol[c].type == "bomb") {
                                        kol[b].bomb++;
                                    }
                                }
                                if (kol[b].x - 1 == kol[c].x && kol[b].y + 1 == kol[c].y) {
                                    bombCheck();
                                }
                                if (kol[b].x == kol[c].x && kol[b].y + 1 == kol[c].y) {
                                    bombCheck();
                                }
                                if (kol[b].x + 1 == kol[c].x && kol[b].y + 1 == kol[c].y) {
                                    bombCheck();
                                }
                                if (kol[b].x - 1 == kol[c].x && kol[b].y == kol[c].y) {
                                    bombCheck();
                                }
                                if (kol[b].x == kol[c].x && kol[b].y == kol[c].y) {
                                    bombCheck();
                                }
                                if (kol[b].x + 1 == kol[c].x && kol[b].y == kol[c].y) {
                                    bombCheck();
                                }
                                if (kol[b].x - 1 == kol[c].x && kol[b].y - 1 == kol[c].y) {
                                    bombCheck();
                                }
                                if (kol[b].x == kol[c].x && kol[b].y - 1 == kol[c].y) {
                                    bombCheck();
                                }
                                if (kol[b].x + 1 == kol[c].x && kol[b].y - 1 == kol[c].y) {
                                    bombCheck();
                                }
                            }
                        }
                    }
                    emptys.push(kol[a]);
                    removeEmpty();
                    window.timer = setInterval(function() {
                        s++;
                        if (s < 10) {
                            s = "0" + s;
                        }
                        if (s == 60) {
                            s = "00";
                            m++;
                            if (m < 10) {
                                m = "0" + m;
                            }
                        }
                        sDiv.innerHTML = s;
                        mDiv.innerHTML = m;
                    } ,1000);
                }
                // in game
                if (game) {
                    kolDiv[a].classList = "";
                    if (kol[a].status == "hidden") {
                        // empty
                        if (kol[a].type == "empty") {
                            div = kol[a];
                            if (kol[a].bomb != 0) {
                                number();
                            }
                            else {
                                emptyFunction();
                                emptys.push(kol[a]);
                                removeEmpty();
                            }
                        }
                        // bomb
                        if (kol[a].type == "bomb") {
                            kol[a].div.classList.add("bomb-img");
                            restartText.style.color = "darkred";
                            restartText.style.textShadow = "2px 2px 2px red";
                            endFunction();
                        }
                    }
                }
                if (correctNum == (kolNum ** 2) - bombNum) {
                    restartText.style.color = "darkgreen";
                    restartText.style.textShadow = "2px 2px 2px rgb(0,255,50)";
                    endFunction();
                    restartS.innerHTML = s;
                    restartM.innerHTML = m;
                    aaaaa.innerHTML = ":";
                    for (let z = 0 ; z < kolNum ** 2 ; z++) {
                        if (kol[z].type == "bomb") {
                            kolDiv[z].classList.remove("flag-img");
                            kolDiv[z].classList.add("bomb-img");
                        }
                    }
                }
                function endFunction() {
                    clearInterval(window.timer);
                    restart.style.display = "block";
                    setTimeout(function() {
                        restartDiv.style.display = "flex";
                    },400);
                }
            }
        }
    }
    document.addEventListener("contextmenu",function(e) {
        e.preventDefault();
    });
    // Right Click
    for (let a = 0 ; a < kolNum ** 2 ; a++) {
        kol[a].div.onmousedown = function(e) {
            if (e.which == 3 || e.button == 2) {
                if (game) {
                    if (kol[a].status == "hidden") {
                        kolDiv[a].classList.toggle("flag-img");
                        flagNum = 0;
                        for (let b = 0 ; b < kolNum ** 2 ; b++) {
                            if (kol[b].div.classList == "flag-img") {
                                flagNum++;
                            }
                        }
                        flagNumDiv.innerHTML = flagNum;
                    }
                }
            }
        }
    }
}
function removeEmpty() {
    let length = emptys.length;
    if (length != 0) {
        for (let b = 0 ; b < length ; b++) {
            for (let c = 0 ; c < kolNum ** 2 ; c++) {
                function empty1() {
                    if (kol[c].bomb != 0) {
                        div = kol[c];
                        number()
                    }
                }
                function empty2() {
                    if (kol[c].bomb == 0) {
                        div = kol[c];
                        emptyFunction();
                        emptys.push(kol[c]);
                    }
                    else {
                        empty1();
                    }
                }
                if (kol[c].status == "hidden") {
                    if (emptys[b].x - 1 == kol[c].x && emptys[b].y + 1 == kol[c].y) {
                        empty1();
                    }
                    if (emptys[b].x + 1 == kol[c].x && emptys[b].y + 1 == kol[c].y) {
                        empty1();
                    }
                    if (emptys[b].x - 1 == kol[c].x && emptys[b].y - 1 == kol[c].y) {
                        empty1();
                    }
                    if (emptys[b].x + 1 == kol[c].x && emptys[b].y - 1 == kol[c].y) {
                        empty1();
                    }
                    if (emptys[b].x == kol[c].x && emptys[b].y + 1 == kol[c].y) {
                        empty2();
                    }
                    if (emptys[b].x - 1 == kol[c].x && emptys[b].y == kol[c].y) {
                        empty2();
                    }
                    if (emptys[b].x + 1 == kol[c].x && emptys[b].y == kol[c].y) {
                        empty2();
                    }
                    if (emptys[b].x == kol[c].x && emptys[b].y - 1 == kol[c].y) {
                        empty2();
                    }
                }
            }
        }
        for (let b = 0 ; b < length ; b++) {
            emptys.shift();
        }
        removeEmpty();
    }
}
sizeDiv.onmouseover = function() {
    sizeContent.style.display = "flex";
}
sizeDiv.onmouseleave = function() {
    sizeContent.style.display = "none";
}
bombDiv.onmouseover = function() {
    bombContent.style.display = "flex";
}
bombDiv.onmouseleave = function() {
    bombContent.style.display = "none";
}
function size8() {
    kolNum = 8;
    gameParent.style.gridTemplateColumns = "auto auto auto auto auto auto auto auto";
    gameWidth = 450;
    gameHeight = 550;
    divWH = 45;
    divFS = 22;
    checks = [true,false,false];
    beee1();
}
function size10() {
    kolNum = 10;
    gameParent.style.gridTemplateColumns = "auto auto auto auto auto auto auto auto auto auto";
    gameWidth = 500;
    gameHeight = 600;
    divWH = 40;
    divFS = 20;
    checks = [false,true,false];
    beee1();
}
function size15() {
    kolNum = 15;
    gameParent.style.gridTemplateColumns = "auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto";
    gameWidth = 540;
    gameHeight = 640;
    divWH = 30;
    divFS = 18;
    checks = [false,false,true];
    beee1();
}
function beee1() {
    game = false;
    sizeNumDiv.innerHTML = kolNum + " × " + kolNum;
    sizeContent.style.display = "none";
    gameDiv.style.width = gameWidth + "px";
    gameDiv.style.height = gameHeight + "px";
    gameParent.style.height = gameWidth + "px";
    beee3();
    for (let a = 0 ; a < kolNum ** 2 ; a++) {
        kolDiv[a].style.width = divWH + "px";
        kolDiv[a].style.height = divWH + "px";
        kolDiv[a].style.fontSize = divFS + "px";
    }
}
function bomb15() {
    bombNum = 15;
    beee2();
}
function bomb20() {
    bombNum = 20;
    beee2();
}
function bomb30() {
    bombNum = 30;
    beee2();
}
function bomb50() {
    bombNum = 50;
    beee2();
}
function beee2() {
    game = false;
    bombNumDiv.innerHTML = bombNum;
    bombContent.style.display = "none";
    bombNumDiv.innerHTML = bombNum;
    beee3();
    Size();
}
function Size() {
    for (let a = 0 ; a < checks.length ; a++) {
        if (checks[a]) {
            switch (a) {
                case 0 :
                    size8();
                    break;
                case 1 :
                    size10();
                    break;
                case 2 :
                    size15();
                    break;
            }
        }
    }
}
function beee3() {
    clearInterval(window.timer);
    KOL();
    click();
    correctNum = 0;
}
function number() {
    switch (div.bomb) {
        case 1 :
            div.div.style.color = "rgb(20,150,255)";
            break;
        case 2 :
            div.div.style.color = "rgb(10,110,255)";
            break;
        case 3 :
            div.div.style.color = "rgb(0,40,255)";
            break;
        case 4 :
            div.div.style.color = "rgb(150,0,180)";
            break;
        case 5 :
            div.div.style.color = "rgb(190,0,140)";
            break;
        case 6 :
            div.div.style.color = "rgb(220,0,110)";
            break;
        case 7 :
            div.div.style.color = "rgb(240,10,70)";
            break;
        case 8 :
            div.div.style.color = "rgb(255,0,0)";
            break;
    }
    div.div.innerHTML = div.bomb;
    emptyFunction();
}
function emptyFunction() {
    div.div.classList.remove("flag-img");
    div.status = "show";
    div.div.style.backgroundColor = "#ccc";
    correctNum++;
}
function restartFunction() {
    restart.style.display = "none";
    restartDiv.style.display = "none";
    KOL();
    Size();
}