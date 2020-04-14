const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const { mongoose } = require("./db/mongoose");
const router = express.Router();
app.use(express.json());

const { List, Task } = require("./db/models");
const lists = require("./routes/lists");


// LIST ROUTE
app.use("/lists", lists);

// TASK ROUTE
app.get("/lists/:listId/tasks", async (req, res) => {
  try {
    const response = await Task.find({ _listId: req.params.listId });
    res.send(response);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});


app.post("/lists/:listId/tasks", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      _listId: req.params.listId,
    });
    const response = await newTask.save();
    res.send(response);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

app.put("/lists/:listId/tasks/:taskId", async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) return res.status(404).send("List not found!");
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).send("Task not found!");

    task.title = req.body.title;
    const response = await task.save();

    res.send(response);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

app.delete("/lists/:listId/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found!");
    const taskDeleted = await Task.findOneAndDelete({ _id: req.params.id });
    res.send(taskDeleted);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

app.listen(3000, () => console.log("server is running on port 3000"));
