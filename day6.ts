import { day6Input } from './data/day6.data';
import { from, map, take } from 'rxjs';

const fish = day6Input.split(",").map(f => +f);
const fish$ = from(fish);


