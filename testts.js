/* eslint-disable no-console */
const {inspect} = require('util');

const ts = require('.');

const tsHR = ts.initHR();

console.log('\x1b[?25l\n\n');

function update() {
	console.log('\x1b[3A\x1b[0G\x1b[J%s', inspect({
		// eslint-disable-next-line quote-props
		microtime: ts.timestampMicrotime(),
		'hrtime ': tsHR(),
		'date   ': ts.timestampMilliseconds()
	}, {colors: true}));
	setTimeout(update, 10);
}

update();

process.on('SIGINT', () => {
	console.log('\x1b[?25h');
	process.exit(0);
});
