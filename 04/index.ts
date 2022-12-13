import input from './input.ts';

const pairs = input.split('\n').map((l) => l.split(','));

const range = (start: number, end: number) =>
	Array(end - start + 1)
		.fill(null)
		.map((_, i) => start + i);

const { part1, part2 } = pairs.reduce(
	(acc, [one, two]) => {
		const [start1, end1] = one.split('-').map(Number);
		const [start2, end2] = two.split('-').map(Number);
		const r1 = range(start1, end1);
		const r2 = range(start2, end2);

		const contain = [r1.length, r2.length].includes(
			new Set([...r1, ...r2]).size,
		);
		const overlap = r1.filter((v) => r2.includes(v)).length;

		return {
			part1: contain ? acc.part1 + 1 : acc.part1,
			part2: overlap ? acc.part2 + 1 : acc.part2,
		};
	},
	{ part1: 0, part2: 0 },
);

console.log('Day 4.1:', part1); // 534
console.log('Day 4.2:', part2); // 841
