const express = require('express');
const router = express.Router();
const { Questions } = require('../models');


router.get("/", async (req, res) => {
    const listOfQuestions = await Questions.findAll();
    res.json(listOfQuestions);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const question = await Questions.findByPk(id);
    res.json(question);
});


router.post("/", async (req, res) => {
    const question = req.body;
    await Questions.create(question);
    res.json(question);
});

module.exports = router;
