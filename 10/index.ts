import input from './input.ts';

export const instructions = input.split('\n').reduce((acc, s) => {
	const [f, n] = s.split(' ');
	const instruction: [string, number] = [f, n ? parseInt(n, 10) : 0];
	return [
		...acc,
		...(f === 'addx'
			? [['addx', 0], instruction] as Array<[string, number]>
			: [instruction]),
	];
}, [] as Array<[string, number]>);

const bg = '⬛️';
const fg = '🟨';

const crt = new Array(6).fill(bg).map(() => new Array(40).fill(bg));
let sprite = [0, 1, 2];

const { strength } = instructions.reduce(
	(acc, [_f, n], i) => {
		const cycle = i + 1;
		const calcStrength = cycle === 20 || cycle % 40 === 20;

		const nextValue = acc.value + n;

		const row = Math.floor((cycle - 1) / 40) % 6;
		const col = (cycle - 1) % 40;

		if (sprite.includes(col)) crt[row][col] = fg;
		if (nextValue !== acc.value) {
			sprite = [nextValue - 1, nextValue, nextValue + 1];
		}

		return {
			...acc,
			value: nextValue,
			strength: calcStrength
				? (acc.strength += acc.value * cycle)
				: acc.strength,
		};
	},
	{ value: 1, strength: 0 },
);

const image = crt.map((l) => l.join('')).join('\n');

console.log('Day 10.1:', strength); // 10760
console.log('Day 10.2:\n', image); // FPGPHFGH
