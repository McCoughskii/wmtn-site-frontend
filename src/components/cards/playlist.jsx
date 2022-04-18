import React from "react";
import { getPreviousSongs } from "./playlist-container";
import "./playlist.scss";

export default function playlistCard() {
	return (
		<div id="playlist-card" className="mdc-card">
			<div className="mdc-card__content">
				<div id="playlist-card_title" className="card-title">
					<span id="playlist-card_title-text">Recently Played</span>
				</div>
				<div id="playlist-card_song-list">
					<SongList />
				</div>
			</div>
		</div>
	);
}

function SongList() {
	const [songs, setSongs] = React.useState(["Waiting for songs..."]);

	React.useEffect(() => {
		let listHTML = [];

		getPreviousSongs().then((songList) => {

			songList.forEach((song, index) => {
				listHTML.push(<li key={index}>{song}</li>);
			});

			setSongs(listHTML);
		});

		setInterval(() => {
			let listHTML = [];

			getPreviousSongs().then((songList) => {
				songList.forEach((song, index) => {
					listHTML.push(<li key={index}>{song}</li>);
				});

				// setSongs(listHTML);
			});
		}, 10000);
	}, []);

	return <ul className="song-list">{songs}</ul>;
}
