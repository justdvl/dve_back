let mongoose = require("mongoose");

let contactSchema = mongoose.Schema({
  name: {
      type: String,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String
  }
});

contactSchema.set("timestamps", true);


let Contact = (module.exports = mongoose.model("Contact", contactSchema));
