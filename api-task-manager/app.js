const express = require("express");
const cors = require("cors");
const app = express();
const auth = require("./routes/auth");
app.use(cors());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Expose-Headers",
    "x-access-token, x-refresh-token"
  );
  next();
});

const { mongoose } = require("./db/mongoose");

const router = express.Router();
app.use(express.json());

// Models
const { List, Task, User } = require("./db/models");

// Routers
const listsRoutes = require("./routes/lists");
const userRoutes = require("./routes/user");

// LIST ROUTES
app.use("/lists", listsRoutes);

// USER ROUTES
app.use("/", userRoutes);

// TASK ROUTES
app.get("/lists/:listId/tasks", auth, async (req, res) => {
  try {
    const response = await Task.find({ _listId: req.params.listId });
    res.send(response);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

app.post("/lists/:listId/tasks", auth, async (req, res) => {
  try {
    const list = await List.findOne({
      _id: req.params.listId,
      _userId: req.user_id,
    });
    if (!list) return res.status(404).send("list not found");
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

app.put("/lists/:listId/tasks/:taskId", auth, async (req, res) => {
  try {
    const list = await List.findOne({
      _id: req.params.listId,
      _userId: req.user_id,
    });
    if (!list) return res.status(404).send("list not found");

    let task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).send("Task not found!");

    task.title = req.body.title;
    if (req.body.completed) task.completed = req.body.completed;
    const response = await task.save();
    res.send(response);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

app.delete("/lists/:listId/tasks/:id", auth, async (req, res) => {
  try {
    const list = await List.findOne({
      _id: req.params.listId,
      _userId: req.user_id,
    });
    if (!list) return res.status(404).send("list not found");

    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found!");

    const taskDeleted = await Task.findOneAndDelete({ _id: req.params.id });
    res.send(taskDeleted);
  } catch (error) {
    res.send({ error: 1, message: error });
  }
});

app.listen(3000, () => console.log("server is running on port 3000"));
