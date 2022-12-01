const mongoose = require('mongoose');

mongoose.connection.once('open',()=>console.log("MongoDB connected!"))
mongoose.connection.on("error", (err) => console.error(err));
const connectDB = (url) => {
  return mongoose.connect(url)
}
module.exports = connectDB;