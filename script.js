var a
setInterval(function(){
	a = a ?? 1
	a = a ? 0 : 1
	document.getElementById("pointer").innerHTML = a ? " " : "_"
},1000)