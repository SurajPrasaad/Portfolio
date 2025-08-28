import mongoose from "mongoose";
const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  startDate: Date,
  endDate: Date,
  description: String,
  currentlyWorking: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Experience', experienceSchema);
