import input from './input.ts';

const arr = input.split('\n');

const getPrio = (letter: string) =>
	/^[a-z]$/.test(letter)
		? letter.charCodeAt(0) - 96
		: letter.charCodeAt(0) - 38;

// The list of common items (letters) between both halves of each input item
const items = arr.map((i) => {
	const mid = i.length / 2;
	const left = i.substring(0, mid);
	const right = i.substring(mid);
	return [...left].find((l) => right.includes(l))!;
});

const part1 = items.reduce((total, i) => total + getPrio(i), 0);

console.log('Day 3.1:', part1); // 7737

/* -------------------------------------------------------------------------- */
/*                                   PART 2                                   */
/* -------------------------------------------------------------------------- */

// Group the rucksacks into groups of 3
const groups = arr
	.reduce(
		(acc, r, i) => {
			if ((i + 1) % 3 === 0) {
				acc[acc.length - 1].push(r);
				return [...acc, []];
			}
			acc[acc.length - 1].push(r);
			return acc;
		},
		[[] as string[]],
	)
	.filter((g) => g.length);

const part2 = groups.reduce((acc, g) => {
	const [st, nd, rd] = g;
	const badge = [...st].find((l) => nd.includes(l) && rd.includes(l))!;
	return acc + getPrio(badge);
}, 0);

console.log('Day 3.2:', part2); // 2697
