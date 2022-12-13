import { instructions } from '../index';
import './index.css';

const createGrid = (
	rows: number,
	cols: number,
): {
	cursorEl: HTMLDivElement;
	spriteEl: HTMLDivElement;
	cellEls: HTMLDivElement[];
	instructionEl: HTMLDivElement;
} => {
	const grid = document.createElement('div');
	const instructionEl = document.createElement('div');
	instructionEl.textContent = '---';
	instructionEl.style.setProperty('opacity', '0');

	grid.style.setProperty('--grid-rows', `${rows}`);
	grid.style.setProperty('--grid-cols', `${cols}`);

	for (let c = 0; c < rows * cols; c++) {
		let cell = document.createElement('div');
		grid.appendChild(cell).className = 'grid-item';
	}

	const cursorEl = document.createElement('div');
	grid.appendChild(cursorEl).className = 'cursor';

	const spriteEl = document.createElement('div');
	grid.appendChild(spriteEl).className = 'sprite';

	document.body.appendChild(instructionEl).className = 'instruction';
	document.body.appendChild(grid).className = 'grid';

	return {
		cursorEl,
		spriteEl,
		cellEls: document.getElementsByClassName('grid-item'),
		instructionEl,
	};
};

const crt = new Array(6).fill('.').map(() => new Array(40).fill('.'));
let sprite = [0, 1, 2];

const start = async () => {
	const { cursorEl, spriteEl, cellEls, instructionEl } = createGrid(40, 6);
	const size = 24;

	const move = (r: number, c: number, i: number) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				cursorEl.style.setProperty('top', Math.max(0, r * size) + 'px');
				cursorEl.style.setProperty('left', Math.max(0, c * size) + 'px');

				spriteEl.style.setProperty('top', Math.max(0, r * size) + 'px');
				spriteEl.style.setProperty(
					'left',
					Math.max(1, sprite[0] * size) + 'px',
				);

				if (crt[r][c] === '#') {
					cellEls[r * 40 + c].style.setProperty(
						'background-color',
						'var(--fg)',
					);
				}

				if (r === 5 && c === 39) {
					cursorEl.style.setProperty('display', 'none');
					spriteEl.style.setProperty('display', 'none');
				}

				resolve('');
			}, 200);
		});
	};

	let value = 1;

	for (let i = 0; i < instructions.length; i++) {
		const [_f, v] = instructions[i];
		const nextValue = value + parseInt(v, 10);

		const row = Math.floor(i / 40) % 6;
		const col = i % 40;

		if (sprite.includes(col)) {
			crt[row][col] = '#';
		}

		if (value !== nextValue) {
			sprite = [nextValue - 1, nextValue, nextValue + 1];
		}
		value = nextValue;

		if (_f === 'noop' || v) {
			instructionEl.textContent = _f === 'noop' ? _f : `${_f} ${v}`;
			instructionEl.style.setProperty('opacity', '1');
		}
		await move(row, col, i);
	}
};

const button = document.createElement('button');
button.textContent = 'Start Day 10';
button.addEventListener('click', start);
document.body.append(button);
