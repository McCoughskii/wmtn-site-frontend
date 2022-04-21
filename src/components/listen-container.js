import { MDCSlider } from "@material/slider";
import { EventEmitter } from "events";

export class AudioController extends EventEmitter {
	constructor(streamId, VolButtonId, sliderId) {
		super();

		this.stream = document.getElementById(streamId);
		this.VolButton = document.getElementById(VolButtonId);
		this.slider = new MDCSlider(document.getElementById(sliderId));
		this.VolLevel = 30;

		this.stream.load();

		this.initializeSlider();
		this.setSliderListeners();
		this.setButtonListeners();
	}

	pause() {
		this.stream.removeAttribute("src");
		this.stream.pause();
		setTimeout(() => {
			this.stream.load();
		}, 10);
	}

	play() {
		if(!this.stream.getAttribute("src")) {
			// eslint-disable-next-line no-undef
			this.stream.setAttribute("src", `${process.env.REACT_APP_STREAM_URL}`);
		}

		this.stream.play().catch(() => {});
	}

	setMute(mute) {
		this.stream.muted = mute;
		this.VolButton.value = mute ? "volume_off" : "volume_up";
		this.stream.volume = this.VolLevel / 100;
		mute ? this.pause() : this.play();
		this.emit("mute", mute);
	}

	setButtonListeners() {
		this.VolButton.onclick = () => {
			this.setMute(!this.stream.muted);
		};
	}

	setSliderListeners() {
		this.slider.listen("MDCSlider:input", () => {
			const value = this.slider.getValue();
			
			if(value === 0) {
				this.setMute(true);
				return;
			}
			
			this.VolLevel = value;
			this.setMute(false);

		});

		this.slider.listen("MDCSlider:change", () => {
			const value = this.slider.getValue();

			if(value <= 10) {
				this.VolLevel = 10;
				return;
			}

			this.VolLevel = value;
		});

		this.on("mute", (mute) => {
			if (mute) {
				this.slider.setValue(0);
			} else {
				this.slider.setValue(this.VolLevel);
			}
		});

	}

	initializeSlider() {
		this.slider.setValue(0);
		this.slider.initialize({ skipInitialUIUpdate: true });
	}
}

export async function getSongList() {
	// eslint-disable-next-line no-undef
	const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/songList`).catch(() => {
		return undefined;
	});

	if (!response) {
		return {
			CurrentSong: "Waiting for song...",
			NextSong: "Waiting for song...",
		};
	}
	const data = await response.json().catch(() => {
		return {
			CurrentSong: "Waiting for song...",
			NextSong: "Waiting for song...",
		};
	});

	data.CurrentSong = data.CurrentSong.replace("&amp;", "&");
	data.NextSong = data.NextSong.replace("&amp;", "&");

	return data;
}