// ! userInfo: name, email, pendingTasks, dateCreated(auto)

var User = require('../models/users');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const token_secret = 'f31c9e46dbfd7fe2a2695a7c4292629cf6f23dd7d0cf7a8c979489265205694d46f6b072471cc39d0c78a917f563d164bf4ace3d884f38ef98b3d9b731a4a218';
const salt = 10;


function generateAccessToken(username) {
    return jwt.sign(username, token_secret, {expiresIn: '3600s'});
}


module.exports = (router) => {
    var useroute = router.route('/auth');
    var userRoute = router.route('/users');

    useroute.post((req, res) => {
        User.findOne({userName: req.query.userName}).then(
            (doc, err) => {
                bcrypt.compare(req.query.password, doc.password, function (err, match) {
                    if (match) {
                        const token = generateAccessToken({
                            "userName": req.param("userName"),
                        });
                        // Password matched
                        res.status(200).send({
                            message: "Login Success",
                            data: {'token': token, 'userName': doc["userName"], 'email': doc["email"]}
                        })
                    } else {
                        // Password didn't match
                        res.status(400).send({message: "userName and password not match", data: null})
                    }
                });
            }
        ).catch(
            (err) => res.status(404).send({message: "userName not exist", data: null})
        )
    });
    // GET: Check if username exists and matches with password
    userRoute.get((req, res) => {
        User.findOne({userName: req.query.userName}).then(
            (doc, err) => {
                bcrypt.compare(req.query.password, doc.password, function (err, match) {
                    if (match) {
                        const token = generateAccessToken({
                            "userName": req.param("userName"),
                        });
                        // Password matched
                        res.status(200).send({
                            message: "Login Success",
                            data: {'token': token, 'userName': doc["userName"], 'email': doc["email"]}
                        })
                    } else {
                        // Password didn't match
                        res.status(400).send({message: "userName and password not match", data: null})
                    }
                });
            }
        ).catch(
            (err) => res.status(404).send({message: "userName not exist", data: null})
        )
    });

    // POST: Create a new user. Respond with details of new user
    userRoute.post((req, res) => {

        User.findOne({userName: req.param('userName')}).then(
            (doc, err) => {
                if (doc) {
                    res.status(400).send({message: "userName already exists", data: null})
                }else{
                    bcrypt.hash(req.param("password"), salt, function (err, hash) {
                        // Store hash in database
                        const userInfo = {
                            "userName": req.param("userName"),
                            "email": req.param("email"),
                            "password": hash,
                        };

                        //Insert a user
                        var user = new User(userInfo);

                        const token = generateAccessToken({
                            "userName": req.param("userName"),
                        });

                        user.save().then((doc, err) => {
                            res.status(201).send({
                                message: "User created",
                                data: {'token': token, 'userName': doc["userName"], 'email': doc["email"]}
                            })
                        }).catch((err) => res.status(500).send({message: err, data: null}))
                    })
                }
            }
        )
    });


    return router;
}
