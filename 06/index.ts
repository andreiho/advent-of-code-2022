import input from './input.ts';

const run = (size: number) => {
	let marker = 0;

	[...input].forEach((char, i) => {
		if (marker > 0) return; // We already found the marker

		const group = [char, ...input.slice(i + 1, i + size)].join('');
		const set = new Set([...group]);

		// Found the marker because no letter repeats in the current group
		if (set.size === size) {
			marker = input.indexOf(group) + size;
		}
	});

	return marker;
};

console.log('Day 6.1:', run(4)); // 1909
console.log('Day 6.2:', run(14)); // 3380
