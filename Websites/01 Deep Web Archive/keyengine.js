window.onload = function () {
  var image,image_w,image_h,key,key_x,key_y
  image = document.getElementsByTagName("img")[0]
  image_w = image.width - 120
  image_h = image.height - 20
  key_x = Math.floor(Math.random() * image_w)
  key_y = Math.floor(Math.random() * image_h)

  key = document.createElement('div')
  key.classList.add("PTAG")
  key.id = "archive_embed"

  key.style.left = key_x + "px"
  key.style.top = key_y + "px"

  //Inject template key
  //key.innerHTML = "0 - abcdef123456"

  document.getElementById("content_wrapper").appendChild(key)

  /* Debug Code for WTTG1 Sites, Displays image maps
  var map = document.getElementsByTagName("map"), c, a

  for (var i = 0; i < map[0].areas.length; i++) {
    c = map[0].areas[i].coords.split(',')

    a = document.createElement('div')
    a.style.left = c[0] + "px"
    a.style.top = c[1] + "px"
    a.style.width = (c[2] - c[0]) + "px"
    a.style.height = (c[3] - c[1]) + "px"
    a.style.border = "5px red solid"
    a.style.position = "absolute"
    a.style["box-sizing"] = "border-box"
    a.style["pointer-events"] = "none"

    document.getElementById("content_wrapper").appendChild(a)
  }
  //*/
}
