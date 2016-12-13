'use strict';

var activeTime, pomodoro;
var breakTimeSec = 300; // 300 sec = 5 min
var workTimeSec = 1500; // 1500 sec = 25 min
var beepAudio = new Audio("http://www.soundjay.com/button/sounds/beep-08b.mp3")

function beep() {
	beepAudio.play()
}

function renderTime(time) {
	var minutes = Math.floor(time / 60);
	var seconds = time % 60;

	if (seconds.toString().length === 1) seconds = '0' + seconds;
	time = minutes + ":" + seconds;
	window.time.innerHTML = time;
	document.title = time + ' - Pomodoro';
}

function toggleStatusIcon(pause) {
	if (pause) window.statusIcon.innerHTML = '❙❙';else window.statusIcon.innerHTML = '▶';
}

function working() {
	return window.tomato.innerHTML === 'Work';
}

function toggleType(type) {
	if (working()) {
		activeTime = breakTimeSec;
		window.tomato.innerHTML = 'Break';
	} else {
		activeTime = workTimeSec;
		window.tomato.innerHTML = 'Work';
	}
}

function clearPomodoro() {
	window.clearInterval(pomodoro);
	pomodoro = null;
}

function toggleActive() {
	toggleStatusIcon(!pomodoro)

	if (!pomodoro) {
		pomodoro = window.setInterval(() => {
			activeTime--

			if (activeTime <= 3) beep()
			if (activeTime < 0) toggleType()

			renderTime(activeTime)
		}, 1000)
	} else {
		clearPomodoro()
	}
}

function resetTimer() {
	activeTime = workTimeSec

	if (pomodoro) clearPomodoro()

	if (!working()) toggleType()
	toggleStatusIcon(false)
	renderTime(activeTime)
}

function timeIncDec(click) {
	if (pomodoro) return

	var id = click.target.innerHTML
	var x = click.target.className

	if (id === '+') {
		window[x + 'Sec'] += 60
	} else if (id === '-' && window[x + 'Sec'] > 60) {
		window[x + 'Sec'] -= 60
	} else {
		return
	}

	window[x].innerHTML = Math.floor(window[x + 'Sec'] / 60)

	activeTime = workTimeSec
	renderTime(activeTime)
}

document.addEventListener('DOMContentLoaded', () => {
	resetTimer()
	renderTime(activeTime)
	window.timer.addEventListener('click', toggleActive)
	window.reset.addEventListener('click', resetTimer)
	window.skip.addEventListener('click', () => {
		toggleType()
		renderTime(activeTime)
	})

	Array.from(document.getElementsByClassName('timeControl'))
	     .forEach((x) => x.addEventListener('click', timeIncDec))
})
















