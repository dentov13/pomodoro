var activeTime, pomodoro
var breakTimeSec = 300 // 300 sec = 5 min
var workTimeSec = 1500 // 1500 sec = 25 min

function renderTime (time) {
	var minutes = Math.floor(time / 60)
	var seconds = time % 60

	if (seconds.toString().length === 1) seconds = '0' + seconds
	time = minutes + ":" + seconds
	window.time.innerHTML = time
	document.title = time + ' - Pomodoro'
}

function toggleStatusIcon (pause) {
	if (pause) window.statusIcon.innerHTML = '❙❙'
	else window.statusIcon.innerHTML = '▶'
}

function working () {
	return window.tomato.innerHTML === 'Work'
}

function toggleType (type) {
	if (working()) {
		activeTime = breakTimeSec
		window.tomato.innerHTML = 'Break'
	} else {
		activeTime = workTimeSec
		window.tomato.innerHTML = 'Work'
	}
}