
export async function getEvents() {
	const response = await fetch("https://api.serabusm.com/v1/events").catch(() => {
		return undefined;
	});

	if (!response) {
		return [{
			title: "Waiting for events...",
		}];
	}
	const data = await response.json().catch(() => {
		return [{
			title: "No Events Currently Scheduled",
		}];
	});

	return data;
}