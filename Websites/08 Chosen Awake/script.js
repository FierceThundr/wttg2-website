var can, ctx, cur = 0, las = 0, pattern = [], clickpoints = [
	[
		{"shape":"circle","coords":"164,117,48"},//All Fine
		{"shape":"circle","coords":"577,117,48"},
		{"shape":"circle","coords":"991,117,48"}
	],[
		{"shape":"circle","coords":"548,752,8","style":{"color":"#432432","shift":[0,0,-3]}},//Good Enough
		{"shape":"circle","coords":"565,767,8","style":{"color":"#432432","shift":[0,0,-3]}},
		{"shape":"circle","coords":"580,784,8","style":{"color":"#432432","shift":[0,0,-3]}},
		{"shape":"circle","coords":"566,802,8","style":{"color":"#432432","shift":[0,0,-3]}},
		{"shape":"circle","coords":"548,817,8","style":{"color":"#432432","shift":[0,0,-3]}},
		{"shape":"circle","coords":"530,802,8","style":{"color":"#432432","shift":[0,0,-3]}},
		{"shape":"circle","coords":"516,784,8","style":{"color":"#432432","shift":[0,0,-3]}},
		{"shape":"circle","coords":"531,768,8","style":{"color":"#432432","shift":[0,0,-3]}}
	],[
		{"shape":"poly","coords":"571,1120,578,1103,585,1120"}//Fine
	],[
		{"shape":"circle","coords":"953,1682,19","style":{"shift":[0,0,-5]}},//Good Enough
		{"shape":"circle","coords":"1020,1567,19","style":{"shift":[0,0,-5]}},
		{"shape":"circle","coords":"953,1452,19","style":{"shift":[0,0,-5]}},
		{"shape":"circle","coords":"887,1567,19","style":{"shift":[0,0,-5]}}		
	],[
		{"shape":"circle","coords":"888,1918,46","style":{"shift":[0,0,-5]}},//Good Enough
		{"shape":"circle","coords":"667,1918,67","style":{"color":"#432432","shift":[0,0,-15]}}//Good Enough
	],[
		{"shape":"circle","coords":"1040,2338,11"},//Perfect
		{"shape":"circle","coords":"1040,2368,11"},
		{"shape":"circle","coords":"1040,2398,11"},
		{"shape":"circle","coords":"1040,2428,11"}
	],[
		{"shape":"rect","coords":"770,2890,820,2911","style":{"color":"#432432","shift":[3,4,-3,-3]}},//Fine
		{"shape":"rect","coords":"674,2890,725,2911","style":{"color":"#432432","shift":[3,4,-3,-3]}},
		{"shape":"rect","coords":"579,2890,629,2911","style":{"color":"#432432","shift":[2,4,-3,-3]}}
	],[
		{"shape":"circle","coords":"733,3422,10"}//Perfect
	],[
		{"shape":"rect","coords":"650,3650,682,3703","style":{"outline":"outline","oshift":[2,2,-2,-2]}},//Perfect
		{"shape":"rect","coords":"650,3715,681,3768","style":{"outline":"outline","oshift":[2,2,-2,-2]}},
		{"shape":"rect","coords":"650,3780,681,3833","style":{"outline":"outline","oshift":[2,2,-2,-2]}},
		{"shape":"rect","coords":"650,3845,681,3898","style":{"outline":"outline","oshift":[2,2,-2,-2]}},
	],[
		{"shape":"rect","coords":"696,4170,756,4229","style":{"shift":[0,1,-1,0]}},//Good Enough
		{"shape":"rect","coords":"615,4261,668,4314","style":{"color":"#432432","shift":[4,4,-3,-3]}},
		{"shape":"rect","coords":"569,4367,595,4393","style":{"color":"#432432","shift":[4,4,-3,-3]}}
	],[
		{"shape":"poly","coords":"422,5007,360,4683,611,4921"}//Perfect
	],[
		{"shape":"circle","coords":"1007,5652,24","style":{"shift":[0,0,-2]}}//Perfect
	],[
		{"shape":"circle","coords":"571,6830,74"},//All Fine 
		{"shape":"circle","coords":"739,6830,74"},
		{"shape":"circle","coords":"907,6830,74"} 
	],[
		{"shape":"circle","coords":"751,7107,7","style":{"color":"hsl(9,9%,9%)","shift":[0,1.6,-2.3]}},//Good Enough
		{"shape":"circle","coords":"989,7107,7","style":{"color":"hsl(9,9%,9%)","shift":[0,0.6,-2.3]}}
	],[
		{"shape":"circle","coords":"869,7353,20","style":{"color":"hsl(9,9%,9%)","shift":[0,0,-4]}}//Fine
	]
]

