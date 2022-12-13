import input from './input.ts';

type Value = number | Value[];
type CompareResult = true | false | undefined;

const pairs = input
	.split(`\n\n`)
	.map((l) => l.split('\n').map((i) => JSON.parse(i)));

const compare = (left: Value, right: Value): CompareResult => {
	const leftIsNumber = typeof left === 'number';
	const rightIsNumber = typeof right === 'number';

	// Both are numbers
	if (leftIsNumber && rightIsNumber) {
		if (left < right) return true;
		if (left > right) return false;
		return undefined;
	}

	// Mixed types
	if (leftIsNumber) {
		return compare([left], right);
	} else if (rightIsNumber) {
		return compare(left, [right]);
	}

	// Both are lists
	const n = Math.min(left.length, right.length);

	for (let i = 0; i < n; i++) {
		const c = compare(left[i], right[i]);
		if (c !== undefined) return c;
	}

	// Left ran out of items first, the input is in order
	if (left.length < right.length) return true;
	// Right ran out of items first, the input is not in order
	if (left.length > right.length) return false;
	// Both lists ran out of items at the same time, continue.
	return undefined;
};

const sum = pairs.reduce(
	(acc, [left, right], i) => (compare(left, right) ? acc + (i + 1) : acc),
	0,
);

console.log('Day 13.1:', sum); // 6235

/* -------------------------------------------------------------------------- */
/*                                   PART 2                                   */
/* -------------------------------------------------------------------------- */

const dividers = [[[2]], [[6]]];
const packets = pairs.flat().concat(...dividers);

const decoder = dividers.reduce(
	(acc, div) =>
		acc *
		packets.reduce((sum, packet) => !compare(div, packet) ? sum + 1 : sum, 0),
	1,
);
console.log('Day 13.2:', decoder); // 22866
