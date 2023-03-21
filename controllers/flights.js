//model is always capitalized, in every language
const FlightModel = require('../models/flight');

module.exports = {
	new: newflight,
	create,
	index,
    show
}

function show(req, res) {
	FlightModel.findById(req.params.id)
            .then(function(flightDoc){
				console.log(flightDoc) // <- flightDoc is the object from the database!

				// Goal: TO find all of the destinations that are not in the flights cast array
				// 1. find the flight (flightDoc) so we know what destinations are in the cast array
				// 2. Use the destinationModel to query the destinations collection to find all the destinations
				// whose id is not in the flightDoc.cast array
					res.render('flights/show', { 
						flight: flightDoc // this has the cast array, the destinations in the flight
					})
				// }).catch((err) =>{
				//     console.log(err);
				//     res.send(err)
			  })
  }

function index(req, res){
    FlightModel.find({})
        .then(function(allFlights){
        console.log(allFlights, " <_ data from the db")
		res.render('flights/index', {flights: allFlights})

        }).catch(function(err){
        console.log(err);
        res.send(err)
        })
}

function create(req, res){
    console.log(req.body);
    FlightModel.create(req.body)
        .then(function(flightWeCreatedInTheDb){
        console.log(flightWeCreatedInTheDb, " <- flight doc");
        res.redirect(`/flights/${flightWeCreatedInTheDb._id}`)
    }).catch((err) => {
        console.log(err);
        res.send('There was an error check the terminal, or log the err object')
    })
}

function newflight(req, res){


	// Render looks in the views folder
	res.render('flights/new')
}