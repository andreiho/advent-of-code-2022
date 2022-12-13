import input from './input.ts';

const [crates, instructions] = input.split('\n\n');
const lines = crates.split('\n').slice(0, -1);
const longest = lines.reduce((acc, l) => (l.length > acc ? l.length : acc), 0);

const arr = lines
	// Transpose
	.reduce((acc, l) => {
		for (let i = 0; i < longest; i++) {
			acc[i] = acc[i] || '';
			acc[i] += l[i] ?? '';
		}
		return acc;
	}, [] as string[])
	// Remove non alpha-numeric chars and re-order the letters
	.map((l: string) =>
		l
			.replace(/[^a-z0-9]/gi, '')
			.split('')
			.reverse()
			.join('')
	)
	// Remove empty strings
	.filter(Boolean);

const data1 = [...arr];
const data2 = [...arr];

const movePart1 = (count: number, from: number, to: number) => {
	for (let i = 0; i < count; i++) {
		const m = data1[from - 1].match(/.$/);
		data1[from - 1] = data1[from - 1].replace(/.$/, '');
		data1[to - 1] += m;
	}
};

const movePart2 = (count: number, from: number, to: number) => {
	const m = data2[from - 1].slice(-count);
	data2[from - 1] = data2[from - 1].slice(0, -count);
	data2[to - 1] += m;
};

instructions.split('\n').forEach((i) => {
	const [count, from, to] = i
		.match(/move (\d+) from (\d+) to (\d+)/)
		?.slice(1)
		.map(Number)!;

	movePart1(count, from, to);
	movePart2(count, from, to);
});

const part1 = data1.reduce((r, s) => (r += s.slice(-1)), '');
console.log('Day 5.1:', part1); // DHBJQJCCW

const part2 = data2.reduce((r, s) => (r += s.slice(-1)), '');
console.log('Day 5.2:', part2); // WJVRLSJJT
