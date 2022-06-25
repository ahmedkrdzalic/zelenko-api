const express = require('express');
const router = express.Router();
const { Reports } = require('../models');



//by subcategory id
router.get('/subcategory/:SubcategoryId', async (req, res) => {
    const SubcategoryId = req.params.SubcategoryId;
    const reports = await Reports.findAll({where: {SubcategoryId: SubcategoryId}})
                            .then(function (categories) {
                                console.log(categories);
                                res.json(categories);
                            })
                            .catch(function (err) {
                                // every error
                                res.json(err);
                            });
});

//by report id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const report = await Reports.findAll({ where: {id: id}})
                            .then(function (report) {
                                console.log(report);
                                res.json(report);
                            })
                            .catch(function (err) {
                                // every error
                                res.json(err);
                            });
});


module.exports = router;


