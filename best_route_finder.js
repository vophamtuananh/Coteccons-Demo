var orderedTransportations = [];


function orderTransportations() {
	for (var i = 0; i < commodities.length; i++) {
		var commodity = commodities[i];
		var orderedTransportation = findInOrderedTransportations(commodity);
		if (orderedTransportation == null) {
			var results = getTransportations(commodity, commodity.count);
			for (var j = 0; j < results.length; j++) {
				orderedTransportations.push(results[j]);	
			}
			
    		console.log("orderedTransportations", orderedTransportations);
		}
	}
}

function findInOrderedTransportations(commodity) {
	if (orderedTransportations.length <= 0)
		return null;
	var orderedTransportation = orderedTransportations[orderedTransportations.length - 1];
	var trips = orderedTransportation.trips;
	var haveTransortation = false;
	var currentWeigth = 0;
	var currentKm = 0;
	var currentEndPlace;
	for (var i = 0; i < trips.length; i++) {
		var trip = trips[i];
		for (var j = 0; j < trip.commodities.length; j++) {
			currentWeigth += trip.commodities[j].weight * trip.count;
		}
		currentKm += calculateDistance(trip.startPlace, trip.endPlaces[trip.endPlaces.length - 1]);
		currentEndPlace = trip.endPlaces[trip.endPlaces.length - 1];
		if (trip.startPlace.name == commodity.pickUpPlace) {
			haveTransortation = true;
			break;
		}
	}
	if (haveTransortation) {
		var currentPrice = orderedTransportation.transportation.getPrice(currentKm);
		var transportation = findReplacementTransportation(currentWeigth, currentPrice, currentKm, currentEndPlace, commodity);
		orderedTransportation.transportation = transportation;
		orderedTransportation.trips[0].commodities.push(commodity);
		orderedTransportation.trips[0].endPlaces.push(getPlace(commodity.dropOfPlace));
		return orderedTransportation;
	}
	return null;
}

function findReplacementTransportation(currentWeigth, currentPrice, currentKms, currentEndPlace, newCommodity) {
	var totalWeight = currentWeigth + (newCommodity.weight * newCommodity.count);
	var replacementTransportation = findTransportation(totalWeight);
	if (replacementTransportation != null) {
		var newCurrentPrice = replacementTransportation.getPrice(currentKms);
		var additionalPrice1 = newCurrentPrice - currentPrice;
		var additionalDropOfPlace = getPlace(newCommodity.dropOfPlace);
		var additionalKm = calculateDistance(currentEndPlace, additionalDropOfPlace);
		var additional1 = additionalKm < 6 ? 0.7 : 1;
		var additionalPrice2 = replacementTransportation.getPrice(additionalKm) * additional1;

		var newKm = calculateDistance(getPlace(newCommodity.pickUpPlace), getPlace(newCommodity.dropOfPlace));
		var newPrice = replacementTransportation.getPrice(newKm);
		if (newPrice > additionalPrice1 + additionalPrice2) {
			return replacementTransportation;
		}
	}
	return null;
}

function findTransportation(weight) {
	for (var i = 0; i < transportations.length; i++) {
		var transportation = transportations[i];
		if (transportation.grossTonnage > weight) {
			var assignedCount = stayInOrderedTransportations(transportation);
			if (assignedCount < transportation.count) {
				return transportation;
			}
		}
	}
	return null;
}

function stayInOrderedTransportations(transportation) {
	var count = 0;
	for (var i = 0; i < orderedTransportations.length; i++) {
		var orderedTransportation = orderedTransportations[i];
		if (orderedTransportation == transportation)
			count++;
	}	
	return count;
}

function findCheapestTransportation(currentTransportation, weight, km) {
	for (var j = 0; j < realTransportations.length; j++) {
		var cheaperTransportation = realTransportations[j];
		if (cheaperTransportation.grossTonnage >= weight && cheaperTransportation.getPrice(km) < currentTransportation.getPrice(km))
			return cheaperTransportation;
	}
	return currentTransportation;
}

function getTransportations(commodity, count) {
	var placeA = getPlace(commodity.pickUpPlace);
	var placeB = getPlace(commodity.dropOfPlace);
	var km = calculateDistance(placeA, placeB);
	var results = [];
	var totalWeight = commodity.weight * count;
	var remaining = totalWeight - 0;
	for (var i = realTransportations.length - 1; i >= 0; i--) {
		var transportation = realTransportations[i];
		var temp = remaining - 0;
		remaining -= transportation.grossTonnage;
		var trip = new Trip([commodity], (temp - (remaining < 0 ? 0 : remaining)) / commodity.weight, placeA, [placeB]);
		var orderedTransportation = new OrderedTransportation(transportation, [trip]);
		results.push(orderedTransportation);
		if (remaining < 0) {
			var lastResult = results[results.length - 1];
			var currentTransportation = lastResult.transportation;
			lastResult.transportation = findCheapestTransportation(currentTransportation, temp, km);
			break;
		}
	}
	if (remaining > 0)
		return null;
	return results;
}

