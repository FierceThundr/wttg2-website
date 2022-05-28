var ctx, can, set, sit, a, b, x, y, i, q = ""

//List of messages to be outputted
var messages = [
	//"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ",
	"This is a test of skill for you, we trust you to succeed",
	"Do you hear our calls?",
	"Why do you not answer us?",
	"Is this task that alluring?",
	"We do not believe you truly know your situation",
	"Do you wish to know the truth of this life of yours?",
	"𝙲𝚕𝚒𝚗𝚝 𝚎𝚍𝚠𝚊𝚛𝚍𝚜",
	
	//Radio
	"87OI 87OI 25 184 GOLOVChATYJ 31 10 33 40 VYeKShA 31 10 33 40",
	"MDZhB MDZhB OB'YaVLYeNA KOMANDA 135",
	
	//Control
	"Push the fingers through the surface into the wet.",
	"This cliché is death out of time, breaking the first the second the third the fourth wall, the fifth wall, floor; no floor: you fall!",
	"An earworm is a tune you can’t stop humming in a dream: \"Baby baby baby, yeah.\"",
	"You want to listen. You want to dream. You want to smile. You want to hurt. You don’t want to be.",
	"Leave your insides by the door.",
	"The egg cracks and the truth will emerge out of you.",
	"Under the conceptual reality behind this reality you must want these waves to drag you away.",
	
	//Oxenfree
	"ALEX, WE HAVE DONE THIS MANY TIMES",
	"PLEASE STAND BY...",
	"MAYDAY MAYDYXPM",
	"HELLO IS TIME ALMSOT HRELPP",
	"CLOSER NOT MUCH LONGR",
	"MORE TIME NO MORE",
	"WINDOW IS CLOSING. SOON.",
	"TRIACFXXTE BATTEPLF ISNTALT I A/.",
	"THE ENGINE. BECAME THE BOMB.",
	"GOOD WORK DL BB LISTEN CLOSE",
	"SOS KANALOA SOS KANALOA SOS KANALOA SOS",
	
	//Sombra
	"U2FsdGVkX1+vupppZksvRf5pq5g5XjFRIipRkwB0K1Y96Qsv2Lm+31cmzaAILwytX/z66ZVWEQM/ccf1g+9m5Ubu1+sit+A9cenDxxqkIaxbm4cMeh2oKhqIHhdaBKOi6XX2XDWpa6+P5o9MQw==",
	"?MzY:MTI5:?AzY:OWM?:?EDO:ZGU?:jVTM:MTJm:2ITM:MTUw:?QjY:OWY?:?kTO:MTQx:?MzY",
	"tsosrdvoeaerroaeusdmaauamoMobsnaeanraunnt,roierbeoiemaodbmantursotñauoureeuoerreopc.etlr",
	
	//Tender
	"otpauth://hotp/e465a942-fe60-4eae-851d-ce32044c172e:Error?secret=bnwmku2lsg2bpy57k2tvyvkwkpnlhotau3emdruc2xhq7zujs6qijajo&algorithm=SHA256&digits=6&period=30&counter=0",
	"Fear and Dread are my “children”. I am close to you but how close am I from the “Sol”",
	"I am composed of 5.9% red, 32.2% green and 72.9% blue You can find me between the 5th and 6th knuckle.",
	"<~7<W6_H$!_6DJ()+F!+t2DJj#qFCeu8+B3#c+DkP$DBNG-DJj#qFD5Z2+DGm>FD,5.@;^.1ATBC~>"
]
var messages = ["𝙲𝚕𝚒𝚗𝚝 𝚎𝚍𝚠𝚊𝚛𝚍𝚜"]
//This variable determines the interface size in pixels
var unit_size = 50
var border_size = 10
//This variable controls the colors of the overlay
var overlay_color = "black"
var off_color = "rgba(8,8,8,1.0)"
var mid_color = "rgba(0,0,0,0.5)"

window.onload = function () {
	document.getElementById("config-css").innerHTML = `
	.content-wrapper {width:${(unit_size + 10) * 8 + 10}px;height:${(unit_size + 10) * 8 + 10}px}
	.content {width:${(unit_size + 10) * 8 + 10}px;height:${(unit_size + 10) * 8 + 10}px}`
	
	document.getElementById("version").innerHTML = `Version ${(0.343723 * (Math.floor(Math.random() * 23) + 3)).toFixed(6)} ${(0.848637 * (Math.floor(Math.random() * 9) + 2)).toFixed(6)}`
	
	can = document.getElementById("canvas")
	can.width = can.height = (unit_size + 10) * 8 + 10
	ctx = can.getContext("2d")
	build()
	update_message()
}


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

function build() {
	ctx.fillStyle = overlay_color
	ctx.fillRect(0,0,canvas.width,canvas.height)
	update_clear()
}



function update_clear() {
	console.log("Update_Clear")
	clearTimeout(set)
	a = 0
	set = setInterval(clear_loop,100)
}

function clear_loop() {
	console.log("Clear_Loop")
	update_unit(a,"2","C")
	if (++a == 64) {
		clearTimeout(set)
		set = setInterval(print_loop,250)
	}
}

function update_reset() {
	
}

function reset_loop() {
	
}

function update_message() {
	console.log("Update_Message")
	clearTimeout(set)
	var m = messages[Math.floor(Math.random() * messages.length)]
	for (var p = 0; p < m.length; p++) {
		q = q.concat(m.charCodeAt(p).toString(2).padStart(8,"0"))
		console.log("Generate",p,m.length,m.charCodeAt(p).toString(2).length)
	}
	z = 0
	set = setInterval(print_loop,250)
}

function print_loop() {
	console.log("Print_Loop")
	update_unit(z,q.charAt(z),"P")
	if (q.charAt(++z) == "") {
		clearTimeout(set)
		setTimeout(update_reset,500)
	} else if (z % 64 == 0) {
		clearTimeout(set)
		setTimeout(update_clear,500)
	}
}

function update_unit(z,b,l) {
	console.log("Update_Unit",l,b,z)
	var x_pos = (z % 8 * (unit_size + 10) + 10), y_pos = (Math.floor(z / 8) % 8 * (unit_size + 10) + 10)
	switch (b) {
		case "0":
			ctx.clearRect(x_pos,y_pos,unit_size,unit_size)
			ctx.fillStyle = mid_color
			ctx.fillRect(x_pos,y_pos,unit_size,unit_size)
			break
		case "1":
			ctx.clearRect(x_pos,y_pos,unit_size,unit_size)
			break
		case "2":
			ctx.fillStyle = off_color
			ctx.fillRect(x_pos,y_pos,unit_size,unit_size)
			break;
	}
	if (b == "1") {
		
	} else {
		
	}
}

/* Testing Function */

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