import React from "react";
import mapboxgl from "mapbox-gl";
import { observer } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
mapboxgl.accessToken = "pk.eyJ1IjoiZGRvbWJyb3ciLCJhIjoiM2h3akk2ayJ9.-LjZuNbfNeb2E8n4Rwo8_w";

class Map extends React.Component {
	componentDidMount() {
		console.log(this.props.args.center.toJSON());
		this.map = new mapboxgl.Map({
			container: this.mapContainer,
			style: "mapbox://styles/mapbox/streets-v10",
			zoom: 10,
			center: this.props.args.center.toJSON()
		});

		this.map.on("moveend", e => {
			if (e.originalEvent && e.originalEvent.type === "mouseup") {
				const newCenter = e.target.getCenter();
				this.props.onCenterChange([newCenter.lng, newCenter.lat]);
			}
		});
	}

	componentWillUnmount() {
		this.map.remove();
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(this.props.args.center.toJSON());
		this.map && this.map.setCenter(this.props.args.center.toJSON());
	}

	render() {
		const style = {
			position: "absolute",
			top: "0px",
			left: "0px",
			height: "100%",
			width: "100%"
		};
		return (
			<div>
				<div style={style} ref={el => (this.mapContainer = el)} />
				<input type="hidden" value={JSON.stringify(getSnapshot(this.props.args))} />
			</div>
		);
	}
}

export default observer(Map);
