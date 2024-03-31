document.querySelector(".container").innerHTML = `
  <video crossorigin="anonymous" playsinline autoplay muted>
    <source src="https://cdn.nguard.dev/assets/common/video/whistle.mp4" type="video/mp4" size="1080">
    <a href="https://cdn.nguard.dev/assets/common/video/whistle.mp4" download>Download</a>
  </video>
`;

let player = new Plyr("video", { controls: "" });
window.player = player;

// --------------------------

function loadnormal() {
	document.querySelector(".container").innerHTML = `
	  <video crossorigin="anonymous" playsinline autoplay muted loop>
	    <source src="https://cdn.nguard.dev/assets/common/video/background_video.mp4" type="video/mp4" size="1080">
	    <a href="https://cdn.nguard.dev/assets/common/video/background_video.mp4" download>Download</a>
	  </video>
	`;

	document.querySelector('video').removeEventListener('ended', loadnormal);

	let player = new Plyr("video", { controls: "" });
	window.player = player;
}

document.querySelector('video').addEventListener('ended', loadnormal);