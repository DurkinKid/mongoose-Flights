const FlightModel = require('../models/flight');

module.exports = {
	create,
    delete: deleteFlight
}

function deleteFlight(req, res){
	// tell the model to delete the flight of the id 
	// req.params.id represents the id coming from the form on the client
	FlightModel.deleteOne(req.params.id);
	res.redirect('/flights/show')
}

function create(req, res){
	console.log(req.body)
	// Use a Model to find the flight with an id (req.params.id)
	FlightModel.findById(req.params.id)
	.then(function(flightDoc){

	console.log(flightDoc)
					// mutating a document, 
					// adding/or removing/updating 
					// something found from the database
	flightDoc.destinations.push(req.body);
					// save the document to tell mongodb I changed something, cuz this 
					// exists on my express server, mongodb doesn't know I added req.body
                    // to the flights destinations array
	flightDoc.save()
	.then(function(){
	    res.redirect(`/flights/${req.params.id}`)
	 })
        }).catch(err =>{
		    console.log(err);
			res.send(err)
			   })

}