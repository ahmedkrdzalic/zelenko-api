const express = require('express');
const router = express.Router();
const { Comments } = require('../models');


router.get("/:QuestionId", async (req, res) => {
    const QuestionId = req.params.QuestionId;
    const comments = await Comments.findAll({ where: {QuestionId: QuestionId}});
    res.json(comments);
});

router.post("/", async (req, res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
});


module.exports = router;