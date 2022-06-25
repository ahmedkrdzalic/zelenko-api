const express = require('express');
const router = express.Router();
const { Subcategories } = require('../models');


router.get('/:id', async (req, res) => {
    const CategoryId = req.params.id;
    const subcategory = await Subcategories.findAll({ where: {CategoryId: CategoryId}})
                            .then(function (subcategories) {
                                console.log(subcategories);
                                res.json(subcategories);
                            })
                            .catch(function (err) {
                                // every error
                                res.json(err);
                            });
});



/**



 */

module.exports = router;
