import mongoose from "mongoose";
const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  link: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Achievement', achievementSchema);
