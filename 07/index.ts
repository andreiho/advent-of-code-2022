import set from 'npm:lodash.set@^4.3.2';
import input from './input.ts';

const lines = input.split('\n');

let dir = '';
let listing = false;

const tree = lines.reduce((acc, line) => {
	if (line.startsWith('$')) {
		listing = false;
	}

	// Command
	if (line.startsWith('$ cd')) {
		const curdir = line.split('$ cd')[1].trim();

		if (!dir) {
			dir = curdir;
			acc[dir] = {};
		} else {
			if (curdir === '..') {
				dir = dir.split('.').slice(0, -1).join('.');
			} else {
				dir += `.${curdir}`;
			}
		}
		return acc;
	}

	if (dir && line.startsWith('$ ls')) {
		listing = true;
		return acc;
	}

	if (listing) {
		const [size, name] = line.split(' ');
		if (size === 'dir') {
			set(acc, [...dir.split('.'), name], {});
		} else if (name) {
			set(acc, [...dir.split('.'), name], parseInt(size, 10));
		}
		return acc;
	}
}, {} as any);

let result = 0;

function calc(obj: any): number {
	let total: number = Object.values(obj).reduce(
		(sum: number, i) => (typeof i === 'number' ? sum + i : sum),
		0,
	);

	for (var prop in obj) {
		if (typeof obj[prop] === 'object') {
			total = total + calc(obj[prop]);
		}
	}

	if (total <= 100000) {
		result = result + total;
	}

	obj['__size'] = total;
	return total;
}

calc(tree);
console.log('Day 7.1:', result); // 1449447

/* -------------------------------------------------------------------------- */
/*                                   PART 2                                   */
/* -------------------------------------------------------------------------- */

const disk = 70000000;
const unused = disk - tree.__size;
const target = 30000000;
const missing = target - unused;

const candidates: number[] = [];

const freeup = (obj: any, name = '/') => {
	const enough = obj.__size >= missing;

	if (enough) {
		candidates.push(obj.__size);
	}

	for (var prop in obj) {
		if (typeof obj[prop] === 'object') {
			freeup(obj[prop]);
		}
	}
};
freeup(tree);

const smallest = Math.min(...candidates);
console.log('Day 7.2:', smallest); // 8679207
