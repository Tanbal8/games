var game_list = document.getElementById("game-list");
const Games = [
    {name: "minesweeper", url: "minesweeper/minesweeper", image_url: "bomb/bomb.png"},
    {name: "XO", url: "xo/xo", image_url: ""},
    {name: "Sudoku", url: "sudoku", image_url: ""},
    {name: "2048", url: "2048/2048", image_url: ""}
];
window.onload = function() {
    for (let a = 0 ; a < Games.length ; a++) {
        let [div, div_relative, name] = [document.createElement("div"),document.createElement("div"),document.createElement("div")];
        game_list.appendChild(div);
        div_relative.style.backgroundImage = "url(../image/" + Games[a].image_url + ")";
        div.onclick = function() {
            window.location.href = "games/" + Games[a].url + ".html";
        }
        div.appendChild(div_relative);
        name.innerHTML = Games[a].name;
        name.classList.add("game-name");
        name.onclick = function() {
            window.location.href = "games/" + Games[a].url + ".html";
        }
        div_relative.appendChild(name);
    }
}