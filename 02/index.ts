import input from './input.ts';

const rounds = input.split('\n').map((i) => i.replace(' ', ''));

// The scores for each possible combination
const scores: Record<string, number> = {
	AX: 3 + 1,
	AY: 6 + 2,
	AZ: 0 + 3,
	BX: 0 + 1,
	BY: 3 + 2,
	BZ: 6 + 3,
	CX: 6 + 1,
	CY: 0 + 2,
	CZ: 3 + 3,
};

const part1 = rounds.reduce(
	(score, round) => (score += scores[round]),
	0,
);

console.log('Day 2.1:', part1); // 15632

/* -------------------------------------------------------------------------- */
/*                                   PART 2                                   */
/* -------------------------------------------------------------------------- */

// The chosen shape given the strategy
const outcomes: Record<string, string> = {
	AX: 'Z',
	AY: 'X',
	AZ: 'Y',
	BX: 'X',
	BY: 'Y',
	BZ: 'Z',
	CX: 'Y',
	CY: 'Z',
	CZ: 'X',
};

const part2 = rounds.reduce((score, round) => {
	const me = outcomes[round];
	const [opponent] = round;
	return (score += scores[`${opponent}${me}`]);
}, 0);

console.log('Day 2.2:', part2); // 14416
