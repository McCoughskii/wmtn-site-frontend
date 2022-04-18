export async function getPreviousSongs() {
	const response = await fetch("https://api.serabusm.com/v1/songList").catch(() => {
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

	return data.PreviousSongs;
}