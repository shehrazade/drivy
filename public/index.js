'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

function getTime(pickupDate, returnDate){
	var r = new Date(returnDate); 
	var p = new Date(pickupDate); 
	return ((r - p)/(1000*60*60*24)+1);  
}

function setPrice (rental, cars){
	// Get prices 
	var pricePerKm ; 
	var pricePerDay ; 
	
	for(var  car in cars){
		
		if (cars[car].id == rental.carId)
		{
			pricePerDay = cars[car].pricePerDay ; 
			pricePerKm = cars[car].pricePerKm ; 
		}
	}
	
	// Get Time Component
	var t = getTime(rental.pickupDate , rental.returnDate); 
	var time = t * pricePerDay ; 
	
	// Get Distance Component
	var dist = rental.distance * pricePerKm ; 
	
	// Set Price
	var price =  time + dist ; 
	
	if(rental.deductibleReduction = true ){
		price = price + ( t * 4 ) ; 
	}
	
	
	// decrease by nb of day
	var p ; 
	
	if (t > 1 )
	{
		p = 10 ; 
	}
	if (t > 4)
	{
		p = 40; 
	}
	if ( t > 10){
		
		p = 50 ; 
	
	}
	
	var reduc = (p * price )/100 ; 
	
	rental.price = price - reduc ; 
	
	setCommission(rental.price, t , rental); 
	
	return rental.price ; 
}

function setCommission (price , nbDay, rental){
	
	// Get commission 
	var commission = price - ((price * 30 )/100); 
	
	// Set insurance part reset commsission 
	rental.insurance = price / 2 ; 
	
	commission = commission - rental.insurance ; 
	
	// Set assistance
	rental.assistance = nbDay ; 
	
	commission = commission - nbDay ; 
	
	// drivy 
	
	rental.drivy = commission ; 

}

console.log(setPrice(rentals[2], cars));

