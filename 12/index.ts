import input from './input.ts';

const data = input.split('\n').map((l) => l.split(''));

let start = '';
let end = '';

const grid = data.map((row, r) =>
	row.map((col, c) => {
		if (col === 'S') {
			start = `${r},${c}`;
			return 1;
		}
		if (col === 'E') {
			end = `${r},${c}`;
			return 26;
		}
		return col.charCodeAt(0) - 96;
	})
);

const directions = [
	[-1, 0],
	[1, 0],
	[0, -1],
	[0, 1],
];

const run = (_start: string) => {
	const queue: Array<[string, number]> = [[_start, 0]];
	const visited = new Set([start]);
	let res = Number.POSITIVE_INFINITY;

	while (queue.length) {
		const [pos, steps] = queue.shift()!;

		if (pos === end) {
			res = steps;
			break;
		}

		const [x, y] = pos.split(',').map(Number);

		directions
			.map(([dRow, dCol]) => ({
				pos: `${x + dRow},${y + dCol}`,
				val: grid[x + dRow]?.[y + dCol],
			}))
			.filter(({ val }) => typeof val === 'number' && val - grid[x][y] <= 1)
			.filter(({ pos }) => !visited.has(pos))
			.forEach(({ pos }) => {
				visited.add(pos);
				queue.push([pos, steps + 1]);
			});
	}

	return res;
};

const part1 = run(start);
console.log('Day 12.1:', part1); // 504

/* -------------------------------------------------------------------------- */
/*                                   PART 2                                   */
/* -------------------------------------------------------------------------- */

const starts = grid
	.flatMap((row, r) => row.map((col, c) => (col === 1 ? `${r},${c}` : '')))
	.filter(Boolean);

const part2 = Math.min(...starts.map(run));
console.log('Day 12.2:', part2); // 500
