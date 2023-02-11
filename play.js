/////////////////////////////////////////////////////////////////
//                                                             //
//   Use this script to play in command line: `node play.js`   //
//                                                             //
/////////////////////////////////////////////////////////////////

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

const GameBoard = require('./gameBoard.js');
const game = new GameBoard();

let winner;
let player = 1;

const prompt = () => {
	rl.question('Choose a column 1-7 => ', (answer) => {
		if (answer === 'stop') {
			rl.close();
			process.exit();
		}

		let column = parseInt(answer);
		if (column != NaN && column >= 1 && column <= 7) {
			play(--column);
		} else {
			prompt();
		}
	});
};

const play = (column) => {
	if (!game.play(player, column)) {
		prompt();
		return;
	}

	game.display();
	winner = game.findWinner();

	if (winner) {
		console.log(`Player ${winner} wins!`);
		rl.close();
	} else {
		player = player === 1 ? 2 : 1;
		console.log(`Player ${player}'s turn...`);
		prompt();
	}
};

console.log('Player 1 starts...');
prompt();
