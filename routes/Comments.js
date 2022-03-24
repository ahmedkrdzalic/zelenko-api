const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const {validateToken} = require('../services/JWT');


router.get("/:QuestionId", async (req, res) => {
    const QuestionId = req.params.QuestionId;
    const comments = await Comments.findAll({ where: {QuestionId: QuestionId}});
    res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    console.log(comment);
    await Comments.create(comment);
    res.json(comment);
});


module.exports = router;