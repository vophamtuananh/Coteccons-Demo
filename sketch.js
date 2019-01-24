
var pickUpPlaces = [];
var dropOfPlaces = [];
var distances = [];
var realTransportations = [];
var realCommodities = [];

var recordBestCost;
var bestTripEver;

function setup() {
    createCanvas(1200, 800);

    for (var i = 0; i < transportations.length; i++) {
    	var transportation = transportations[i];
    	var count = transportation.count;
    	for (var j = 0; j < count; j++) {
    		realTransportations.push(new Transportation(transportation.grossTonnage, transportation.price, transportation.kmPrice, 1, transportation.provider));
    	}
    }

	for (var i = 0; i < commodities.length; i++) {
    	var commodity = commodities[i];
    	if (!pickUpPlaces.includes(commodity.pickUpPlace)) {
    		pickUpPlaces.push(commodity.pickUpPlace);
    	}
    	if (!dropOfPlaces.includes(commodity.dropOfPlace)) {
    		pickUpPlaces.push(commodity.dropOfPlace);
    	}
    }

    // var routes = getTransportations(commodities[0], 12);
    orderTransportations();

    // var a = transportations[4].getPrice(16.12);
    // console.log("AA", a);
}

function draw() {
    background(0);
    stroke(255, 0, 255);
    strokeWeight(4);
    textSize(30);
    noFill();

    // draw Places
    for (var i = 0; i < places.length; i++) {
    	var place = places[i];
        ellipse(place.x, place.y, 8, 8);
        text(place.name, place.x + 5, place.y - 5);
    }
    // draw Distances
    var distancesString = "";
	var aa = places[0];
	var bb = places[1];
	var dd = calculateDistance(aa, bb);
	distancesString += "Từ " + "A" + " đến " + "B" + ": " + dd + " km\n";

	aa = places[0];
	bb = places[2];
	dd = calculateDistance(aa, bb);
	distancesString += "Từ " + "A" + " đến " + "C" + ": " + dd + " km\n";

	// aa = places[0];
	// bb = places[3];
	// dd = calculateDistance(aa, bb);
	// distancesString += "Từ " + "A" + " đến " + "D" + ": " + dd + " km\n";

	aa = places[1];
	bb = places[2];
	dd = calculateDistance(aa, bb);
	distancesString += "Từ " + "B" + " đến " + "C" + ": " + dd + " km\n";

	// aa = places[2];
	// bb = places[3];
	// dd = calculateDistance(aa, bb);
	// distancesString += "Từ " + "C" + " đến " + "D" + ": " + dd + " km\n";

	


    stroke(0, 255, 0);
    strokeWeight(1);
    textSize(26);
    text(distancesString, 50, height - 250); 

    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < places.length; i++) {
        vertex(places[i].x, places[i].y);
    }
    endShape();

    noLoop();
}

function nextOrder(order) {
	var largestX = -1;
	for (var i = 0; i < order.length - 1; i++) {
	    if (order[i] < order[i +1])
	        largestX = i;
	}

	if (largestX == -1) {
	    return 0;
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
	return 1;
}

function swap(a, i, j) {
	var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}




