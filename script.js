var game_list = document.querySelector(".game-list");
const Games = [
    {name: "Flappy Bird", url: "flappy-bird", image_url: ""},
    {name: "Ping Pong", url: "ping-pong2", image_url: ""},
    {name: "Bomb", url: "bomb2", image_url: "bomb/bomb.png"},
    {name: "XO", url: "xo", image_url: ""},
    {name: "2048", url: "2048(2)", image_url: ""},
    {name: "Sudoku", url: "sudoku", image_url: ""},
    {name: "Chess", url: "chess3", image_url: ""},
    {name: "Chess", url: "chess3", image_url: ""},
    {name: "Chess", url: "chess3", image_url: ""},
    {name: "Chess", url: "chess3", image_url: ""},
    {name: "Chess", url: "chess3", image_url: ""},
    {name: "Chess", url: "chess3", image_url: ""},
    {name: "Chess", url: "chess3", image_url: ""},
    {name: "Chess", url: "chess3", image_url: ""},
    {name: "Chess", url: "chess3", image_url: ""},
    {name: "Chess", url: "chess3", image_url: ""},
    {name: "Chess", url: "chess3", image_url: ""}
];
window.onload = function() {
    for (let a = 0 ; a < Games.length ; a++) {
        let [div, div_relative, name] = [document.createElement("div"),document.createElement("div"),document.createElement("div")];
        game_list.appendChild(div);
        div_relative.style.backgroundImage = "url(../image/" + Games[a].image_url + ")";
        // div.onclick = function() {
        //     window.location.href = "file:///C:/Users/Ghadir/Desktop/Code/html/" + Games[a].url + ".html";
        // }
        div.appendChild(div_relative);
        name.innerHTML = Games[a].name;
        name.classList.add("game-name");
        name.onclick = function() {
            window.location.href = "file:///C:/Users/Ghadir/Desktop/Code/html/" + Games[a].url + ".html";
        }
        div_relative.appendChild(name);
    }
}