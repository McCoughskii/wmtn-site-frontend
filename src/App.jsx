import React from "react";
import Header from "./components/header";
import Weather from "./components/weather";
import Listen from "./components/listen";
import Playlist from "./components/cards/playlist";
import Events from "./components/cards/events";
// import Schedule from "./components/cards/schedule";
import Footer from "./components/footer";

function App() {
	return (
		<>
			<div className="main-app">
				<Header />
				<Weather />
				<Listen />
				<div className="Cards">
					<Events />
					<Playlist />
				</div>
			</div>
			<Footer />
		</>
	);
}

export default App;
