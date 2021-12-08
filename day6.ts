import { day6Input } from './data/day6.data';
import { take, of, expand, last, tap } from 'rxjs';

console.time("day6");

const fishInput = day6Input.split(",").map(f => +f);
const numDays = 80;

const fishes$ = of(fishInput).pipe(
    expand(fish => of(fish.flatMap(x => x === 0 ? [6, 8] : x-1))),
    take(numDays + 1)
);

fishes$.pipe(last(), tap(n => console.log(n.length))).subscribe({
    complete: () => console.timeEnd("day6")
});
