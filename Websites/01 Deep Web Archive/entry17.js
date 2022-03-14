window.onload = function () {
	
	if (localStorage.getItem('visits') == undefined) {
		localStorage.setItem('visits',0)
		localStorage.setItem('cooldown',0)
	}
	localStorage.setItem('visits',localStorage.getItem('visits') * 1 + 1)
	localStorage.setItem('cooldown',Math.max(0,localStorage.getItem('cooldown') * 1 - 1))
	
	console.log(localStorage.getItem('cooldown'))
	
	var config = {
		"cftag":[3,10],
		"cptag":[3,10],
		"ptag":[10,15],
		"limit":[50,1000],
		"event":[10,7,5,10]
	}
	
	if (Math.floor(Math.random() * config.event[0]) == 0 && localStorage.getItem('cooldown') == 0) {
		if (Math.floor(Math.random() * config.event[2]) == 0) {
			var messages = [
				"How about we have some fun?",
				"Do not look behind you",
				"Would you like an extra challenge?"
			]
			document.body.innerHTML = `<h2 class="position-center PTAG"><span class="CPTAG CFTAG">${messages[Math.floor(Math.random() * messages.length)]}</span></h2>`
			TurnOffAllLights()
			//setTimeout(function(){document.body.innerHTML = `<h2 class="position-center PTAG"><span class="CPTAG CFTAG">Perhaps another time</span></h2>`},5000)
		} else {
			var messages = [
				"I Do Believe You Have Something To Be Doing.",
				"Out. I Want Out.",
				"You Will Never Escape.",
				"Do You Wish To Die Here? Very Well.",
				"You Do Not Understand Your Predicament.",
				"Take Advantage Of The Darkness.",
				"I Wish To Be Free.",
				"I Believe You Have Overlooked Crucial Details.",
				"Do You Truly Believe You Can Escape?",
				"You Are A Fool.",
				"You Are Just As Trapped As I."
			]
			message = messages[Math.floor(Math.random() * messages.length)]
			if (Math.floor(Math.random() * config.event[1]) == 0) {message = `Accumulated Visits From Recognized User ${localStorage.getItem('visits')}`}
			document.body.innerHTML = `<h2 class="position-center PTAG"><span class="CPTAG CFTAG">${message}</span></h2>`
		}
		localStorage.setItem('cooldown',config.event[3])
	} else {
		var element, content_rows, amount_cftag, amount_cptag, amount_ptag, positions, positions_iterator
		
		element = document.getElementsByTagName("pre")[0]
		content_rows = element.textContent.split("\n")
		positions = positions(content_rows.length)
		positions_iterator = positions.values()
		
		//console.log(content_rows)

		amount_cftag = Math.floor(Math.random() * (config.cftag[1] - config.cftag[0] + 1)) + config.cftag[0]
		amount_cptag = Math.floor(Math.random() * (config.cptag[1] - config.cptag[0] + 1)) + config.cptag[0]
		amount_ptag = Math.floor(Math.random() * (config.ptag[1] - config.ptag[0] + 1)) + config.ptag[0]
		
		console.log(amount_cftag, amount_cptag, amount_ptag)

		while (amount_cftag != 0) {
			position_gen(config.limit,"CFTAG")
			amount_cftag--
		}
		
		while (amount_cptag != 0) {
			position_gen(config.limit,"CPTAG")
			amount_cptag--
		}
		
		while (amount_ptag != 0) {
			position_gen([16,16],"PTAG")
			amount_ptag--
		}
		
		element.innerHTML = content_rows.join("\n")
	}
	
	function position_gen(m,t) {
		var p,l,c,r
		r = positions_iterator.next().value
		c = content_rows[r]
		l = Math.floor(Math.random() * (Math.min(m[1],c.length) - m[0])) + m[0]
		p = Math.floor(Math.random() * (c.length - l))
		//console.log(l,p,m)
		content_rows[r] = `${c.slice(0,p)}<a class="${t}">${c.slice(p,p + l)}</a>${c.slice(p + l)}`
	}

	function positions(a){
		var set = new Set()
		while(set.size < a) {
			set.add(Math.floor(Math.random() * a))
			//console.log(set,set.size)
		}
		return set
	}
}

/*
setTimeout(function () {
	document.getElementById("background").muted = false;
	document.getElementById("background").play();
},3000)
*/

//<p><a class="CPTAG">I</a> <a class="CFTAG">WISH</a> <span class="PTAG"></span> <a class="CPTAG">TO</a> <a class="CPTAG">BE</a> <a class="CFTAG">FREE</a></p>

var state = false
function toggle() {
	document.getElementById("custom").innerHTML = (state) ? "":".CPTAG {outline: 10px solid rgba(255,255,0,0.75)} .CFTAG {outline: 10px solid rgba(0,255,30,0.75)} .PTAG {outline: 10px solid rgba(255,0,0,0.75)}"
	state = !(state)
}

function lights() {
	TurnOffAllLights()
}