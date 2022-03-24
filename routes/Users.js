const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const {createToken, validateToken} = require('../services/JWT');


router.post("/registration", async (req, res) => {
    const {username, password} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("SUCCESS!");
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
            .json({user: user});
        }
    });
});

router.get('/profile', validateToken, async (req, res) => {
    const userId = req.query.userId;
    const user = await Users.findOne({ where: {id: userId}});
    res.json(user);
});



module.exports = router;
