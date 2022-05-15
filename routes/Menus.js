const express = require('express');
const router = express.Router();
const { Menus } = require('../models');
const { validateToken} = require('../services/JWT');


router.get('/', validateToken, async (req, res) => {
    //const UserId = req.query.UserId; // moze se i ovim uradit al nije sigurno, ovako mora token svakako koristit
    const menus = await Menus.findAll({ where: {UserId: req.user.id}});
    res.json(menus);
});

router.get("/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    const menu = await Menus.findByPk(id)
                                .then(function(menu) {
                                    if(menu.UserId !== userId) {res.json({error: "Unauthorized access to this menu"})}
                                    res.json(menu);
                                })
                                .catch(function (err) {
                                    // every error
                                    res.json(err);
                                });
    
});



module.exports = router;
