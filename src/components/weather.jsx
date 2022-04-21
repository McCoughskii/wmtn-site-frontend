import React from "react";
import { getTime, getWeather } from "./weather-container";
import "./weather.scss";

export default function weatherCard() {
	return (
		<div id="WeatherCard" className="mdc-card">
			<div className="mdc-card__content">
				<WeatherHeader />
			</div>
		</div>
	);
}

function WeatherHeader() {
	const [temp, setTemp] = React.useState("0");
	const [icon, setIcon] = React.useState("");
	const [conditionText, setConditionText] = React.useState("Unknown");
	const [time, setTime] = React.useState("");

	React.useEffect(() => {
		getWeather().then((data) => {
			setTemp(data.current.temp_f);
			setIcon(data.condition.icon);
			setConditionText(data.condition.text);
		});

		const curTime = getTime();
		setTime(curTime);

		const interval = setInterval(() => {
			const curTime = getTime();
			setTime(curTime);
		} , 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="weather-card-text">
			<div className="weather-card-text_location">Sewanee, TN</div>
			<div className="weather-card-text_status">
				<span id="cur_time">{time}</span>
				<span className="weather-card_spacer">, </span>
				<span id="cur_weather-short">{conditionText}</span>
			</div>

			<div className="weather-card-now">
				<div id="weather-card-temp">
					<span id="cur_temp">{temp}</span>
					<span className="weather-card_spacer">&deg;</span>
				</div>
				<div id="weather-card-icon">
					<img src={icon} alt="currentWeatherIcon"/>
				</div>
			</div>
		</div>
	);
}
