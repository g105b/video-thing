(function () {
	"use strict";

	let video = document.querySelector("video.special-video-that-can-have-cue-points-added");
	let cuepointList = document.querySelectorAll(".cuepoint-content>*[data-timeshow]");
	let timestamps = [];

	let button = document.createElement("button");
	button.innerText = "Add cue point";
	button.addEventListener("click", function() {
		addCuePoint(video.currentTime);
	});

	video.parentElement.appendChild(button);

	video.addEventListener("timeupdate", function() {
		videoTick();
	});

	for(let cuepoint of cuepointList) {
		let inTime = parseInt(cuepoint.dataset.timeshow);
		let outTime = null;
		let lastTimestamp = timestamps[timestamps.length - 1] ?? null;

		if(cuepoint.dataset.duration) {
			outTime = parseInt(cuepoint.dataset.timeshow)
				+ parseInt(cuepoint.dataset.duration);
		}

		if(lastTimestamp && !lastTimestamp["out"]) {
			lastTimestamp.out = inTime;
		}

		timestamps.push({
			"element": cuepoint,
			"in": inTime,
			"out": outTime
		});
	}

	function addCuePoint(timestamp) {
		console.log("Add cuepoint clicked, timestamp:", timestamp);
	}

	function videoTick() {
		let t = video.currentTime;
		cuepointList.forEach(function(cuepoint) {
			cuepoint.classList.remove("cuepoint-current");
		});

		for(let i in timestamps) {
			if(!timestamps.hasOwnProperty(i)) {
				continue;
			}

			let timestamp = timestamps[i];
			if(timestamp["in"] < t
			&& timestamp["out"] > t) {
				timestamp["element"].classList.add("cuepoint-current");
			}
		}
	}
})();