import input from './input.ts';

const instructions = input.split('\n').map((s) => {
	const [d, n] = s.split(' ');
	return [d, parseInt(n, 10)] as [string, number];
});

const moves: Record<string, { x: number; y: number }> = {
	R: { x: 1, y: 0 },
	L: { x: -1, y: 0 },
	U: { x: 0, y: 1 },
	D: { x: 0, y: -1 },
};

const solve = (knotsCount: number): number => {
	const knots = new Array(knotsCount).fill(null).map(() => ({ x: 0, y: 0 }));
	const positions = new Set(['0,0']);

	for (const [d, n] of instructions) {
		for (let i = 0; i < n; i++) {
			knots.forEach((knot, k) => {
				if (k === 0) {
					knot.x += moves[d].x;
					knot.y += moves[d].y;
					return;
				}

				const ref = knots[k - 1];
				const distX = ref.x - knot.x;
				const distY = ref.y - knot.y;

				if (Math.abs(distX) === 2) {
					knot.x += Math.sign(distX);
					if (Math.abs(distY) !== 0) knot.y += Math.sign(distY);
				} else if (Math.abs(distY) === 2) {
					knot.y += Math.sign(distY);
					if (Math.abs(distX) !== 0) knot.x += Math.sign(distX);
				}

				if (k === knots.length - 1) {
					positions.add(`${knot.x},${knot.y}`);
				}
			});
		}
	}

	return positions.size;
};

console.log('Day 9.1:', solve(2)); // 6642
console.log('Day 9.2:', solve(10)); // 2765
