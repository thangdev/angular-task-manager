const express = require("express");
const router = express.Router();
const auth = require('./auth')

const { List, Task } = require("../db/models");

router.get("/", auth, async (req, res) => {
  try {
    const response = await List.find({ _userId: req.user_id });
    res.send(response);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});



router.post("/", auth, async (req, res) => {
  try {
    const newList = new List({ title: req.body.title, _userId: req.user_id });
    const response = await newList.save();
    res.send(response);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

router.put("/:id", auth,  async (req, res) => {
  try {
    const query = {_id: req.params.id, _userId: req.user_id}
    const list = await List.findOneAndUpdate(query, {$set: req.body });
    res.send(list);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const query = { _id: req.params.id, _userId: req.user_id };
    const deletedList = await List.findOneAndRemove(query);
    const response = await Task.deleteMany({ _listId: list._id });
    res.send(deletedList);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

module.exports = router;
