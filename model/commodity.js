class Commodity {
  	constructor(name, weight, count, pickUpPlace, dropOfPlace) {
    	this.name = name;
    	this.weight = weight;
    	this.count = count;
    	this.pickUpPlace = pickUpPlace;
    	this.dropOfPlace = dropOfPlace;
  	}

  	getWeight() {
  		return this.weight * this.count;
  	}
}