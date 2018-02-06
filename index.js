const microtime = (() => {
	try {
		return require('microtime');
	} catch (err) {
		return null;
	}
})();

function timestampMicrotime() {
	return microtime.nowStruct();
}

timestampMicrotime.enabled = Boolean(microtime);

function timestampMilliseconds() {
	const seconds = Date.now();
	return [Math.floor(seconds / 1000), (seconds % 1000) * 1000];
}

function initHR() {
	const [initSeconds, initMicroseconds] = timestampMilliseconds();
	const initialHR = process.hrtime();

	// eslint-disable-next-line func-names
	return function timestampHR() {
		const [seconds, nanoseconds] = process.hrtime(initialHR);
		const msecs = initMicroseconds + Math.floor(nanoseconds / 1000);
		return [initSeconds + seconds + Math.floor(msecs / 1000000), msecs % 1000000];
	};
}

if (microtime) {
	module.exports = timestampMicrotime;
} else if (process.hrtime) {
	module.exports = initHR();
} else {
	process.emitWarning('microtime and process.hrtime() are not available; falling back to Date.now(), which reduces timestamp accuracy. Consider upgrading node or installing the `microtime` package.', 'TimePrecisionWarning');
	module.exports = timestampMilliseconds;
}

Object.assign(module.exports, {
	timestampMicrotime,
	initHR,
	timestampMilliseconds
});
