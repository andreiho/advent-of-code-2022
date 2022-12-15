import input from './input.ts';

type Lines = [number, number][][];
type Grid = string[][];

const lines = input.split('\n').map((line) =>
	line.split(' -> ').map((line) => line.split(',').map(Number))
) as Lines;

const colMax = Math.max(
	...lines.flatMap((line) => line.map((line) => line[0])),
);
const rowMax = Math.max(
	...lines.flatMap((line) => line.map((line) => line[1])),
);

const cols = colMax + 1;
const rows = rowMax + 1;

const air = '⬛️';
const rock = '🟫';
const sand = '🟨';

const drawGrid = (): Grid => {
	const grid: Grid = new Array(rows).fill(air).map(() =>
		new Array(cols).fill(air)
	);

	for (const line of lines) {
		line.forEach(([x1, y1], i) => {
			if (i === line.length - 1) return;

			const [x2, y2] = line[i + 1];

			for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
				for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
					grid[y][x] = rock;
				}
			}
		});
	}

	return grid;
};

const findNextPos = (grid: Grid, y: number, x: number) => {
	if (grid[y + 1][x - 1] === air) {
		return -1;
	}
	if (grid[y + 1][x + 1] === air) {
		return 1;
	}
	return 0;
};

const solve = (
	grid: Grid,
	onReachBottom: boolean,
) => {
	let units = 0;

	/**
	 * Moves a sand unit down the grid
	 *
	 * @param startY The vertical position to start from
	 * @param startX The horizontal position to start from
	 *
	 * @returns `true` if the sand unit reached the bottom, `false` if it should continue falling
	 */
	const move = (startY: number, startX: number): boolean => {
		for (let y = startY; y < grid.length; y++) {
			const next = grid[y + 1]?.[startX];

			// Reached the end of the grid, either stop or continue depending on the requirements
			if (y >= grid.length - 1) return onReachBottom;

			if (next === air) continue;

			// The cell below is blocked by either and or rock, try to move left or right or settle
			if ([rock, sand].includes(next)) {
				const nextPos = findNextPos(grid, y, startX);

				// Reached bottom
				if (nextPos === 0) {
					// Back at the starting position, no more sand to fall.
					if (grid[y][startX] === sand) return true;

					units++;
					grid[y][startX] = sand;

					return false;
				}

				// Go left or right
				return move(y + 1, startX + nextPos);
			}
		}
	};

	let done = false;

	while (!done) {
		done = move(0, 500);
	}

	const visualization = grid.map((r) => r.join('')).join('\n');

	return { units, visualization };
};

const grid1 = drawGrid();
const part1 = solve(grid1, true);

console.log('Day 14.1', part1.units); // 774
Deno.writeTextFile('./14/visualization/part1.txt', part1.visualization);

/* -------------------------------------------------------------------------- */
/*                                   PART 2                                   */
/* -------------------------------------------------------------------------- */

const grid2 = drawGrid().map((r) => [...r, ...new Array(200).fill(air)]).concat(
	[new Array(cols + 200).fill(air), new Array(cols + 200).fill(rock)],
);
const part2 = solve(grid2, false);

console.log('Day 14.2', part2.units); // 22499
Deno.writeTextFile('./14/visualization/part2.txt', part2.visualization);
