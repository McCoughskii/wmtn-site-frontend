export async function getPreviousSongs() {
	// eslint-disable-next-line no-undef
	const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/songList`).catch(() => {
		return undefined;
	});

	if (!response) {
		return ["Waiting for song...", "Waiting for song..."];
	}

	const data = await response.json().catch(() => {
		return {
			PreviousSongs: ["Waiting for song..."]
		};
	});

	return data.PreviousSongs.map((song) => song.replace("&amp;", "&"));
}
	