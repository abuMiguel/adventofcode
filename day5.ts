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

function addAndCheckIntersection(val: string) {
    !graph.has(val) ? graph.add(val) : !intersected.has(val) ? intersected.add(val) : null;
}

//Part 1
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

// Part 2
// Diagon Alley
graph.clear();
points.forEach(p => {
    const distX = p.x1 - p.x2;
    const isXIncrementing = distX < 0;
    const distY = p.y1 - p.y2;
    const isYIncrementing = distY < 0;
    const isVertical = p.x1 === p.x2;
    const isHorizontal = p.y1 === p.y2;

    const loopLength = distX === 0 ? Math.abs(distY) : Math.abs(distX);
    for (let i = 0; i <= loopLength; i++) {
        const xVal = isXIncrementing ? `${p.x1 + i}` : isVertical ? `${p.x1}` : `${p.x1 - i}`;
        const yVal = isYIncrementing ? `${p.y1 + i}` : isHorizontal ? `${p.y1}` : `${p.y1 - i}`;
        const val = `${xVal},${yVal}`;
        addAndCheckIntersection(val);
    }
});

console.log(intersected.size);
