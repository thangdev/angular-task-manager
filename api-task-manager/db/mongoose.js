// handling connection logic to mongodb
const mongoose = require('mongoose')

mongoose
  .connect("mongodb://localhost/TaskManager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongoDB..."))
  .catch((err) => console.log("Could not connect to mongoDB...", +err.message));

module.exports = {
    mongoose
}

