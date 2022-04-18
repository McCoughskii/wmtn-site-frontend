import React from "react";
import "./header.scss";

export default function Header() {
	return (
		<div id="Header" className="mdc-top-app-bar--prominent mdc-elevation--z4">
			<a className="brand" href="/">
				<img className="brand__logo" src="logo490.png" alt="brand__logo" />
				<span className="brand__name">WMTN &quot;The Voice Of the Mountain&quot;</span>
			</a>
		</div>
	);
}