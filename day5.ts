import { day5Input } from "./data/day5.data";

const input = day5Input.split("\n");

class Points {
    constructor(input: string) {
        const nums = input.split("->").map(v => v.trim());
        [this.x1, this.y1] = nums[0].split(",").map(x => +x);
        [this.x2, this.y2] = nums[1].split(",").map(y => +y);
    }
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

const points = input.map(i => new Points(i));
const graph = new Set<string>();
const intersected = new Set<string>();

function addAndCheckIntersection(val: string){
    !graph.has(val) ? graph.add(val) : !intersected.has(val) ? intersected.add(val) : null;
}

points.forEach(p => {
    // Vertical line
    if (p.x1 === p.x2) {
        const largerY = Math.max(p.y1, p.y2);
        const smallerY = Math.min(p.y1, p.y2);
        for (let i = smallerY; i <= largerY; i++) {
            const val = `${p.x1},${i}`;
            addAndCheckIntersection(val);
        }
    }

    // Horizontal line
    if (p.y1 === p.y2) {
        const largerX = Math.max(p.x1, p.x2);
        const smallerX = Math.min(p.x1, p.x2);
        for (let i = smallerX; i <= largerX; i++) {
            const val = `${i},${p.y1}`;
            addAndCheckIntersection(val);
        }
    }
});

console.log(intersected.size);
