import { day3Input } from "./data/day3.data";

console.time("day3");

const input: string[] = day3Input.split("\n");

class Nums {
    ones = 0;
    zeroes = 0;
}

//Part 1
let numbers: Nums[] = [];
const count = input[0].length;
for (let i = 0; i < count; i++) {
    numbers.push(new Nums());
}

input.forEach(s => {
    for (let i = 0; i < s.length; i++) {
        s[i] === '1' ? numbers[i].ones++ : numbers[i].zeroes++;
    }
});

const gamma: string = numbers.map(n => n.ones > n.zeroes ? "1" : "0").join('');
const epsilon: string = numbers.map(n => n.ones < n.zeroes ? "1" : "0").join('');

const gammaNum = parseInt(gamma, 2);
const epsilonNum = parseInt(epsilon, 2);
console.log(`power consumption: ${gammaNum * epsilonNum}`);

//Part 2

numbers = [];
for (let i = 0; i < count; i++) {
    numbers.push(new Nums());
}

let o2Filter = input;
for (let i = 0; i < count; i++) {
    const ones: string[] = o2Filter.filter(v => v[i] === "1");
    const zeroes: string[] = o2Filter.filter(v => v[i] === "0");
    o2Filter = ones.length >= zeroes.length ? ones : zeroes;

    if(o2Filter.length === 1){
        break;
    }
}

let co2Filter = input;
for (let i = 0; i < count; i++) {
    const ones: string[] = co2Filter.filter(v => v[i] === "1");
    const zeroes: string[] = co2Filter.filter(v => v[i] === "0");
    co2Filter = ones.length < zeroes.length ? ones : zeroes;

    if(co2Filter.length === 1){
        break;
    }
}

const oxygenGeneratorRating = parseInt(o2Filter[0], 2);
const co2ScrubberRating = parseInt(co2Filter[0], 2);
console.log(`life support rating: ${oxygenGeneratorRating * co2ScrubberRating}`);
console.timeEnd("day3");
