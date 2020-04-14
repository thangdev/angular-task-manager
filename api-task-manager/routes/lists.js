const express = require("express");
const router = express.Router();
const { List } = require("../db/models");

router.get("/", async (req, res) => {
  try {
    const response = await List.find({});
    res.send(response);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newList = new List({ title: req.body.title });
    const response = await newList.save();
    res.send(response);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).send("list not found!");
    list.title = req.body.title;
    const response = await list.save();
    res.send(response);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).send("list not found!");
    const listDeleted = await List.findOneAndDelete({ _id: req.params.id });
    res.send(listDeleted);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});


module.exports = router
