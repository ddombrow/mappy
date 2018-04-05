import { types } from "mobx-state-tree";

const Map = types
	.model("Map", {
		center: types.array(types.number)
	})
	.actions(self => ({
		move(center) {
			self.center = center;
		}
	}));

const Store = types.model("Store", {
	map: Map
});

export default Store;
