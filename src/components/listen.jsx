import React from "react";
import "./listen.scss";
import { AudioController, getSongList } from "./listen-container.js";

export default function StreamListener() {
	return (
		<div className="Listen">
			<CurrentlyPlaying />
			<MediaPlayer />
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

		setInterval(() => {
			getSongList().then((list) => {
				setCurrentSong(list.CurrentSong);
				setNextSong(list.NextSong);
			});
		}, 10000);
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

function MediaPlayer() {
	return (
		<div className="MediaPlayer">
			<audio id="WMTNStream" className="RadioStream" preload="none" autoPlay muted>
				{/* <source src="http://tux-support.com:9320/;" type="audio/mpeg" /> */}
			</audio>

			<MediaControls />
		</div>
	);
}

function MediaControls() {
	React.useEffect(() => {
		new AudioController("WMTNStream", "VolumeButton", "VolumeSlider");
	}, []);

	return (
		<div id="MediaControls" className="mdc-elevation--z2">
			<div id="VolumeIcon">
				<input type="button" id="VolumeButton" className="material-icons" value="volume_off" />
			</div>

			<div id="VolumeContainer">
				<div id="VolumeSlider" className="mdc-slider mdc-slider--discrete">
					<input
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
	);
}
