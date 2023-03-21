// import our flight Model so we can find the flight we want to add a review too
const FlightModel = require('../models/flight');

module.exports = {
	create
}

function create(req, res){
	console.log(req.body)
	// Use a Model to find the flight with an id (req.params.id)
	FlightModel.findById(req.params.id)
			   .then(function(flightDoc){

				console.log(flightDoc)
					// mutating a document, 
					// we are adding/or removing/updating 
					// something you found from the database
				flightDoc.destinations.push(req.body);
					// you have to save the document to tell 
					// mongodb you change something, cuz this 
					// exists on our express server, mongodb
					// doesn't know we added req.body to the flights
					// reviews array
				flightDoc.save()
                .then(function(){
	            res.redirect(`/flights/${req.params.id}`)
                    })
                }).catch(err =>{
				console.log(err);
				res.send(err)
			    })
            }