const apartments = require('../models/apartments');
var Apartment = require('../models/apartments');
const MIN_VALUE = -999999
const MAX_VALUE = 999999
module.exports = (router) => {
  var apartmentsRoute = router.route('/apartments');

  apartmentsRoute.get((req, res)=>{
    const minPrice = req.query.minPrice ? JSON.parse(req.query.minPrice) : MIN_VALUE;
    const maxPrice = req.query.maxPrice ? JSON.parse(req.query.maxPrice) : MAX_VALUE;
    const minBedrooms = req.query.minBedrooms ? JSON.parse(req.query.minBedrooms) : MIN_VALUE;
    const maxBedrooms = req.query.maxBedrooms ? JSON.parse(req.query.maxBedrooms) : MAX_VALUE;
    const minBathrooms = req.query.minBathrooms ? JSON.parse(req.query.minBathrooms) : MIN_VALUE;
    const maxBathrooms = req.query.maxBathrooms ? JSON.parse(req.query.maxBathrooms) : MAX_VALUE;
    const minYearBuilt = req.query.minYearBuilt ? JSON.parse(req.query.minYearBuilt) : MIN_VALUE;
    const maxYearBuilt = req.query.maxYearBuilt ? JSON.parse(req.query.maxYearBuilt) : MAX_VALUE;
    const minArea = req.query.minArea ? JSON.parse(req.query.minArea) : MIN_VALUE;
    const maxArea = req.query.maxArea ? JSON.parse(req.query.maxArea) : MAX_VALUE;
    const hasHeatingOptions =  req.query.hasHeating ? [(req.query.hasHeating)] : [true, false];
    const hasPetsAllowed =  req.query.hasPetsAllowed ? [(req.query.hasPetsAllowed)] : [true, false];
    const addressKeyword = req.query.addressKeyword ? req.query.addressKeyword : "";
    const sort = req.query.sort ? req.query.sort : "price";
    const isAscending = req.query.isAscending ? (JSON.parse(req.query.isAscending) ? 'ascending' : 'descending') : 'ascending';
    if (req.query.homeType){
      Apartment.find({price: {$lte: maxPrice, $gte: minPrice}, 
        numberOfBedrooms: {$lte: maxBedrooms, $gte: minBedrooms},
        numberOfBathrooms: {$lte: maxBathrooms, $gte: minBathrooms},
        livingArea: {$lte: maxArea, $gte: minArea},
        yearBuilt: {$lte: maxYearBuilt, $gte: minYearBuilt},
        hasHeating: {$in: hasHeatingOptions},   
        hasPetsAllowed: {$in: hasPetsAllowed},
        homeType: req.query.homeType,
        streetAddress: {$regex: new RegExp(addressKeyword, 'i')}
      }).sort([[sort, isAscending]]).then(
        (doc, err) => res.status(200).send({message: "ok", data: doc})
      )
    }else{
      Apartment.find({price: {$lte: maxPrice, $gte: minPrice}, 
        numberOfBedrooms: {$lte: maxBedrooms, $gte: minBedrooms},
        numberOfBathrooms: {$lte: maxBathrooms, $gte: minBathrooms},
        livingArea: {$lte: maxArea, $gte: minArea},
        yearBuilt: {$lte: maxYearBuilt, $gte: minYearBuilt},
        hasHeating: {$in: hasHeatingOptions},   
        hasPetsAllowed: {$in: hasPetsAllowed},
        streetAddress: {$regex: new RegExp(addressKeyword, 'i')}
      }).sort([[sort, isAscending]]).then(
        (doc, err) => res.status(200).send({message: "ok", data: doc})
      )
    }
  })

  // POST: Create a new appartment. Respond with details of new apartment
  // apartmentsRoute.post((req, res) => {
  //   const apartmentInfo = {
  //     "streetAddress": req.param("streetAddress"),
  //     "numberOfBathrooms": req.param("numberOfBathrooms"),
  //     "numberOfBedrooms": req.param("numberOfBedrooms"),
  //     "city": req.param("city"),
  //     "zipcode": req.param("zipcode"),
  //     "latitude": req.param("latitude"),
  //     "longitude": req.param("longitude"),
  //     "homeType": req.param("homeType"),
  //     "imgSrc": req.param("imgSrc"),
  //     "imgSrcs": req.param("imgSrcs"),
  //     "hasPetsAllowed": req.param("hasPetsAllowed"),
  //     "price": req.param("price"),
  //     "livingArea": req.param("livingArea"),
  //     "hasHeating": req.param("hasHeating") ? req.param("hasHeating") : false,
  //     "description": req.param("description"),
  //     "yearBuilt": req.param("yearBuilt"),
  //     "appliances": req.param("appliances"),
  //   };
   
  //   var apartment = new Apartment(apartmentInfo);

  //   apartment.save().then((doc, err) => {
  //     res.status(201).send({message: "Apartment created", data: doc})
  //   }).catch((err) => res.status(500).send({message: err, data: null}))
  // });


  return router;
}