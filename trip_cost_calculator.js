class Route {
    constructor(startPlaceName, trips) {
        this.startPlaceName = startPlaceName;
        this.trips = trips;
    }
}

class BestRoute {
    constructor(trips, orders, cost) {
        this.trips = trips;
        this.orders = orders;
        this.cost = cost;
    }
}

function generateRoutes() {
	var routes = [];
	for (var i = 0; i < pickUpPlaces.length; i++) {
    	var pickUpName = pickUpPlaces[i];
    	var pickUpPlace = getPlace(pickUpName);
    	var needToDropOfs = [];
    	for (var j = 0; j < commodities.length; j++) {
    		var commodity = commodities[j];
    		if (commodity.pickUpPlace == pickUpName) {
    			var dropOfPlace = getPlace(commodity.dropOfPlace);
    			needToDropOfs.push(dropOfPlace);
    		}
    	}
    	var maxTrip = 2;
    	while (maxTrip <= needToDropOfs.length + 1) {
            var orders = [];
    		var order = [];
    		loop1:
    		for (var k = 0; k < needToDropOfs.length; k++) {
    			if (order.length == 0)
    				order.push(pickUpPlace);
    			order.push(needToDropOfs[k]);
    			if (order.length >= maxTrip) {
    				orders.push(order.slice());
    				order = [];
    				continue loop1;
    			}

    			loop2:
    			for (var l = k + 1; l < needToDropOfs.length; l++) {
    				if (order.length == 0) {
    					order.push(pickUpPlace);
    					order.push(needToDropOfs[k]);
    				}
    				order.push(needToDropOfs[l]);
    				if (order.length >= maxTrip) {
    					orders.push(order.slice());
    					order = [];
    				}
    			}
    			order = [];
    		}
            var route = new Route(pickUpName, orders);
            routes.push(route);
    		maxTrip++;
    	}
    }
    return routes;
}

function findBestRoutes() {
    var routes = generateRoutes();
    var bestRoutes = [];
    var startPlaceNames = new Map();
    for (var i = 0; i < routes.length; i++) {
        startPlaceNames.set(routes[i].startPlaceName, routes[i].startPlaceName);
    }
    for (const [key, value] of startPlaceNames) {
        var bestRouteEver;
        for (var j = 0; j < routes.length; j++) {
            var route = routes[j];
            if (route.startPlaceName == value) {
                var bestRoute = generateBestRoute(route);
                if (bestRouteEver == null || bestRouteEver.cost > bestRoute.cost) {
                    bestRouteEver = bestRoute;
                }
            }
        }
        bestRoutes.push(bestRouteEver);
    }
    return bestRoutes;
}

function generateBestRoute(route) {
    var routeCost = 0;
    var orders = [];
    var trips = route.trips;
    for (var i = 0; i < trips.length; i++) {
        var trip = trips[i];
        var startPlace = trip[0];
        var order = [];
        for (var j = 1; j < trip.length; j++) {
            order[j - 1] = j;
        }
        var orderTemp;
        var bestCost = 0;
        loop1:
        while (true) {
            var cost = calcalateCost(startPlace, trip, order);
            if (bestCost == 0 || bestCost > cost) {
                bestCost = cost;
                orderTemp = order.slice();
            }
            order = nextOrder(order);
            if (order == null)
                break loop1;
        }
        orders[i] = orderTemp;
        routeCost += bestCost;
    }
    return new BestRoute(trips, orders, routeCost);
}

function calcalateCost(startPlace, trip, order) {
    var start = startPlace;
    var cost = 0;
    console.log("FROM-------------", startPlace.name);
    for (var j = 1; j < trip.length; j++) {
        var destination = trip[order[j - 1]];
        console.log("TO", destination.name);
        var km = calculateDistance(start, destination);
        var additional = (j > 1 && km <= 6) ? 0.7 : 1;
        var commodities = getCommodity(startPlace, destination);
        var totalWeight = 0;
        for (var i = 0; i < commodities.length; i++) {
            totalWeight += commodities[i].getWeight();
        }
        var transportations = getTransportations(totalWeight, km, realTransportations);
        console.log("transportations", transportations);
        for (var k = 0; k < transportations.length; k++) {
            var transportation = transportations[k];
            var price = transportation.getPrice(km) * additional;
            console.log("COST", price);
            cost += price;
        }
        start = destination;
    }
    console.log("order", order);
    console.log("TOTAL---------------", cost);
    return cost;
}

function nextOrder(order) {
    var largestX = -1;
    for (var i = 0; i < order.length - 1; i++) {
        if (order[i] < order[i +1])
            largestX = i;
    }

    if (largestX == -1) {
        return null;
    }

    var largestY = -1;
    for (var j = 0; j < order.length; j++) {
        if (order[largestX] < order[j]) {
            largestY = j;
        }
    }

    swap(order, largestX, largestY);

    var endArray = order.splice(largestX + 1);
    endArray.reverse();
    order = order.concat(endArray);
    return order;
}

function swap(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}





