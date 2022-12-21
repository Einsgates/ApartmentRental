var Apartment = require('../models/apartments');

module.exports = (router) => {
  var apartmentRoute = router.route('/apartments/:id');

  // POST: Get the appartment info given id
  apartmentRoute.get((req, res) => {
    Apartment.findById(req.params.id).then(
      (doc, err) => {
        res.status(200).send({message: "apartment found", data: doc})
      }
    ).catch(
      (err) => res.status(404).send({message: "apartment not found", data: req.params.id})
    )
  });
    

  return router;
}