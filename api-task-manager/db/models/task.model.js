const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minLength: 3,
    trim: true,
  },
  _listId: {
      type: mongoose.Types.ObjectId,
      required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
