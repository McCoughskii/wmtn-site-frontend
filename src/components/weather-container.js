import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export function getTime() {
	const time = dayjs().tz("America/Chicago").format("dddd, h:mm A");
	return time;
}

export async function getWeather() {
	// eslint-disable-next-line no-undef
	const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/weather`);

	const data = await response.json();

	// remove first 2 characters from the icon string
	const icon = data.current.condition.icon;

	// replace 64x64 with 128x128
	const iconUrlLarge = icon.replace("64x64", "128x128");

	const location = {
		city: data.location.name,
		State: data.location.region
	};

	const current = {
		temp_c: Math.round(data.current.temp_c),
		temp_f: Math.round(data.current.temp_f)
	};

	const condition = {
		text: data.current.condition.text,
		icon: `https:${iconUrlLarge}`
	};

	return {
		location,
		current,
		condition
	};
}
