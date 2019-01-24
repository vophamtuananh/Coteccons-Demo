class Transportation {
	constructor(g, price, kmPrice, count, provider) {
    	this.grossTonnage = g;
    	this.price = price;
    	this.kmPrice = kmPrice;
      this.count = count;
    	this.provider = provider;
  	}

  	getPrice(km) {
  		var additional = km - 10;
  		if (additional <= 0)
  			return this.price;
  		return this.price + (additional * this.kmPrice);
  	}
}

class OrderedTransportation {
  constructor(transportation, trips) {
    this.transportation = transportation;
    this.trips = trips;
  }
}

class Trip {
  constructor(commodities, count, startPlace, endPlaces) {
    this.commodities = commodities;
    this.count = count;
    this.startPlace = startPlace;
    this.endPlaces = endPlaces;
  }
}