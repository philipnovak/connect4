module.exports = class GameBoard {
	#columns;

	constructor() {
		this.#columns = new Array(7);
		for (let i = 0; i < 7; i++) {
			this.#columns[i] = new Array(6).fill(0);
		}
	}

	display() {
		for (let j = 5; j >= 0; j--) {
			let line = '[';
			for (let i = 0; i < 7; i++) {
				line += ` ${this.#columns[i][j]} `;
			}
			line += ']';
			console.log(line);
		}
	}

	play(player, column) {
		const emptySpace = this.#columns[column].indexOf(0);
		if (emptySpace >= 0) {
			this.#columns[column][emptySpace] = player;
			return true;
		}
		return false;
	}

	findWinner() {
		for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
			const column = this.#columns[columnIndex];

			if (column[0] === 0) continue;

			for (let rowIndex = 0; rowIndex < column.length; rowIndex++) {
				const player = column[rowIndex];
				if (player === 0) break;

				if (columnIndex < 4) {
					// search horizontally
					if (
						player === this.#columns[columnIndex + 1][rowIndex] &&
						player === this.#columns[columnIndex + 2][rowIndex] &&
						player === this.#columns[columnIndex + 3][rowIndex]
					) {
						return player;
					}

					// search diagonally
					const searchDirection = rowIndex < 3 ? 1 : -1;

					if (
						player === this.#columns[columnIndex + 1][rowIndex + 1 * searchDirection] &&
						player === this.#columns[columnIndex + 2][rowIndex + 2 * searchDirection] &&
						player === this.#columns[columnIndex + 3][rowIndex + 3 * searchDirection]
					) {
						return player;
					}
				}

				if (rowIndex < 3) {
					// search vertically
					if (
						player === column[rowIndex + 1] &&
						player === column[rowIndex + 2] &&
						player === column[rowIndex + 3]
					) {
						return player;
					}
				}
			}
		}
		return null;
	}
};
