var mongoose = require('mongoose');

// Define our Apartments schema
var ApartmentSchema = new mongoose.Schema({
  streetAddress: {
    type: String,
    default: ""
  },
  numberOfBedrooms: {
    type: Number,
    default: 0
  },
  numberOfBathrooms: {
    type: Number,
    default: 0
  },
  city: {
    type: String,
    default: "Champaign"
  },
  zipcode: {
    type: Number,

  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  homeType: {
    type: String,
    default: "condo"
  },
  imgSrc: {
    type: String,
  },
  imgSrcs: {
    type: [String],
    default: []
  },
  hasPetsAllowed: {
    type: Boolean,
  },
  price: {
    type: Number,
    default: 0
  },
  livingArea: {
    type: Number,
    default: 0
  },
  hasHeating: {
    type: Boolean,
  },
  description: {
    type: String,
    default: ""
  },
  yearBuilt: {
    type: Number,
    default: 1900
  },
  appliances: {
    type: [String],
    default: []
  }
});

module.exports = mongoose.model('Apartment', ApartmentSchema);