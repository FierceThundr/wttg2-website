window.onload = function () {
  var image,image_w,image_h,key,key_x,key_y
  image = document.getElementsByTagName("img")[0]
  image_w = image.width - 120
  image_h = image.height - 20
  key_x = Math.floor(Math.random() * image_w)
  key_y = Math.floor(Math.random() * image_h)
  
  console.log(image_w,image_h,key_x,key_y)
  
  key = document.createElement('div')
  key.classList.add("PTAG")
  key.id = "keySpot"
  
  key.style.left = key_x + "px"
  key.style.top = key_y + "px"
  
  key.innerHTML = "0 - 123456789012"
  
  document.body.appendChild(key)
}