import { day4Nums, day4Cards } from "./data/day4.data";
import _ from "lodash";

console.time("day4");

const nums: string[] = day4Nums.split(",");
const cardsInput: string[] = day4Cards.split("\n");

class CardNum {
    constructor(num: number, called: boolean, row: number, col: number) {
        this.num = num;
        this.called = called;
        this.row = row;
        this.col = col;
    }
    num: number;
    called: boolean;
    row: number;
    col: number;
}

type Cards = CardNum[];
const allCards: Cards[] = [];
const minWin = 5;

let cardIndex = 0;
let rowIndex = 0;
cardsInput.forEach((rowVal) => {
    if (!rowVal) {
        cardIndex++;
        rowIndex = 0;
        return;
    }

    const row: CardNum[] = rowVal.trim().split(/\s+/).map((val, i) => new CardNum(+val, false, rowIndex, i));
    if (!allCards[cardIndex]) {
        allCards[cardIndex] = [];
    }
    allCards[cardIndex].push(...row);
    rowIndex++;
});

function callNumber(num: number) {
    allCards.forEach(card =>
        card.forEach(cardNum => cardNum.num === num ? cardNum.called = true : null)
    );
}

function checkWinner(): number[] {
    const winners: number[] = [];
    allCards.forEach((card, cardIndex) => {
        const called: CardNum[] = card.filter(c => c.called);
        for (let i = 0; i < minWin; i++) {
            const cols = called.filter(c => c.col === i);
            const rows = called.filter(r => r.row === i);
            cols.length === minWin || rows.length === minWin ? winners.push(cardIndex) : null;
        }
    });
    return winners;
}

function calcScore(card: CardNum[], justCalled: number) {
    const unmarkedSum = card.filter(v => !v.called).map(c => c.num).reduce((p, c) => p + c);
    const finalScore = unmarkedSum * justCalled;
    console.log(`final score: ${finalScore}`);
}

// Call Numbers
function callNumbers() {
    for (let i = 0; i < nums.length; i++) {
        callNumber(+nums[i]);
        if (i >= minWin) {
            const winners = checkWinner();
            if (winners.length > 0) {
                const winner = allCards[winners[0]];
                calcScore(winner, +nums[i]);
                break;
            }
        }
    }
}
callNumbers();

//Part 2

function callNumbers2() {
    for (let i = 0; i < nums.length; i++) {
        callNumber(+nums[i]);
        if (i >= minWin) {
            const winners = checkWinner();
            if (winners.length > 0 && allCards.length > 1) {
                _.pullAt(allCards, winners);
            }

            if (allCards.length === 1) {
                const lastWinners = checkWinner();
                if (lastWinners.length === 1) {
                    calcScore(allCards[0], +nums[i]);
                    break;
                }
            }
        }
    }
}
callNumbers2();

console.timeEnd("day4");
