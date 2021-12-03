import { day2Input } from "./day2.data";

class pos {
    constructor(d: string, u: number) {
        this.direction = d;
        this.unit = u;
    } 
    direction: string;
    unit: number;
}
const input: pos[] = day2Input.split("\n").map<pos>((v) => new pos(v.split(" ")[0], +v.split(" ")[1]));

// Part 1
let x = 0, y = 0;
input.forEach(p => {
    switch(p.direction){
        case "forward": x += p.unit;
            break;
        case "up": y -= p.unit;
            break;
        case "down": y += p.unit;
            break;
        default: break;
    }
});
console.log(x*y);

// Part 2
x = 0;
y = 0;
let aim = 0;
input.forEach(p => {
    switch(p.direction){
        case "forward": x += p.unit;
            y += aim * p.unit;
            break;
        case "up": aim -= p.unit;
            break;
        case "down": aim += p.unit;
            break;
        default: break;
    }
});
console.log(x*y);