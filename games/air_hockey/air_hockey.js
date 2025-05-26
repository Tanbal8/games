class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    scale() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }
    add(other) {
        if (typeof other == "number")
            return new Vector(this.x + other, this.y + other);
        else if (other instanceof Vector)
            return new Vector(this.x + other.x, this.y + other.y);
    }
    subtract(other) {
        if (typeof other == "number")
            return new Vector(this.x - other, this.y - other);
        else if (other instanceof Vector)
            return new Vector(this.x - other.x, this.y - other.y);
    }
    multiply(other) {
        if (typeof other == "number")
            return new Vector(this.x * other, this.y * other);
    }
    to_string() {
        return `(${this.x},  ${this.y})`; 
    }
}
class Circle {
    constructor(radius, x, y, mass, background) {
        this.radius = radius;
        this.position = new Vector(x, y);
        this.mass = mass;
        this.div = document.createElement("div");
        this.div.style.borderRadius = "50%";
        this.div.style.width = (2 * radius) + "px";
        this.div.style.height = (2 * radius) + "px";
        this.div.style.top = y + "px";
        this.div.style.left = x + "px";
        this.velocity = new Vector(0, 0);
        this.div.style.background = background;
        // this.div.style.boxShadow = "-5px -5px 8 px dark" + background + " inset";
        Game.div.appendChild(this.div);
    }
}
var start_space = 20;
var Game = {
    check: false,
    stop_check: false,
    div: document.getElementById("game-div"),
    piece_radius: 30,
    ball_radius: 15,
    goal_height: 200,
    first: true,
    start: function() {
        this.check = true;
        this.width = this.div.offsetWidth;
        this.height = this.div.offsetHeight;
        this.blue = new Circle(this.piece_radius, 0, 0, 3, "blue");
        this.red = new Circle(this.piece_radius, 0, 0, 3, "red");
        this.ball = new Circle(this.ball_radius, 0, 0, 1, "black");
        this.piece_speed = 3.5;
        this.ball.speed = 3;
        this.ball.start_max_degree = 40;
        this.ball.speed_factor = 1;
        this.blue.direction_key = {up: 'w', down: 's', right: 'd', left: 'a'};
        this.red.direction_key = {up: 'ArrowUp', down: 'ArrowDown', right: 'ArrowRight', left: 'ArrowLeft'};
        this.blue.score = 0;
        this.red.score = 0;
        this.blue.goal = {div: document.getElementById("blue-goal"), height: this.goal_height};
        this.red.goal = {div: document.getElementById("red-goal"), height: this.goal_height};
        this.blue.goal.div.style.height = this.blue.goal.height + "px";
        this.red.goal.div.style.height = this.red.goal.height + "px";
        let goal_size = parseFloat(window.getComputedStyle(this.blue.goal.div).borderWidth.slice(0, -2));
        this.blue.goal.width = this.blue.goal.div.offsetWidth - goal_size;
        this.red.goal.width = this.red.goal.div.offsetWidth - goal_size;
        this.blue.update = piece_update.bind(this.blue);
        this.red.update = piece_update.bind(this.red);
        this.ball.update = ball_update.bind(this.ball);
        this.blue.move = {up: false, down: false, right: false, left: false};
        this.red.move = {up: false, down: false, right: false, left: false};
        this.blue.speed = this.piece_speed;
        this.red.speed = this.piece_speed;
        this.blue.collision_check = blue_collision_check.bind(this.blue);
        this.red.collision_check = red_collision_check.bind(this.red);
        this.reset();
    },
    stop: function() {
        this.check = 0;
        this.stop_check = 1;
        for (let key in this.blue.move) {
            this.blue.move[key] = false;
            this.red.move[key] = false;
        }
    },
    continue: function() {
        this.check = 1;
        this.stop_check = 0;
        this.interval();
    },
    restart: function() {},
    interval: function() {
        this.blue.update();
        this.red.update();
        this.ball.update();
        if (this.check)
            requestAnimationFrame(this.interval.bind(this));
    },
    reset: function() {
        Game.check = 1;
        this.blue.position.x = start_space; 
        this.blue.position.y = (this.height / 2) - this.piece_radius; 
        this.red.position.x = this.width - start_space - (2 * this.piece_radius); 
        this.red.position.y = (this.height / 2) - this.piece_radius;
        this.ball.position.x = (this.width / 2) - this.ball.radius;
        this.ball.position.y = (this.height / 2) - this.ball.radius;
        this.ball.div.style.top = this.ball.position.y + "px";
        this.ball.div.style.left = this.ball.position.x + "px";
        this.blue.div.style.top = this.blue.position.y + "px";
        this.blue.div.style.left = this.blue.position.x + "px";
        this.red.div.style.top = this.red.position.y + "px";
        this.red.div.style.left = this.red.position.x + "px";
        let degree = Math.floor(Math.random() * (2 * this.ball.start_max_degree)) - this.ball.start_max_degree;
        let radiant = degree / 180 * Math.PI;
        Game.ball.velocity.x = Game.ball.speed * Math.cos(radiant);
        Game.ball.velocity.y = Game.ball.speed * Math.sin(radiant);
        Game.ball.velocity.x *= -1;
        setTimeout(() => {
            Game.interval();
        }, 1000);
    }
}
window.onload = function() {
    Game.start();
}
window.onkeydown = function(e) {
    
    switch (e.key) {
        case Game.blue.direction_key.up :
            if (Game.check) Game.blue.move.up = true;
            break;
        case Game.blue.direction_key.down :
            if (Game.check) Game.blue.move.down = true;
            break;
        case Game.blue.direction_key.right :
            if (Game.check) Game.blue.move.right = true;
            break;
        case Game.blue.direction_key.left :
            if (Game.check) Game.blue.move.left = true;
            break;
        case Game.red.direction_key.up :
            if (Game.check) Game.red.move.up = true;
            break;
        case Game.red.direction_key.down :
            if (Game.check) Game.red.move.down = true;
            break;
        case Game.red.direction_key.right :
            if (Game.check) Game.red.move.right = true;
            break;
        case Game.red.direction_key.left :
            if (Game.check) Game.red.move.left = true;
            break;
        case "Escape" :
            if (Game.check) Game.stop();
            break;
        case "Enter" :
            if (Game.stop_check) Game.continue();
            break;
    }
}
window.onkeyup = function(e) {
    switch (e.key) {
        case Game.blue.direction_key.up :
            Game.blue.move.up = false;
            break;
        case Game.blue.direction_key.down :
            Game.blue.move.down = false;
            break;
        case Game.blue.direction_key.right :
            Game.blue.move.right = false;
            break;
        case Game.blue.direction_key.left :
            Game.blue.move.left = false;
            break;
        case Game.red.direction_key.up :
            Game.red.move.up = false;
            break;
        case Game.red.direction_key.down :
            Game.red.move.down = false;
            break;
        case Game.red.direction_key.right :
            Game.red.move.right = false;
            break;
        case Game.red.direction_key.left :
            Game.red.move.left = false;
            break;
    }
}
function piece_update() {
    let unit_velocity = new Vector(0, 0);
    if (this.move.up) unit_velocity.y--;
    if (this.move.down) unit_velocity.y++;
    if (this.move.right) unit_velocity.x++;
    if (this.move.left) unit_velocity.x--;
    this.velocity = unit_velocity.multiply((unit_velocity.x != 0 && unit_velocity.y != 0) ? Math.sqrt((this.speed ** 2) / 2) : this.speed);
    this.position = this.position.add(this.velocity);
    this.collision_check();
    this.div.style.top = this.position.y + "px";
    this.div.style.left = this.position.x + "px";
}
function ball_update() {
    this.position = this.position.add(this.velocity);
    if (this.position.y <= 0) {
        this.position.y = 0;
        this.velocity.y = -this.velocity.y;
    }
    else if (this.position.y + (this.radius * 2) >= Game.height) {
        this.position.y = Game.height - (this.radius * 2);
        this.velocity.y = -this.velocity.y;
    }
    else if (this.position.x <= 0) {
        let up = (Game.height / 2) - (Game.blue.goal.height / 2);
        let down = (Game.height / 2) + (Game.blue.goal.height / 2);
        if (((this.position.y + this.radius) <= up) || ((this.position.y + this.radius) >= down)) {
            this.position.x = 0;
            this.velocity.x = -this.velocity.x;
        }
        else {
            if (this.position.x <= -Game.red.goal.width) { // Goal
                this.position.x = -Game.red.goal.width;
                this.velocity.x = 0;
                this.velocity.y = 0;
                goal("red");
            }
            else {
                let x = 0;
                let y1 = -(Game.blue.goal.height / 2);
                let y2 = (Game.height / 2) + (Game.blue.goal.height / 2);
                let xm = this.position.x + this.radius;
                let ym = this.position.y + this.radius;
                if (((Math.sqrt(((xm - x) ** 2) + ((ym - y1) ** 2)) <= this.radius) && (xm <= 0)) || ((Math.sqrt(((xm - x) ** 2) + ((ym - y2) ** 2)) <= this.radius) && (xm <= 0))) {
                    this.velocity.x = -this.velocity.x;
                }
                if (this.position.y <= (Game.height / 2) - (Game.blue.goal.height / 2)) {
                    this.velocity.y = -this.velocity.y;
                    this.position.y = (Game.height / 2) - (Game.blue.goal.height / 2);
                }
                else if (this.position.y >= (Game.height / 2) + (Game.blue.goal.height / 2)) {
                    this.velocity.y = -this.velocity.y;
                    this.position.y = (Game.height / 2) + (Game.blue.goal.height / 2);
                }
            }
        }
    }
    else if (this.position.x + (this.radius * 2) >= Game.width) {
        let up = (Game.height / 2) - (Game.red.goal.height / 2);
        let down = (Game.height / 2) + (Game.red.goal.height / 2);
        if (((this.position.y + this.radius) <= up) || ((this.position.y + this.radius) >= down)) {
            this.position.x = (Game.width - (this.radius * 2));
            this.velocity.x = -this.velocity.x;
        }
        else {
            if (this.position.x + (2 * this.radius) >= Game.width + Game.red.goal.width) {
                this.position.x = Game.width + Game.red.goal.width - (2 * this.radius);
                this.velocity.x = 0;
                this.velocity.y = 0;
                goal("blue");
            }
            else {
                let x = Game.width;
                let y1 = (Game.height / 2) - (Game.red.goal.height / 2);
                let y2 = (Game.height / 2) + (Game.red.goal.height / 2);
                let xm = this.position.x + this.radius;
                let ym = this.position.y + this.radius;
                if (((Math.sqrt(((xm - x) ** 2) + ((ym - y1) ** 2)) <= this.radius) && (xm >= Game.width)) || ((Math.sqrt(((xm - x) ** 2) + ((ym - y2) ** 2)) <= this.radius) && xm <= Game.width)) {
                    this.velocity.x = -this.velocity.x;
                }
                if (this.position.y <= (Game.height / 2) - (Game.blue.goal.height / 2)) {
                    this.velocity.y = -this.velocity.y;
                    this.position.y = (Game.height / 2) - (Game.blue.goal.height / 2);
                }
                else if (this.position.y >= (Game.height / 2) + (Game.blue.goal.height / 2)) {
                    this.velocity.y = -this.velocity.y;
                    this.position.y = (Game.height / 2) + (Game.blue.goal.height / 2);
                }
            }
        }
    }
    this.div.style.top = this.position.y + "px";
    this.div.style.left = this.position.x + "px";
}
function blue_collision_check() {
    // wall
    if (this.position.y <= 0) {
        this.position.y = 0;
        this.velocity.y = 0;
    }
    if (this.position.y + (this.radius * 2) >= Game.height) {
        this.position.y = Game.height - (this.radius * 2);
        this.velocity.y = 0;
    }
    if (this.position.x <= 0) {
        this.position.x = 0;
        this.velocity.x = 0;
    }
    if (this.position.x + (this.radius * 2) >= (Game.width / 2) - 2.5) {
        this.position.x = ((Game.width / 2) - (this.radius * 2)) - 2.5;
        this.velocity.x = 0;
    }
    // ball
    let dx = (this.position.x + this.radius) - (Game.ball.position.x + Game.ball_radius);
    let dy = (this.position.y + this.radius) - (Game.ball.position.y + Game.ball_radius);
    if (Math.sqrt((dx ** 2) + (dy ** 2)) <= this.radius + Game.ball.radius) ball_collision(this);
}
function red_collision_check() {
    // wall
    if (this.position.y <= 0) {
        this.position.y = 0;
        this.velocity.y = 0;
    }
    if (this.position.y + (this.radius * 2) >= Game.height) {
        this.position.y = Game.height - (this.radius * 2);
        this.velocity.y = 0;
    }
    if (this.position.x <= (Game.width / 2) + 2.5) {
        this.position.x = (Game.width / 2) + 2.5;
        this.velocity.x = 0;
    }
    if (this.position.x + (this.radius * 2) >= Game.width) {
        this.position.x = Game.width - (this.radius * 2);
        this.velocity.x = 0;
    }
    // ball
    let dx = (this.position.x + this.radius) - (Game.ball.position.x + Game.ball_radius);
    let dy = (this.position.y + this.radius) - (Game.ball.position.y + Game.ball_radius);
    if (Math.sqrt((dx ** 2) + (dy ** 2)) <= this.radius + Game.ball.radius) ball_collision(this);
}
function ball_collision(piece) {
    let ball = Game.ball;
    let center1 = piece.position.add(piece.radius);
    let center2 = ball.position.add(ball.radius);
    let dx = center1.x - center2.x;
    let dy = center1.y - center2.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < piece.radius + ball.radius) {
        let unit_normal = new Vector(dx / distance, dy / distance);
        let unit_tangent = new Vector(-unit_normal.y, unit_normal.x);
        let v1 = piece.velocity;
        let v2 = ball.velocity;
        let m1 = piece.mass;
        let m2 = ball.mass;
        let v1_n = unit_normal.x * v1.x + unit_normal.y * v1.y;
        let v1_t = unit_tangent.x * v1.x + unit_tangent.y * v1.y;
        let v2_n = unit_normal.x * v2.x + unit_normal.y * v2.y;
        let v2_t = unit_tangent.x * v2.x + unit_tangent.y * v2.y;
        let v1_n_f = (v1_n * (m1 - m2) + 2 * m2 * v2_n) / (m1 + m2);
        let v2_n_f = (v2_n * (m2 - m1) + 2 * m1 * v1_n) / (m1 + m2);
        let v1_n_vector = unit_normal.multiply(v1_n_f);
        let v1_t_vector = unit_tangent.multiply(v1_t);
        let v2_n_vector = unit_normal.multiply(v2_n_f);
        let v2_t_vector = unit_tangent.multiply(v2_t);
        piece.velocity = v1_n_vector.add(v1_t_vector);
        ball.velocity = v2_n_vector.add(v2_t_vector).multiply(Game.ball.speed_factor);
        let overlap = (piece.radius + ball.radius) - distance;
        let correction = unit_normal.multiply(overlap / 2 + 0.5);
        piece.position = piece.position.add(correction);
        ball.position = ball.position.subtract(correction);
    }
}
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "hidden") Game.stop();
});
function goal(color) {
    switch (color) {
        case "blue" :
            Game.blue.score++;
            break;
        case "red" :
            Game.red.score++;
            break;
    }
    console.clear();
    console.log("blue " + Game.blue.score + " - " + Game.red.score + " red");
    setTimeout(() => {
        Game.reset();
    }, 1000);
    Game.check = 0;
}