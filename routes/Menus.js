const express = require('express');
const router = express.Router();
const { Menus } = require('../models');
const {createToken, validateToken} = require('../services/JWT');


router.get('/', validateToken, async (req, res) => {
    //const UserId = req.query.UserId; // moze se i ovim uradit al nije sigurno, ovako mora token svakako koristit
    const menus = await Menus.findAll({ where: {UserId: req.user.id}});
    res.json(menus);
});



module.exports = router;