window.onload = function () {
	var area, map = document.getElementsByTagName("map")[0]
	can = document.getElementsByTagName("canvas")[0]
  can.width = can.offsetWidth;
  can.height = can.offsetHeight;
	ctx = can.getContext("2d")
	clickpoints.forEach(function(v,i){
		pattern.push(Math.floor(Math.random() * v.length))
		v.forEach(function(d,c){
			area = document.createElement("area")
			area.shape = d.shape
			area.coords = d.coords
			area.className = `s${i}`
			area.setAttribute("onclick",`verify(${i},${c})`)
			map.appendChild(area)
		})
	})
	cursor()
}

function verify(i,c) {
	//Uncomment to test clickpoints
	//draw(i,c)
	if (cur != i) {
		return
	} else if (pattern[i] == c) {
		cur++
		draw(i,c)
		if (cur == pattern.length) {
			WikiSpotHit()
		} else {
			PuzzleGoodClick()
		}
	} else {
		cur = 0
		ctx.clearRect(0,0,can.width,can.height)
		window.scrollBy(0,-10000)
		PuzzleFailClick()
	}
	cursor()
}

function cursor() {
	var l = document.getElementsByClassName(`s${las}`),
			c = document.getElementsByClassName(`s${cur}`)
	console.log(l,c,l[0])
	for (let i = 0; i < l.length; i++) {
		l[i].removeAttribute("onMouseOver","LinkHover()")
		l[i].removeAttribute("onMouseOut","LinkOut()")
	}
	for (let i = 0; i < c.length; i++) {
		c[i].setAttribute("onMouseOver","LinkHover()")
		c[i].setAttribute("onMouseOut","LinkOut()")
	}
	las = cur
	//*Only necessary for demo
	document.getElementById("the_step").innerHTML = `.s${cur} {cursor:pointer;}`
	//======================*/
}

function draw(i,c) {
	var d = clickpoints[i][c], l
	var o = d.coords.split(",").map(function(x){return parseInt(x,10)})
	ctx.fillStyle = "white"
	if (d.style !== undefined) {
		ctx.fillStyle = (d.style.color === undefined) ? ctx.fillStyle:d.style.color
		o = (d.style.shift === undefined) ? o:o.map(function(v,i){return v + d.style.shift[i]})
		l = d.style.outline
	}
	switch (d.shape) {
		case "rect":
			if (l === undefined) {
				ctx.fillRect(o[0],o[1],o[2]-o[0],o[3]-o[1])
			} else {
				ctx.lineWidth = 2
				ctx.strokeStyle = "white"
				ctx.strokeRect(o[0],o[1],o[2]-o[0],o[3]-o[1])
			}
			break;
		case "circle":
			ctx.beginPath()
			ctx.arc(o[0],o[1],o[2],0,Math.PI*2)
			ctx.fill()
			break;
		case "poly":
			ctx.beginPath()
			ctx.moveTo(o.shift(),o.shift())
			while (o.length != 0) {
				ctx.lineTo(o.shift(),o.shift())
			}
			ctx.fill()
			break;
	}
}

function PlaceWiki(w) {
	document.getElementById("field").innerHTML = w
}

//*Only necessary for demo or testing
function LinkHover(){console.log("LinkHover")}
function LinkOut(){console.log("LinkOut")}
function PuzzleGoodClick() {console.log("*ding*")}
function PuzzleFailClick() {console.log("*buzz*")}
function WikiSpotHit() {console.log("*victory*")}
//=================================*/