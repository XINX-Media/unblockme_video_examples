const { Schema, model } = require('mongoose');

// Schema for what makes up a comment
const nameSchema = new Schema({
  name: String,
});

// Initialize the Comment model
const Name = model('name', nameSchema);

module.exports = Name;
