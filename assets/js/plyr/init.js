let src = request.getParameter('src');
let poster = request.getParameter('poster');

let autoplay = request.getParameter('autoplay') || 0;
let controls = request.getParameter('controls') || 1;
let loop = request.getParameter('loop') || 0;

let attr = "";
let options = {};

if (autoplay == 1) {
  attr += "autoplay muted ";
  options = { controls: "" };
}

if (controls == 0) {
  options = { controls: "" };
}

if (loop == 1) {
  attr += "loop";
}

document.querySelector('.container').innerHTML = `
  <video crossorigin playsinline poster="${poster}" ${attr}>
          <source src="${src}" type="video/mp4" size="1080">

          <a href="${src}" download>Download</a>
  </video>
`

const player = new Plyr('video', options);
window.player = player;
