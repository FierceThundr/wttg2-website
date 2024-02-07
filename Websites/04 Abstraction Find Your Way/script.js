var links = [], ctx, can, cur = [0,0], cld = 0

//This variable determines the size of maze that will be generated
var maze_size = 9
//This variable determines the interface size in pixels
var unit_size = 400
//This variable controls the color of the maze overlay
var overlay_color = "black"

window.onload = function () {
	var queue = [], built = [], gen, sub, lin, sid, beg, des
	
	document.getElementById("config-css").innerHTML = `
	.content-wrapper {width:${unit_size * 1.5}px;height:${unit_size * 1.5}px}
	.content-mask {width:${unit_size}px;height:${unit_size}px;}
	.controls-main {width:${unit_size / 5}px;height:${unit_size / 5}px;font-size:${unit_size / 6.5}px;}
	.content-canvas {width:${unit_size * maze_size}px;height:${unit_size * maze_size}px}
	.content {width:${unit_size * maze_size}px;height:${unit_size * maze_size}px}`
	
	document.getElementById("test1").innerHTML = `
	.content-wrapper {width:${unit_size * 1.5}px;height:${unit_size * 1.5}px}
	.content-mask {width:${unit_size}px;height:${unit_size}px;}
	.controls-main {width:${unit_size / 5}px;height:${unit_size / 5}px;font-size:${unit_size / 6.5}px;}
	.content-canvas {width:${unit_size * maze_size}px;height:${unit_size * maze_size}px}
	.content {width:${unit_size * maze_size}px;height:${unit_size * maze_size}px}`
	
	document.getElementById("version").innerHTML = `Version ${(0.343723 * (Math.floor(Math.random() * 23) + 3)).toFixed(6)} ${(0.848637 * (Math.floor(Math.random() * 9) + 2)).toFixed(6)}`
	
	can = document.getElementById("canvas")
	can.width = can.height = unit_size * maze_size
	ctx = can.getContext("2d")
	ctx.fillStyle = overlay_color
	
	build()
	
	des = [
		[0,random_edge()],
		[random_edge(),0],
		[maze_size - 1,random_edge()],
		[random_edge(),maze_size - 1]
	]
	des = shuffle(des)
	queue = queue.concat(des)
	
	beg = [Math.floor(Math.random() * (maze_size - 2)) + 1,Math.floor(Math.random() * (maze_size - 2)) + 1]
	built.push(beg)
	queue_adjacent(beg)
	queue = shuffle(queue)
	
	while (queue.length != 0) {
		//console.log("* loop")
		for (var i = queue.length - 1;i >= 0;i--) {
			gen = queue[i]
			sid = get_adjacent(gen)
			sid = shuffle(sid)
			//console.log("Shuffle", JSON.stringify(sid))
			sid.every(function(sub){
				//console.log(queue.length, built.length, JSON.stringify(gen), JSON.stringify(sub), (is_built(sub) == false))
				//sub.some(r=> (maze_size - 2 < r || r < 1)) || 
				//check 1 is redundant
				if (is_built(sub) == false) {
					return true
				} else {
					queue.splice(i,1)
					built.push(gen)
					queue_adjacent(gen)
					queue = shuffle(queue)
					link(gen,sub)
					//console.log("Push", [gen.join("-"),sub.join("-")].sort().join("_"))
				}
			})
		}
	}
	
	//console.log(links.sort())
	
	update_position(des[0])
	tag(des[1],"PTAG")
	tag(des[2],"CPTAG")
	tag(des[3],"CFTAG")
	
	//console.log(JSON.stringify(des))
	
	//Prevent exploiting CTRL+A to skip navigating the maze on a CPTAG
	document.body.addEventListener('keydown', event => {
		if (event.ctrlKey && event.key == "a") {
			event.preventDefault()
		}
	})
	
	//Given a position, check if it is has been built and return the result
	function is_built(a) {
		//console.log(built.findIndex(function(e){return JSON.stringify(e) == JSON.stringify(a)}))
		return (built.findIndex(function(e){return JSON.stringify(e) == JSON.stringify(a)}) != -1)
	}
	
	//Given a position, check if it is located in the queue and return the result
	function is_queued(a) {
		return (queue.findIndex(function(e){return JSON.stringify(e) == JSON.stringify(a)}) != -1)
	}
	
	//Given a position, queue all valid positions directly adjacent
	function queue_adjacent(a) {
		var b = get_adjacent(a)
		b.forEach(function(c){
			if ((c.some(r=> (maze_size - 2 < r || r < 1)) || is_built(c) || is_queued(c)) == false) {queue.push(c)}
		})
	}
	
	//Given a position, create and return an array of all directly adjacent positions
	function get_adjacent(a) {
		var b, c = []
		for (var d = 4;d != 0;d--) {
			b = a.slice()
			switch (d) {
				case 1:b[0]++;break;
				case 2:b[0]--;break;
				case 3:b[1]++;break;
				case 4:b[1]--;break;
			}
			c.push(b)
		}
		//console.log("Adjacent", JSON.stringify(c))
		return c
	}
	
	//Generate and return a random coordinate within an axis of the maze
	function random_edge() {
		return Math.floor(Math.random() * (maze_size - 2)) + 1
	}
	
	//Generate the background grid based on the maze_size config variable
	function build() {
		var div
		for (var x = 0;x < maze_size;x++) {
			for (var y = 0;y < maze_size;y++) {
				ctx.fillRect((unit_size*x) + 10,(unit_size*y) + 10,unit_size - 20,unit_size - 20);
				//console.log("Build", (unit_size*x) + 10,(unit_size*y) + 10,unit_size - 20,unit_size - 20)
			}
		}
	}
	
	//Given a position, create a tag at that position with the given type
	function tag(a,b) {
		var but
		but = document.createElement('button')
		but.classList.add(b)
		but.classList.add("content-tag")
		but.style.left = (unit_size * a[0] + (unit_size / 5)) + "px"
		but.style.top = (unit_size * a[1] + (unit_size / 5)) + "px"
		but.style.width = (unit_size / 5 * 3) + "px"
		but.style.height = (unit_size / 5 * 3) + "px"
		but.tabIndex = -1
		//but.innerHTML = "1 - aaaabbbbcccc"
		document.getElementById("content").appendChild(but)
		//console.log("Tag", JSON.stringify(a))
	}
	
	//Given two positions, create a link between both positions and add the coordinates to the link array
	function link(a,b) {
		var c = [a,b].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]))
		ctx.fillRect((unit_size * c[0][0]) + (unit_size / 3),(unit_size * c[0][1]) + (unit_size / 3),(unit_size / 3) * ((c[1][0] - c[0][0]) * 3 + 1),(unit_size / 3) * ((c[1][1] - c[0][1]) * 3 + 1))
		links.push(c)
	}
	
	//Given an array, shuffle it and return the shuffled array
	//Source: https://bost.ocks.org/mike/shuffle/
	function shuffle(a) {
		var b = a.length, c, r;
		while (b) {
			r = Math.floor(Math.random() * b--);
			c = a[b];
			a[b] = a[r];
			a[r] = c;
		}
		return a;
	}
}

