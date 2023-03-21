const mongoose = require('mongoose')

const destinationsSchema = new mongoose.Schema({
    airPort: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
        arrival: Date
  }, 
  {
    timestamps: true
  });
// Schema is a guard on our collection that says
// everytime we want to add a document (object) to our collection 
// in mongodb, it must have this shape, 
// keys must be the same name, and the values must be of the type Specified below (String, Number, Boolean, etc)
const flightSchema = new mongoose.Schema({
	airline: {
        type: String,
        enum: ['American', 'Delta', 'Spirit', 'United']
    },
     airport: {
        type: String, 
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },
	flightNo: {
        type: Number,
        min: 11,
        max: 9998
    },
    destinations: [destinationsSchema],
	departs: {
        type: Date,
        default: function(){
      return new Date().getFullYear();
    }},
});

module.exports = mongoose.model('Flight', flightSchema);
