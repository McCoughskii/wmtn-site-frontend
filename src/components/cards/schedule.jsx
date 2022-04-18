import React from "react";
import "./schedule.scss";

export default function ScheduleCard() {
	return (
		<div id="schedule-card" className="mdc-card">
			<div className="mdc-card__content">
				<div id="schedule-card_title" className="card-title">
					<span id="schedule-card_title-text">Schedule</span>
				</div>
				<ScheduleList />
			</div>
		</div>
	);
}

function ScheduleList() {

	return (
		<div className="schedule-card_list-wrapper">
			<ul id="schedule-card_list" className="mdc-list--two-line">
				<li className="mdc-list-item">
					<span className="mdc-list-item__ripple" />
					<span className="mdc-list-item__text">
						<span className="mdc-list-item__primary-text">Golden Hour</span>
						<span className="mdc-list-item__secondary-text">
							Feb 4, 2020, 9:00 AM
						</span>
					</span>
				</li>
			</ul>
		</div>
	);
}
