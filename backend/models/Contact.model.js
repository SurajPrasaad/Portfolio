import mongoose from "mongoose";
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  read: { type: Boolean, default: false },
});
export default mongoose.model('Contact', contactSchema);
