import React from "react";
import "./listen.scss";
import { AudioController, getSongList } from "./listen-container.js";
import { isMobile } from "react-device-detect";

export default function StreamListener() {
	return (
		<div className="Listen">
			<CurrentlyPlaying />
			<MediaControls />
		</div>
	);
}

function CurrentlyPlaying() {
	const [currentSong, setCurrentSong] = React.useState("Waiting for song...");
	const [nextSong, setNextSong] = React.useState("Waiting for song...");

	React.useEffect(() => {
		getSongList().then((list) => {
			setCurrentSong(list.CurrentSong);
			setNextSong(list.NextSong);
		});

		const interval = setInterval(() => {
			getSongList().then((list) => {
				setCurrentSong(list.CurrentSong);
				setNextSong(list.NextSong);
			});
		}, 15000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div id="CurrentlyPlaying">
			<p id="CurrentlyPlaying-title">Currently Playing</p>
			<i id="CurrentlyPlaying-song">{currentSong}</i>
			<p id="CurrentlyNext-title">Up Next</p>
			<i id="CurrentlyNext-song">{nextSong}</i>
		</div>
	);
}

function MediaControls() {

	// kinda messy but it works

	// if the user is on mobile show the default mobile controls
	// this is because the volume slider does not work on mobile IOS

	if (isMobile) {
		return (
			<div className="MediaPlayer__Mobile">
				<audio
					id="WMTNStream_Mobile"
					className="mdc-elevation--z2"
					preload="metadata"
					controls
				>
					<source src="http://tux-support.com:9320/;" />
				</audio>
			</div>
		);
	}

	// if the user is on desktop show the custom audio controler
	React.useEffect(() => {
		new AudioController("WMTNStream", "VolumeButton", "VolumeSlider");
	}, []);

	return (
		<div className="MediaPlayer">
			<audio id="WMTNStream" className="RadioStream" preload="none" autoPlay muted />
			<div id="MediaControls" className="mdc-elevation--z2">
				<div id="VolumeIcon">
					<input type="button" id="VolumeButton" className="material-icons" value="volume_off" />
				</div>

				<div id="VolumeContainer">
					<div id="VolumeSlider" className="mdc-slider mdc-slider--discrete">
						<input
							alt="VolumeSlider"
							className="mdc-slider__input"
							type="range"
							min="0"
							max="100"
							value="0"
							name="volume"
							step="1"
							onChange={() => {}}
						/>
						<div className="mdc-slider__track">
							<div className="mdc-slider__track--inactive"></div>
							<div className="mdc-slider__track--active">
								<div className="mdc-slider__track--active_fill" />
							</div>
						</div>
						<div className="mdc-slider__thumb">
							<div className="mdc-slider__value-indicator-container" aria-hidden="true">
								<div className="mdc-slider__value-indicator">
									<span className="mdc-slider__value-indicator-text">0</span>
								</div>
							</div>
							<div className="mdc-slider__thumb-knob"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
