window.onload = function () {
	document.getElementById("version").innerHTML = `Version ${(0.343723 * (Math.floor(Math.random() * 23) + 3)).toFixed(6)} ${(0.848637 * (Math.floor(Math.random() * 9) + 2)).toFixed(6)}`
}

function start() {window.location.href = "master.html"}