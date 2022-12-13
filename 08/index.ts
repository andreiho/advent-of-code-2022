import input from './input.ts';

const grid = input.split('\n').map((n) => n.split('').map(Number));

const side = (currentTree: number, trees: number[]) => {
	const blocker = trees.findIndex((tree) => tree >= currentTree);

	return {
		isBlocked: blocker !== -1,
		visibleTrees: blocker !== -1 ? blocker + 1 : trees.length,
	};
};

const { trees, score } = grid.reduce(
	(acc, row, rowIndex) => {
		row.forEach((tree, treeIndex) => {
			const isEdge = [0, grid.length - 1].includes(rowIndex) ||
				[0, row.length - 1].includes(treeIndex);

			if (isEdge) {
				acc.trees = acc.trees + 1;
				return acc;
			}

			const column = grid.map((c) => c[treeIndex]);

			const left = side(tree, row.slice(0, treeIndex).reverse());
			const right = side(tree, row.slice(treeIndex + 1, row.length));
			const top = side(tree, column.slice(0, rowIndex).reverse());
			const bottom = side(tree, column.slice(rowIndex + 1, grid.length));

			const sides = [left, right, top, bottom];

			if (sides.some((side) => !side.isBlocked)) {
				acc.trees = acc.trees + 1;
			}

			const score = sides.reduce((acc, s) => acc * s.visibleTrees, 1);
			if (score > acc.score) {
				acc.score = score;
			}
		});

		return acc;
	},
	{ trees: 0, score: 0 },
);

console.log('Day 8.1:', trees); // 1814
console.log('Day 8.2:', score); // 330786
