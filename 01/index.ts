import input from './input.ts';

const list = input.split('\n');

const calories = list
	.reduce(
		(acc, n) => {
			// Next Elf
			if (n === '') {
				acc.push(0);
				return acc;
			}

			acc[acc.length - 1] += parseInt(n, 10);
			return acc;
		},
		[0],
	)
	.sort((a, b) => b - a);

console.log('Day 1.1:', calories[0]); // 69281

const [one, two, three] = calories;
console.log('Day 1.2:', one + two + three); // 201524
