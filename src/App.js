import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import Store from "./models/store";
import { onSnapshot } from "mobx-state-tree";

const store = Store.create({
	map: {
		center: [-77.0310082, 38.8985685]
	}
});

class App extends Component {
	render() {
		return (
			<div className="App">
				<Map args={store.map} onCenterChange={store.map.move} />
			</div>
		);
	}
}

setTimeout(() => {
	store.map.move([2.349014, 48.864716]);
}, 5000);

onSnapshot(store, snapshot => {
	console.log(snapshot);
});

export default App;
