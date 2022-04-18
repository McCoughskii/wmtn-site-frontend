import React from "react";
import "./footer.scss";

export default function Footer() {
	return (
		<div className="footer">
			<div className="margin-left" />
			<div className="footer-margin-center">
				<div id="copyright">&copy; 2022 Luke Baird</div>
				<div id="notice">
					This Website Is Not Affiliated With St. Andrew&rsquo;s Sewanee School
				</div>
			</div>
			<div className="margin-right" />
		</div>
	);
}
