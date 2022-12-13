import input from './input.ts';

const parse = () => {
	return input.split('\n\n').map((i) => {
		const lines = i.split('\n');
		const items = lines[1]
			.split('Starting items: ')[1]
			.split(', ')
			.map((n) => parseInt(n, 10));
		const expr = lines[2].split('Operation: new = ')[1];
		const test = parseInt(lines[3].match(/Test: divisible by (\d+)/)![1]);
		const ifTrue = parseInt(
			lines[4].match(/If true: throw to monkey (\d+)/)![1],
			10,
		);
		const ifFalse = parseInt(
			lines[5].match(/If false: throw to monkey (\d+)/)![1],
			10,
		);
		return { items, expr, test, ifTrue, ifFalse };
	});
};

const part1 = () => {
	const monkeys = parse();
	const inspections: number[] = new Array(monkeys.length).fill(0);

	for (let r = 1; r <= 20; r++) {
		for (let m = 0; m < monkeys.length; m++) {
			const { items, expr, test, ifTrue, ifFalse } = monkeys[m];

			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				const worry = Math.floor(eval(expr.replaceAll('old', `${item}`)) / 3);
				const result = worry % test === 0;

				monkeys[result ? ifTrue : ifFalse].items.push(worry);
				monkeys[m].items = monkeys[m].items.length > 1
					? monkeys[m].items.slice(i, 1)
					: [];

				inspections[m]++;
			}
		}
	}

	const [one, two] = inspections.sort((a, b) => b - a);
	return one * two;
};

console.log('Day 11.1:', part1()); // 120056

/* -------------------------------------------------------------------------- */
/*                                   PART 2                                   */
/* -------------------------------------------------------------------------- */

const part2 = () => {
	const monkeys = parse().map((m) => ({
		...m,
		items: m.items.map((i) => BigInt(i)),
		test: BigInt(m.test),
	}));

	const lcm = monkeys
		.map(({ test }) => test)
		.reduce((a, b) => a * b, BigInt(1));

	const inspections: number[] = new Array(monkeys.length).fill(0);

	for (let r = 1; r <= 10000; r++) {
		for (let m = 0; m < monkeys.length; m++) {
			const { items, expr, test, ifTrue, ifFalse } = monkeys[m];

			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				const worry = BigInt(eval(expr.replaceAll('old', `${item}`))) % lcm;
				const result = worry % test === 0n;

				monkeys[result ? ifTrue : ifFalse].items.push(worry);
				monkeys[m].items = monkeys[m].items.length > 1
					? monkeys[m].items.slice(i, 1)
					: [];

				inspections[m]++;
			}
		}
	}

	const [one, two] = inspections.sort((a, b) => b - a);
	return one * two;
};

console.log('Day 11.2:', part2()); // 21816744824
