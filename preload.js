console.log("Preload running...");

// loop through all the content you want to preload
var images = [];
function preload() {
  for (var i = 0; i < arguments.length; i++) {
    images[i] = new Image();
    images[i].src = preload.arguments[i];
  }
}

// images and sounds
preload("images/admin.avif", "images/star.avif");

preload(
  "images/firulice.png ",
  "images/fort0.png",
  "images/fort1.png",
  "images/fort2.png",
  "images/fort3.png",
  "images/fort4.png",
  "images/fort5.png",
  "images/mamoshki.gif",
  "images/map.png",
  "images/peter.gif",
  "images/peter2.gif",
  "images/reactop.png",
  "images/scar.png",
  "images/tortapounder.png"
);
