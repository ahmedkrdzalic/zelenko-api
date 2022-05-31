const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const {createToken, validateToken} = require('../services/JWT');



router.post("/registration", async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users
            .create({
                username: username,
                password: hash,
            })
            .then(function (user) {
                res.send("SUCCESS");
            })
            .catch(function (err) {
                // every other error
                res.json(err.errors[0].message);
            });
    });
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    
    const user = await Users.findOne({ where: {username: username}});

    if(!user) res.json({error: "User does not exist!"});

    bcrypt.compare(password, user.password).then((match) => {
        if(!match) {
            res.json({error: "Wrong username and password combination!"});
        }
        else {
            const accessToken = createToken(user);
            
            //30 days
            res.cookie("token", accessToken, {
                maxAge: 2592000000,
                httpOnly: true
            })
            .json({user: {username: user.username, id: user.id}});
        }
    });
});

router.get('/profile', validateToken, async (req, res) => {
    const userId = req.user.id;
    const user = await Users.findOne({ where: {id: userId}})
                            .then(function (user) {
                                res.json({username: user.username, id: user.id});
                            })
                            .catch(function (err) {
                                // every error
                                res.json(err);
                            });
    
});

router.get('/logout', validateToken, async (req, res) => {
    const userId = req.user.id;
    const token = req.cookies["token"];

    res.cookie("token", token, {
        maxAge: -1000,
        httpOnly: true
    })
    .json({msg: "logout success"});
});



module.exports = router;