//Function to handle player input
function move(x,y) {
	var mov = cur.slice()
	mov[0] += x
	mov[1] += y
	//console.log("Move Check", JSON.stringify([cur,mov].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]))), (links.findIndex(function(e){return JSON.stringify(e) == JSON.stringify([cur,mov].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1])))}) != -1))
	if (links.findIndex(function(e){return JSON.stringify(e) == JSON.stringify([cur,mov].sort((a, b) => (a[0] + a[1]) - (b[0] + b[1])))}) != -1 && cld == 0) {
		update_position(mov)
		cld = 1
		setTimeout(function(){cld = 0},500)
	}
}

//Given a position, set it as the current player position and update the CSS properties to match
function update_position(pos) {
	/* Debug Code
	var buf, ctb
	buf = document.getElementById("buffer")
	buf.width = buf.height = can.width
	buf.style = "opacity:0.1;pointer-events:none;"
	ctb = buf.getContext("2d")
	ctb.clearRect(0,0,buf.width,buf.height)
	ctb.drawImage(can,0,0)
	*/

	document.getElementById("test2").innerHTML = `.content {left:${pos[0] * unit_size * -1}px;top:${pos[1] * unit_size * -1}px}`
	document.getElementById("move-css").innerHTML = `.content {left:${pos[0] * unit_size * -1}px;top:${pos[1] * unit_size * -1}px}`

	//console.log("Update", (pos[0] * unit_size * -1), (pos[1] * unit_size * -1))
	cur = pos
}

/* Testing Function */

//Reference Object Test
function test1() {
	var gen = [0,0], sub
	sub = gen
	sub[1] = sub[1] + 1
	console.log(sub[1], gen[1])
}

//Object Applicable Include Test
function test2() {
	var gen = [[0,1],[0,2],[0,3]]
	console.log(gen.includes([0,2]))
}

//Improved Sorting Test
function test3() {
	var gen = [[1,1],[3,2],[2,3]]
	console.log(gen.sort((a, b) => b - a))
}

//Validation Condition Test 1
function test4() {
	var sub = [5,0]
	console.log(sub.some(r=> (7 - 2 < r || r < 1)))
}

//Validation Condition Test 2
function test5() {
	var sub = [5,0], built = [[0,0],[4,0],[0,5],[1,1]]
	console.log((built.findIndex(function(e){return JSON.stringify(e) == JSON.stringify(sub)}) != -1))
}

//Generation Testing
function generate() {

}

//Generation Testing
function browsercheck() {
	window.location.href = "https://www.whatismybrowser.com/"
}

var state1 = false, state2 = false, state3 = false

//Toggle Clickpoint Outlines
function toggle1() {
	document.getElementById("custom1").innerHTML = (state1) ? "":".CPTAG {outline: 10px solid rgba(255,255,0,0.75)} .CFTAG {outline: 10px solid rgba(0,255,30,0.75)} .PTAG {outline: 10px solid rgba(255,0,0,0.75)}"
	state1 = !(state1)
}

//Toggle Mask Layer
function toggle2() {
	document.getElementById("custom2").innerHTML = (state2) ? "":".content-mask {overflow:visible}"
	state2 = !(state2)
}

//Toggle Outlines
function toggle3() {
	document.getElementById("custom3").innerHTML = (state3) ? "":".content-wrapper {border:3px solid blue} .content-mask {border:3px solid red} .controls-main {border:3px solid orange}"
	state3 = !(state3)
}