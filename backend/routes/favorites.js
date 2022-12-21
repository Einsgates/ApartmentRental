var User = require('../models/users');
var Apartment = require('../models/apartments');
const {stringify} = require("nodemon/lib/utils");
const jwt = require('jsonwebtoken');
const token_secret = 'f31c9e46dbfd7fe2a2695a7c4292629cf6f23dd7d0cf7a8c979489265205694d46f6b072471cc39d0c78a917f563d164bf4ace3d884f38ef98b3d9b731a4a218';

function authenticateToken(req, res, next) {
    console.log(req.headers)
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, token_secret, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

module.exports = (router) => {
    var favoritesRoute = router.route('/favorites');

    // GET: Get all apartments saved by the user with username provided
    favoritesRoute.get(authenticateToken, (req, res) => {
        User.findOne({userName: req.user.userName}).then(
            (user, err) => {
                let favoriteIds = user["favorites"];
                Apartment.find({_id: {$in: favoriteIds}}).then(
                    (doc, err) => {
                        res.status(200).send({message: "success", data: doc})
                    }
                )
            }
        ).catch(
            (err) => res.status(404).send({message: "userName not exist", data: null})
        )
    });

    // POST: Add the apartment id for a specific user, make sure the apartmentId provided is not already in the list
    favoritesRoute.post(authenticateToken, (req, res) => {
        if (req.param('add')) {
            User.findOneAndUpdate({userName: req.user.userName}, {$push: {favorites: stringify(req.param("apartmentId"))}}).then(
                (doc, err) => res.status(200).send({message: "successfully updated", data: null})
            ).catch(
                (err) => res.status(404).send({message: "userName not exist", data: req.param("userName")})
            )
        }else{
            User.findOneAndUpdate({userName: req.user.userName}, {$pull: {favorites: stringify(req.param("apartmentId"))}}).then(
                (doc, err) => res.status(200).send({message: "successfully updated", data: null})
            ).catch(
                (err) => res.status(404).send({message: "userName not exist", data: req.param("userName")})
            )
        }
    });

    // // DELETE: Delete the apartment id for a specific user
    // favoritesRoute.delete(authenticateToken, (req, res) => {
    //   User.findOneAndUpdate({userName: req.user.userName}, {$pull: {favorites: stringify(req.param("apartmentId"))}}).then(
    //       (doc, err) => res.status(200).send({message: "successfully deleted", data: null})
    //     ).catch(
    //       (err) => res.status(404).send({message: "userName not exist", data: req.param("userName")})
    //     )
    // });

    return router;
}