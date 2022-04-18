import React from "react";
import { getEvents } from "./events-container";
import "./events.scss";

export default function EventsCard() {
	return (
		<div id="schedule-card" className="mdc-card">
			<div className="mdc-card__content">
				<div id="schedule-card_title" className="card-title">
					<span id="schedule-card_title-text">Upcoming Events</span>
				</div>
				<ScheduleList />
			</div>
		</div>
	);
}

function ScheduleList() {
	const [events, setEvents] = React.useState(["Waiting for schedule..."]);


	React.useEffect(() => {
	
		let listHTML = [];

		getEvents().then((scheduleList) => {
			scheduleList.forEach((event, index) => {
				listHTML.push(
					<li className="mdc-list-item" key={index} tabIndex="-1">
						<span className="mdc-list-item__ripple" />
						<span className="mdc-list-item__text">
							<span className="mdc-list-item__primary-text">{event.title}</span>
							<span className="mdc-list-item__secondary-text">
								{event.Date}, {event.StartTime}
							</span>
						</span>
					</li>
				);
			});

			setEvents(listHTML);
		});

	}, []);

	return (
		<div className="schedule-card_list-wrapper">
			<ul id="schedule-card_list" className="mdc-list--two-line" role="listbox">
				{events}
			</ul>
		</div>
	);
}
