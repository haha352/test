const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const memberSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

const Member = mongoose.model("Members", memberSchema);
module.exports = Member;
