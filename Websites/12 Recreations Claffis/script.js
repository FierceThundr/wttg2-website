var data = {
	"pattern":[],
	"timeout":[],
	"notes":[],
	"length":6,
	"state":1
}

window.onload = function(){
	data.notes = [...document.getElementsByTagName("section")]
	data.notes.forEach(e => e.addEventListener("click",note_handler))
}

function note_handler(){
	var note = note_getindex(event.target)
	switch(data.state){
		case 0: //If state is: Disabled
			break;
		case 1: //If state is: Idle
			if (note != 0) {
				sound_note(note)
				note_highlight(note)
				break
			}
			data.state = 0
			data.pattern = shuffle(Array.from({length:data.length},(_,i)=>i+1)).slice(0,data.length)
			var play = [...data.pattern]
			var interval = setInterval(function(){
				var next = play.shift()
				sound_note(next)
				note_highlight(next)
				if (play.length == 0) {
					data.state = 2
					clearInterval(interval)
				}
			},2000)
			break
		case 2: //If state is: Guessing
			if (note == 0) {break}
			var next = data.pattern.shift()
			if (note == next) {
				sound_note(note)
				note_highlight(next)
				if (data.pattern.length == 0) {
					data.state = 0
					setTimeout(function(){
						sound_success()
						reveal()
					},1000)
				}
				break
			}
			data.state = 1
			sound_failure()
			break
	}
}

function note_getindex(element){
	return data.notes.indexOf(element)
}

function note_highlight(index){
	var note = data.notes[index]
	note.classList.add("highlight")
	clearTimeout(data.timeout[index])
	data.timeout[index] = setTimeout(function(){
		note.classList.remove("highlight")
	},500)
}

function shuffle(f){for(let l=f.length-1;l>0;l--){let o=Math.floor(Math.random()*(l+1));var a=f[l];f[l]=f[o];f[o]=a}return f}

/* Hook functions */

function reveal(){
	//Handle revealing stuff because of completion
	console.log("Reveal")
}

function sound_note(note){
	//Play the sound for the specified note
	console.log("Play Sound " + note)
}

function sound_success(){
	//Play the claffis success noise
	console.log("Success")
}

function sound_failure(){
	//Play the claffis failure noise
	console.log("Failure")
}