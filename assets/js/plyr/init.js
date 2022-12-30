let params = Object.fromEntries(new URLSearchParams(location.search).entries());

let { src, poster } = params;

let autoplay = params.autoplay || 0;
let controls = params.controls || 1;
let loop = params.loop || 0;

let attr = "";
let options = {};

if (controls == 0) {
  options = { controls: "" };
} else {
  attr += "controls ";
}

if (autoplay == 1) {
  attr += "autoplay muted ";
  options = { controls: "" };
}

if (loop == 1) {
  attr += "loop";
}

document.querySelector(".container").innerHTML = `
  <video crossorigin="anonymous" playsinline poster="${poster}" ${attr}>
    <source src="${src}" type="video/mp4" size="1080">

    <a href="${src}" download>Download</a>
  </video>
`;

const player = new Plyr("video", options);
window.player = player;
