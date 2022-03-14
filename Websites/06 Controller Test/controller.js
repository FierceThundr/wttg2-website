var address = window.location.href
var page = address.substring(address.lastIndexOf("/") + 1)
var parameters = new URLSearchParams(window.location.search)
var exceptions = ["index.html"]
if (exceptions.includes(page) == false) {
	if (parameters.get("master") == "1") {
		localStorage.setItem("permit","1")
		LinkClick(parameters.get("page"))
	} else if (localStorage.getItem("permit") == 1) {
		localStorage.setItem("permit","0")
	} else {
		window.location.href = "master.html"
	}
}

function advance_order() {
	window.location.href = "master.html?pass=1"
}

function LinkClick(l) {window.location.href = l}