import { day1Input } from "./data/day1.data";

const input: number[] = day1Input.split("\n").map(v => +v);

//Part 1
let count = 0;
input.forEach((_, i, arr) => arr[i] > arr[i-1] ? count++ : null);
console.log(`number of increases: ${count}`);

//Part 2
let windowCount = 0;
input.forEach((_, i, arr) => {
    if(arr.length < i + 3) return;
    arr[i] + arr[i+1] + arr[i+2] < arr[i+1] + arr[i+2] + arr[i+3] ? windowCount++ : null;
});
console.log(`number of window increases: ${windowCount}`);