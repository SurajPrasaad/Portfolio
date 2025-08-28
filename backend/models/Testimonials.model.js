import mongoose from "mongoose";
const testimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  message: String,
  profileImage: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Testimonial', testimonialSchema);
