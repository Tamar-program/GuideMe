const mongoose = require ("mongoose")
const { stringify } = require("querystring")


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role:{
      type: String,
      enum:["Admin","User"],
      default:"User"
    }
  }, {
    timestamps: true 
  });

module.exports = mongoose.model('User', userSchema)
