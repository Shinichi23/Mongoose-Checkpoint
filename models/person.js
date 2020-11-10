const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
    required,
  },
  age: Number,
  favoriteFood: [String],
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
