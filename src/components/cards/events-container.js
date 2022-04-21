
export async function getEvents() {
	// eslint-disable-next-line no-undef
	const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/events`).catch(() => {
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