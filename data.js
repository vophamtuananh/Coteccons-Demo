var commodities1 = [
	new Commodity("Vật Liệu A",   1, 2, "A", "B"),
	new Commodity("Vật Liệu B",   1, 2, "A", "C"),
	// new Commodity("Vật Liệu C",   1, 2, "A", "D"),
];

var commodities2 = [
	new Commodity("Vật Liệu A",   1, 5, "A", "B"),
	new Commodity("Vật Liệu B",   1, 4, "C", "D"),
];

var transportations = [
	new Transportation( 1,  350000, 35000, 3, "Provider A"),
	new Transportation( 1,  370000, 37000, 2, "Provider B"),
	new Transportation( 2,  500000, 50000, 2, "Provider B"),
	new Transportation( 3,  650000, 65000, 2, "Provider A"),
	new Transportation( 5,  950000, 95000, 1, "Provider C"),
	new Transportation( 8, 1250000, 125000, 2, "Provider D"),
	new Transportation(10, 1500000, 150000, 3, "Provider B"),
];

// Transportation - 5 tan - 1 chiec - A - B - C
// Transportation - 2 tan - 1 chiec - A - C

var commodities3 = [
	new Commodity("Vật Liệu A",   1, 5, "A", "B"),
	new Commodity("Vật Liệu B",   1, 2, "A", "C"),
];

var commodities4 = [
	new Commodity("Vật Liệu B",   1, 2, "A", "B"),
	new Commodity("Vật Liệu A",   1, 5, "A", "D"),
	new Commodity("Vật Liệu E",   1, 2, "A", "E"),
	new Commodity("Vật Liệu C",   3, 2, "B", "C"),
	new Commodity("Vật Liệu D",   2, 1, "B", "D"),
];

var commodities = commodities1;

var places = [
	new Place("A", 100, 100),
	new Place("B", 550, 200),
	new Place("C", 790, 450),
	// new Place("D", 1000, 650),
];



function getCommodity(startPlace, destination) {
	var results = [];
	for (var i = 0; i < commodities.length; i++) {
		var commodity = commodities[i];
		if (commodity.pickUpPlace == startPlace.name && commodity.dropOfPlace == destination.name)
			results.push(commodity);
	}
	return results
}

function getPlace(name) {
	for (var i = 0; i < places.length; i++) {
		var place = places[i];
		if (place.name == name)
			return place;
	}
	return null;
}

function calculateDistance(placeA, placeB) {
	return nf(dist(placeA.x, placeA.y, placeB.x, placeB.y) / 25, 0, 2);
}

function getTransportations1(weight, km) {
	var results = [];
	var remaining = weight - 0;
	for (var i = realTransportations.length - 1; i >= 0; i--) {
		var transportation = realTransportations[i];
		results.push(transportation);
		var temp = remaining - 0;
		remaining -= transportation.grossTonnage;
		if (remaining < 0) {
			for (var j = 0; j < realTransportations.length; j++) {
				var smallerTransportation = realTransportations[j];
				var lastResult = results[results.length - 1];
				if (smallerTransportation.grossTonnage >= temp && smallerTransportation.getPrice(km) < lastResult.getPrice(km))
					results[results.length - 1] = smallerTransportation;
			}
			break;
		}
	}
	if (remaining > 0)
		return null;
	return results;
}



