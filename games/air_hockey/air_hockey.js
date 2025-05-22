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
        this.div.innerHTML = this.mass + "kg";
        Game.div.appendChild(this.div);
    }
//     update() {
//     this.position = this.position.add(this.velocity);
//     for (let a = 0; a < Game.objects.length; a++) {
//         let other = Game.objects[a];
//         if (this !== other && other instanceof Circle) {
//             let center1 = this.position.add(this.radius);
//             let center2 = other.position.add(other.radius);
//             let dx = center1.x - center2.x;
//             let dy = center1.y - center2.y;
//             let distance = Math.sqrt(dx * dx + dy * dy);
//             if (distance < this.radius + other.radius) {
//                 let unit_normal = new Vector(dx / distance, dy / distance);
//                 let unit_tangent = new Vector(-unit_normal.y, unit_normal.x);
//                 let v1 = this.velocity;
//                 let v2 = other.velocity;
//                 let m1 = this.mass;
//                 let m2 = other.mass;
//                 let v1_n = unit_normal.x * v1.x + unit_normal.y * v1.y;
//                 let v1_t = unit_tangent.x * v1.x + unit_tangent.y * v1.y;
//                 let v2_n = unit_normal.x * v2.x + unit_normal.y * v2.y;
//                 let v2_t = unit_tangent.x * v2.x + unit_tangent.y * v2.y;
//                 let v1_n_f = (v1_n * (m1 - m2) + 2 * m2 * v2_n) / (m1 + m2);
//                 let v2_n_f = (v2_n * (m2 - m1) + 2 * m1 * v1_n) / (m1 + m2);
//                 let v1_n_vector = unit_normal.multiply(v1_n_f);
//                 let v1_t_vector = unit_tangent.multiply(v1_t);
//                 let v2_n_vector = unit_normal.multiply(v2_n_f);
//                 let v2_t_vector = unit_tangent.multiply(v2_t);
//                 this.velocity = v1_n_vector.add(v1_t_vector);
//                 other.velocity = v2_n_vector.add(v2_t_vector);
//                 let overlap = (this.radius + other.radius) - distance;
//                 let correction = unit_normal.multiply(overlap / 2 + 0.75);
//                 this.position = this.position.add(correction);
//                 other.position = other.position.subtract(correction);
//             }
//         }
//     }
//     if (this.position.y <= 0) {
//         this.velocity.y = -this.velocity.y;
//         this.position.y = 0;
//     }
//     if (this.position.y + 2 * this.radius >= window.innerHeight) {
//         this.velocity.y = -this.velocity.y;
//         this.position.y = window.innerHeight - 2 * this.radius;
//     }
//     if (this.position.x <= 0) {
//         this.velocity.x = -this.velocity.x;
//         this.position.x = 0;
//         if (this.div.style.background == "pink") {
//             blue++;
//             console.clear();
//             console.log("Blue: " + blue + " - " + green + " :Green");
//         }
//     }
//     if (this.position.x + 2 * this.radius >= window.innerWidth) {
//         this.velocity.x = -this.velocity.x;
//         this.position.x = window.innerWidth - 2 * this.radius;
//     }
//     this.div.style.top = this.position.y + "px";
//     this.div.style.left = this.position.x + "px";
// }
    collision_check(other) {
        return Math.sqrt(((this.position.x - other.position.x) ** 2) + ((this.position.y - other.position.y) ** 2)) <= this.radius + other.radius;
    }
}
var start_space = 20;
var Game = {
    check: 0,
    div: document.getElementById("game-div"),
    start: function() {
        this.width = this.div.offsetWidth;
        this.height = this.div.offsetHeight;
        this.blue = new Circle(30, start_space, (this.height / 2) - 30, 10, "blue");
        this.red = new Circle(30, this.width - start_space - (2 * 30), (this.height / 2) - 30, 10, "red");
        this.ball = new Circle(15, (this.width / 2) - 15, (this.height / 2) - 30, 5, "black");
    },
    stop: function() {},
    continue: function() {},
    restart: function() {}
}
window.onload = function() {
    Game.start();
}