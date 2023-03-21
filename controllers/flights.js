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
			   .then(function(flightDoc) {
			   console.log(flightDoc)
			   res.render('flights/show', {
				flight: flightDoc
			   })
			   })
}

function index(req, res){
    FlightModel.find({})
			   .then(function(allFlights){
                    console.log(allFlights, " <_ data from the db")
				res.render('flights/index', {flights: allFlights})
			  })
              .catch(function(err){
				console.log(err);
				res.send(err)
			  })

	
}


function create(req, res){
    console.log(req.body);
    FlightModel.create(req.body)
               .then(function(flightWeCreatedInTheDb){
                console.log(flightWeCreatedInTheDb, " <- flight document")
                res.redirect(`/flights/${flightWeCreatedInTheDb._id}`)
               }).catch((err) => {
                console.log(err, "error for create function");
               })
    
}

function newflight(req, res){


	// Render looks in the views folder
	res.render('flights/new')
}